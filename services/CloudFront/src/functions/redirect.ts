import { Handler } from 'aws-lambda';

const createResponse = (newPath: string, pathAndQuery: Array<string>) => {

  const newPathAndQuery = newPath + (pathAndQuery.length === 1 ? '' : `?${pathAndQuery[1]}`)
  return {
    status: '301',
    statusDescription: 'Moved Permanently',
    headers: {
      location: [{
        key: 'Location',
        value: `https://kylefinley.net/${newPathAndQuery}`,
      }],
    },
  };

}
export const handler: Handler = async (event) => {

  const request = event.Records[0].cf.request;
  const pathAndQuery = request.uri.split('?');

  switch (pathAndQuery[0]) {
    case '/sheets-to-tweets':
      return createResponse('schedule-tweets-with-images-from-google-sheets', pathAndQuery);
    case '/archive/2009/10/15/1339.aspx':
      return createResponse('typemerger', pathAndQuery);

  };
  return request;
};

