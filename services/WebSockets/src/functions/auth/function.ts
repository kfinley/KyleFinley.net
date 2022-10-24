import { APIGatewayProxyHandler } from 'aws-lambda';
import { container } from 'inversify-props';
import { createResponse } from '../../createResponse';
import bootstrapper from '../../bootstrapper';
import { AuthorizeConnectionCommand } from '../../commands';

bootstrapper();

const authConnectionCmd = () => container.get<AuthorizeConnectionCommand>("AuthorizeConnectionCommand");

export const handler: APIGatewayProxyHandler = async (event) => {

  //console.log('auth');

  try {
    const { Authorization } = event.headers;

    //console.log(`Authorization: ${Authorization}`);

    // We're tucking the GitHub auth code in the protocol header b/c it's available...
    const code = event.headers["Sec-WebSocket-Protocol"];

    //console.log(`code: ${code}`);

    const response = await authConnectionCmd().runAsync({
      resource: event.resource,
      authorization: Authorization,
      code
    });

    if (response && response.success) {
      return response.authResponse;
    } else {
      return createResponse(event, 401, 'Unauthorized');
    }
  } catch (error) {
    console.log(error);
    return createResponse(event, 500, error as string);
  }
};
