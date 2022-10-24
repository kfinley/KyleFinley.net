import { Inject } from 'inversify-props';
import { Command } from '@kylefinley.net/commands/src';
import { ApiClient } from '@kylefinley.net/api-client/src';
import { GitHubUser } from './types';

export interface GetUserRequest {
  access_token: string;
}

export interface GetUserResponse {
  name: string;
  email: string;
}

export class GetUserCommand implements Command<GetUserRequest, GetUserResponse> {

  @Inject('ApiClient')
  private apiClient!: ApiClient;

  async runAsync(params: GetUserRequest): Promise<GetUserResponse> {

    const api = new URL('/user', 'https://api.github.com');

    const { data } = await this.apiClient.getAsync<GitHubUser>(api.toString(), {
      Authorization: `Bearer ${params.access_token}`
    });

    // console.log(data);

    return {
      name: data.name,
      email: data.email
    }

  }

}
