import { Inject, injectable } from 'inversify-props';
import { PublishCommand, SNSClient, } from "@aws-sdk/client-sns";
import { Command } from '@kylefinley.net/commands/src';

export interface PublishMessageRequest {
  subject?: string,
  message?: string,
  topic: string
}

export interface PublishMessageResponse { }

@injectable()
export class PublishMessageCommand implements Command<PublishMessageRequest, PublishMessageResponse> {

  @Inject("SNSClient")
  private snsClient!: SNSClient;

  async runAsync(params: PublishMessageRequest): Promise<any> {

    var sendParams = {
      Subject: params.subject,
      Message: params.message,
      TopicArn: `arn:aws:sns:us-east-1:101010101010:${params.topic}` //TODO: Fix this...
    };

    const command = new PublishCommand(sendParams);
    var result = await this.snsClient.send(command);

    console.log(`Published TopicArn/MessageId: ${sendParams.TopicArn}/${result.MessageId}`);
  }
}
