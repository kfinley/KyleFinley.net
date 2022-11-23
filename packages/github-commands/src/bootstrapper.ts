import { Container } from 'inversify-props';
import { ApiClient, apiClient } from '@kylefinley.net/api-client/src';
import { GetUserCommand, AuthorizeCommand, CreateBranch } from './';

let moduleContainer: Container;

export default function bootstrapper(container: Container) {

  console.log('github-commands bootstrapper');

  moduleContainer = container;
  container.bind<ApiClient>("ApiClient").to(apiClient);
  container.bind<GetUserCommand>("GetUserCommand").to(GetUserCommand);
  container.bind<AuthorizeCommand>("AuthorizeCommand").to(AuthorizeCommand);
  container.bind<CreateBranch>("CreateBranch").to(CreateBranch);

  console.log('github-commands bootstrapper done', moduleContainer)
}

export { moduleContainer as container };
