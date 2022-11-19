import { Command } from '@kylefinley.net/commands/src';
import { AuthorizeCommand, AuthorizeRequest, AuthorizeResponse, GitHubAuthData } from "@kylefinley.net/github-commands/src";
import { Inject, injectable } from 'inversify-props';
import { container } from '../inversify.config';

export interface AuthorizeConnectionRequest {
  resource: string;
  authorization: string | undefined;
  code: string | undefined;
}

export interface AuthorizeConnectionResponse {
  authResponse?: any;
  success: boolean;
}

const generatePolicy = (principalId: any, effect: any, resource: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authResponse: any = {};
  authResponse.principalId = principalId;

  if (effect && resource) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const policyDocument: any = {};
    // default version
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const statement: any = {};
    // default action
    statement.Action = 'execute-api:Invoke';
    statement.Effect = effect;
    statement.Resource = resource;
    policyDocument.Statement[0] = statement;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

const generateAllow = (principalId: string | undefined, resource: string) => generatePolicy(principalId, 'Allow', resource);

const generateDeny = (principalId: string | undefined, resource: string) => generatePolicy(principalId, 'Deny', resource);

const generateAuthResponse = (authResponse: AuthorizeResponse, resource: string | undefined) => {

  if (authResponse && authResponse.username && authResponse.authorized) {
    return generateAllow(authResponse.username, resource == undefined ? '$connect' : resource);
  }
  return generateDeny(authResponse.username, resource == undefined ? '$connect' : resource);

};

@injectable()
export class AuthorizeConnectionCommand implements Command<AuthorizeConnectionRequest, AuthorizeConnectionResponse> {

  // @Inject("AuthorizeCommand")
  private authorizeCommand!: AuthorizeCommand;

  async runAsync(params: AuthorizeConnectionRequest): Promise<AuthorizeConnectionResponse> {

    this.authorizeCommand = container.get<AuthorizeCommand>("AuthorizeCommand");
    console.log(this.authorizeCommand);

    try {
      let authResult,
        authRequest: AuthorizeRequest = {
          oauth: {
            clientId: process.env.WEBSOCKETS_GITHUB_OAUTH_CLIENT_ID,  //TODO: DEAL WITH THIS
            clientSecret: process.env.WEBSOCKETS_GITHUB_OAUTH_CLIENT_SECRET //TODO: DEAL WITH THIS
          },
          code: params.code
        };

      authResult = await this.authorizeCommand.runAsync(authRequest);

      console.log(authResult);

      if (authResult && authResult.data !== undefined) {


        const authResponse = generateAuthResponse(authResult, params.resource ? params.resource : "*");

        // thought about publishing SNS message here but the connection isn't established yet so it should fail.
        // test it later to see..
        authResponse.context = {
          access_token: (<GitHubAuthData>authResult.data).access_token
        };

        console.log(authResponse);

        return {
          authResponse: authResponse,
          success: authResponse.policyDocument.Statement[0].Effect == 'Allow'
        }
      }
      else {
        return {
          success: false
        }
      }
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  }
}
