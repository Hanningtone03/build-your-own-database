# Build Your Own Database

A relational database engine built from scratch in Node.js — supports SQL queries, B-tree indexing, and disk persistence.

## How it works

Most developers use databases without understanding what happens when they run a query. This project implements that from scratch:

- Tokenizes and parses raw SQL strings into structured query objects
- Executes SELECT, INSERT, DELETE, and CREATE TABLE statements
- Stores and retrieves rows using a B-tree data structure
- Persists data to disk as JSON files so data survives restarts

## Project structure

```
src/
├── db.js
├── lexer.js
├── parser.js
├── executor.js
├── table.js
├── btree.js
└── storage.js
```

## Running locally

```bash
node src/db.js
```

## Supported SQL

| Statement | Example |
|-----------|---------|
| CREATE TABLE | `CREATE TABLE users (id INT, name TEXT, age INT)` |
| INSERT | `INSERT INTO users (name, age) VALUES ('John', 25)` |
| SELECT all | `SELECT * FROM users` |
| SELECT with filter | `SELECT * FROM users WHERE name = 'John'` |
| DELETE | `DELETE FROM users WHERE name = 'John'` |

## Tech

- Node.js
- `fs` module (disk persistence)
- `readline` module (REPL interface)
- No external dependencies
