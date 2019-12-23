const xml2js = require('xml2js');
const fs = require('fs');

const opcodes = (async () => {
    let bytes = await fs.promises.readFile('./x86_64.xml', {});
    return await xml2js.parseStringPromise(bytes.toString());
})();

const refByNames = (async () =>
    (await opcodes).InstructionSet.Instruction.reduce((result, x) => {
        result[x.$.name] = x;
        return result;
    }, {})
)();

const refByOpcodes = (async () => {
    let result = {};
    (await opcodes).InstructionSet.Instruction.forEach(
        instr => instr.InstructionForm.forEach(
            form => result[form.Encoding[0].Opcode.map(opcode => opcode.$.byte).join('')] = instr
        )
    );
    return result;
})();

module.exports = {
    opcodes,
    refByNames,
    refByOpcodes
};
