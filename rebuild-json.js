"use strict";

const xml2js = require('xml2js');
const fs = require('fs');

async function rebuildJson(inputFile, outputFile) {
    let bytes = await fs.promises.readFile(inputFile, {});
    let opcodes = await xml2js.parseStringPromise(bytes.toString());
    await fs.promises.writeFile(outputFile, JSON.stringify(opcodes));
    console.log(inputFile + " => " + outputFile);
}

rebuildJson('./x86_64.xml', './x86_64.json');
