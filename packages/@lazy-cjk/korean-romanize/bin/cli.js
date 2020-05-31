#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const romanize_1 = require("../lib/romanize");
const { argv } = process;
const output = argv
    .slice(2)
    .map(romanize_1.romanize)
    .join(" ");
console.log(output);
//# sourceMappingURL=cli.js.map