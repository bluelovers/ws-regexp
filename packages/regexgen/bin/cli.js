#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = tslib_1.__importDefault(require("../"));
let args = process.argv.slice(2);
let flags = '';
if (args.length && args[0][0] === '-') {
    flags = args.shift().slice(1);
}
if (args.length === 0) {
    console.log('Usage: regexgen [-gimuy] string1 string2 string3...');
    process.exit(1);
}
console.log((0, __1.default)(args, flags));
//# sourceMappingURL=cli.js.map