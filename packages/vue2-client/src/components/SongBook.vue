<template>
  <div class="">
    <div v-if="isLoading" class="text-center">Loading...</div>

    <vue-pdf-embed
      v-if="showLeadSheet"
      :source="leadSheetPdf"
      @loaded="pdfSourceLoaded"
      :width="pdfWidth"
      class="pdf"
      @progress="progress"
      :annotationLayer="true"
      :textLayer="true"
    />

    <div>
      <div class="text-center">Jazz Song Book</div>
      <ul v-for="(song, key, index) in Songs" :key="index">
        <li v-if="song.leadSheetUrl !== undefined">
          <a :href="song.leadSheetUrl" :target="song.name" @click.prevent="setActive(song)">{{ song.name }}</a>
        </li>
        <li v-else>
          {{ song.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Status, SongBookState } from "../store";
import { SongBookModule } from "../store/songBook-module";
import { container } from "../inversify.config";
import { State } from "vuex-class";
import { Song } from "@kylefinley.net/songbook/src/types";
import VuePdfEmbed from "vue-pdf-embed/dist/vue2-pdf-embed";

@Component({
  components: {
    VuePdfEmbed
  }
})
export default class SongBook extends Vue {
  @State("SongBook") songBook!: SongBookState;

  store = container.get<SongBookModule>("SongBookModule");
  pdfIsLoading = false; //TODO: move to state

  async mounted() {
    this.store.getSongs();
  }
  get Songs() {
    return this.songBook.songs;
  }

  get isLoading() {
    return this.songBook.status === Status.Loading || this.pdfIsLoading;
  }

  get showLeadSheet() {
    return this.songBook.activeSong !== null;
  }

  setActive(song: Song) {
    this.store.setActive(song);
    this.pdfIsLoading = true;
    window.scrollTo(0, 0);
  }

  get leadSheetPdf() {
    return this.songBook.activeSongPdfUrl;
  }

  get pdfWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  pdfSourceLoaded() {
    console.log("loaded");
    this.pdfIsLoading = false;
    window.scrollTo(0, 0);
  }

  progress(p) {
    console.log("progress", p);
  }
}
</script>

<style scoped>
.pdf {
  max-width: 100%;
  position: relative;
  left: -32px;
}
ul {
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  align-items: center;
}
</style>
