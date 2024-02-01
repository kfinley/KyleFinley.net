import { Store } from 'vuex';
import { Module, Action, getModule } from 'vuex-module-decorators';
import BaseModule from './base-module';
import { SongBookState, Status } from './state'
import { container } from '@/inversify.config';
import { Song } from '@kylefinley.net/songbook/src/types';

import { GetSongs } from '@kylefinley.net/songbook/src/commands/getSongs';

@Module({ namespaced: true, name: 'SongBook' })
export class SongBookModule extends BaseModule implements SongBookState {

  songs: Song[] | null = null;
  status: Status = Status.None;
  activeSong: Song | null = null;
  activeSongPdfUrl: string | null = null;

  @Action
  async getSongs(): Promise<void> {

    this.context.commit('mutate',
      (state: SongBookState) => {
        state.status = Status.Loading;
        state.activeSong = null;
        state.activeSongPdfUrl = null;
      });
      
    const getSongs = container.get<GetSongs>("GetSongs");    

    const songs = (await getSongs.runAsync({})).songs;

    this.context.commit('mutate',
      (state: SongBookState) => {
        state.songs = songs;
        state.status = Status.Loaded;
      });

  }

  @Action
  setActive(song: Song) {
    const fileId = song.leadSheetUrl.split('/')[5];
    this.context.commit('mutate', (state: SongBookState) => {
      state.activeSong = song;
      state.activeSongPdfUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?key=${process.env.GOOGLE_SHEETS_API_KEY}&alt=media`;
    });
  }


}
export const getSongBookModule = (store: Store<any>) => getModule(SongBookModule, store);
