import { Stack, Duration, CfnOutput } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { WebSocketApi, WebSocketStage } from '@aws-cdk/aws-apigatewayv2-alpha';
import { WebSocketLambdaAuthorizer } from '@aws-cdk/aws-apigatewayv2-authorizers-alpha';
import { WebSocketLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { join } from 'path';
import { NodejsFunction, NodejsFunctionProps, SourceMapMode } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { LambdaSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Chain, Choice, Condition, Fail, Pass, StateMachine, Succeed } from 'aws-cdk-lib/aws-stepfunctions';
import { LambdaInvoke } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { IRole } from 'aws-cdk-lib/aws-iam';
//import { StateMachine } from '@matthewbonig/state-machine';

export interface WebSocketsApiProps {
  connectionsTable: Table;
  gitHubClientId: string;
  gitHubClientSecret: string;
  node_env: string;
  logLevel: "DEBUG" | "INFO" | "WARN" | "ERROR";
}

export class WebSocketsApi extends Construct {

  public webSocketApi: WebSocketApi;

  constructor(scope: Construct, id: string, props?: WebSocketsApiProps) {
    super(scope, id);

    const functionsPath = '../../services/WebSockets/dist';

    const createLambda = (name: string, handler: string, env?: {
      [key: string]: string;
    } | undefined) => {

      return new lambda.Function(this, name, {
        runtime: lambda.Runtime.NODEJS_16_X,
        memorySize: 1024,
        timeout: Duration.seconds(5),
        functionName: `KyleFinleyNet-Infrastructure-${name}`,
        handler,
        code: new lambda.AssetCode(join(__dirname, `${functionsPath}`)),
        environment: {
          REGION: Stack.of(this).region,
          AVAILABILITY_ZONES: JSON.stringify(
            Stack.of(this).availabilityZones,
          ),
          NODE_ENV: props!.node_env,
          ...env
        },
      });
    };

    const createNodeJsFunction = (name: string, path: string) => {

      const nodeJsFunctionProps: NodejsFunctionProps = {
        functionName: `KyleFinleyNet-Infrastructure-${name}`,
        projectRoot: join(__dirname, '../../services/WebSockets'),
        entry: join(__dirname, `../../services/WebSockets/src/functions/${path}`),
        bundling: {
          // assetHash: 'my-custom-hash',
          externalModules: [
            'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime
          ],
          // preCompilation: true,
          minify: true, // minify code, defaults to false
          sourceMap: true, // include source map, defaults to false
          sourceMapMode: SourceMapMode.INLINE, // defaults to SourceMapMode.DEFAULT
          sourcesContent: false, // do not include original source into source map, defaults to true
          target: 'es2020', // target environment for the generated JavaScript code,
        },
        depsLockFilePath: join(__dirname, '../../services/WebSockets/package-lock.json'),
        environment: { //TODO: refactor this... pass in env vars
          CONNECTIONS_TABLE_NAME: props?.connectionsTable.tableName!,
          MESSAGES_TABLE_NAME: props?.connectionsTable.tableName!,
          LOG_LEVEL: props?.logLevel!
        },
        handler: "handler",
        allowAllOutbound: true,
        runtime: Runtime.NODEJS_16_X,
        tracing: Tracing.ACTIVE
      }

      return new NodejsFunction(this, name, {

        ...nodeJsFunctionProps
      });
    }

    // Lambda Functions....

    const authorizerHandler = createLambda('AuthorizerHandler', 'functions/auth.handler', {
      WEBSOCKETS_GITHUB_OAUTH_CLIENT_ID: props!.gitHubClientId,
      WEBSOCKETS_GITHUB_OAUTH_CLIENT_SECRET: props!.gitHubClientSecret
    });

    const onConnectHandler = createLambda('OnConnectHandler', 'functions/connect.handler', {
      WEBSOCKETS_CONNECTION_TABLE: props!.connectionsTable.tableName
    });
    props?.connectionsTable.grantReadWriteData(onConnectHandler);

    const onDisconnectHandler = createLambda('OnDisconnectHandler', 'functions/disconnect.handler', {
      WEBSOCKETS_CONNECTION_TABLE: props!.connectionsTable.tableName
    });
    props?.connectionsTable.grantReadWriteData(onDisconnectHandler);

    const onMessageHandler = createLambda('OnMessageHandler', 'functions/default.handler',);

    const getConnection = createLambda('GetConnection', 'functions/getConnection.handler', {
      WEBSOCKETS_CONNECTION_TABLE: props!.connectionsTable.tableName
    });
    props?.connectionsTable.grantReadWriteData(getConnection);

    const sendMessage = createLambda('SendMessage', 'functions/sendMessage.handler');

    const startSendMessageNotification = createLambda('StartSendMessageNotification', 'functions/startSendMessageNotification.handler')

    // Lambda Functions end...

    // SNS Topics & Subscriptions...
    const authProcessedTopic = new Topic(this, 'sns-topic', {
      topicName: 'kylefinley.net_AuthProcessedTopic',
      displayName: 'AuthProcessedTopic',
    });

    authProcessedTopic.grantPublish(onConnectHandler.role as IRole);
    authProcessedTopic.addSubscription(new LambdaSubscription(startSendMessageNotification));

    new CfnOutput(this, 'AuthProcessedTopic', {
      value: `AuthProcessedTopic ARN: ${authProcessedTopic.topicArn}`
    });

    // SNS Topics & Subs end...

    // Step Functions...

    const getConnectionInvocation = new LambdaInvoke(this, "GetConnectionInvocation", {
      lambdaFunction: getConnection,
      outputPath: '$.Payload',
    });

    const sendMessageInvocation = new LambdaInvoke(this, "SendMessageInvocation", {
      lambdaFunction: sendMessage
    });

    const isConnected = new Choice(this, 'Has ConnectionId?');

    const chain = Chain
      .start(getConnectionInvocation)
      .next(
        isConnected
          .when(Condition.stringEquals('$.connectionId', ''), new Fail(this, "Fail", { error: "No ConnectionId Found" }))
          .otherwise(sendMessageInvocation));

    const stateMachine = new StateMachine(this, 'kylefinley.net-WebSockets-SendMessage', {
      definition: chain
    });

    // stateMachine.grantExecution(startSendMessageNotification);

    // Step Functions end...

    // WebSockets...

    const authorizer = new WebSocketLambdaAuthorizer('Authorizer', authorizerHandler, {
      identitySource: [
        // 'route.request.header.Authorization',          // todo: ??
        'route.request.header.Sec-WebSocket-Protocol']
    });

    this.webSocketApi = new WebSocketApi(this, 'KyleFinleyWebSocketApi', {
      apiName: 'KyleFinley.net Websocket API',
      connectRouteOptions: { integration: new WebSocketLambdaIntegration("ConnectIntegration", onConnectHandler), authorizer },
      disconnectRouteOptions: { integration: new WebSocketLambdaIntegration("DisconnectIntegration", onDisconnectHandler) },
      defaultRouteOptions: { integration: new WebSocketLambdaIntegration("DefaultIntegration", onMessageHandler) },
    });

    const stage = new WebSocketStage(this, 'Prod', {
      webSocketApi: this.webSocketApi,
      stageName: 'v1',                                    // todo: ??
      autoDeploy: true,
    });

    this.webSocketApi.grantManageConnections(onMessageHandler);
    this.webSocketApi.grantManageConnections(sendMessage);

    new CfnOutput(this, 'webSocketApi.apiEndpoint', {
      value: `api endpoint: ${this.webSocketApi.apiEndpoint}`
    });

    new CfnOutput(this, 'stage.url', {
      value: `stage url: ${stage.url}`
    });


    // Review https://aws.plainenglish.io/setup-api-gateway-websocket-api-with-cdk-c1e58cf3d2be

    // Add routes for commands sent from client
    //
    // addRoute allows messaged like {"action":"addTodo","data":"hello world"} to be passed to ws and it lands on the right handler
    // webSocketApi.addRoute('addTodo', {
    //   integration: new LambdaWebSocketIntegration({
    //     handler: addTodoHandler,
    //   }),
    // });


    // WebSockets end...

  }

}
