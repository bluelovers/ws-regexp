"use strict";
/**
 * Created by user on 2020/5/29.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
const zh_table_greedy_1 = require("@lazy-cjk/zh-table-greedy");
const list_1 = require("@lazy-cjk/zh-table-list/list");
/**
 * 用來標準化字串 作為排序用
 */
function slugify(input, options = {}, unsafe2) {
    if (typeof options === 'boolean') {
        [unsafe2, options] = [options, {}];
    }
    options = (options || {});
    options = {
        ...options,
        optionsZhTable: {
            safe: false,
            greedyTable: true,
            ...options.optionsZhTable,
        },
    };
    let k = unsafe2 ? (0, zh_table_greedy_1.greedyTableReplace)(input) : input;
    let arr = (0, list_1.charTableList)(k, options);
    return arr
        .reduce(function (s, a) {
        s.push(a[0]);
        return s;
    }, [])
        .join('');
}
exports.slugify = slugify;
exports.default = slugify;
//# sourceMappingURL=index.js.map