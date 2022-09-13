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
export default class LayoutDefault extends Vue {}
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
    padding-top: 1em;
    padding-bottom: 1em;
    border-top: 1px solid grey;
    text-align: center;
  }
}
</style>
