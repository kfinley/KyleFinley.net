import { Command } from '@kylefinley.net/commands/src';
import { Inject } from 'inversify-props';
import { SendMessageCommand } from './sendMessage';

export type PingMessageRequest = {
  connectionId: string,
};

export type PingMessageResponse = {
  success: boolean;
};

export class PingMessageCommand implements Command<PingMessageRequest, PingMessageResponse> {

  @Inject("SendMessageCommand")
  private sendMessageCmd!: SendMessageCommand;

  async runAsync(params: PingMessageRequest): Promise<PingMessageResponse> {

    await this.sendMessageCmd.runAsync({
      connectionId: params.connectionId,
      data: JSON.stringify({
        subject: 'pong'
      })
    });

    return {
      success: true
    };
  };

}
