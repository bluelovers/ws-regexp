"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.char2pinyin_01 = exports.uni2pinyin_01 = exports.zhuyin2pinyin_01_table = void 0;
/**
 * Created by user on 2020/5/30.
 */
const uni2zhuyin_1 = __importDefault(require("./uni2zhuyin"));
const char2uni_1 = require("./char2uni");
/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_1」以調值(數字)呈現
 *
 * 第一個欄位：注音
 * 第二個欄位：漢語(han)
 * 第三個欄位：注音第二式(zuin2)
 * 第四個欄位：耶魯(yale)
 * 第五個欄位：韋式(wei)
 */
function zhuyin2pinyin_01_table() {
    return require('./cns/pinyin/pinyin_01.json');
}
exports.zhuyin2pinyin_01_table = zhuyin2pinyin_01_table;
/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_1」以調值(數字)呈現
 */
function uni2pinyin_01(uni) {
    let zhuyin = uni2zhuyin_1.default(uni);
    return zhuyin2pinyin_01_table()[zhuyin];
}
exports.uni2pinyin_01 = uni2pinyin_01;
/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_1」以調值(數字)呈現
 */
function char2pinyin_01(char) {
    return uni2pinyin_01(char2uni_1.char2uni(char));
}
exports.char2pinyin_01 = char2pinyin_01;
exports.default = uni2pinyin_01;
//# sourceMappingURL=uni2pinyin_01.js.map