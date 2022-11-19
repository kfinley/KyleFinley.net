import 'reflect-metadata';
import { Container } from 'inversify-props';
import { ApiClient, apiClient } from '@kylefinley.net/api-client/src';
import { GetUserCommand } from './getUser';

export default function bootstrapper(container: Container) {

  console.log('github-commands bootstrapper');

  addTransientIfNeeded<ApiClient>(apiClient, 'ApiClient', container);
  addTransientIfNeeded<GetUserCommand>(GetUserCommand, "GetUserCommand", container);

}

function addTransientIfNeeded<T>(constructor: any, id: string, container: Container) {
  if (!container.isBound(id)) {
    container.bindTo<T>(constructor, id);
    // container.addTransient<T>(constructor, id);
  }
}
