"use strict";

const fs = require('fs');
const x86_64 = require('./x86_64.json');

const refByNames = (() => {
    let result = {};
    x86_64.InstructionSet.Instruction.forEach(opcode => result[opcode.$.name] = opcode);
    return result;
})();

const refByOpcodes = (() => {
    let result = {};

    x86_64.InstructionSet.Instruction.forEach(
        opcode => opcode.InstructionForm.forEach(
            form => {
                // NOTE: ignore commands from "special" ISAs
                if (typeof(form.ISA) === "undefined") {
                    form.Encoding.forEach(
                        enc => result[enc.Opcode.map(x => x.$.byte).join('')] = form
                    );
                }
            }
        )
    );

    return result;
})();

function intToByKey(x) {
    let result = x.toString(16).toUpperCase();
    if (result.length == 1) result = '0' + result;
    return result;
}

(() => {
    if (process.argv.length < 3) {
        console.error("Usage: node index.js <binary-file>");
        process.exit(-1);
    }

    let fileName = process.argv[2];
    let bytes = fs.readFileSync(fileName, {});
    const frame = 1;
    for (let i = 0; i < bytes.length; i += 1) {
        if (i + frame - 1 >= bytes.length) continue;

        let byteKey = '';
        for (let j = 0; j < frame; ++j) byteKey += intToByKey(bytes[i + j]);

        if (typeof(refByOpcodes[byteKey]) !== "undefined") {
            console.log(byteKey + ': ' + refByOpcodes[byteKey].$['go-name']);
        } else {
            console.log(byteKey + ': undefined');
        }
    }
})();
