const fs = require('fs');
const { stdin, stdout } = process;
const path = require('path');

const dirPath = path.join(__dirname, 'text.txt');

let writeableStream = fs.createWriteStream(dirPath);

writeableStream.on('error', (error) => console.log(error.message));

stdout.write(
  'Hello!\nRight what you want!\n*To stop typing and save changes, please type "exit" or "Ctrl + C"*\n',
);

stdin.on('data', (data) => {
  const dataStringify = data.toString();

  writeableStream.write(dataStringify);

  if (dataStringify.trim() === 'exit') {
    process.exit();
  }
});

process.on('exit', () => stdout.write('\nGood luck!'));
