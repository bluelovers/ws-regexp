"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jp = jp;
exports.tw = tw;
exports.cn = cn;
const core_1 = require("./lib/util/core");
const table_1 = require("./lib/table");
const raw_1 = require("./lib/table/raw");
const zh_convert_1 = require("@lazy-cjk/zh-convert");
function jp(char, options = {}) {
    let a = [];
    a = (0, core_1._get)(a, table_1.table_jp[char]);
    return a;
}
function tw(char, options = {}) {
    let a = [];
    a = (0, core_1._get)(a, raw_1._table_tw[char], (0, zh_convert_1.cn2tw)(char, options));
    //console.log('cn2tw', char, a);
    return a;
}
function cn(char, options = {}) {
    let a = [];
    a = (0, core_1._get)(a, table_1._table_cn[char], (0, zh_convert_1.tw2cn)(char, options));
    //console.log('tw2cn', char, a);
    return a;
}
exports.default = exports;
//# sourceMappingURL=index.js.map