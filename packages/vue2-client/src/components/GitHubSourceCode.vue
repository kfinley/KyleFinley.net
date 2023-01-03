<template>
  <pre>
    <code :id="getId()" :class="getClass()" >Loading...</code>
  </pre>
</template>

<script lang="ts">
import hljs from "highlight.js/lib/core";
import { Component, Vue, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import { container } from "../inversify.config";
import { GitHubState } from "../store";
import { GitHubModule } from "../store/github-module";

@Component
export default class GitHubSourceCode extends Vue {
  @Prop()
  path!: string;

  @Prop()
  lang!: string;

  @State("GitHub")
  gitHubState!: GitHubState;

  ghStore = container.get<GitHubModule>("GitHubModule");

  async created() {
    await this.ghStore.getSource({
      path: this.path
    });
  }

  mounted() {
    this.setSource();
  }

  setSource() {
    setTimeout(() => {
      if (this.gitHubState.sources[this.path]) {
        const c = window.atob(this.gitHubState.sources[this.path]).replace("ï»¿", ""); // remove strange garbage some .cs files contain for some reason
        // console.log(c)
        const codeTag = document.getElementById(this.getId());
        if (codeTag) {
          codeTag.textContent = c;
        }
        hljs.highlightAll();
      } else {
        this.setSource();
      }
    }, 500);
  }
  getId() {
    return `source-${this.path
      .split("")
      .reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0) //ht: https://stackoverflow.com/a/34842797
      .toString()}`;
  }

  getClass() {
    let classList = "";

    this.lang.split(" ").map(s => {
      classList = `${classList} language-${s}`;
    });

    return `${classList} hljs`;
  }
}
</script>

<style lang="scss" scoped></style>
