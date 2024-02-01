import { container } from '../';
import { injectable } from 'inversify-props';
import { Command } from '@kylefinley.net/commands/src';
import { Song } from '../types';
import { GetSheetData, GetSheetDataRequest } from './getSheetData';
import { SheetsToSongs } from './sheetsToSongs';

export interface GetSongsRequest {
  retryCount?: number;
}

export interface GetSongsResponse {
  error?: string;
  songs: Song[];
}

@injectable()
export class GetSongs
  implements Command<GetSongsRequest, GetSongsResponse> {

  static DefaultGetSheetDataRequest: GetSheetDataRequest = { id: '1MvHpVjLTaSGkCZzjmkSxL3nhZBLQOP9SQKYRxu4wWgg', sheet: 'Jazz Standards', range: 'A:B' };

  async runAsync(params: GetSongsRequest): Promise<GetSongsResponse> {

    if (!params.retryCount) {
      params.retryCount = 0;
    }
    
    const getSheetData = container.get<GetSheetData>("GetSheetData");

    const data = (await getSheetData.runAsync(GetSongs.DefaultGetSheetDataRequest)).data;

    // Sometimes the get link sheets app script function doesn't finish running and all the leadSheetUrl values are 'Loading...'
    // so we need to check for that. If that's the case call the api again and it should be good. 
    const sheetsToSongs = container.get<SheetsToSongs>("SheetsToSongs");

    const songs = (await sheetsToSongs.runAsync({ data })).songs;

    if (params.retryCount <= 3 && songs.findIndex(arr => arr.leadSheetUrl == 'Loading...')) {
      params.retryCount++;
      return (await this.runAsync(params));
    } else if (params.retryCount > 3) {
      return {
        songs,
        error: 'Failed to load link sheet URLs'
      }
    }

    return {
      songs
    };

  }
}

