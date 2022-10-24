<template>
  <router-link to="login">Login</router-link>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getAuthModule } from '../store/auth-module'

@Component({})
export default class GitHubLogin extends Vue {
  store = getAuthModule(this)

  mounted() {
    console.log(location.search)
    const urlParams = new URLSearchParams(location.search)

    this.store.authWithCode({ code: urlParams.get('code') as string, vue: this })
  }
}
</script>
