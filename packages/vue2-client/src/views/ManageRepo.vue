<template></template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { getAuthModule, getGitHubModule } from '../store'

@Component({
  components: {},
})
export default class ManageRepo extends Vue {
  // authStore = getAuthModule(this)
  // ghStore = getGitHubModule(this)

  async created() {
    // await this.ghStore.createBranch({})
  }
}
</script>
