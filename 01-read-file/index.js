const fs = require('fs');
const path = require('path');
const { stdout } = process;

const dirPath = path.join(__dirname, 'text.txt');

const readableStream = fs.createReadStream(dirPath);

readableStream.on('error', (error) => console.log(error.message));

readableStream.on('data', (data) => stdout.write(data));
