<template>
  <div class="LayoutDefault">
    <Header class="LayoutDefault__header" />
    <main class="LayoutDefault__main">
      <router-view />
    </main>
    <Footer class="LayoutDefault__footer" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Header, Footer } from '../components/'

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class LayoutDefault extends Vue {
  async mounted() {
    this.rewriteImagesForLocalDev()
  }

  rewriteImagesForLocalDev() {
    //silly hack to be able to run local. Should compile this out...
    document.querySelectorAll('img').forEach((i) => {
      i.src = i.src.replace('media', 'img/media')
    })
  }
}
</script>

<style lang="scss">
.LayoutDefault {
  margin-right: auto;
  margin-left: auto;

  &__header {
    border-bottom: 1px solid grey;
    background: rgb(49, 119, 197);
  }

  &__main {
    padding-top: 3.8em;
    padding-bottom: 4em;
  }

  &__main > div {
    padding: 2em;
  }

  &__footer {
    background: rgb(49, 119, 197);
    color: white;
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid grey;
    text-align: center;
    z-index: 100;
  }
}
</style>
