import 'reflect-metadata';
import { Container } from 'inversify-props';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ApiGatewayManagementApiClient } from '@aws-sdk/client-apigatewaymanagementapi';
import { bootstrapper as awsCommandsBootstrapper } from '@kylefinley.net/aws-commands/src';
import { AuthorizeConnectionCommand, DeleteConnectionByUserIdCommand, DeleteConnectionCommand, GetConnectionByUserIdCommand, SaveConnectionCommand, SendMessageCommand } from './commands';
import { IMessageCommand } from './commands/messageCommand';
import { AuthorizeCommand } from '@kylefinley.net/github-commands/src';
import { PingMessageCommand } from './commands/pingMessage';
import { bootstrapper as ghCommandsBootstrapper } from "@kylefinley.net/github-commands/src";


export default function bootstrapper() {

  const container = new Container({
    autoBindInjectable: true,
    skipBaseClassChecks: true,
  });

  console.log('Bootstrapper');

  awsCommandsBootstrapper(container);

  ghCommandsBootstrapper(container);

  if (!container.isBound("DynamoDBClient")) {
    container.bind<DynamoDBClient>("DynamoDBClient")
      .toDynamicValue(() => new DynamoDBClient({
        endpoint: "http://kylefinley.dynamodb:8000"
      }));
  }

  if (!container.isBound("ApiGatewayManagementApiClient")) {
    container.bind<ApiGatewayManagementApiClient>("ApiGatewayManagementApiClient")
      .toDynamicValue(() => new ApiGatewayManagementApiClient({
        endpoint: "http://kylefinley.sls:3001"
      }));
  }

  addTransientIfNeeded<AuthorizeCommand>(AuthorizeCommand, "AuthorizeCommand", container);
  addTransientIfNeeded<AuthorizeConnectionCommand>(AuthorizeConnectionCommand, "AuthorizeConnectionCommand", container);
  addTransientIfNeeded<DeleteConnectionCommand>(DeleteConnectionCommand, "DeleteConnectionCommand", container);
  addTransientIfNeeded<DeleteConnectionByUserIdCommand>(DeleteConnectionByUserIdCommand, "DeleteConnectionByUserIdCommand", container);
  addTransientIfNeeded<GetConnectionByUserIdCommand>(GetConnectionByUserIdCommand, "GetConnectionByUserIdCommand", container);
  addTransientIfNeeded<SendMessageCommand>(SendMessageCommand, "SendMessageCommand", container);
  addTransientIfNeeded<SaveConnectionCommand>(SaveConnectionCommand, "SaveConnectionCommand", container);

  addTransientIfNeeded<IMessageCommand>(PingMessageCommand, "PingMessageCommand", container);

  return container;
}

function addTransientIfNeeded<T>(constructor: any, id: string, container: Container) {
  if (!container.isBound(id)) {
    container.addTransient<T>(constructor, id);
  }
}

