<template>
  <div>
    <h3>Regular Gigs & Jams</h3>
    <component :is="regularGigs" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { defineAsyncComponent } from "vue";

@Component
export default class Gigs extends Vue {


  get regularGigs() {
    return defineAsyncComponent(() => import(`../gigs/regular.md`));
  }

}
</script>
