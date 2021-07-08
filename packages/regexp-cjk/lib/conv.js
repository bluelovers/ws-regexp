"use strict";
/**
 * Created by user on 2018/5/5/005.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._word_zh_core2 = exports._word_zh_core = exports.zhTableAutoGreedyTable = void 0;
const zh_table_list_1 = require("@lazy-cjk/zh-table-list");
const util_1 = require("./util");
//console.log(cjkConv.zhTable.auto('魯'));
function zhTableAutoGreedyTable(s, options = {}) {
    if (true || options.greedyTable > 1) {
        options.safe = false;
    }
    options.greedyTable = options.greedyTable || true;
    return (0, zh_table_list_1.auto)(s, options);
}
exports.zhTableAutoGreedyTable = zhTableAutoGreedyTable;
function _word_zh_core(search, skip, zhTableFn = zh_table_list_1.auto, options = {}) {
    let opts;
    if (options.unsafe || true) {
        opts = {
            // @ts-ignore
            greedyTable: options.greedyTable,
            safe: false,
        };
    }
    return search.replace((0, util_1._re_cjk_conv)('ug'), function (char) {
        if (skip && skip.indexOf(char) != -1) {
            return char;
        }
        let a = zhTableFn(char, opts);
        return a.length > 1 ? '[' + a.join('') + ']' : a[0];
    });
}
exports._word_zh_core = _word_zh_core;
function _word_zh_core2(search, skip, zhTableFn = zh_table_list_1.auto, options = {}) {
    let opts;
    if (options.unsafe || true) {
        opts = {
            // @ts-ignore
            greedyTable: options.greedyTable,
            safe: false,
        };
    }
    return search.replace((0, util_1._re_cjk_conv)('ug'), function (char) {
        if (skip && skip.indexOf(char) != -1) {
            return char;
        }
        let a = zhTableFn(char, opts);
        return a.join('');
    });
}
exports._word_zh_core2 = _word_zh_core2;
//# sourceMappingURL=conv.js.map