const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname);

const copyDir = (() => {
  fs.cp(`${dirPath}\\files`, `${dirPath}\\files-copy`, { recursive: true }, (error) => {
    if (error) console.error(error);
  });
})();
