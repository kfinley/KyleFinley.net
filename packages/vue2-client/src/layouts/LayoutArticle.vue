<template>
  <article class="article-wrapper" itemscope itemtype="https://schema.org/Article">
    <router-view />
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import hljs from 'highlight.js/lib/core'
import vbscript from 'highlight.js/lib/languages/vbscript'
import csharp from 'highlight.js/lib/languages/csharp'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import html from 'highlight.js/lib/languages/vbscript-html'

import 'highlight.js/styles/github-dark-dimmed.css'

@Component()
export default class ArticleLayout extends Vue {
  mounted() {
    this.handleHighlight()
  }
  
  created() {
    this.handlePTags()

    // this.handleImages();
  }

  // handleImages() {
  //   Array.from(document.querySelectorAll('.article-wrapper > div > div > p > img')).map((i) => {
  //     i.src = i.src.replace('/public', '')
  //     console.log(i.src)
  //   });
  // }

  handleHighlight() {
    let shouldHighlight: boolean = false

    Array.from(document.querySelectorAll('code')).map((code) => {
      Array.from(code.classList).map((c) => {
        shouldHighlight =
          this.registerLanguageIfIncluded('vbscript', vbscript, c) || shouldHighlight
        shouldHighlight =
          this.registerLanguageIfIncluded('csharp', csharp, c) || shouldHighlight
        shouldHighlight =
          this.registerLanguageIfIncluded('javascript', javascript, c) || shouldHighlight
        shouldHighlight =
          this.registerLanguageIfIncluded('json', json, c) || shouldHighlight
        shouldHighlight =
          this.registerLanguageIfIncluded('html', html, c) || shouldHighlight
      })
    })

    if (shouldHighlight) {
      hljs.highlightAll()
    }
  }

  registerLanguageIfIncluded(lang, langRef, c) {
    if (c.includes(lang)) {
      hljs.registerLanguage(lang, langRef)
      return true
    }
    return false
  }
  
  handlePTags() {
    Array.from(document.querySelectorAll('.article-wrapper > div > p')).map((p) => {
      // Remove indent for any paragraphs that are 2 lines or less.
      if (p.clientHeight <= 50) {
        p.style['text-indent'] = '0'
      }
      // Remove indent for any images
      if (p.children.length == 1 && p.children[0].localName == 'img') {
        p.style['text-indent'] = '0'
      }
    })
  }
}
</script>

<style lang="scss">
.no-indent {
  text-indent: 0;
}

.article-wrapper {
  padding: 2em;
}

.article-wrapper > div > p {
  hyphens: auto;
  text-indent: 15px;
}

.article-wrapper > div > div > p > img {
  max-width: 99%;
  border-radius: 6px;
}
</style>
