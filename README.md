# disasm.js

Disassmebler in JavaScript because C is old and obsolete

**WARNING! This project is not in any way a useful product. It's a
result of "Farting Around" just for the sake of it. Nothing works the
way you'd expect it.**

## Dependencies

- [node v13.5.0+](https://nodejs.org/)
- [nasm](https://www.nasm.us/)

## Quick Start

```console
$ npm install
$ node --experimental-repl-await
> disasm = require('.')
> opcodes = await disasm.opcodes   # access the opcode "database"
```

## Building Test Example

```console
$ nasm test.asm
$ hexdump -C test
```

## Opcodes

Opcodes are stolen from: https://github.com/Maratyszcza/Opcodes
