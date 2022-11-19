// import { Container } from 'inversify-props';
import { container } from './inversify.config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ApiGatewayManagementApiClient } from '@aws-sdk/client-apigatewaymanagementapi';
import { bootstrapper as awsCommandsBootstrapper } from '@kylefinley.net/aws-commands/src';
import { AuthorizeConnectionCommand, DeleteConnectionByUserIdCommand, DeleteConnectionCommand, GetConnectionByUserIdCommand, SaveConnectionCommand, SendMessageCommand } from './commands';
import { IMessageCommand } from './commands/messageCommand';
import { AuthorizeCommand } from '@kylefinley.net/github-commands/src';
// import { PingMessageCommand } from './commands/pingMessage';
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

  container.bind<AuthorizeCommand>("AuthorizeCommand");
  container.bind<AuthorizeConnectionCommand>("AuthorizeConnectionCommand");
  container.bind<DeleteConnectionCommand>("DeleteConnectionCommand");
  container.bind<DeleteConnectionByUserIdCommand>("DeleteConnectionByUserIdCommand");
  container.bind<GetConnectionByUserIdCommand>("GetConnectionByUserIdCommand");
  container.bind<SendMessageCommand>("SendMessageCommand");
  container.bind<SaveConnectionCommand>("SaveConnectionCommand");

  container.bind<IMessageCommand>("PingMessageCommand"); // ????

  console.log("Bootstrapper Done");

  return container;
}

