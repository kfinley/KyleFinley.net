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
      scope: 'user:email',
      state: from,
    }

    const qs = new URLSearchParams(options)

    return `${rootURl}?${qs.toString()}`
  }

  login() {
    // Initializes OAuth.io with API key
    // Sign-up an account to get one
    window.OAuth.initialize('01811fceddc77dd32903') //TODO: MOVE THIS!!

    // Popup and ask for authorization
    window.OAuth.popup('github').then((github) => {
      console.log('github:', github)
      // Prompts 'welcome' message with User's name on successful login
      // #me() is a convenient method to retrieve user data without requiring you
      // to know which OAuth provider url to call
      github.me().then((data) => {
        console.log('data: ', data)
        alert('Your Github email: ' + data.email + '.\nCheck console logs for more info.')
      })

      // You can also call Github's API using #.get()
      github.get('/user').then((data) => {
        console.log('self data:', data)
      })
    })
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
