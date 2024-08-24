"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printArray = printArray;
exports.printRecord = printRecord;
exports.printTypeKeys = printTypeKeys;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const array_hyper_unique_1 = require("array-hyper-unique");
function printArray(arrayTable, level) {
    (0, assert_1.default)(Array.isArray(arrayTable));
    let ls = [];
    let prepend = `\t`.repeat(level | 0);
    for (const v of arrayTable) {
        ls.push(`${prepend}\t${JSON.stringify(v)},`);
    }
    return ls;
}
function printRecord(data, level) {
    let ls = [];
    let prepend = `\t`.repeat(level | 0);
    for (const k in data) {
        ls.push(`${prepend}\t${JSON.stringify(k)}: ${JSON.stringify(data[k])},`);
    }
    return ls;
}
function printTypeKeys(data) {
    return (0, array_hyper_unique_1.array_unique)(data)
        .map(v => `'${v}'`)
        .join(' | ');
}
//# sourceMappingURL=print.js.map