<template>
  <div>
    <pre>
      <code class="language-html language-javascript language-typescript language-xml hljs">{{source}}</code>
    </pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class GitHubSourceCode extends Vue {
  name: 'git-hub-source-code'

  @Prop()
  path!: string

  @Prop()
  lang!: string

  sourceCode = 'Loading...';

  async mounted() {
    setTimeout(async () => {
      await this.fetchSource()
    }, 1000)
  }

  async fetchSource() {
    const data = await (await fetch(this.path)).json()
    this.source = atob(data.content)
    // console.log(this.sourceCode);
  }

  get source() {
    // console.log(this.sourceCode);
    return this.sourceCode;
  }
  set source(val) {
    this.sourceCode = val;
    // console.log('sourceCode set')
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
