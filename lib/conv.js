"use strict";
/**
 * Created by user on 2018/5/5/005.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const cjk_conv_1 = require("cjk-conv");
//console.log(cjkConv.zhTable.auto('魯'));
function _word_zh_core(search, skip, zhTable = cjk_conv_1.default.zhTable.auto) {
    return search.replace(/[\u4E00-\u9FFF\u{20000}-\u{2FA1F}のと]/ug, function (char) {
        if (skip && skip.indexOf(char) != -1) {
            return char;
        }
        let a = zhTable(char);
        return a.length > 1 ? '[' + a.join('') + ']' : a[0];
    });
}
exports._word_zh_core = _word_zh_core;
function _word_zh_core2(search, skip, zhTable = cjk_conv_1.default.zhTable.auto) {
    return search.replace(/[\u4E00-\u9FFF\u{20000}-\u{2FA1F}のと]/ug, function (char) {
        if (skip && skip.indexOf(char) != -1) {
            return char;
        }
        let a = zhTable(char);
        return a.join('');
    });
}
exports._word_zh_core2 = _word_zh_core2;
const self = require("./conv");
exports.default = self;
