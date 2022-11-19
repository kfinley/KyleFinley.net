import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
} from 'aws-lambda';
import bootstrapper from '../bootstrapper';
import { createResponse } from '../createResponse';
import { IMessageCommand } from './../commands/messageCommand';

const container = bootstrapper();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context, callback) => {

  try {

    console.log(event);
    console.log(event.body);
    await container
      .get<IMessageCommand>(`${event.body}MessageCommand`)
      .runAsync({
        connectionId: event.requestContext.connectionId as string,
        message: event.body
      });

    return createResponse(event, 200, 'Success');

  } catch (error) {
    console.log(error);
    return createResponse(event, 500, error as string);
  }
}
