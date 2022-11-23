import { ApiClient, ApiResponse } from '@kylefinley.net/api-client/src';
import { container } from './bootstrapper';

export default abstract class GitHubCommand {

  protected apiClient!: ApiClient;

  constructor() {
    console.log('GitHubCommand', container);
    this.apiClient = container.get<ApiClient>("ApiClient");
  }

  protected api(path: string) {
    return new URL(path, 'https://api.github.com');
  }

  protected async postAsync<T>(pathOrUrl: string | URL): Promise<ApiResponse<T>> {

    console.log(typeof(pathOrUrl));

    if (((pathOrUrl as URL).host)) {
      console.log('posting URL')
      return await this.apiClient.postAsync(pathOrUrl)
    }

    const api = this.api(pathOrUrl as string);
    console.log('posting string')
    return await this.apiClient.postAsync(api, {});
  }

  protected async getAsync<T>(pathOrUrl: string | URL): Promise<ApiResponse<T>> {

    return await this.apiClient.getAsync(pathOrUrl.toString());
  }

}
