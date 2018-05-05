"use strict";
/**
 * Created by user on 2018/5/5/005.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const cjk_conv_1 = require("cjk-conv");
//console.log(cjkConv.zhTable.auto('魯'));
function _word_zh_core(search, skip) {
    return search.replace(/[\u4E00-\u9FFFのと]/g, function (char) {
        if (skip && skip.indexOf(char) != -1) {
            return char;
        }
        let a = cjk_conv_1.default.zhTable.auto(char);
        return a.length > 1 ? '[' + a.join('') + ']' : a[0];
    });
}
exports._word_zh_core = _word_zh_core;
const self = require("./conv");
exports.default = self;