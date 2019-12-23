# disasm.js

Disassmebler in JavaScript because C is old and obsolete

## Quick Start

node v13.5.0+

```console
$ npm install
$ node --experimental-repl-await
> disasm = require('.')
> opcodes = await disasm.opcodes   # access the opcode "database"
```

## Opcodes

Opcodes are stolen from: https://github.com/Maratyszcza/Opcodes
