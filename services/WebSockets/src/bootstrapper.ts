import { container } from './inversify.config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ApiGatewayManagementApiClient } from '@aws-sdk/client-apigatewaymanagementapi';
import { bootstrapper as awsCommandsBootstrapper } from '@kylefinley.net/aws-commands/src';
import { AuthorizeConnectionCommand, DeleteConnectionByUserIdCommand, DeleteConnectionCommand, GetConnectionByUserIdCommand, SaveConnectionCommand, SendMessageCommand } from './commands';
import { IMessageCommand } from './commands/messageCommand';
import { AuthorizeCommand } from '@kylefinley.net/github-commands/src';
import { bootstrapper as ghCommandsBootstrapper } from "@kylefinley.net/github-commands/src";
import { PingMessageCommand } from './commands/pingMessage';

export default function bootstrapper() {

  console.log('Bootstrapper', process.env.NODE_ENV);

  awsCommandsBootstrapper(container);

  ghCommandsBootstrapper(container);

  if (!container.isBound("DynamoDBClient")) {
    container.bind<DynamoDBClient>("DynamoDBClient")
      .toDynamicValue(() =>
        process.env.NODE_ENV === 'production'
          ?
          new DynamoDBClient({}) // Prod
          :
          new DynamoDBClient({ // Local Dev
            endpoint: "http://kylefinley.dynamodb:8000"
          }));
  }

  if (!container.isBound("ApiGatewayManagementApiClient")) {
    container.bind<ApiGatewayManagementApiClient>("ApiGatewayManagementApiClient")
      .toDynamicValue(() => process.env.NODE_ENV === 'production'
        ?
        new ApiGatewayManagementApiClient({}) // Prod
        :
        new ApiGatewayManagementApiClient({ // Local Dev
          endpoint: "http://kylefinley.sls:3001"
        }));
  }

  container.bind<AuthorizeCommand>("AuthorizeCommand").to(AuthorizeCommand);
  container.bind<AuthorizeConnectionCommand>("AuthorizeConnectionCommand").to(AuthorizeConnectionCommand);
  container.bind<DeleteConnectionCommand>("DeleteConnectionCommand").to(DeleteConnectionCommand);
  container.bind<DeleteConnectionByUserIdCommand>("DeleteConnectionByUserIdCommand").to(DeleteConnectionByUserIdCommand);
  container.bind<GetConnectionByUserIdCommand>("GetConnectionByUserIdCommand").to(GetConnectionByUserIdCommand);
  container.bind<SendMessageCommand>("SendMessageCommand").to(SendMessageCommand);
  container.bind<SaveConnectionCommand>("SaveConnectionCommand").to(SaveConnectionCommand);
  container.bind<IMessageCommand>("PingMessageCommand").to(PingMessageCommand);

  console.log("Bootstrapper Done");

  return container;
}

