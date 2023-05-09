const { log } = require('console');
const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
  if (error) console.log(error);

  files.forEach((file) => {
    const fileName = path.parse(file.name).name;

    const fileExt = path.extname(file.name);

    fs.stat(`${dirPath}\\${file.name}`, (error, stats) => {
      if (error) console.log(error);

      let fileSize = stats.size;

      console.log(`${fileName} - ${fileExt.slice(1, fileExt.length)} - ${fileSize}`);
    });
  });
});
