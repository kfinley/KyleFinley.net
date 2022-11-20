<template></template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getAuthModule } from '../store/auth-module'
import { getGitHubModule } from '../store/github-module'

@Component({
  components: {},
})
export default class ManageRepo extends Vue {
  authStore = getAuthModule(this)
  ghStore = getGitHubModule(this)

  async created() {
    await this.ghStore.createBranch({})
  }
}
</script>
