import { Component } from "vue";

function buildArticles() {

  //TODO: Make this smarter... Currently very dumb and imports the json for every article

  const articles: Record<string, Component | (() => Promise<any>)> = {};

  const files = import.meta.glob('../articles/*.json');

  for (let file in files) {
    const article = file.split('/')[2].split('.')[0];
    const foo = () => import(/* webpackChunkName: "[request]" */ file.replace('json', 'md'));
    articles[article] = foo;
  }

  return articles
};

export default buildArticles();
