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
import { metaFiles } from '../articles'

import 'highlight.js/styles/github-dark-dimmed.css'

@Component()
export default class ArticleLayout extends Vue {

  async mounted() {
   
    this.setTitleAndMetaTags()
    this.handleHighlight()
    this.handlePTags()
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

  setTitleAndMetaTags() {
    // console.log(metaFiles)
    this.getMetaData(this.$route.name).then((meta) => {
      document.title = meta.title

      for (const tag of meta.metaTags) {
        console.log(tag)

        const tagEl = document.createElement('meta')
        tagEl.setAttribute(Object.values(tag)[0], Object.values(tag)[1])

        // We use this to track which meta tags we create so we don't interfere with other ones.
        tagEl.setAttribute('data-vue-router-controlled', '')
        document.head.appendChild(tagEl)
      }
    })
  }

  getMetaData = async (file: string) => (await import(`../articles/${file}.json`)).default
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
