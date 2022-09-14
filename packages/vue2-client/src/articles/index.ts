import { Component } from "vue";

function buildArticles() {

  //TODO: Make this smarter... Currently very dumb and imports the json for every article

  const articles: Record<string, string> = {};

  const files = import.meta.glob('../articles/*.json');

  for (let file in files) {
    const article = file.split('/')[2].split('.')[0];
    //const foo = () => import(/* webpackChunkName: "[request]" */ file.replace('json', 'md'));
    articles[article] = file.replace('json', 'md');
  }

  return articles
};

export default buildArticles();
