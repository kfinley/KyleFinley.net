import * as cdk from 'aws-cdk-lib';

export const createAdditionalBehaviorsForRedirects = (redirect: {
  origin: cdk.aws_cloudfront_origins.S3Origin, edgeLambdas: {
    eventType: cdk.aws_cloudfront.LambdaEdgeEventType;
    functionVersion: cdk.aws_lambda.Version;
  }[]
}) => {
  return {
    '/archive/2009/10/15/1339.aspx': redirect,
    '/sheets-to-tweets': redirect,
    '/sheets-to-tweets-schedule-tweets-with-images': redirect,
    '/archive/2006/06/20/173.aspx': redirect,
    '/archive/2005/09/29/16.aspx': redirect,
    '/photographs-of-boston-statues-in-the-snow': redirect
  }
};
