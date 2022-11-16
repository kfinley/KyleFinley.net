import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
// import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { WebSocketApi, WebSocketStage } from '@aws-cdk/aws-apigatewayv2-alpha';
import { WebSocketLambdaAuthorizer } from '@aws-cdk/aws-apigatewayv2-authorizers-alpha';
import { WebSocketLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
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


    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: [
          'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime
        ],
        nodeModules: [
          // '@aws-lambda-powertools/logger',
          // '@aws-lambda-powertools/tracer',
          // 'aws-jwt-verify',
          // '@aws-lambda-powertools/metrics'
          'reflect-metadata'
        ],
      },
      depsLockFilePath: join(__dirname, '../../services/WebSockets', 'package-lock.json'), // Go up 3 directories to the services/WebSockets folder
      environment: {
        WEBSOCKETS_CONNECTION_TABLE: props?.connectionsTable.tableName!,
        WEBSOCKETS_GITHUB_OAUTH_CLIENT_ID: props?.gitHubClientId!,
        WEBSOCKETS_GITHUB_OAUTH_CLIENT_SECRET: props?.gitHubClientSecret!,
        LOG_LEVEL: props?.logLevel!
      },
      handler: "handler", // Name matches const in function.ts
      runtime: Runtime.NODEJS_16_X,
      tracing: Tracing.ACTIVE
    }

    const functionsPath = '../../services/WebSockets/src/functions';

    const authorizerHandler = new lambda.Function(this, 'AuthorizerHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      memorySize: 1024,
      timeout: Duration.seconds(5),
      handler: 'function.main',
      code: lambda.Code.fromAsset(join(__dirname, `${functionsPath}/connect/function.ts`)),
      environment: {
        REGION: Stack.of(this).region,
        AVAILABILITY_ZONES: JSON.stringify(
          Stack.of(this).availabilityZones,
        ),
      },
    });

    // const authorizerHandler = new NodejsFunction(this, "AuthorizerHandler", {
    //   entry: join(__dirname, `${functionsPath}/auth/function.ts`),
    //   ...nodeJsFunctionProps
    // });

    const onConnectHandler = new NodejsFunction(this, "OnConnectHandler", {
      entry: join(__dirname, `${functionsPath}/connect/function.ts`),
      ...nodeJsFunctionProps
    });
    props?.connectionsTable.grantReadWriteData(onConnectHandler);

    const onDisconnectHandler = new NodejsFunction(this, "OnDisconnectHandler", {
      entry: join(__dirname, `${functionsPath}/disconnect/function.ts`),
      ...nodeJsFunctionProps
    });
    props?.connectionsTable.grantReadWriteData(onDisconnectHandler);

    const onMessageHandler = new NodejsFunction(this, "OnMessageHandler", {
      entry: join(__dirname, `${functionsPath}/default/function.ts`),
      ...nodeJsFunctionProps
    });
    props?.connectionsTable.grantReadWriteData(onMessageHandler);


    const authorizer = new WebSocketLambdaAuthorizer('Authorizer', authorizerHandler, { identitySource: ['route.request.header.Cookie'] });
    this.webSocketApi = new WebSocketApi(this, 'ServerlessChatWebsocketApi', {
      apiName: 'Serverless Chat Websocket API',
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
