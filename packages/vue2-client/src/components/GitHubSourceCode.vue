<template>
  <div>
    <pre>
      <code class="language-html hljs">{{ sourceCode }}</code>
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

  sourceCode: string = ''

  async mounted() {
    await this.fetchSource();
  }

  async fetchSource() {
    const data = await (await fetch(this.path)).json();
    this.sourceCode = atob(data.content)
    // console.log(this.sourceCode);
  }

  getClass() {
    // console.log('fuck', this.lang)
    if (this.lang === null) {
      return 'language-html hljs1'
    }
    return `language-${this.lang} hljs1`
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
