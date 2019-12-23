"use strict";

const xml2js = require('xml2js');
const fs = require('fs');

const opcodes = (async () => {
    let bytes = await fs.promises.readFile('./x86_64.xml', {});
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

module.exports = {
    opcodes,
    refByNames,
    refByOpcodes
};
