import { ApiGatewayManagementApi, ApiGatewayManagementApiClient } from '@aws-sdk/client-apigatewaymanagementapi';
import { PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { Command } from '@kylefinley.net/commands/src';
import { Inject, injectable } from 'inversify-props';
import { container } from '../inversify.config';

export interface SendMessageRequest {
  connectionId: string;
  data: string | undefined;
}

export interface SendMessageResponse {
  statusCode?: number
}


@injectable()
export class SendMessageCommand implements Command<SendMessageRequest, SendMessageResponse> {

  // @Inject("ApiGatewayManagementApiClient")
  private client!: ApiGatewayManagementApiClient;

  async runAsync(params: SendMessageRequest): Promise<SendMessageResponse> {

    // const apigatewayManagementApi = new ApiGatewayManagementApi({
    //   apiVersion: '2018-11-29',
    //   endpoint: '6ii0i7gdbe.execute-api.us-east-1.amazonaws.com/v1'
    // });

    // try {
    //   await apigatewayManagementApi.postToConnection({
    //     ConnectionId: params.connectionId,
    //     Data: Buffer.from(params.data, 'base64'),
    //   });
    // }
    // catch (error) {
    //   console.log(error)
    // }

    console.log('connectionId', params.connectionId);
    console.log('data', params.data);

    // const apigatewaymanagementapi = new ApiGatewayManagementApi({ apiVersion: '2018-11-29', endpoint: `https://${APIGW_ENDPOINT}` });

    // let output = {};

    // await apigatewaymanagementapi.postToConnection({ ConnectionId: params.connectionId, Data: Buffer.from(params.data, 'base64') })
    //   .then(out => {
    //     output = {
    //       statusCode: out.$metadata.httpStatusCode
    //     };
    //   })
    //   .catch(error => {
    //     console.log('Error posting to connection', error);
    //   });

    // .then(() => {
    //   // this.metrics.addMetric('messageDelivered', MetricUnits.Count, 1);
    //   // this.logger.debug(`Message sent to connection ${connectionData.connectionId}`);
    // })
    // .catch((err: any) => {
    //   this.logger.debug(`Error during message delivery: ${JSON.stringify(err)}`);
    //   if (err.statusCode === 410) {
    //     this.logger.debug(`Found stale connection, deleting ${connectionData.connectionId}`);
    //     this.dynamoDbClient.delete({ TableName: this.connectionsTableName, Key: { connectionData } });
    //   }
    // });

    this.client = container.get<ApiGatewayManagementApiClient>("ApiGatewayManagementApiClient");
    // this.client.config.endpoint = `https://${APIGW_ENDPOINT}`;

    console.log('sendMessage', params.data);

    const output = await this.client.send(new PostToConnectionCommand({
      ConnectionId: params.connectionId,
      Data: params.data as any
    }));

    return {
      statusCode: output.$metadata.httpStatusCode
    };
    
    // return output;

  }
}
