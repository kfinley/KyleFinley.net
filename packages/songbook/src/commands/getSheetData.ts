import { injectable } from 'inversify-props';
import { Command } from '@kylefinley.net/commands/src';
import SheetsCommand from './sheetsCommand';
import { SheetsData } from '../types';

export interface GetSheetDataRequest {
  id: string;
  sheet: string;
  range?: string;
}

export interface GetSheetDataResponse {
  data: SheetsData;
}

@injectable()
export class GetSheetData
  extends SheetsCommand
  implements Command<GetSheetDataRequest, GetSheetDataResponse> {

  async runAsync(params: GetSheetDataRequest): Promise<GetSheetDataResponse> {

    const result = await this.getAsync(params.id, params.sheet, params.range);

    console.log(JSON.stringify(result.data));

    return { data: result.data as SheetsData };
  }
}

