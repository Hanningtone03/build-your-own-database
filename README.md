![CI](https://github.com/Hanningtone03/build-your-own-shell/actions/workflows/ci.yml/badge.svg)

# Build Your Own Shell

A Unix shell in Python — pipes, built-in commands, external program execution.

## How it works

A loop that reads a line, parses it into commands and arguments, handles pipes by connecting stdout to stdin across processes, and executes built-ins directly in the shell process.

## Project structure

```
src/
├── shell.py
├── parser.py
├── builtins.py
└── executor.py
```

## Running locally

```bash
python -m src.shell
```

## Supported

| Command | Example |
|---------|---------|
| echo | `echo hello world` |
| pwd | `pwd` |
| cd | `cd foldername` |
| clear | `clear` |
| exit | `exit` |
| pipes | `echo hello \| cat` |

## Tech

- Python 3
- `os`, `subprocess` modules
- No external dependencies
