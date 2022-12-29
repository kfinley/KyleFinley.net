const metaFiles = import.meta.glob('../articles/**/*.json');

function buildArticles() {

  //TODO: Make this smarter... Currently very dumb and imports the json for every article

  const articles: Record<string, string> = {};

  for (let file in metaFiles) {
    // console.log('file', file);
    let article;
    const fileSplit = file.split('/');
    if (fileSplit.length == 3)
      article = `${file.split('/')[2].split('.')[0]}`;
    else
      article = `${file.split('/')[2]}/${file.split('/')[3].split('.')[0]}`;

    articles[article] = file.replace('.json', '');
  }

  return articles
};

const articles = buildArticles();

export {
  metaFiles
};

export default articles;
