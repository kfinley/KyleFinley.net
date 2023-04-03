<template>
  <couch-surfing-archive-viewer></couch-surfing-archive-viewer>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CouchSurfingArchiveViewer from "../components/CouchSurfingArchiveViewer.vue";

@Component({
  components: {
    CouchSurfingArchiveViewer
  }
})
export default class CouchSurfing extends Vue {}
</script>
