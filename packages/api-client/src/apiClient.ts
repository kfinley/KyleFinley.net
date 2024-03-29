import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import { addUrlParam, authHelper, } from './helpers';
import { injectable } from 'inversify-props';
import { ApiResponse } from './types';

export interface ApiClient {
  getAsync<T>(url: string, headers?: Record<string, unknown>): Promise<ApiResponse<T>>;
  getWithAsync<T>(url: string, params: any): Promise<ApiResponse<T>>;
  postAsync<T>(url: URL | string, data?: unknown, headers?: Record<string, unknown>): Promise<ApiResponse<T>>;
}

const protocol = `${process.env.NODE_ENV === 'production' ? 'https://' : 'http://'}`;

@injectable()
export class apiClient implements ApiClient {

  public async requestAsync<T>(cfg: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const requestConfig = {
      ...cfg,
      responseType: 'json',
    } as AxiosRequestConfig;

    try {
      const configHeaders = {
        'content-type': 'application/json',
        Accept: 'application/json',
      };

      (requestConfig.headers as any) = {
        ...configHeaders,
        ...cfg.headers,
        ...authHelper.authHeader(),
      };

      // console.log(`api.request: ${cfg.method} ${cfg.url}`, requestConfig.headers);
    } catch (e) {
      const err = { message: 'Error creating request header', error: e };
      console.log(err.message);
      throw err;
    }

    try {

      // console.log('axios', axios);

      const instance = axios.create();

      // console.log('axios instance', instance);

      const response = await instance.request<T>(requestConfig);

      // console.log('response', response);

      return response;

    } catch (e: any) {
      if (e.response) {
        // (5xx, 4xx)
        if (e.response.status === 401) {
          console.log('Unauthorized! Refresh token...');
          throw new Error('Refresh');
        }
        console.log(`Error in api.request: ${JSON.stringify(e)}`);
        throw e;
      } else if (e.request) {
        // no response | never sent
        console.log(`Error in api.request: ${JSON.stringify(e)}`);
        throw e;
      } else {
        console.log(`Unhandled Error in api.request: ${JSON.stringify(e)}`);
        throw e;
      }
    }
  }

  public async postAsync<T>(url: string | URL, data?: unknown, headers?: AxiosRequestHeaders): Promise<ApiResponse<T>> {

    //console.log('url', url);
    let uri: string;

    if (((url as URL).host))
      uri = url.toString();
    else
      uri = url as string;

    // const uri = url === typeof(URL) ? url.toString() : url as string;

    //console.log('uri', uri);

    return this.requestAsync<T>({
      url: uri.indexOf('https') > -1 ? uri : `${protocol}${uri}`,
      data,
      headers,
      method: 'POST',
    });
  }

  public async getAsync<T>(url: string, headers?: AxiosRequestHeaders): Promise<ApiResponse<T>> {
    return this.requestAsync<T>({
      url: url.indexOf('https') > -1 ? url : `${protocol}${url}`,
      headers,
      method: 'GET',
    });
  }

  //TODO: rework
  public async getWithAsync<T>(url: string, params: any): Promise<ApiResponse<T>> {
    Object.entries(params).forEach(
      ([key, value]) => url = addUrlParam(url, key, value)
    );
    // console.log(url);
    return this.requestAsync<T>({
      url: `${protocol}${url}`,
      method: 'GET',
    });
  }

}
