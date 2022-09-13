import { Component } from "vue";

function buildArticles() {

  const articles: Record<string, Component | any> = {};

  const files = import.meta.glob('../articles/*.md');

  for (let file in files) {
    const article = file.split('/')[2].split('.')[0];
    articles[article] = () => import(/* @vite-ignore */ /* webpackChunkName: "[request]" */ file);
  }

  return articles
};

export default buildArticles();
