const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }
}

function saveTable(table) {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, `${table.name}.json`);
  const data = {
    name: table.name,
    columns: table.columns,
    rows: table.rows.getAllValues(),
    nextId: table.nextId,
  };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function loadTable(name, TableClass) {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(filePath)) return null;
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const table = new TableClass(data.name, data.columns);
  data.rows.forEach(row => {
    table.rows.insert(row.id, row);
  });
  table.nextId = data.nextId;
  return table;
}

module.exports = { saveTable, loadTable };