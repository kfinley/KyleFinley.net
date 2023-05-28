<template>
  <div>
    <h3 v-html="header"></h3>
    <audio controls="controls">
      <source :src="src" />
      <p>Your browser does not support HTML5 audio :(</p>
    </audio>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class AudioPlayer extends Vue {
  @Prop()
  name!: string;

  @Prop()
  location!: string;

  @Prop()
  date!: string;

  @Prop()
  gId!: string;

  get src() {
    return `https://docs.google.com/uc?export=open&id=${this.gId}`;
  }

  get header() {
    if (window.innerWidth > 640) return `${this.name} @ ${this.location}<br/>${this.date}`;
    else return `${this.name}<br/>@ ${this.location}<br/>${this.date}`;
  }
}
</script>

<style lang="scss" scoped>
h3 {
  padding-top: 10px;
}
</style>
