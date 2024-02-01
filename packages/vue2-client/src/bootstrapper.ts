import { container } from './inversify.config';
import { bootstrapper as ghCommandsBootstrapper } from "@kylefinley.net/github-commands/src/";
import { bootstrapper as songbookBootstrapper } from "@kylefinley.net/songbook/src/";
import { AuthModule, getAuthModule } from "./store/auth-module";
import { Store } from "vuex";
import { ArticlesModule, getArticlesModule } from './store/articles-module';
import { GitHubModule, getGitHubModule } from './store/github-module';
import { SongBookModule, getSongBookModule } from './store/songBook-module';

export default function bootstrapper(store: Store<any>) {

  // console.log('Bootstrapper', process.env.NODE_ENV);

  ghCommandsBootstrapper(container);
  songbookBootstrapper(container);

  container.bind<AuthModule>("AuthModule").toDynamicValue(() => getAuthModule(store));
  container.bind<ArticlesModule>("ArticlesModule").toDynamicValue(() => getArticlesModule(store));
  container.bind<GitHubModule>("GitHubModule").toDynamicValue(() => getGitHubModule(store))
  container.bind<SongBookModule>("SongBookModule").toDynamicValue(() => getSongBookModule(store));
  // console.log("Bootstrapper Done", container);

  return container;
}
