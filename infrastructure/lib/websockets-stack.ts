import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps, Duration, CfnOutput } from 'aws-cdk-lib';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
// import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { WebSocketApi, WebSocketStage } from '@aws-cdk/aws-apigatewayv2-alpha';
import { WebSocketLambdaAuthorizer } from '@aws-cdk/aws-apigatewayv2-authorizers-alpha';
import { WebSocketLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
// import { Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { join } from 'path';

export interface WebSocketsProps extends StackProps {
  connectionsTable: Table;
  gitHubClientId: string | undefined;
  gitHubClientSecret: string | undefined;
  logLevel: string;
}

export class WebSocketsStack extends cdk.Stack {

  public webSocketApi: WebSocketApi;

  constructor(scope: Construct, id: string, props?: WebSocketsProps) {
    super(scope, id, props);

    const functionsPath = '../../.webpack/service/services/WebSockets/src/functions';

    const createLambda = (name: string, path: string) => {
      return new lambda.Function(this, name, {
        runtime: lambda.Runtime.NODEJS_16_X,
        memorySize: 1024,
        timeout: Duration.seconds(5),
        handler: 'index.handler',
        code: lambda.Code.fromAsset(join(__dirname, `${functionsPath}/${path}`)),
        environment: {
          REGION: Stack.of(this).region,
          AVAILABILITY_ZONES: JSON.stringify(
            Stack.of(this).availabilityZones,
          ),
        },
      });
    };

    const authorizerHandler = createLambda('AuthorizerHandler', 'auth');

    const onConnectHandler = createLambda('OnConnectHandler', 'connect');
    props?.connectionsTable.grantReadWriteData(onConnectHandler);

    const onDisconnectHandler = createLambda('OnDisconnectHandler', 'disconnect');
    props?.connectionsTable.grantReadWriteData(onDisconnectHandler);

    const onMessageHandler = createLambda('OnMessageHandler', 'default');
    props?.connectionsTable.grantReadWriteData(onMessageHandler);

    const getConnection = createLambda('GetConnection', 'getConnection');

    const sendMessage = createLambda('SendMessage', 'sendMessage');

    const startSendMessageNotification = createLambda('StartSendMessageNotification', 'startSendMessageNotification')

    const authorizer = new WebSocketLambdaAuthorizer('Authorizer', authorizerHandler, { identitySource: ['route.request.header.Sec-WebSocket-Protocol'] });

    this.webSocketApi = new WebSocketApi(this, 'KyleFinleyWebSocketApi', {
      apiName: 'KyleFinley.net Websocket API',
      connectRouteOptions: { integration: new WebSocketLambdaIntegration("ConnectIntegration", onConnectHandler), authorizer },
      disconnectRouteOptions: { integration: new WebSocketLambdaIntegration("DisconnectIntegration", onDisconnectHandler) },
      defaultRouteOptions: { integration: new WebSocketLambdaIntegration("DefaultIntegration", onMessageHandler) },
    });

    const devStage = new WebSocketStage(this, 'Prod', {
      webSocketApi: this.webSocketApi,
      stageName: 'wss',
      autoDeploy: true,
    });

    this.webSocketApi.grantManageConnections(onMessageHandler);

    new CfnOutput(this, 'webSocketApi.apiEndpoint', {
      value: this.webSocketApi.apiEndpoint
    });

    // taken from incomplete online example... https://aws.plainenglish.io/setup-api-gateway-websocket-api-with-cdk-c1e58cf3d2be
    // seems to be created off of this. https://github.com/aws-samples/websocket-chat-application
    // const webSocketApi = new WebSocketApi(this, 'TodosWebsocketApi', {
    //   connectRouteOptions: { integration: new LambdaWebSocketIntegration({ handler: connectHandler }) },
    //   disconnectRouteOptions: { integration: new LambdaWebSocketIntegration({ handler: disconnetHandler }) },
    // });

    // const apiStage = new WebSocketStage(this, 'DevStage', {
    //   webSocketApi,
    //   stageName: 'dev',
    //   autoDeploy: true,
    // });


    // const connectHandler = new NodejsFunction(this, 'ConnectHandler', {
    //   entry: 'lambdas/connectHandler.ts',
    //   environment: {
    //     TABLE_NAME: table.tableName,
    //   },
    // });

    // const table = new dynamodb.Table(this, 'WebsocketConnections', {
    //   partitionKey: { name: 'connectionId', type: dynamodb.AttributeType.STRING },
    // });

    // THIS!!!!!!!!!!!!!!!!!!!!!!!
    //
    // addRoute allows messaged like {"action":"addTodo","data":"hello world"} to be passed to ws and it lands on the right handler
    // webSocketApi.addRoute('addTodo', {
    //   integration: new LambdaWebSocketIntegration({
    //     handler: addTodoHandler,
    //   }),
    // });

    // table.grantReadWriteData(connectHandler);

    // const connectionsArns = this.formatArn({
    //   service: 'execute-api',
    //   resourceName: `${apiStage.stageName}/POST/*`,
    //   resource: webSocketApi.apiId,
    // });

    // addTodoHandler.addToRolePolicy(
    //   new PolicyStatement({ actions: ['execute-api:ManageConnections'], resources: [connectionsArns] })
    // );

  }
}
