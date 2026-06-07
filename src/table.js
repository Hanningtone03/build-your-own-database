const { BTree } = require("./btree");

class Table {
  constructor(name, columns) {
    this.name = name;
    this.columns = columns;
    this.rows = new BTree();
    this.nextId = 1;
  }

  insert(columnNames, values) {
    const row = {};
    columnNames.forEach((col, i) => {
      row[col.toLowerCase()] = values[i];
    });
    row.id = this.nextId;
    this.rows.insert(this.nextId, row);
    this.nextId++;
    return row;
  }

  select(columns, where) {
    let rows = this.rows.getAllValues();
    if (where) {
      rows = rows.filter(row => {
        return String(row[where.column.toLowerCase()]) === String(where.value);
      });
    }
    if (columns[0] === "*") return rows;
    return rows.map(row => {
      const result = {};
      columns.forEach(col => {
        result[col.toLowerCase()] = row[col.toLowerCase()];
      });
      return result;
    });
  }

  delete(where) {
    const allRows = this.rows.getAllValues();
    const remaining = where
      ? allRows.filter(row => String(row[where.column.toLowerCase()]) !== String(where.value))
      : [];
    this.rows = new BTree();
    this.nextId = 1;
    remaining.forEach(row => {
      this.rows.insert(this.nextId, row);
      this.nextId++;
    });
    return allRows.length - remaining.length;
  }
}

module.exports = { Table };