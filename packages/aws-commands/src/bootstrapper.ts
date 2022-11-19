import { S3Client } from '@aws-sdk/client-s3';
import { SNSClient, } from "@aws-sdk/client-sns";
import { SFNClient } from "@aws-sdk/client-sfn";
import { Container } from 'inversify-props';
import {
  PublishMessageCommand,
  StartStepFunctionCommand,
  GetStoredObjectCommand
} from "./index";

export default function bootstrapper(container: Container) {

  console.log('aws-commands bootstrapper');

  if (!container.isBound("SNSClient")) {
    container.bind<SNSClient>("SNSClient")
      .toDynamicValue(() => process.env.NODE_ENV === 'production'
        ?
        new SNSClient({}) // Prod
        :
        new SNSClient({ // Local Dev
          region: "us-east-1",
          endpoint: "http://localhost:4002"
        }));
  }

  if (!container.isBound("SFNClient")) {
    container.bind<SFNClient>("SFNClient")
      .toDynamicValue(() => process.env.NODE_ENV === 'production'
        ?
        new SFNClient({}) // Prod
        :
        new SFNClient({ // Local Dev
          endpoint: "http://kylefinley.sfn:8083"
        }));
  }

  if (!container.isBound("S3Client")) {
    container.bind<S3Client>("S3Client")
      .toDynamicValue(() => process.env.NODE_ENV === 'production'
        ?
        new S3Client({}) // Prod
        :
        new S3Client({ // Local Dev
          region: "us-east-1",
          endpoint: "http://localhost:4569",
          forcePathStyle: true,
          credentials: {
            accessKeyId: 'S3RVER',
            secretAccessKey: 'S3RVER',
          }
        }));
  }

  container.bind<GetStoredObjectCommand>("GetStoredObjectCommand"); //.to(GetStoredObjectCommand);
  container.bind<PublishMessageCommand>("PublishMessageCommand"); //.to(PublishMessageCommand);
  container.bind<StartStepFunctionCommand>("StartStepFunctionCommand"); //.to(StartStepFunctionCommand);

  console.log('aws-commands bootstrapper done');

}
