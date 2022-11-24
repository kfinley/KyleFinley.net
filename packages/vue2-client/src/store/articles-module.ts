import { Store } from "vuex";
import { Module, Action, getModule } from 'vuex-module-decorators';
import BaseModule from './base-module'
import { ArticlesState, Status } from './state'

@Module({ namespaced: true, name: 'Articles' })
export class ArticlesModule extends BaseModule implements ArticlesState {

  articles: Record<string, string> = {}
  status: Status = Status.None

  @Action
  async loadArticles() {

    this.context.commit('mutate',
      (state: ArticlesState) => state.status = Status.Loading);

    try {

      const articlesMeta = import.meta.glob('../articles/*.json')

      const articleList: Record<string, string> = {};

      for (let file in articlesMeta) {
        const meta = file.split('/')[2]
        const article = meta.split('.')[0]
        const title = ((await articlesMeta[file]()) as any).default.title
        // console.log({ article, title })
        articleList[article] = title
      }

      this.context.commit('mutate',
        (state: ArticlesState) => {
          state.articles = articleList
        })

      this.context.commit('mutate',
        (state: ArticlesState) => state.status = Status.Loaded);

    } catch (error) {
      this.context.commit('mutate',
        (state: ArticlesState) => state.status = Status.Failed);

      console.log(error);
    }
  }
}
export const getArticlesModule = (store: Store<any>) => getModule(ArticlesModule, store);
