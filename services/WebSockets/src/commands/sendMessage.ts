import { ApiGatewayManagementApiClient } from '@aws-sdk/client-apigatewaymanagementapi';
import { PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { Command } from '@kylefinley.net/commands/src';
import { Inject, injectable } from 'inversify-props';

export interface SendMessageRequest {
  connectionId: string;
  data: string | Uint8Array | undefined;
}

export interface SendMessageResponse {
  statusCode?: number
}

@injectable()
export class SendMessageCommand implements Command<SendMessageRequest, SendMessageResponse> {

  @Inject("ApiGatewayManagementApiClient")
  private client!: ApiGatewayManagementApiClient;

  async runAsync(params: SendMessageRequest): Promise<SendMessageResponse> {

    const output = await this.client.send(new PostToConnectionCommand({
      ConnectionId: params.connectionId,
      Data: params.data as any
    }));

    return {
      statusCode: output.$metadata.httpStatusCode
    }
  }
}
