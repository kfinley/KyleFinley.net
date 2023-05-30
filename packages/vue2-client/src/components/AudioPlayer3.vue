<template>
  <div class="audio-player">
    <p class="font-weight-bold font-italic mb-0">Now Playing <br/>{{ title }} <br/> @ {{ location }}</p>
    <audio ref="audioPlayer" :src="src" @loadedmetadata="getDuration" @timeupdate="updateTime"></audio>
    <div class="controls">
      <button @click="play" :disabled="isPlaying"><i class="fa fa-play"></i></button>
      <button @click="pause" :disabled="isPaused"><i class="fa fa-pause"></i></button>
      <button @click="stop" :disabled="isStopped"><i class="fa fa-stop"></i></button>
      <div class="volume-control">
        <button @click="toggleVolumeSlider"><i class="fa fa-volume-up"></i></button>
        <div class="volume-slider" :class="{ show: showVolumeSlider }">
          <input type="range" min="0" max="100" step="1" v-model="volume" class="slider" />
        </div>
      </div>
    </div>
    <div class="time">{{ formattedTime }}</div>
    <div class="duration">
      <input type="range" min="0" :max="duration" step="1" v-model="time" class="slider" />
      <div class="formatted-duration">{{ formattedDuration }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AudioPlayer extends Vue {
  // Audio source URL
  src = "";

  // Audio player state
  isPlaying = false;
  isPaused = false;
  isStopped = true;

  // Audio player time
  time = 0;
  duration = 0;

  // Volume slider state
  showVolumeSlider = false;
  volume = 50;

  showPlayer: boolean = false;
  title: string =  "";
  location: string = "";

  // Computed properties for formatted time and duration
  get formattedTime() {
    const date = new Date(null);
    date.setSeconds(this.time);
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

  get formattedDuration() {
    const date = new Date(null);
    date.setSeconds(this.duration);
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

  // Methods for audio player control
  play() {
    window.scrollTo(0,0);
    setTimeout(() => {
      this.$refs.audioPlayer.play();
      this.isPlaying = true;
      this.isPaused = false;
      this.isStopped = false;
    });
  }

  pause() {
    this.$refs.audioPlayer.pause();
    this.isPlaying = false;
    this.isPaused = true;
    this.isStopped = false;
  }

  stop() {
    this.$refs.audioPlayer.pause();
    this.$refs.audioPlayer.currentTime = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.isStopped = true;
    this.time = 0;
  }

  getDuration() {
    this.duration = Math.floor(this.$refs.audioPlayer.duration);
  }

  updateTime() {
    this.time = Math.floor(this.$refs.audioPlayer.currentTime);
  }

  // Methods for volume control
  toggleVolumeSlider() {
    this.showVolumeSlider = !this.showVolumeSlider;
  }

  setVolume() {
    const volume = this.volume / 100;
    this.$refs.audioPlayer.volume = volume;
  }
}
</script>
<style scoped>
.audio-player {
  position: relative;
  text-align: center;
  margin: 1rem;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 1rem; */
}

.controls button {
  background-color: #fff;
  border: none;
  font-size: 1.5rem;
  margin: 0 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
}

.volume-control {
  position: relative;
}

.volume-control button {
  margin-left: 1rem;
}

.volume-slider {
  position: absolute;
  bottom: 60%;
  left: 50%;
  transform: translateX(-50%);
  display: none;
}

.volume-slider.show {
  display: block;
}

/* Updated style for vertical volume slider */
.volume-slider input[type="range"] {
  writing-mode: bt-lr;
  appearance: slider-vertical;
  height: 100px;
  margin: 0 auto;
}

.time {
  font-size: 1.2rem;
  /* margin-bottom: 1rem; */
}

.duration {
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 1rem; */
}

.duration input {
  flex-grow: 1;
  /* margin: 0 1rem; */
}

.formatted-duration {
  font-size: 0.8rem;
}
</style>
