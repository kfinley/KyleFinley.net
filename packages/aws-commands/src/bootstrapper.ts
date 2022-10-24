import 'reflect-metadata';
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
        endpoint: "http://localhost:4002"
      }));
  }

  if (!container.isBound("SFNClient")) {
    container.bind<SFNClient>("SFNClient")
      .toDynamicValue(() => new SFNClient({
        endpoint: "http://cloud-platform.sfn:8083"
      }));
  }

  if (!container.isBound("S3Client")) {
    container.bind<S3Client>("S3Client")
      .toDynamicValue(() => new S3Client({
        region: "us-east-1",
        endpoint: "http://localhost:4569",
        forcePathStyle: true,
        credentials: {
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
    container.addTransient<T>(constructor, id);
  }
}

