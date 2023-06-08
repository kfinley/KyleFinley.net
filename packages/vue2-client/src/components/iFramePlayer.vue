<template>
  <div>
    <div v-show="showPlayer">
      <iframe-audio ref="audio"></iframe-audio>
    </div>
    <ul>
      <li
        v-for="(track, index) in tracks"
        :key="index"
        v-html="listing(track)"
        @click="playTrack(index)"
        :class="{ clickable: true, playing: index === selectedTrackIndex }"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import iFrameAudio from "./iFrameAudio.vue";

@Component({
  components: {
    'iframe-audio': iFrameAudio
  }
})
export default class iFramePlayer extends Vue {
  @Prop({ required: true })
  tracks!: Array<{ name: string; location: string; date: string; id: string }>;

  selectedTrackIndex: number = -1;
  showPlayer: boolean = false;
  audio: iFrameAudio = null;

  playTrack(index: number): void {
    this.selectedTrackIndex = index;
    this.showPlayer = true;
    this.audio = null;
    this.audio = this.$refs.audio as iFrameAudio;
    this.audio.track = this.tracks[index];
    this.audio.play();
  }

  onAudioEnded(): void {
    this.selectedTrackIndex = -1;
    this.showPlayer = false;
  }

  listing(track: { title: string; location: string; date: string; id: string }) {
    if (window.innerWidth > 640) return `${track.title} @ ${track.location}<br/>${track.date}`;
    else return `${track.title}<br/>@ ${track.location}<br/>${track.date}`;
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding-left: 0;
}

li {
  font-weight: bold;
  padding-top: 10px;
}

.playing {
  font-weight: bold;
  color: rgb(49, 119, 197);
}
</style>
