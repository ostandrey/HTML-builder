const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'remplate.html');
const componentsPath = path.join(__dirname, 'components');
const assetsPath = path.join(__dirname, 'assets');
const dirPath = path.join(__dirname);

const writeableFile = fs.createWriteStream(`${distPath}\\styles.css`);

const bundleCss = () => {
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
};

const copyAssetsDir = () => {
  fs.cp(`${assetsPath}`, `${distPath}\\assets`, { recursive: true }, (error) => {
    if (error) console.error(error);
  });
};

const createDirectory = () => {
  fs.mkdir(distPath, (error) => {
    if (error) console.log(error);

    bundleCss();
    copyAssetsDir();
  });
};

bundleCss();
// createDirectory();
