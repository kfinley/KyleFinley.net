<template>
  <div>
    <!-- <a @click="login" class="btn btn-social btn-github">
    //   <i class="fa fa-github"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login in with GitHub
    // </a>
    -->
    <a :href="getGitHubUrl(from)" class="auth-btn github-auth">
      <img :src="getGitHubLogo()" alt="GitHub Logo" />
      <span>Login with GitHub</span>
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import GitHubLogo from '../assets/github.svg'

@Component({})
export default class GitHubLogin extends Vue {
  @Prop()
  route!: string
  from = '/'

  getGitHubLogo() {
    return GitHubLogo
  }

  getGitHubUrl(from) {
    const rootURl = 'https://github.com/login/oauth/authorize'

    const options = {
      client_id: import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_GITHUB_OAUTH_REDIRECT_URL,
      scope: 'user:email,repo',
      state: from,
    }

    const qs = new URLSearchParams(options)

    return `${rootURl}?${qs.toString()}`
  }
}
</script>

<style>
.auth-btn {
  background-color: #fff;
  border-radius: 5px;
  padding: 0.6rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
}
.auth-btn img {
  height: 4rem;
  margin-right: 1rem;
}
.auth-btn span {
  font-size: 1.8rem;
}
.auth-btn:hover {
  box-shadow: 0 1px 13px 0 rgb(0 0 0 / 15%);
}
.auth-btn.google-auth {
  margin-bottom: 1.5rem;
}
</style>
