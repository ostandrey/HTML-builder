const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const assetsPath = path.join(__dirname, 'assets');
const dirPath = path.join(__dirname);

const bundleHtml = () => {
  const writeableHtml = fs.createWriteStream(`${distPath}\\template.html`);
  const readableHtml = fs.createReadStream(templatePath, 'utf8');

  let headerData = '';
  let articlesData = '';
  let footerData = '';

  let replacedData = '';

  readableHtml.on('data', (data) => {
    const dataStringify = data.toString();

    fs.readdir(componentsPath, { withFileTypes: true }, (error, files) => {
      if (error) console.log(error);

      files.map((file) => {
        const fileExt = path.extname(file.name);
        if (fileExt === '.html') {
          let readableFile = fs.createReadStream(path.join(componentsPath, file.name));

          readableFile.on('error', (error) => console.log(error.message));
          console.log(file.name);

          if (file.name === 'header.html') {
            readableFile.on('data', (data) => {
              const fileDataStringify = data.toString();

              //   headerData += dataStringify.replace('{{header}}', fileDataStringify);
              headerData += fileDataStringify;
              //   console.log(replacedData);
              //   writeableHtml.write(replacedData);
            });

            readableFile.on('end', () => {
              writeableHtml.write(dataStringify.replace('{{header}}', headerData));
            });
          } else if (file.name === 'articles.html') {
            readableFile.on('data', (data) => {
              const fileDataStringify = data.toString();

              articlesData += fileDataStringify;
              //   replacedData += dataStringify.replace('{{articles}}', fileDataStringify);

              //   writeableHtml.write(replacedData);
            });
            readableFile.on('end', () => {
              writeableHtml.write(dataStringify.replace('{{articles}}', articlesData));
            });
          } else if (file.name === 'footer.html') {
            readableFile.on('data', (data) => {
              const fileDataStringify = data.toString();

              footerData += fileDataStringify;

              //   writeableHtml.write(replacedData);
            });

            readableFile.on('end', () => {
              writeableHtml.write(dataStringify.replace('{{footer}}', footerData));
            });
          }
        }
      });
    });
  });
};

const bundleCss = () => {
  fs.readdir(stylesPath, { withFileTypes: true }, (error, files) => {
    if (error) console.log(error);

    const writeableCss = fs.createWriteStream(`${distPath}\\styles.css`);

    files.forEach((file) => {
      const fileExt = path.extname(file.name);
      if (fileExt === '.css') {
        let readableFile = fs.createReadStream(path.join(stylesPath, file.name));

        readableFile.on('error', (error) => console.log(error.message));

        readableFile.on('data', (data) => {
          const dataStringify = data.toString();
          writeableCss.write(dataStringify);
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

    bundleHtml();
    bundleCss();
    copyAssetsDir();
  });
};

createDirectory();
