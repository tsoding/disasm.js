"use strict";

const xml2js = require('xml2js');
const fs = require('fs');

const opcodes = (async () => {
    let bytes = fs.readFileSync('./x86_64.xml', {});
    let allOpcodes = await xml2js.parseStringPromise(bytes.toString());
    return allOpcodes.InstructionSet.Instruction;
})();

const refByNames = (async () => {
    let result = {};
    (await opcodes).forEach(opcode => result[opcode.$.name] = opcode);
    return result;
})();

const refByOpcodes = (async () => {
    let result = {};

    (await opcodes).forEach(
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

(async () => {
    if (process.argv.length < 3) {
        console.error("Usage: node index.js <binary-file>");
        process.exit(-1);
    }

    let fileName = process.argv[2];
    let refByOpcodes_ = await refByOpcodes;
    let bytes = await fs.promises.readFile(fileName, {});
    const frame = 1;
    for (let i = 0; i < bytes.length; i += 1) {
        if (i + frame - 1 >= bytes.length) continue;

        let byteKey = '';
        for (let j = 0; j < frame; ++j) byteKey += intToByKey(bytes[i + j]);

        if (typeof(refByOpcodes_[byteKey]) !== "undefined") {
            console.log(byteKey + ': ' + refByOpcodes_[byteKey].$['go-name']);
        } else {
            console.log(byteKey + ': undefined');
        }
    }
})();
