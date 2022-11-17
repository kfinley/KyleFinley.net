#!/usr/bin/env node
import 'source-map-support/register';
// const { config } = require('dotenv');
import 'dotenv/config'
import * as cdk from 'aws-cdk-lib';
import { WebSocketsStack, DatabaseStack, InfrastructureStack } from '../lib';
import { Aspects } from 'aws-cdk-lib';
// import { AwsSolutionsChecks } from 'cdk-nag';

// config();

const LOG_LEVEL: "DEBUG" | "INFO" | "WARN" | "ERROR" = "ERROR";

const app = new cdk.App();

// CDK-NAG security checks
//Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }))

const databaseStack = new DatabaseStack(app, 'KyleFinleyNet-DatabaseStack', {} );

const webSocketsStack = new WebSocketsStack(app, 'KyleFinleyNet-WebSocketsStack', {
  logLevel: LOG_LEVEL,
  connectionsTable: databaseStack.connectionsTable,
  gitHubClientId: process.env.WEBSOCKETS_GITHUB_OAUTH_CLIENT_ID,
  gitHubClientSecret: process.env.WEBSOCKETS_GITHUB_OAUTH_CLIENT_SECRET
});

webSocketsStack.addDependency(databaseStack);

const infraStack = new InfrastructureStack(app, `KyleFinleyNet-Infrastructure`, {
  env: {
    account: process.env.AWS_ACCOUNT,
    region: process.env.AWS_REGION
  },
});

infraStack.addDependency(databaseStack);
infraStack.addDependency(webSocketsStack);
