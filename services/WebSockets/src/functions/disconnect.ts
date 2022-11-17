import { APIGatewayProxyHandler } from 'aws-lambda';
import { DeleteConnectionCommand } from '../commands';
import { container } from 'inversify-props';
import bootstrapper from '../bootstrapper';
import { createResponse } from '../createResponse';

bootstrapper();

export const handler: APIGatewayProxyHandler = async (event) => {
  try {

    const response = await container.get<DeleteConnectionCommand>('DeleteConnectionCommand').runAsync({
      connectionId: event.requestContext.connectionId
    });

    if (response.success) {
      return createResponse(event, 200, 'Success');
    } else {
      return createResponse(event, 500, 'Failed to delete connection');
    }

  } catch (error) {
    console.log(error);
    return createResponse(event, 500, error as string);
  }
};
