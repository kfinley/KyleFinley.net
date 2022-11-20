import { container } from './inversify.config';
import { bootstrapper as ghCommandsBootstrapper } from "@kylefinley.net/github-commands/src";

export default function bootstrapper() {

  console.log('Bootstrapper', process.env.NODE_ENV);

  ghCommandsBootstrapper(container);

  console.log("Bootstrapper Done");

  return container;
}

