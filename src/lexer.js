function tokenize(sql) {
  const tokens = [];
  let i = 0;
  const input = sql.trim();

  while (i < input.length) {
    // skip whitespace
    if (/\s/.test(input[i])) {
      i++;
      continue;
    }

    // string literals
    if (input[i] === "'") {
      let str = "";
      i++;
      while (i < input.length && input[i] !== "'") {
        str += input[i++];
      }
      i++;
      tokens.push({ type: "STRING", value: str });
      continue;
    }

    // numbers
    if (/[0-9]/.test(input[i])) {
      let num = "";
      while (i < input.length && /[0-9.]/.test(input[i])) {
        num += input[i++];
      }
      tokens.push({ type: "NUMBER", value: num });
      continue;
    }

    // symbols
    if (/[=(),*;]/.test(input[i])) {
      tokens.push({ type: "SYMBOL", value: input[i] });
      i++;
      continue;
    }

    // keywords and identifiers
    if (/[a-zA-Z_]/.test(input[i])) {
      let word = "";
      while (i < input.length && /[a-zA-Z0-9_]/.test(input[i])) {
        word += input[i++];
      }
      const keywords = [
        "SELECT", "INSERT", "INTO", "VALUES", "DELETE",
        "FROM", "WHERE", "CREATE", "TABLE", "INT", "TEXT"
      ];
      const type = keywords.includes(word.toUpperCase()) ? "KEYWORD" : "IDENTIFIER";
      tokens.push({ type, value: word.toUpperCase() });
      continue;
    }

    i++;
  }

  return tokens;
}

module.exports = { tokenize };