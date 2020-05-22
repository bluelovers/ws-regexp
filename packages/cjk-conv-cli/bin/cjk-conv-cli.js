#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const index_1 = require("../index");
const cli = yargs
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
index_1.handldTarget(files, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2prLWNvbnYtY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2prLWNvbnYtY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLCtCQUFnQztBQUNoQyxvQ0FBd0M7QUFHeEMsTUFBTSxHQUFHLEdBQUcsS0FBSztLQUNmLEtBQUssQ0FBQyxtREFBbUQsQ0FBQztLQUMxRCxNQUFNLENBQUMsT0FBTyxFQUFFO0lBQ2hCLFdBQVcsRUFBRSxnQkFBZ0I7SUFDN0IsSUFBSSxFQUFFLFNBQVM7Q0FDZixDQUFDO0tBQ0QsTUFBTSxDQUFDLEtBQUssRUFBRTtJQUNkLFdBQVcsRUFBRSxtREFBbUQ7SUFDaEUsU0FBUyxFQUFFLElBQUk7SUFDZixJQUFJLEVBQUUsUUFBUTtDQUNkLENBQUM7S0FDRCxNQUFNLENBQUMsTUFBTSxFQUFFO0lBQ2YsV0FBVyxFQUFFLHFKQUFxSjtDQUNsSyxDQUFDO0tBQ0QsTUFBTSxDQUFDLE1BQU0sRUFBRTtJQUNmLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUNaLEtBQUssRUFBRSxJQUFJO0lBQ1gsSUFBSSxFQUFFLFFBQVE7SUFDZCxPQUFPLEVBQUUsRUFBRTtDQUNYLENBQUM7S0FDRCxNQUFNLENBQUMsY0FBYyxFQUFFO0lBQ3ZCLFdBQVcsRUFBRSxzQkFBc0I7SUFDbkMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDO0lBQ1osSUFBSSxFQUFFLFNBQVM7Q0FDZixDQUFDO0tBQ0QsTUFBTSxDQUFDLGFBQWEsRUFBRTtJQUN0QixXQUFXLEVBQUUsMkJBQTJCO0lBQ3hDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUNaLElBQUksRUFBRSxTQUFTO0NBQ2YsQ0FBQztLQUNELE1BQU0sQ0FBQyxRQUFRLEVBQUU7SUFDakIsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDO0lBQ1osSUFBSSxFQUFFLFNBQVM7Q0FDZixDQUFDO0tBQ0QsTUFBTSxDQUFDLFFBQVEsRUFBRTtJQUNqQixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUM7SUFDWixJQUFJLEVBQUUsU0FBUztDQUNmLENBQUM7S0FDRCxjQUFjLENBQUMsSUFBSSxDQUFDLENBQ3JCO0FBRUQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztBQUV0QixJQUFJLEtBQUssR0FBRztJQUNYLEdBQUcsSUFBSSxDQUFDLElBQUk7SUFDWixHQUFHLElBQUksQ0FBQyxDQUFDO0NBQ1QsQ0FBQztBQUVGLG9CQUFZLENBQUMsS0FBSyxFQUFFO0lBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztJQUNiLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztJQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07SUFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO0lBQ25CLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtJQUMvQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7SUFDN0IsYUFBYTtJQUNiLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtDQUNmLENBQUM7S0FDQSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDYixHQUFHLENBQUMsUUFBUSxFQUFFLENBQUE7QUFDZixDQUFDLENBQUMsQ0FDRiIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0IHlhcmdzID0gcmVxdWlyZSgneWFyZ3MnKTtcbmltcG9ydCB7IGhhbmRsZFRhcmdldCB9IGZyb20gJy4uL2luZGV4JztcblxuXG5jb25zdCBjbGkgPSB5YXJnc1xuXHQudXNhZ2UoYG5weCBjamstY29udi1jbGkgeHh4eC50eHQgKi9maWxlKi50eHQgKiovZG9jKi50eHRgKVxuXHQub3B0aW9uKCd0dzJjbicsIHtcblx0XHRkZXNjcmlwdGlvbjogYHVzZSB0dzJjbiBtb2RlYCxcblx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdH0pXG5cdC5vcHRpb24oJ2N3ZCcsIHtcblx0XHRkZXNjcmlwdGlvbjogYFRoZSBjdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5IGluIHdoaWNoIHRvIHNlYXJjaC5gLFxuXHRcdG5vcm1hbGl6ZTogdHJ1ZSxcblx0XHR0eXBlOiAnc3RyaW5nJyxcblx0fSlcblx0Lm9wdGlvbignZGVlcCcsIHtcblx0XHRkZXNjcmlwdGlvbjogYFRoZSBkZWVwIG9wdGlvbiBjYW4gYmUgc2V0IHRvIHRydWUgdG8gdHJhdmVyc2UgdGhlIGVudGlyZSBkaXJlY3Rvcnkgc3RydWN0dXJlLCBvciBpdCBjYW4gYmUgc2V0IHRvIGEgbnVtYmVyIHRvIG9ubHkgdHJhdmVyc2UgdGhhdCBtYW55IGxldmVscyBkZWVwLmAsXG5cdH0pXG5cdC5vcHRpb24oJ2ZpbGUnLCB7XG5cdFx0YWxpYXM6IFsnZiddLFxuXHRcdGFycmF5OiB0cnVlLFxuXHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdGRlZmF1bHQ6IFtdLFxuXHR9KVxuXHQub3B0aW9uKCdjcmVhdGVCYWNrdXAnLCB7XG5cdFx0ZGVzY3JpcHRpb246IGBjcmVhdGUgYSAub2xkIGJhY2t1cGAsXG5cdFx0YWxpYXM6IFsnYiddLFxuXHRcdHR5cGU6ICdib29sZWFuJyxcblx0fSlcblx0Lm9wdGlvbignY3JlYXRlUGF0Y2gnLCB7XG5cdFx0ZGVzY3JpcHRpb246IGBjcmVhdGUgYSBkaWZmIC5wYXRjaCBmaWxlYCxcblx0XHRhbGlhczogWydwJ10sXG5cdFx0dHlwZTogJ2Jvb2xlYW4nLFxuXHR9KVxuXHQub3B0aW9uKCdub3RNaW4nLCB7XG5cdFx0YWxpYXM6IFsnbSddLFxuXHRcdHR5cGU6ICdib29sZWFuJyxcblx0fSlcblx0Lm9wdGlvbigndW5TYWZlJywge1xuXHRcdGFsaWFzOiBbJ3MnXSxcblx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdH0pXG5cdC5zaG93SGVscE9uRmFpbCh0cnVlKVxuO1xuXG5jb25zdCBhcmd2ID0gY2xpLmFyZ3Y7XG5cbmxldCBmaWxlcyA9IFtcblx0Li4uYXJndi5maWxlLFxuXHQuLi5hcmd2Ll8sXG5dO1xuXG5oYW5kbGRUYXJnZXQoZmlsZXMsIHtcblx0Y3dkOiBhcmd2LmN3ZCxcblx0dHcyY246IGFyZ3YudHcyY24sXG5cdG5vdE1pbjogYXJndi5ub3RNaW4sXG5cdHVuU2FmZTogYXJndi51blNhZmUsXG5cdGNyZWF0ZUJhY2t1cDogYXJndi5jcmVhdGVCYWNrdXAsXG5cdGNyZWF0ZVBhdGNoOiBhcmd2LmNyZWF0ZVBhdGNoLFxuXHQvLyBAdHMtaWdub3JlXG5cdGRlZXA6IGFyZ3YuZGVlcCxcbn0pXG5cdC50YXBDYXRjaChlID0+IHtcblx0XHRjbGkuc2hvd0hlbHAoKVxuXHR9KVxuO1xuIl19