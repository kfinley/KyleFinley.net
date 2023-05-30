<template>
  <div class="audio-player" :v-show="controls">
    <audio ref="audioPlayer" :controls="controls" :src="src" @loadedmetadata="getDuration" @timeupdate="updateTime"></audio>
    <div class="controls">
      <button @click="play" :disabled="isPlaying"><i class="fa fa-play"></i></button>
      <button @click="pause" :disabled="isPaused"><i class="fa fa-pause"></i></button>
      <button @click="stop" :disabled="isStopped"><i class="fa fa-stop"></i></button>
      <input type="range" v-model="time" @input="changeTime" :max="duration" :disabled="isStopped" />
      <button @click="toggleVolumeSlider"><i class="fa fa-volume-up"></i></button>
      <div class="volume-slider" :class="{ show: showVolumeSlider }">
        <input type="range" min="0" max="100" step="1" v-model="volume" class="slider">
      </div>
      <!-- <button @click="mute"><i :class="isMuted ? 'fa fa-volume-off' : 'fa fa-volume-up'"></i></button> -->
      <div class="time">{{ formattedTime(time) }} / {{ formattedTime(duration) }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class AudioPlayer2 extends Vue {
  // Audio source URL
  src: string = "";
  // Audio time
  time: number = 0;
  // Audio duration
  duration: number = 0;
  // Volume slider state
  showVolumeSlider = false
  // Audio volume
  volume: number = 50;
  // Audio is playing
  isPlaying: boolean = false;
  // Audio is stopped
  isStopped: boolean = true;
  // Audio is paused
  isPaused: boolean = false;
  // Audio is muted
  isMuted: boolean = false;

  controls: boolean = false;

  // Component method to play audio
  play() {
    setTimeout(() => {
      (<HTMLAudioElement>this.$refs.audioPlayer).play();
      this.isPlaying = true;
      this.isStopped = false;
      this.isPaused = false;
    }, 500);
  }

  // Component method to stop audio
  stop() {
    (<HTMLAudioElement>this.$refs.audioPlayer).pause();
    (<HTMLAudioElement>this.$refs.audioPlayer).currentTime = 0;
    this.isPlaying = false;
    this.isStopped = true;
    this.isPaused = false;
  }

  // Component method to pause audio
  pause() {
    (<HTMLAudioElement>this.$refs.audioPlayer).pause();
    this.isPlaying = false;
    this.isStopped = false;
    this.isPaused = true;
  }

  // Component method to change audio time
  changeTime() {
    (<HTMLAudioElement>this.$refs.audioPlayer).currentTime = this.time;
  }

 // Methods for volume control
  toggleVolumeSlider() {
    this.showVolumeSlider = !this.showVolumeSlider
  }

  setVolume() {
    const volume = this.volume / 100
    this.$refs.audioPlayer.volume = volume
  }

  // Watch for changes to volume and update audio player
  watch = {
    volume() {
      this.setVolume()
    },
  }

  // // Component method to change audio volume
  // changeVolume() {
  //   (<HTMLAudioElement>this.$refs.audioPlayer).volume = this.volume / 100;
  // }

  // Component method to mute audio
  mute() {
    (<HTMLAudioElement>this.$refs.audioPlayer).muted = !(<HTMLAudioElement>this.$refs.audioPlayer).muted;
    this.isMuted = !this.isMuted;
  }

  // Component method to get audio duration
  getDuration() {
    this.duration = (<HTMLAudioElement>this.$refs.audioPlayer).duration;
  }

  //Component method to update audio time
  updateTime() {
    this.time = (<HTMLAudioElement>this.$refs.audioPlayer).currentTime;
  }

  // Computed property for formatted time
  formattedTime(time) {
    const date = new Date(null);
    date.setSeconds(time);
    const hours = date.getUTCHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");
    if (hours > 0) {
      const paddedHours = String(hours).padStart(2, "0");
      return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    } else {
      return `${paddedMinutes}:${paddedSeconds}`;
    }
  }
}
</script>

<style>
.volume-slider {
  position: absolute;
  top: 50%;
  left: 80%;
  transform: translate(-50%, -50%) rotate(90deg);
  z-index: 1;
  display: none;
}

.volume-slider.show {
  display: block;
}
</style>
