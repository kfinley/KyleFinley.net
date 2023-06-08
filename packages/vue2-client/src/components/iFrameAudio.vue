<template>
  <div ref="player" class="audio-player" v-if="track">
    <p class="font-weight-bold font-italic mb-0">
      Now Playing <br />{{ track.title }} <br />
      @ {{ track.location }} <br />
      {{ track.date }}
    </p>
    <div class="player-container">
      <iframe ref="iframe" frameborder="0" width="100%" height="200" :src="src"></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class iFrameAudio extends Vue {
  track: { name: string; title: string; location: string; date: string; id: string } | null = null;

  mounted() {}

  get src() {
    return `https://drive.google.com/file/d/${this.track!.id}/preview `;
  }

  play() {
    window.scrollTo(0, 0);
  }
}
</script>

<style>
.player-container {
  height: auto;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
