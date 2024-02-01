<template>
  <div>
    <div>© 2024 kylefinley.net</div>
    <div>Built by me. <a href="https://github.com/kfinley/kylefinley.net" target="new">Source Code</a></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
a {
  color: rgba(255, 255, 255, 0.7);
}

a:hover {
  color: #fff;
  border-color: #fff;
}
</style>
