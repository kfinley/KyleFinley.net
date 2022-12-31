<template>
  <pre>
    <code id="source" class="language-html language-javascript language-typescript language-xml language-scss hljs" >Loading...</code> 
  </pre>
</template>

<script lang="ts">
import hljs from 'highlight.js/lib/core'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { container } from '../inversify.config'
import { GitHubState } from '../store'
import { GitHubModule } from '../store/github-module'

@Component
export default class GitHubSourceCode extends Vue {
  name: 'git-hub-source-code'

  @State('GitHub')
  gitHubState!: GitHubState

  ghStore = container.get<GitHubModule>('GitHubModule')

  @Prop()
  path!: string

  @Prop()
  lang!: string

  async created() {
    await this.ghStore.getSource({
      path: this.path,
    })
  }

  mounted() {
    setTimeout(() => {
      document.getElementById('source').textContent = window.atob(
        this.gitHubState.sources[this.path]
      )
      hljs.highlightAll()
    }, 500)
  }
}
</script>

<style lang="scss" scoped></style>
