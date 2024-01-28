import { Container } from 'inversify-props';
import { ApiClient, apiClient } from '@kylefinley.net/api-client/src';
import { GetSheetData } from "./";

let moduleContainer: Container;

export function bootstrapper(container: Container) {

  moduleContainer = container;
  container.bind<ApiClient>("ApiClient").to(apiClient);

  container.bind<GetSheetData>("GetSheetData").to(GetSheetData);
  
  // console.log('commands bootstrapper done', moduleContainer)
}

export { moduleContainer as container };
