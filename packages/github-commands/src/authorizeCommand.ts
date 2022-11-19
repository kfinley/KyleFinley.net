import { Inject, injectable } from 'inversify-props';
import { Command } from '@kylefinley.net/commands/src';
import { ApiClient } from '@kylefinley.net/api-client/src';
import { GetUserCommand } from './getUser';
import { container } from 'inversify-props';

export interface AuthorizeRequest {
  oauth: {
    clientId: string | undefined,
    clientSecret: string | undefined
  },
  code?: string;
}

export interface GitHubAuthData {
  access_token: string,
  token_type: string,
  scope: string
}

export interface AuthorizeResponse {
  username?: string;
  attributes?: Record<string, string>;
  data?: GitHubAuthData | unknown;
  authorized: boolean;
}

@injectable()
export class AuthorizeCommand implements Command<AuthorizeRequest, AuthorizeResponse> {

  // @Inject("ApiClient")
  private apiClient!: ApiClient;

  // @Inject("GetUserCommand")
  private getUserCommand!: GetUserCommand;

  async runAsync(params: AuthorizeRequest): Promise<AuthorizeResponse> {

    console.log('AuthorizeCommand');
    console.log(`code: ${params.code}`);

    this.apiClient = container.get<ApiClient>("ApiClient");
    this.getUserCommand = container.get<GetUserCommand>("GetUserCommand");
    console.log(this.apiClient);
    console.log(this.getUserCommand);


    const api = new URL('/login/oauth/access_token', 'https://github.com')

    api.searchParams.set('client_id', params.oauth.clientId as string)
    api.searchParams.set('client_secret', params.oauth.clientSecret as string)
    api.searchParams.set('code', params.code as string)

    // console.log(api.toString());

    var response = await this.apiClient.postAsync(api.toString(), {})

    let { data } = response;
    let { access_token } = <GitHubAuthData>data;

    //console.log(data);

    if (access_token) {

      let getUserResult = await this.getUserCommand.runAsync({
        access_token
      });

      return {
        username: getUserResult.email,
        data: <GitHubAuthData>data,
        authorized: true
      }
    }

    return {
      data,
      authorized: false
    };
  }
}
