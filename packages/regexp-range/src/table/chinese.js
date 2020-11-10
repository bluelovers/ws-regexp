"use strict";
/**
 * Created by user on 2018/5/7/007.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.list_range2 = exports.list_range = void 0;
const numbers_1 = require("@lazy-cjk/japanese/lib/data/numbers");
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
].forEach(function (key) {
    let ls = numbers_1.predefineedTranscriptionConfigs.digits[key[0]];
    if (ls) {
        ls = Object.values(ls);
        if (key[1]) {
            ls.push(key[1]);
        }
        exports.list_range.push(ls);
    }
});
exports.list_range2 = [];
[
    /**
     * [ '洞', '幺', '两', '三', '刀', '五', '六', '拐', '八', '勾' ]
     */
    ['chineseMilitary'],
    //['vietnam'],
].forEach(function (key) {
    let ls = numbers_1.predefineedTranscriptionConfigs.digits[key[0]];
    if (ls) {
        ls = Object.values(ls);
        if (key[1]) {
            ls.push(key[1]);
        }
        exports.list_range2.push(ls);
    }
});
exports.default = exports.list_range;
//# sourceMappingURL=chinese.js.map