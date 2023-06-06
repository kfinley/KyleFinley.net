import * as cdk from 'aws-cdk-lib';

export const createAdditionalBehaviorsForRedirects = (origin: cdk.aws_cloudfront_origins.S3Origin, edgeLambdas: {
  eventType: cdk.aws_cloudfront.LambdaEdgeEventType;
  functionVersion: cdk.aws_lambda.Version;
}[]) => {
  return {
    '/archive/2009/10/15/1339.aspx': {
      origin,
      edgeLambdas
    },
    '/sheets-to-tweets': {
      origin,
      edgeLambdas
    },
  }
};
