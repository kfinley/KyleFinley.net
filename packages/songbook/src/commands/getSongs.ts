import { container } from '../';
import { injectable } from 'inversify-props';
import { Command } from '@kylefinley.net/commands/src';
import { Song } from '../types';
import { GetSheetData, GetSheetDataRequest } from './getSheetData';
import { SheetsToSongs } from './sheetsToSongs';

export interface GetSongsRequest {
}

export interface GetSongsResponse {
  songs: Song[];
}

@injectable()
export class GetSongs
  implements Command<GetSongsRequest, GetSongsResponse> {

  static DefaultGetSheetDataRequest: GetSheetDataRequest = { id: '1MvHpVjLTaSGkCZzjmkSxL3nhZBLQOP9SQKYRxu4wWgg', sheet: 'Jazz Standards', range: 'A:B' };

  async runAsync(params: GetSongsRequest): Promise<GetSongsResponse> {

    const getSheetData = container.get<GetSheetData>("GetSheetData");

    const data = (await getSheetData.runAsync(GetSongs.DefaultGetSheetDataRequest)).data;

    const sheetsToSongs = container.get<SheetsToSongs>("SheetsToSongs");

    const songs = (await sheetsToSongs.runAsync({ data })).songs;

    return {
      songs
    };

  }
}

