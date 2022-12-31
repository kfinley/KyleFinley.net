<template>
  <div>
    <p>
      <a :href="slidePresentLink" target="_blank">
        <svg viewBox="0 0 24 24" focusable="false" class="fullscreen">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path>
        </svg>
      </a>
      <div class="responsive">
        <iframe
          frameborder="0"
          :aria-label="label"
          :src="slideEmbedLink"></iframe>
      </div>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class GSlides extends Vue {
  name: "g-slides";
  
  @Prop()
  label!: string;

  @Prop()
  presentationId!: string;

  get slidePresentLink() {
    return `https://docs.google.com/presentation/d/${this.presentationId}/present`;
  }

  get slideEmbedLink() {
    return `https://docs.google.com/presentation/d/${this.presentationId}/embed`;
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  position: absolute;
  z-index: 10; // :puke: fix this....
  fill: white;
  height: 5%;
  right: 35px;
  opacity: 40%;
}

// ht: https://www.labnol.org/embed-google-slides-200615
.responsive {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Ratio */
  height: 0;
  overflow: hidden;
}

.responsive iframe {
  border: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
}
</style>
