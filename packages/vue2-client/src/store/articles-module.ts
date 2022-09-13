import { getModule } from "vuex-module-decorators";
import { Module, Mutation, Action } from 'vuex-module-decorators';
import BaseModule from './base-module'
import { ArticlesState, Status } from './state'

@Module({ namespaced: true, name: 'Articles' })
export class ArticlesModule extends BaseModule implements ArticlesState {

    articles: Record<string, string> = {}
    status: any;

    @Action
    async loadArticles() {

        this.context.commit('mutate',
            (state: ArticlesState) => state.status = Status.Loading);

        try {

            const articlesMeta = import.meta.glob('../articles/*.json')

            const files = import.meta.glob('../articles/*.md')

            const articleList: Record<string, string> = {};

            for (let file in files) {
                const article = file.split('/')[2].split('.')[0]
                const meta = `${file.split('.md')[0]}.json`
                const title = ((await articlesMeta[meta]()) as any).default.title
                // console.log({ article, title })
                articleList[article] = title
            }

            this.context.commit('mutate',
                (state: ArticlesState) => {
                    state.articles = articleList
                })
        } catch (error) {
            this.context.commit('mutate',
                (state: ArticlesState) => state.status = Status.Failed);

            console.log(error); ``
        }
    }
}

export const getArticlesModule = (vue: Vue) => getModule(ArticlesModule, vue.$store);
