import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
} from 'aws-lambda';
import bootstrapper from '../bootstrapper';
import { SaveConnectionCommand } from '../commands';
import { createResponse } from '../createResponse';
import { PublishMessageCommand } from '@kylefinley.net/aws-commands/src';

const container = bootstrapper();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context, callback) => {

  try {

    console.log('connect');

    let { authorizer } = event.requestContext

    console.log(`Authorizer: ${JSON.stringify(authorizer)}`);

    console.log('event', event),
    console.log('context', context);

    if (authorizer === null || authorizer === undefined) { // || authorizer.policyDocument === undefined
      return createResponse(event, 401, 'Unauthorized');
    }

    if ((authorizer !== null || authorizer === undefined)) { // && authorizer.policyDocument.Statement[0].Effect == "Allow"

      await container.get<SaveConnectionCommand>("SaveConnectionCommand").runAsync({
        userId: authorizer.principalId,
        connectionId: event.requestContext.connectionId as string
      });

      //TODO: Test to see if we can send this in authorizeConnection instead of here...
      await container.get<PublishMessageCommand>("PublishMessageCommand").runAsync({
        topic: 'KyleFinleyNet-AuthProcessedTopic',  // SNS Topic
        subject: 'Auth/token',        // {Store_Module}/{actionName} on client if message sent to client
        message: JSON.stringify({     // params sent to store action
          userId: authorizer.principalId,
          access_token: authorizer.access_token
        }),
        container
      });

      // If we didn't want to send the access token through SNS and step functions (logs) then we could
      // send it back in process (cons: failures).
      // container.get<SendMessageCommand>("SendMessageCommand").runAsync({
      //   connectionId: event.requestContext.connectionId as string,
      //   data: JSON.stringify({
      //     subject: 'Auth/token', // {Store_Module}/{actionName}
      //     message: JSON.stringify({ // params sent to store action
      //       userId: authorizer.principalId,
      //       access_token: authorizer.access_token
      //     })
      //   })
      // });

      return createResponse(event, 200, 'Success');
    }
    return createResponse(event, 401, 'Unauthorized');

  } catch (error) {
    console.log(error);
    return createResponse(event, 500, error as string);
  }
};
