import 'reflect-metadata';
import { Container } from 'inversify-props';
import { container } from './inversify.config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ApiGatewayManagementApiClient } from '@aws-sdk/client-apigatewaymanagementapi';
import { bootstrapper as awsCommandsBootstrapper } from '@kylefinley.net/aws-commands/src';
import { AuthorizeConnectionCommand, DeleteConnectionByUserIdCommand, DeleteConnectionCommand, GetConnectionByUserIdCommand, SaveConnectionCommand, SendMessageCommand } from './commands';
import { IMessageCommand } from './commands/messageCommand';
import { AuthorizeCommand } from '@kylefinley.net/github-commands/src';
import { PingMessageCommand } from './commands/pingMessage';
import { bootstrapper as ghCommandsBootstrapper } from "@kylefinley.net/github-commands/src";


export default function bootstrapper() {

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

  container.bindTo<AuthorizeCommand>(Symbol.for("AuthorizeCommand"));
  container.bindTo<AuthorizeConnectionCommand>(Symbol.for("AuthorizeConnectionCommand"));
  container.bindTo<DeleteConnectionCommand>(Symbol.for("DeleteConnectionCommand"));
  container.bindTo<DeleteConnectionByUserIdCommand>(Symbol.for("DeleteConnectionByUserIdCommand"));
  container.bindTo<GetConnectionByUserIdCommand>(Symbol.for("GetConnectionByUserIdCommand"));
  container.bindTo<SendMessageCommand>(Symbol.for("SendMessageCommand"));
  container.bindTo<SaveConnectionCommand>(Symbol.for("SaveConnectionCommand"));

  container.bindTo<IMessageCommand>(Symbol.for("PingMessageCommand"));

  return container;
}

