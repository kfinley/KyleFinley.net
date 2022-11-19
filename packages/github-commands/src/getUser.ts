import { Container, Inject, injectable } from 'inversify-props';
import { Command } from '@kylefinley.net/commands/src';
import { ApiClient } from '@kylefinley.net/api-client/src';
import { GitHubUser } from './types';

export interface GetUserRequest {
  access_token: string;
  container: Container;
}

export interface GetUserResponse {
  name: string;
  email: string;
}

@injectable()
export class GetUserCommand implements Command<GetUserRequest, GetUserResponse> {

  // @Inject('ApiClient')
  private apiClient!: ApiClient;

  async runAsync(params: GetUserRequest): Promise<GetUserResponse> {

    this.apiClient = params.container.get<ApiClient>("ApiClient");
    const api = new URL('/user', 'https://api.github.com');

    const { data } = await this.apiClient.getAsync<GitHubUser>(api.toString(), {
      Authorization: `Bearer ${params.access_token}`
    });

    return {
      name: data.name,
      email: data.email
    }
  }
}
