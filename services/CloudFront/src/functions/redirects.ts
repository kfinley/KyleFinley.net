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
  const pathAndQuery = event.Records[0].cf.request.uri.split('?');

  switch (pathAndQuery[0]) {
    case '/sheets-to-tweets':
      return createResponse('schedule-tweets-with-images-from-google-sheets', pathAndQuery);
    case '/archive/2009/10/15/1339.aspx':
      return createResponse('typemerger', pathAndQuery);
    case '/archive/2006/06/20/173.aspx':
      return createResponse('', pathAndQuery);
  };
  return event.Records[0].cf.request;
};

