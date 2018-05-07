"use strict";
/**
 * Created by user on 2018/5/7/007.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const japanese = require("japanese");
exports.list_range = [
    '〇一二三四五六七八九十'.split(''),
    '零一二三四五六七八九十'.split(''),
];
[
    ['common', '十'],
    ['formal', '十'],
    ['traditional', '拾'],
    ['traditionalOld', '拾'],
    ['simplified', '拾'],
    ['traditional', '什'],
    ['traditionalOld', '什'],
    ['simplified', '什'],
    ['chineseMilitary'],
].forEach(function (key) {
    let ls = japanese.predefineedTranscriptionConfigs.digits[key[0]];
    if (ls) {
        ls = Object.values(ls);
        if (key[1]) {
            ls.push(key[1]);
        }
        exports.list_range.push(ls);
    }
});
exports.default = exports.list_range;
