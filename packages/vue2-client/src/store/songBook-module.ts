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

  @Action
  async getSongs(): Promise<void> {

    this.context.commit('mutate',
      (state: SongBookState) => state.status = Status.Loading);
      
    const getSongs = container.get<GetSongs>("GetSongs");    

    const songs = (await getSongs.runAsync({})).songs;

    this.context.commit('mutate',
      (state: SongBookState) => state.songs = songs);

    this.context.commit('mutate',
      (state: SongBookState) => state.status = Status.Loaded);

  }


}
export const getSongBookModule = (store: Store<any>) => getModule(SongBookModule, store);
