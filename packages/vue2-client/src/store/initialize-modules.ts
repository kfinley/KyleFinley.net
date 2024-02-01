import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import { SongBookModule } from "./songBook-module";

let songBookModule: SongBookModule;

function initializeModules(store: Store<any>): void {
  songBookModule = getModule(SongBookModule, store);
}

export { initializeModules, songBookModule };
