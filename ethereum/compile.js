const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");
// clear build path
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const soaPath = path.resolve(__dirname, "contracts", "SmartHOA.sol");
const source = fs.readFileSync(soaPath, "utf8");
// compiled the read in source code
const output = solc.compile(source, 1).contracts;
// recreate build path
fs.ensureDirSync(buildPath);
console.log(output);
for(let contract in output){
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(":", "") + ".json"),
        output[contract]
    );
}