const readline = require("readline");
const { parse } = require("./parser");
const { execute } = require("./executor");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt() {
  rl.question("db > ", (input) => {
    const sql = input.trim();
    if (!sql) return prompt();
    if (sql.toLowerCase() === "exit") {
      console.log("Bye.");
      rl.close();
      return;
    }
    try {
      const query = parse(sql);
      const result = execute(query);
      if (Array.isArray(result)) {
        if (result.length === 0) {
          console.log("No rows found.");
        } else {
          console.table(result);
        }
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log("Error:", err.message);
    }
    prompt();
  });
}

console.log("Database engine ready. Type SQL or 'exit'.");
prompt();