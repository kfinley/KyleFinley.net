<template>
  <div>
    <h1>List of Articles</h1>
    <div v-if="loading()">Loading...</div>
    <ul v-else>
      <li v-for="key in Object.keys(articlesState.articles)">
        <router-link :to="{ name: key }">{{ articlesState.articles[key] }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ArticlesState, Status } from '../store';
import { State } from 'vuex-class'
import { ArticlesModule } from '../store/articles-module';
import { container } from '../inversify.config';

@Component({})
export default class Articles extends Vue {
  @State('Articles') articlesState!: ArticlesState

  store = container.get<ArticlesModule>("ArticlesModule")

  async created() {
    await this.store.loadArticles();
  }

  loading() {
    return this.articlesState.status === Status.Loading
  }
}
</script>
