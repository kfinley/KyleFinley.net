<template>
  <div class="audio-player" v-if="track">
    <p class="font-weight-bold font-italic mb-0">
      Now Playing <br />{{ track.title }} <br />
      @ {{ track.location }}
    </p>
    <audio ref="audioPlayer" :src="src" @loadedmetadata="getDuration" @timeupdate="updateTime"></audio>
    <div class="controls">
      <button @click="togglePlay">
        <i v-if="!isPlaying" class="fa fa-play"></i>
        <i v-if="isPlaying" class="fa fa-pause"></i>
      </button>
      <button @click="stop" :disabled="isStopped"><i class="fa fa-stop"></i></button>
    </div>
    <div class="time">{{ formattedTime(time) }}</div>
    <div class="duration">
      <input type="range" min="0" :max="duration" step="1" v-model="time" class="slider" @click="settingTime" @change="setTime" />
      <div class="volume-control">
        <button @click="toggleVolumeSlider"><i class="volume fa fa-volume-up"></i></button>
        <div class="volume-slider" :class="{ show: showVolumeSlider }">
          <input type="range" min="0" max="100" step="1" v-model="volume" class="slider" @change="setVolume" />
        </div>
      </div>
      <div class="formatted-duration">{{ formattedTime(duration) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AudioPlayer extends Vue {
  track: { name: string; location: string; date: string; id: string } = null;

  isPlaying = false;
  isPaused = false;
  isStopped = true;

  time = 0;
  duration = 0;
  isSettingTime: boolean = false;

  showVolumeSlider = false;
  volume = 50;

  showPlayer: boolean = false;

  get src() {
    return `https://docs.google.com/uc?export=open&id=${this.track.id}`;
  }

  formattedTime(time: number) {
    const date = new Date(null);
    date.setSeconds(time);
    const hours = date.getUTCHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");
    if (hours > 0) {
      const paddedHours = String(hours);
      return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    } else {
      return `${paddedMinutes}:${paddedSeconds}`;
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.$refs.audioPlayer.play();
      this.isPlaying = true;
      this.isPaused = false;
      this.isStopped = false;
    }
  }

  play() {
    this.time = 0;
    this.duration = 0;
    window.scrollTo(0, 0);
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
    if (!this.isSettingTime) {
      this.time = Math.floor(this.$refs.audioPlayer.currentTime);
    }
  }

  settingTime() {
    this.isSettingTime = true;
  }

  setTime() {
    this.isSettingTime = true;
    this.$refs.audioPlayer.currentTime = this.time;
    setTimeout(() => {
      this.isSettingTime = false;
      this.updateTime();
    }, 200);
  }

  toggleVolumeSlider() {
    this.showVolumeSlider = !this.showVolumeSlider;
  }

  setVolume() {
    const volume = this.volume / 100;
    this.$refs.audioPlayer.volume = volume;
    setTimeout(() => this.toggleVolumeSlider(), 200);
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
  background-color: #fff;
  border: none;
  font-size: 1rem;
  cursor: pointer;
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

.volume-slider input[type="range"] {
  writing-mode: bt-lr;
  appearance: slider-vertical;
  height: 100px;
  margin: 0 auto;
}

.time {
  font-size: 1.2rem;
}

.duration {
  display: flex;
  justify-content: center;
  align-items: center;
}

.duration input {
  flex-grow: 1;
}

.formatted-duration {
  font-size: 0.8rem;
}
</style>
