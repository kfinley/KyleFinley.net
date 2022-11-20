<template>
  <div>
    <div v-if="authenticating()">Logging in</div>
   <router-link v-if="!authenticating() && !authenticated()" to="login">Login</router-link>
   <div v-if="authenticated()">Logged in</div>
   <router-link v-if="authenticated()" to="manage-repo">Manage Repo</router-link>
  </div>

</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { AuthState, Status } from '../store'
import { getAuthModule } from '../store/auth-module'

@Component({})
export default class GitHubLogin extends Vue {
  store = getAuthModule(this)

  @State('Auth') authState!: AuthState

  mounted() {

    const urlParams = new URLSearchParams(location.search)

    this.store.authWithCode({ code: urlParams.get('code') as string, vue: this })
  }

  authenticating() {
    return this.authState.status == Status.Authenticating;
  }

  authenticated() {
    return this.authState.status == Status.Authenticated;
  }

}
</script>
