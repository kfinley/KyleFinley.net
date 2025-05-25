<template>
  <div>
    <component :is="regularGigs" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { defineAsyncComponent } from "vue";

@Component
export default class RegularGigs extends Vue {


  get regularGigs() {
    return defineAsyncComponent(() => import(`../gigs/regular.md`));
  }

}
</script>
