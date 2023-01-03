<template></template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getGitHubModule } from "../store/github-module";

@Component({
  components: {}
})
export default class ManageRepo extends Vue {
  ghStore = getGitHubModule(this);

  async created() {
    await this.ghStore.createBranch({
      vue: this
    });
  }
}
</script>
