const fs = require('fs');
const dbFile = './db.bingo';

// key, lineNumber
let indexMap = new Map();

function start() {
  // Read file -> Load hashmap into memory
  fs.readFileSync(dbFile).toString().split('\n').forEach(function (line, index) {
    let tmpKey = line.split(/(.*)\|/)[1];
    let tmpContent = line.split(/(.*)\|/)[2];
    // Make sure they aren't undefined
    if (tmpKey && tmpContent) {
      indexMap.set(tmpKey, index);
    }
  });
}

async function add(key, content) {
  // TODO remove | and \n from key & content
  if (indexMap.has(key)) {
    console.error('err: Key already in database!');
  }
  else {
    fs.appendFileSync(dbFile, `${key}|${content}\n`);
    let lastIndex = await getLastIndex();
    indexMap.set(key, lastIndex);
    console.log(`Added ${key}|${content} to the DB\n`)
  }
}

function remove(key) {
  if (!indexMap.has(key)) {
    console.error('err: Key not in database!');
  }
  else {
    removeContentFromKey(key);
    console.log(`Removed element: ${key}\n`);
  }
}

async function get(key) {
  if (!indexMap.has(key)) {
    console.error('err: Key not in database!');
  }
  else {
    let content = await getContentFromKey(key);
    console.log(`Content from key: ${key}\n${content}\n`);
  }
}

function printIndexMap() {
  console.log(`IndexMap:`);
  console.log(indexMap);
  console.log('\n');
}

function printEntireFile() {
  console.log('Entire DB File:');
  fs.readFileSync(dbFile).toString().split('\n').forEach(function (line) {
    console.log(line);
  });
}

// Private Functions
function getLastIndex() {
  return new Promise(resolve => {
    const stream = fs.createReadStream(dbFile, { encoding: 'utf8' });
    let lastIndex;
    stream.on('data', data => {
      lastIndex = data.split(/\n/).length - 2;
      stream.destroy();
    });
    stream.on('close', () => {
      resolve(lastIndex);
    });
  });
}

function getContentFromKey(key) {
  return new Promise(resolve => {
    let specificContent;
    const stream = fs.createReadStream(dbFile, { encoding: 'utf8' });
    stream.on('data', data => {
      let lines = data.split(/\n/);
      let index = indexMap.get(key);
      specificContent = lines[index].split(/(.*)\|/)[2];
      stream.destroy();
    });
    stream.on('close', () => {
      resolve(specificContent);
    });
  });
}

function removeContentFromKey(key) {
  // Make new array of all content except the removed content
  let index = indexMap.get(key);
  let lines = fs.readFileSync(dbFile).toString().split('\n');
  lines.splice(index, 1);

  // Rewrite all to new file, feelsbadman...
  let newFile = fs.createWriteStream(dbFile);
  newFile.on('error', function(err){
    console.err('Error writing to the new DB file');
  });
  indexMap = new Map();
  lines.forEach(function(line, tmpIndex) {
    let tmpKey = line.split(/(.*)\|/)[1];
    let tmpContent = line.split(/(.*)\|/)[2];
    // Make sure they aren't undefined
    if (tmpKey && tmpContent) {
      indexMap.set(tmpKey, tmpIndex);
      newFile.write(`${line}\n`);
    }
  });
}

module.exports = {
  start,
  add,
  remove,
  get,
  printIndexMap,
  printEntireFile,
}
