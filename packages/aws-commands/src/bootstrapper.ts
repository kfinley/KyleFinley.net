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

  if (!container.isBound("SNSClient")) {
    container.bind<SNSClient>("SNSClient")
      .toDynamicValue(() => new SNSClient({
        region: "us-east-1",
        endpoint: "http://localhost:4002" //TODO: Deal with this
      }));
  }

  if (!container.isBound("SFNClient")) {
    container.bind<SFNClient>("SFNClient")
      .toDynamicValue(() => new SFNClient({
        endpoint: "http://kylefinley.sfn:8083" //TODO: Deal with this
      }));
  }

  if (!container.isBound("S3Client")) {
    container.bind<S3Client>("S3Client")
      .toDynamicValue(() => new S3Client({
        region: "us-east-1",
        endpoint: "http://localhost:4569", //TODO: Deal with this
        forcePathStyle: true,
        credentials: { //TODO: Deal with this
          accessKeyId: 'S3RVER',
          secretAccessKey: 'S3RVER',
        }
      }));
  }

  addTransientIfNeeded<GetStoredObjectCommand>(GetStoredObjectCommand, "GetStoredObjectCommand", container);
  addTransientIfNeeded<PublishMessageCommand>(PublishMessageCommand, "PublishMessageCommand", container);
  addTransientIfNeeded<StartStepFunctionCommand>(StartStepFunctionCommand, "StartStepFunctionCommand", container);
}

function addTransientIfNeeded<T>(constructor: any, id: string, container: Container) {
  if (!container.isBound(id)) {
    container.bindTo<T>(constructor, id);
    // container.addTransient<T>(constructor, id);
  }
}

