import { Context, Handler } from 'aws-lambda';
import bootstrapper from './../bootstrapper';
import { SendMessageCommand } from '../commands';

export const handler: Handler = async (event: any, context: Context) => {

  const container = bootstrapper();

  const sendMessageCmd = () => container.get<SendMessageCommand>("SendMessageCommand");

  const { connectionId, subject, message } = event;

  const response = await sendMessageCmd().runAsync({
    connectionId,
    data: JSON.stringify({
      subject,
      message: JSON.parse(message) // message is a string at this point. parse so it's sent as an object
    })
  });

  return {
    statusCode: response.statusCode
  };
};
