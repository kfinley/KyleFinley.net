<template>
  <git-hub-login></git-hub-login>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { GitHubLogin } from '../components'

@Component({
  components: {
    GitHubLogin,
  },
})
export default class Login extends Vue {}
</script>
