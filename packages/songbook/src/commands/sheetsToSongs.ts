import { injectable } from 'inversify-props';
import { Command } from '@kylefinley.net/commands/src';
import { SheetsData, Song } from '../types';

export interface SheetsToSongsRequest {
  data: SheetsData;
}

export interface SheetsToSongsResponse {
  songs: Song[];
}

@injectable()
export class SheetsToSongs
  implements Command<SheetsToSongsRequest, SheetsToSongsResponse> {

  async runAsync(params: SheetsToSongsRequest): Promise<SheetsToSongsResponse> {

    params.data.values.shift(); // Remove the header row we got from the sheet
    const headers = ['name', 'leadSheetUrl']; // Use our objet property names instead.
    const result = params.data.values.map<Song>(row => headers?.reduce((acc, currentHeader, i) => ({ ...acc, ...{ [currentHeader]: row[i] } }), { name: '', leadSheetUrl: '' }));
    return  {
      songs: result
    };
  }
}

