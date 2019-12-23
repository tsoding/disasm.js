const xml2js = require('xml2js');
const fs = require('fs');

// opcodes.InstructionSet.Instruction.map(x => x.InstructionForm.)

module.exports = {
    readXml: path =>
        fs.promises.readFile(path)
        .then(bytes => xml2js.parseStringPromise(bytes.toString())),
    refByNames: opcodes => {
        let result = {};
        opcodes.InstructionSet.Instruction.forEach(
            x => result[x.$.name] = x
        );
        return result;
    },
    refByOpcodes: opcodes => {
        let result = {};

        opcodes.InstructionSet.Instruction.forEach(
            x => x.InstructionForm.forEach(
                form => form.Encoding[0]
            )
        );

        return result;
    }InstructionForm[2].Encoding[""0""].Opcode
};
