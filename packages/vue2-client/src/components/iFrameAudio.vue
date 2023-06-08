<template>
  <div ref="player" class="audio-player" v-if="track">
    <p class="font-weight-bold font-italic mb-0">
      Now Playing <br />{{ track.title }} <br />
      @ {{ track.location }} <br />
      {{ track.date }}
    </p>
    <iframe ref="player" frameborder="0" width="500" height="100" :src="src"></iframe>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class iFrameAudio extends Vue {
  track: { name: string; location: string; date: string; id: string } = null;

  get src() {
    return `https://drive.google.com/file/d/${this.track.id}/preview `;
  }

  play() {
    window.scrollTo(0, 0);
  }
}
</script>
