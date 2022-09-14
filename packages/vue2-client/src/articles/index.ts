const metaFiles = import.meta.glob('../articles/*.json');

function buildArticles() {

  //TODO: Make this smarter... Currently very dumb and imports the json for every article

  const articles: Record<string, string> = {};

  for (let file in metaFiles) {
    const article = file.split('/')[2].split('.')[0];
    articles[article] = file.replace('.json', '');
  }

  return articles
};

const articles = buildArticles();

export {
  metaFiles
};

export default articles;
