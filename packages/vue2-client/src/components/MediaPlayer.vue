<template>
  <div>
    <div v-show="showPlayer">
      <!-- <player simple ref="audio" :controls="showControls" v-bind:ended="onAudioEnded"></player> -->
      <!-- <audio ref="audio" :controls="showControls" v-bind:ended="onAudioEnded"></audio> -->
      <audio-player ref="audio"></audio-player>
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
import AudioPlayer from "./AudioPlayer3.vue";
// import Player from "./Player.vue";

@Component({
  components: {
    AudioPlayer
  }
})
export default class MediaPlayer extends Vue {
  @Prop({ required: true })
  tracks!: Array<{ name: string; location: string; date: string; id: string }>;

  selectedTrackIndex: number = -1;
  showPlayer: boolean = false;
  audio: AudioPlayer = null;

  playTrack(index: number): void {
    this.selectedTrackIndex = index;
    this.showPlayer = true;
    this.audio = null;
    this.audio = this.$refs.audio as AudioPlayer;
    const track = this.tracks[index];
    this.audio.title = track.name;
    this.audio.location = track.location;
    const url: string = `https://docs.google.com/uc?export=open&id=${track.id}`;
    this.audio.src = url;
    this.audio.play();
  }

  onAudioEnded(): void {
    this.selectedTrackIndex = -1;
    this.showPlayer = false;
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
