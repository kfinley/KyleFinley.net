#!/usr/bin/env node
import 'dotenv/config'
import * as cdk from 'aws-cdk-lib';
import { InfrastructureStack } from '../lib';
// import { Aspects } from 'aws-cdk-lib';
// import { AwsSolutionsChecks } from 'cdk-nag';

const LOG_LEVEL: "DEBUG" | "INFO" | "WARN" | "ERROR" = "ERROR";

const app = new cdk.App();

// CDK-NAG security checks
//Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }))

const infraStack = new InfrastructureStack(app, `KyleFinleyNet-Infrastructure`, {
  logLevel: LOG_LEVEL,
  gitHubClientId: process.env.WEBSOCKETS_GITHUB_OAUTH_CLIENT_ID as string,
  gitHubClientSecret: process.env.WEBSOCKETS_GITHUB_OAUTH_CLIENT_SECRET as string,
  node_env: process.env.NODE_ENV as string,
  env: {
    account: process.env.AWS_ACCOUNT,
    region: process.env.AWS_REGION,
  },
});
