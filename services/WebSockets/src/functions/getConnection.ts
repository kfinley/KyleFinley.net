import { Context, Handler } from 'aws-lambda';
import bootstrapper from './../bootstrapper';
import { GetConnectionByUserIdCommand } from '../commands';

const container = bootstrapper();

export const handler: Handler = async (event: any, context: Context) => {

  const getConnectionCmd = () => container.get<GetConnectionByUserIdCommand>("GetConnectionByUserIdCommand");

  // console.log(`getConnection`, event);

  const { userId } = JSON.parse(event.message);

  const response = await getConnectionCmd().runAsync({
    userId
  });

  if (response && response.success) {
    return {
      ...event,
      connectionId: response.connectionId
    };
  } return event;
};
