const { tokenize } = require("./lexer");

function parse(sql) {
  const tokens = tokenize(sql);
  let i = 0;

  function peek() {
    return tokens[i];
  }

  function consume() {
    return tokens[i++];
  }

  function expect(value) {
    const token = consume();
    if (token.value.toUpperCase() !== value.toUpperCase()) {
      throw new Error(`Expected ${value} but got ${token.value}`);
    }
    return token;
  }

  const keyword = peek().value.toUpperCase();

  if (keyword === "SELECT") {
    consume();
    const columns = [];
    if (peek().value === "*") {
      consume();
      columns.push("*");
    } else {
      columns.push(consume().value);
      while (peek() && peek().value === ",") {
        consume();
        columns.push(consume().value);
      }
    }
    expect("FROM");
    const table = consume().value;
    let where = null;
    if (peek() && peek().value === "WHERE") {
      consume();
      const column = consume().value;
      expect("=");
      const value = consume().value;
      where = { column, value };
    }
    return { type: "SELECT", columns, table, where };
  }

  if (keyword === "INSERT") {
    consume();
    expect("INTO");
    const table = consume().value;
    expect("(");
    const columns = [];
    columns.push(consume().value);
    while (peek().value === ",") {
      consume();
      columns.push(consume().value);
    }
    expect(")");
    expect("VALUES");
    expect("(");
    const values = [];
    values.push(consume().value);
    while (peek().value === ",") {
      consume();
      values.push(consume().value);
    }
    expect(")");
    return { type: "INSERT", table, columns, values };
  }

  if (keyword === "DELETE") {
    consume();
    expect("FROM");
    const table = consume().value;
    let where = null;
    if (peek() && peek().value === "WHERE") {
      consume();
      const column = consume().value;
      expect("=");
      const value = consume().value;
      where = { column, value };
    }
    return { type: "DELETE", table, where };
  }

  if (keyword === "CREATE") {
    consume();
    expect("TABLE");
    const table = consume().value;
    expect("(");
    const columns = [];
    while (peek().value !== ")") {
      const name = consume().value;
      const type = consume().value;
      columns.push({ name, type });
      if (peek().value === ",") consume();
    }
    expect(")");
    return { type: "CREATE", table, columns };
  }

  throw new Error(`Unknown statement: ${keyword}`);
}

module.exports = { parse };