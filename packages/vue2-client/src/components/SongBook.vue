<template>
<div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-for="(song, key, index) in Songs" :key="index">
        <div>
          {{ song.name }}
        </div>
      </div>
      </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Status, SongBookState } from "../store";
import { SongBookModule } from "../store/songBook-module";
import { container } from '../inversify.config';
import { State } from "vuex-class";

@Component
export default class SongBook extends Vue {
  @State("SongBook") songBook!: SongBookState;

  store = container.get<SongBookModule>("SongBookModule");

  async mounted() {
    this.store.getSongs();
  }
  get Songs() {
    return this.songBook.songs;
  }

  get isLoading() {
    return this.songBook.status === Status.Loading;
  }
}
</script>

<style></style> 
