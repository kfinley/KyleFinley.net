<template>
  <pre>
    <code class="language-html language-javascript language-typescript language-xml language-scss hljs">{{source}}</code>
  </pre>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { GitHubState, Status } from '../store'
import { getGitHubModule } from '../store/github-module'

@Component
export default class GitHubSourceCode extends Vue {
  name: 'git-hub-source-code'

  @State('GitHub')
  gitHubState!: GitHubState

  ghStore = getGitHubModule(this)

  @Prop()
  path!: string

  @Prop()
  lang!: string

  created() {
    this.ghStore.getSource({
      path: this.path,
    })
  }

  get source() {
    if (this.gitHubState.sources[this.path]) {
      return window.atob(this.gitHubState.sources[this.path])
    }
    return 'Loading...'
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  position: absolute;
  z-index: 10; // :puke: fix this....
  fill: white;
  height: 5%;
  right: 35px;
  opacity: 40%;
}

// ht: https://www.labnol.org/embed-google-slides-200615
.responsive {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Ratio */
  height: 0;
  overflow: hidden;
}

.responsive iframe {
  border: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
}
</style>
