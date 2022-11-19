import { Container } from 'inversify-props';
import { ApiClient, apiClient } from '@kylefinley.net/api-client/src';
import { GetUserCommand } from './getUser';

export default function bootstrapper(container: Container) {

  console.log('github-commands bootstrapper');

  container.bind<ApiClient>("ApiClient")
  container.bind<GetUserCommand>("GetUserCommand")

  console.log('github-commands bootstrapper done')
}
