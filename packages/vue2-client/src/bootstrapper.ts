import { container } from './inversify.config';
import { bootstrapper as ghCommandsBootstrapper } from "@kylefinley.net/github-commands/src/";
import { Store } from "vuex";

export default function bootstrapper(store: Store<any>) {

  console.log('Bootstrapper', process.env.NODE_ENV);

  ghCommandsBootstrapper(container);

  console.log("Bootstrapper Done", container);

  return container;
}

