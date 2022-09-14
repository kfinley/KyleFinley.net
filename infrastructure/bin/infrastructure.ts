#!/usr/bin/env node
import 'source-map-support/register';
const { config } = require('dotenv');
import * as cdk from 'aws-cdk-lib';
import { InfrastructureStack } from '../lib/infrastructure-stack';

config();

const app = new cdk.App();

new InfrastructureStack(app, `KyleFinleyNetInfrastructure`, {
  env: {
    account: process.env.AWS_ACCOUNT,
    region: process.env.AWS_REGION
  },
});
