<template>
  <div>
    <div :v-show="showControls">
      <audio ref="audio" :controls="showControls" v-bind:ended="onAudioEnded"></audio>
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

@Component
export default class AudioPlayer extends Vue {
  @Prop({ required: true })
  tracks!: Array<{ name: string; location: string; date: string; id: string }>;

  selectedTrackIndex: number = -1;
  showControls: boolean = false;

  playTrack(index: number): void {
    this.selectedTrackIndex = index;
    this.showControls = true;

    setTimeout(() => {
      const audio: HTMLAudioElement = this.$refs.audio as HTMLAudioElement;
      const url: string = `https://docs.google.com/uc?export=open&id=${this.tracks[index].id}`;
      audio.src = url;
      audio.play();
    }, 500);
  }

  onAudioEnded(): void {
    this.selectedTrackIndex = -1;
    this.showControls = false;
  }

  listing(track: { name: string; location: string; date: string; id: string }) {
    if (window.innerWidth > 640) return `${track.name} @ ${track.location}<br/>${track.date}`;
    else return `${track.name}<br/>@ ${track.location}<br/>${track.date}`;
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
