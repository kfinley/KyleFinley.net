export function addUrlParam(url: string, param: string, value: any): string {
  let returnUrl = url;
  if (url.indexOf('?') === -1) {
    returnUrl = `${returnUrl}?`;
  } else {
    returnUrl = `${returnUrl}&`;
  }
  returnUrl = `${returnUrl}${param}=${value}`;
  return returnUrl;
}

export const authHelper = {

  authToken: () => '',
  idToken: () => '',
  refreshToken: () => '',
  username: () => '',
  authHeader: () => {
    try {
      const token = authHelper.authToken();
      if (token) {
        return { Authorization: `Bearer ${token}` };
      }
    } catch (e) {
      console.log(`Error generating request auth headers.`, e);
    }
    return {};
  },
  setTokens: (tokens: {
    accessToken?: string,
    expiresIn?: number;
    tokenType?: string;
    refreshToken?: string;
    idToken?: string;
  }) => {
    authHelper.authToken = () => {
      return tokens.accessToken as string;
    }
    authHelper.idToken = () => {
      return tokens.idToken as string;
    }
    authHelper.refreshToken = () => {
      return tokens.refreshToken as string;
    }
  }
};
