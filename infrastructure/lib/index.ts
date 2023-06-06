import { Stack, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { join } from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export * from './data-stores';
export * from './infrastructure-stack';
export * from './websockets-api';

export const createLambdaEdge = (c: Construct, name: string, functionsPath: string, handler: string) => {

  return new lambda.Function(c, name, {
    runtime: lambda.Runtime.NODEJS_16_X,
    memorySize: 1024,
    timeout: Duration.seconds(5),
    functionName: `KyleFinleyNet-${name}`,
    handler,
    code: new lambda.AssetCode(join(__dirname, `${functionsPath}`))
  });
};

export const createLambda = (c: Construct, name: string, functionsPath: string, handler: string, env?: {
  [key: string]: string;
} | undefined, node_env?: string | undefined) => {

  return new lambda.Function(c, name, {
    runtime: lambda.Runtime.NODEJS_16_X,
    memorySize: 1024,
    timeout: Duration.seconds(5),
    functionName: `KyleFinleyNet-${name}`,
    handler,
    code: new lambda.AssetCode(join(__dirname, `${functionsPath}`)),
    environment: {
      REGION: Stack.of(c).region,
      AVAILABILITY_ZONES: JSON.stringify(
        Stack.of(c).availabilityZones,
      ),
      NODE_ENV: node_env ?? '',
      ...env
    },
  });
};

export const createNodejsFunction = (c: Construct, name: string, functionsPath: string, handler: string, env?: {
  [key: string]: string;
} | undefined, node_env?: string | undefined) => {
  return new NodejsFunction(c, name, {
    runtime: lambda.Runtime.NODEJS_16_X,
    entry: join(__dirname, `${functionsPath}`),
    handler,
    environment: {
      NODE_ENV: node_env ?? '',
      ...env
    }
  });
};
