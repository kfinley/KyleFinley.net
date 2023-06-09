
const { execSync } = require('child_process');
const path = require('path');

const tsFiles = ['scripts/generateArticles.ts', 'scripts/preCommit.ts'];

console.log('Compiling TypeScript files...')
tsFiles.forEach((file) => {
  console.log(file);
  execSync(`tsc ${file}`, { encoding: 'utf8' });
});
