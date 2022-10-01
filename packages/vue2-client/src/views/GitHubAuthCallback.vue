<template></template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getAuthModule } from '../store/auth-module'

@Component({})
export default class GitHubLogin extends Vue {

  store = getAuthModule(this)

  mounted() {
    console.log(location.search)
    const urlParams = new URLSearchParams(location.search)

    this.store.codeForTokens(urlParams.get('code'));
  }
}
</script>
