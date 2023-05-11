const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist');

const writeableFile = fs.createWriteStream(distPath, 'project-dist', 'bundle.css');

fs.readdir(stylesPath, { withFileTypes: true }, (error, files) => {
  if (error) console.log(error);

  files.forEach((file) => {
    const fileExt = path.extname(file.name);
    if (fileExt === '.css') {
      let readableFile = fs.createReadStream(path.join(stylesPath, file.name));

      readableFile.on('error', (error) => console.log(error.message));

      readableFile.on('data', (data) => {
        const dataStringify = data.toString();
        writeableFile.write(dataStringify);
      });
    }
  });
});
