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
import xml from 'highlight.js/lib/languages/xml'
import scss from 'highlight.js/lib/languages/scss'
import css from 'highlight.js/lib/languages/css'

import 'highlight.js/styles/github-dark-dimmed.css'

@Component
export default class ArticleLayout extends Vue {
  async mounted() {
    this.handleHighlight()
    this.handlePTags()
    this.rewriteImagesForLocalDev()
  }

  handleHighlight() {
    let shouldHighlight: boolean = false

    Array.from(document.querySelectorAll('code')).map((code) => {
      Array.from(code.classList).map((c) => {
        // console.log(c)
        shouldHighlight =
          this.registerLanguageIfIncluded('vb', 'vbscript', vbscript, c) ||
          shouldHighlight
        shouldHighlight =
          this.registerLanguageIfIncluded('csharp', 'csharp', csharp, c) ||
          shouldHighlight
        shouldHighlight =
          this.registerLanguageIfIncluded('javascript', 'javascript', javascript, c) ||
          shouldHighlight
        shouldHighlight =
          this.registerLanguageIfIncluded('json', 'json', json, c) || shouldHighlight
        shouldHighlight =
          this.registerLanguageIfIncluded('html', 'html', html, c) || shouldHighlight
        shouldHighlight =
          this.registerLanguageIfIncluded('xml', 'xml', xml, c) || shouldHighlight
        shouldHighlight =
          this.registerLanguageIfIncluded('scss', 'scss', scss, c) || shouldHighlight
        shouldHighlight =
          this.registerLanguageIfIncluded('css', 'css', css, c) || shouldHighlight
      })
    })

    if (shouldHighlight) {
      hljs.highlightAll()
    }
  }

  registerLanguageIfIncluded(langSlug, lang, langRef, c) {
    if (c.includes(langSlug)) {
      // console.log(`Registering ${lang} for ${c}`)
      hljs.registerLanguage(langSlug, langRef)
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

  rewriteImagesForLocalDev() {
    //silly hack to be able to run local. Should compile this out...
    document.querySelectorAll('img').forEach((i) => {
      i.src = i.src.replace('media', 'img/media')
    })
  }
}
</script>

<style lang="scss">

.article-wrapper {
  padding: 2em;
}

.article-wrapper > div > p {
  text-indent: 15px;
  text-align: justify;
  text-justify: auto;

  -webkit-hyphens: auto;
  -webkit-hyphenate-limit-before: 3;
  -webkit-hyphenate-limit-after: 3;
  -webkit-hyphenate-limit-chars: 6 3 3;
  -webkit-hyphenate-limit-last: always;
  -webkit-hyphenate-limit-zone: 8%;

  -moz-hyphens: auto;
  -moz-hyphenate-limit-chars: 6 3 3;
  -moz-hyphenate-limit-lined: 2;
  -moz-hyphenate-limit-last: always;
  -moz-hyphenate-limit: 8%;

  -ms-hyphens: auto;
  -ms-hyphens-limit-chars: 6 3 3;
  -ms-hyphens-limit-lines: 2;
  -ms-hyphens-limit-last: always;
  -ms-hyphens-limit-zone: 8%;

  hyphens: auto;
  hyphenate-limit-chars: 6 3 3;
  hyphenate-limit-lies: 2;
  hyphenate-limit-last: always;
  hyphenate-limit-zone: 8%;
}

.article-wrapper > div > div > p > img {
  max-width: 99%;
  border-radius: 6px;
}

blockquote {
  font: 14px/22px normal helvetica, sans-serif;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 50px;
  padding-left: 15px;
  border-left: 3px solid #ccc;
}
</style>
