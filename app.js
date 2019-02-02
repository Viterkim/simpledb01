let db = require('./dbfunctions');
// db = start(), await add(), await get(), remove(), printEntireFile(), printIndexMap()

async function main() {
  db.start();
  await db.get('viktor');
  db.printEntireFile();
  db.printIndexMap();
  await db.add('dennye', 'gaadinvej');
  db.printEntireFile();
  db.printIndexMap();
  db.remove('dennye');
  db.printEntireFile();
  db.printIndexMap();
}

main();
