const ghpages = require('gh-pages');
const path = require('path');
const pug = require('pug');
const fs = require('fs');

const indexPugPath = path.join(__dirname, '../server/views/index.pug');
const indexHTMLPath = path.join(__dirname, '../client/dist');
// synchronous because this is a build script and need to know explicitly when it finishes
const viewIndexPath = path.join(indexHTMLPath, 'index.html');
const view404Path = path.join(indexHTMLPath, '404.html');
const compiledFunction = pug.compileFile(indexPugPath);
fs.writeFileSync(viewIndexPath, compiledFunction({ env: { env: 'gh-pages' } }));
fs.writeFileSync(view404Path, compiledFunction({ env: { env: 'gh-pages' } }));

ghpages.publish(path.join(__dirname, '../client/dist'), () => {
  console.log('deployment to gh-pages complete!');
});
