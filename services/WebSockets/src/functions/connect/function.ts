import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
} from 'aws-lambda';
import 'source-map-support/register';
import { container } from 'inversify-props';
import bootstrapper from '../../bootstrapper';
import { SaveConnectionCommand, SendMessageCommand } from '../../commands';
import { createResponse } from '../../createResponse';

bootstrapper();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context, callback) => {
  try {

    //console.log('connect');

    let { authorizer } = event.requestContext

    //console.log(`authorizer: ${JSON.stringify(authorizer)}`);

    if (authorizer === null || authorizer === undefined) { // || authorizer.policyDocument === undefined
      return createResponse(event, 401, 'Unauthorized');
    }

    if ((authorizer !== null || authorizer === undefined)) { // && authorizer.policyDocument.Statement[0].Effect == "Allow"

      await container.get<SaveConnectionCommand>("SaveConnectionCommand").runAsync({
        userId: authorizer.principalId,
        connectionId: event.requestContext.connectionId as string
      });

      container.get<SendMessageCommand>("SendMessageCommand").runAsync({
        connectionId: event.requestContext.connectionId as string,
        data: JSON.stringify({
          subject: 'Auth/token', // {Store_Module}/{actionName}
          message: JSON.stringify({ // params sent to store action
            access_token: authorizer.access_token
          })
        })
      });

      return createResponse(event, 200, 'Success');
    }
    return createResponse(event, 401, 'Unauthorized');

  } catch (error) {
    console.log(error);
    return createResponse(event, 500, error as string);
  }
};
