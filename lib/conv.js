"use strict";
/**
 * Created by user on 2018/5/5/005.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const zhTable = require("cjk-conv/lib/zh/table/index");
//console.log(cjkConv.zhTable.auto('魯'));
function zhTableAutoGreedyTable(s, options = {}) {
    // @ts-ignore
    options.greedyTable = true;
    return zhTable.auto(s, options);
}
exports.zhTableAutoGreedyTable = zhTableAutoGreedyTable;
function _word_zh_core(search, skip, zhTableFn = zhTable.auto) {
    return search.replace(/[\u4E00-\u9FFF\u{20000}-\u{2FA1F}のと]/ug, function (char) {
        if (skip && skip.indexOf(char) != -1) {
            return char;
        }
        let a = zhTableFn(char);
        return a.length > 1 ? '[' + a.join('') + ']' : a[0];
    });
}
exports._word_zh_core = _word_zh_core;
function _word_zh_core2(search, skip, zhTableFn = zhTable.auto) {
    return search.replace(/[\u4E00-\u9FFF\u{20000}-\u{2FA1F}のと]/ug, function (char) {
        if (skip && skip.indexOf(char) != -1) {
            return char;
        }
        let a = zhTableFn(char);
        return a.join('');
    });
}
exports._word_zh_core2 = _word_zh_core2;
exports.default = exports;
