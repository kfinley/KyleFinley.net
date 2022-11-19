import { Container } from 'inversify-props';
import { ApiClient, apiClient } from '@kylefinley.net/api-client/src';
import { GetUserCommand } from './getUser';

export default function bootstrapper(container: Container) {

  console.log('github-commands bootstrapper');

  container.bindTo<ApiClient>(apiClient, "ApiClient");
  container.bindTo<GetUserCommand>(GetUserCommand, "GetUserCommand");

  console.log('github-commands bootstrapper done')
}
