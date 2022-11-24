import { DynamoDBClient, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { Command } from '@kylefinley.net/commands/src';
import { Inject, injectable } from 'inversify-props';
import { GetConnectionByUserIdCommand } from './';
import { DeleteConnectionRequest, DeleteConnectionResponse } from '../models';
import { container } from '../inversify.config';

const CONNECTION_TABLE = process.env.WEBSOCKETS_CONNECTION_TABLE as string;

@injectable()
export class DeleteConnectionByUserIdCommand implements Command<DeleteConnectionRequest, DeleteConnectionResponse> {

  // @Inject("DynamoDBClient")
  private ddbClient!: DynamoDBClient;

  // @Inject("GetConnectionByUserIdCommand")
  private getConnectionByUserId!: GetConnectionByUserIdCommand;

  async runAsync(params: DeleteConnectionRequest): Promise<DeleteConnectionResponse> {

    this.ddbClient = container.get<DynamoDBClient>("DynamoDBClient");
    this.getConnectionByUserId = container.get<GetConnectionByUserIdCommand>("GetConnectionByUserIdCommand");

    console.log('ddbClient', this.ddbClient);
    console.log('ddbClient.endpoint', (await this.ddbClient.config.endpoint()).hostname);

    console.log('DeleteConnectionByUserId', params);
    console.log('CONNECTION_TABLE', CONNECTION_TABLE);

    let { userId } = params;

    if (userId) {
      const existingConnection = await this.getConnectionByUserId.runAsync({
        userId
      });

      if (existingConnection.connectionId) {
        var response = await this.ddbClient.send(new DeleteItemCommand({
          TableName: CONNECTION_TABLE,
          Key: {
            userId: {
              S: userId
            },
            connectionId: {
              S: existingConnection.connectionId
            }
          }
        }));
        console.log('response', response);
        if (response.$metadata.httpStatusCode !== 200) {
          throw new Error("Unexpected response in DeleteConnection");
        }
        console.log('deleted websocket connection');
      }
    }
    return {
      success: true
    };
  }
}
