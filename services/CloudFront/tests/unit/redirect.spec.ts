import { handler as redirect } from '../../src/functions/redirect';

interface Request {
  Records: Array<{
    cf: {
      request: {
        uri: string;
      };
    };
  }>;
}

interface Response {
  status: number;
  statusDescription: string;
  headers: {
    location: [{
      key: string;
      value: string;
    }];
  };
}

const context = {
  awsRequestId: 'ckshohv7y00040kp6fhg28r7h',
  callbackWaitsForEmptyEventLoop: true,
  clientContext: undefined,
  functionName: 'redirect',
  functionVersion: '$LATEST',
  identity: undefined,
  invokedFunctionArn: 'offline_invokedFunctionArn_for_redirect',
  logGroupName: 'offline_logGroupName_for_redirect',
  logStreamName: 'offline_logStreamName_for_redirect',
  memoryLimitInMB: '1024',
  getRemainingTimeInMillis: () => { return 100 },
  done: () => { },
  fail: () => { },
  succeed: () => { }
};

const createRequest = (uri): Request => {
  return {
    Records: [
      {
        cf: {
          request: {
            uri,
          },
        },
      },
    ],
  };
};

describe('Lambda@Edge Redirect', () => {

  it('should 301 /sheets-to-tweets to schedule-tweets-with-images-from-google-sheets', async () => {

    const result = await redirect(createRequest('/sheets-to-tweets'), context, () => { });

    expect(result).toEqual({
      status: '301',
      statusDescription: 'Moved Permanently',
      headers: {
        location: [{
          key: 'Location',
          value: 'https://kylefinley.net/schedule-tweets-with-images-from-google-sheets',
        }],
      },
    });
  });

  it('should 301 /archive/2009/10/15/1339.aspx to /typemerger', async () => {

    const result = await redirect(createRequest('/archive/2009/10/15/1339.aspx'), context, () => { });

    expect(result).toEqual({
      status: '301',
      statusDescription: 'Moved Permanently',
      headers: {
        location: [{
          key: 'Location',
          value: 'https://kylefinley.net/typemerger',
        }],
      },
    });
  });
});
