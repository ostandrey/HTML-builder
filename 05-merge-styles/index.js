const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist');

const stylesData = [];

fs.readdir(stylesPath, { withFileTypes: true }, (error, files) => {
  if (error) console.log(error);

  files.forEach((file) => {
    const fileExt = path.extname(file.name);
    if (fileExt === '.css') {
      let readableFile = fs.createReadStream(path.join(stylesPath, file.name));
      //   let writeableFile = fs.createWriteStream(distPath);

      readableFile.on('error', (error) => console.log(error.message));
      readableFile.on('data', callback);

      function callback(data) {
        const dataStringify = data.toString();
        console.log({ dataStringify });
        stylesData.push({ dataStringify });
      }
      console.log(stylesData);
    }
  });
});
