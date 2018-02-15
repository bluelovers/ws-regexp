"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _table_cn2tw = require("chinese_convert/cn2tw");
const _table_tw2cn = require("chinese_convert/tw2cn");
const chinese_convert_1 = require("chinese_convert");
exports.table_cn2tw = Object.assign(_table_cn2tw, {
    '恶': '惡',
});
exports.table_tw2cn = Object.assign(_table_tw2cn, {});
function cn2tw(text) {
    return chinese_convert_1.cn2tw(text);
}
exports.cn2tw = cn2tw;
function tw2cn(text) {
    return chinese_convert_1.tw2cn(text);
}
exports.tw2cn = tw2cn;
const self = require("./convert");
exports.default = self;
