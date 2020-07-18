"use strict";
/**
 * Created by user on 2018/6/10/010.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auto = exports.jp = exports.cn = exports.tw = void 0;
const jp_table_convert_1 = require("@lazy-cjk/jp-table-convert");
const zh_table_alias_1 = __importDefault(require("@lazy-cjk/zh-table-alias"));
const jp_table_alias_1 = __importDefault(require("@lazy-cjk/jp-table-alias"));
const zh_table_greedy_1 = require("@lazy-cjk/zh-table-greedy");
const util_1 = require("./lib/util");
__exportStar(require("./lib/types"), exports);
/**
 * 取出此漢字所對應的繁漢字
 * @type {(char: string, options?: IOptions) => string[]}
 */
exports.tw = util_1._wrapFn('tw');
/**
 * 取出此漢字所對應的簡漢字
 * @type {(char: string, options?: IOptions) => string[]}
 */
exports.cn = util_1._wrapFn('cn');
/**
 * 取出此漢字所對應的日漢字
 * @type {(char: string, options?: IOptions) => string[]}
 */
exports.jp = util_1._wrapFn('jp');
/**
 * 自動取出此漢字所對應的簡繁日漢字
 *
 * @param {string} char
 * @param {IOptions} options
 * @returns {string[]}
 */
function auto(char, options = {}) {
    if (!char) {
        return null;
    }
    if (options.skip && options.skip.indexOf(char) != -1) {
        return [char];
    }
    let jt = jp_table_convert_1.jp2zht(char);
    let js = jp_table_convert_1.jp2zhs(char);
    let greedyTable = options.greedyTable | 0;
    let a = util_1._get([], char, zh_table_alias_1.default.tw(char, options), zh_table_alias_1.default.cn(char, options), (!options.skip || options.skip.indexOf(jt) == -1) && zh_table_alias_1.default.cn(jt, options), (!options.skip || options.skip.indexOf(js) == -1) && zh_table_alias_1.default.tw(js, options), zh_table_alias_1.default.jp(char, options), (greedyTable && jp_table_convert_1.cjk2jp(char)), (greedyTable && jp_table_convert_1.cjk2zhs(char)), (greedyTable && jp_table_convert_1.cjk2zht(char)), (greedyTable && jp_table_alias_1.default.zh2jp(char, {
        safe: greedyTable <= 1
    })), (greedyTable && jp_table_alias_1.default.jp2zh(char, {
        safe: greedyTable <= 1
    })), (greedyTable > 1 && zh_table_greedy_1.greedyTableCharArray(char)));
    /*
    if (!skip || skip.indexOf(jt) == -1)
    {
        a = a.concat(...cn(jt));
    }
    if (!skip || skip.indexOf(js) == -1)
    {
        a = a.concat(...tw(js));
    }

    if (zhtw_convert.table_jp[char])
    {
        a = a.concat(jp(char));
    }

    a = array_unique(a);
    a.sort();
    */
    return a;
}
exports.auto = auto;
exports.default = exports;
//# sourceMappingURL=index.js.map