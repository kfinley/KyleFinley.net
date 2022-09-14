<template>
  <div>
    <h1>List of Articles</h1>
    <ul>
      <li v-for="key in Object.keys(articlesState.articles)">
        <router-link :to="{ name: key }">{{ articlesState.articles[key] }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ArticlesState } from '../store/state'
import { State } from 'vuex-class'
import { getArticlesModule } from '../store/articles-module'

@Component()
export default class Articles extends Vue {
  @State('Articles') articlesState!: ArticlesState

  async created() {
    await getArticlesModule(this).loadArticles()
  }
}
</script>
