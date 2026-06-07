const { Table } = require("./table");
const { saveTable, loadTable } = require("./storage");

const tables = {};

function getTable(name) {
  if (tables[name]) return tables[name];
  const loaded = loadTable(name, Table);
  if (loaded) {
    tables[name] = loaded;
    return loaded;
  }
  return null;
}

function execute(query) {
  if (query.type === "CREATE") {
    const table = new Table(query.table, query.columns);
    tables[query.table.toLowerCase()] = table;
    saveTable(table);
    return `Table ${query.table} created.`;
  }

  if (query.type === "INSERT") {
    const table = getTable(query.table.toLowerCase());
    if (!table) return `Error: table ${query.table} does not exist.`;
    const row = table.insert(query.columns, query.values);
    saveTable(table);
    return row;
  }

  if (query.type === "SELECT") {
    const table = getTable(query.table.toLowerCase());
    if (!table) return `Error: table ${query.table} does not exist.`;
    return table.select(query.columns, query.where);
  }

  if (query.type === "DELETE") {
    const table = getTable(query.table.toLowerCase());
    if (!table) return `Error: table ${query.table} does not exist.`;
    const count = table.delete(query.where);
    saveTable(table);
    return `${count} row(s) deleted.`;
  }

  return "Error: unknown query type.";
}

module.exports = { execute };