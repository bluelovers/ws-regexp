#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const yargs_1 = tslib_1.__importDefault(require("yargs"));
const index_1 = require("../index");
const cli = yargs_1.default
    .usage(`npx cjk-conv-cli xxxx.txt */file*.txt **/doc*.txt`)
    .option('tw2cn', {
    description: `use tw2cn mode`,
    type: 'boolean',
})
    .option('cwd', {
    description: `The current working directory in which to search.`,
    normalize: true,
    type: 'string',
})
    .option('deep', {
    description: `The deep option can be set to true to traverse the entire directory structure, or it can be set to a number to only traverse that many levels deep.`,
})
    .option('file', {
    alias: ['f'],
    array: true,
    type: 'string',
    default: [],
})
    .option('createBackup', {
    description: `create a .old backup`,
    alias: ['b'],
    type: 'boolean',
})
    .option('createPatch', {
    description: `create a diff .patch file`,
    alias: ['p'],
    type: 'boolean',
})
    .option('notMin', {
    alias: ['m'],
    type: 'boolean',
})
    .option('unSafe', {
    alias: ['s'],
    type: 'boolean',
})
    .showHelpOnFail(true);
const argv = cli.argv;
let files = [
    ...argv.file,
    ...argv._,
];
(0, index_1.handldTarget)(files, {
    cwd: argv.cwd,
    tw2cn: argv.tw2cn,
    notMin: argv.notMin,
    unSafe: argv.unSafe,
    createBackup: argv.createBackup,
    createPatch: argv.createPatch,
    // @ts-ignore
    deep: argv.deep,
})
    .tapCatch(e => {
    cli.showHelp();
});
//# sourceMappingURL=cjk-conv-cli.js.map