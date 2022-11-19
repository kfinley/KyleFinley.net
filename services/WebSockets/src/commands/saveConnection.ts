
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { Command } from '@kylefinley.net/commands/src';
import { Inject, injectable } from 'inversify-props';
import { DeleteConnectionByUserIdCommand } from '.';
import { convertRequestToItem } from './helpers';
import { container } from '../inversify.config';

const CONNECTION_TABLE = process.env.WEBSOCKETS_CONNECTION_TABLE as string;

export interface SaveConnectionRequest {
  userId: string;
  connectionId: string;
}

export interface SaveConnectionResponse {
  success: boolean
}

@injectable()
export class SaveConnectionCommand implements Command<SaveConnectionRequest, SaveConnectionResponse> {

  // @Inject("DynamoDBClient")
  private ddbClient!: DynamoDBClient;

  // @Inject("DeleteConnectionByUserIdCommand")
  private deleteConnectionByUserId!: DeleteConnectionByUserIdCommand;

  async runAsync(params: SaveConnectionRequest): Promise<SaveConnectionResponse> {

    this.ddbClient = container.get<DynamoDBClient>("DynamoDBClient");
    this.deleteConnectionByUserId = container.get<DeleteConnectionByUserIdCommand>("DeleteConnectionByUserIdCommand");

    // Delete any existing connection.
    //TODO: rework this to allow multi-device connections
    await this.deleteConnectionByUserId.runAsync({
      userId: params.userId
    });

    const Item = convertRequestToItem(params);

    var response = await this.ddbClient.send(new PutItemCommand({
      TableName: CONNECTION_TABLE,
      Item
    }));

    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error("Unexpected response in SaveConnection");
    }

    return {
      success: true
    }
  }
}
