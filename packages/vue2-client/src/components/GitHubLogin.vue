<template>
  <div>
    <a @click="login" class="btn btn-social btn-github">
      <i class="fa fa-github"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login in with GitHub
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class GitHubLogin extends Vue {
  @Prop()
  route!: string

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
