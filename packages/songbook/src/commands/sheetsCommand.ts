import { ApiClient, ApiResponse } from '@kylefinley.net/api-client/src';
import { container } from '../';

export default abstract class SheetsCommand {

  protected apiClient = ()  => {
    return container.get<ApiClient>("ApiClient");
  }

  protected api(id: string, sheet: string, range?: string) {

    const key = 'AIzaSyC3Zd9-LCS6YWSkvA8mfpc-bo03o8UsHzA'; //TODO: process.env.SHEETS_API_KEY as string;

    let rangeSlug = '';

    if (range != null) {
      rangeSlug = `!${range}`
    }

    return new URL(`/v4/spreadsheets/${id}/values/${sheet}${rangeSlug}?key=${key}`, `https://sheets.googleapis.com`);
  }

  protected async postAsync<T>(id: string, sheet: string, headers?: Record<string, unknown>): Promise<ApiResponse<T>> {

    const api = this.api(id, sheet);
    return await this.apiClient().postAsync(api, {}, headers);
  }

  protected async getAsync<T>(id: string, sheet: string, range?: string, headers?: Record<string, unknown>): Promise<ApiResponse<T>> {

    const api = this.api(id, sheet, range);

    return await this.apiClient().getAsync(api.toString(), headers);
  }

}
