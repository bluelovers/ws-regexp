#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../"));
let args = process.argv.slice(2);
let flags = '';
if (args.length && args[0][0] === '-') {
    flags = args.shift().slice(1);
}
if (args.length === 0) {
    console.log('Usage: regexgen [-gimuy] string1 string2 string3...');
    process.exit(1);
}
console.log(__1.default(args, flags));
//# sourceMappingURL=cli.js.map