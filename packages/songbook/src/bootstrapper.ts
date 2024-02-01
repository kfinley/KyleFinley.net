import { Container } from 'inversify-props';
import { ApiClient, apiClient } from '@kylefinley.net/api-client/src';
import { GetSheetData, GetSongs, SheetsToSongs } from './';

let moduleContainer: Container;

export function bootstrapper(container: Container) {

  moduleContainer = container;
  if (!container.isBound("ApiClient")) {
    container.bind<ApiClient>("ApiClient").to(apiClient);
  }
  container.bind<GetSheetData>("GetSheetData").to(GetSheetData);
  container.bind<SheetsToSongs>("SheetsToSongs").to(SheetsToSongs);
  container.bind<GetSongs>("GetSongs").to(GetSongs);
  
  // console.log('commands bootstrapper done', moduleContainer)
}

export { moduleContainer as container };
