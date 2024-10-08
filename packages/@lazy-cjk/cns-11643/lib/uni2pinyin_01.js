"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zhuyin2pinyin_01_table = zhuyin2pinyin_01_table;
exports.zhuyin2pinyin_01 = zhuyin2pinyin_01;
exports.uni2pinyin_01 = uni2pinyin_01;
exports.uni2pinyinTypeValue_01 = uni2pinyinTypeValue_01;
exports.char2pinyin_01 = char2pinyin_01;
exports.char2pinyinTypeValue_01 = char2pinyinTypeValue_01;
const tslib_1 = require("tslib");
/**
 * Created by user on 2020/5/30.
 */
const uni2zhuyin_1 = tslib_1.__importDefault(require("./uni2zhuyin"));
const char2uni_1 = require("./char2uni");
const uni2zhuyin_2 = require("./util/uni2zhuyin");
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
function zhuyin2pinyin_01(zhuyin) {
    return zhuyin2pinyin_01_table()[zhuyin];
}
/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_1」以調值(數字)呈現
 */
function uni2pinyin_01(uni) {
    let zhuyin = (0, uni2zhuyin_1.default)(uni);
    return zhuyin2pinyin_01_table()[zhuyin];
}
function uni2pinyinTypeValue_01(uni, pinyinType) {
    pinyinType = (0, uni2zhuyin_2.handlePinyinType)(pinyinType);
    return uni2pinyin_01(uni)[pinyinType];
}
/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_1」以調值(數字)呈現
 */
function char2pinyin_01(char) {
    return uni2pinyin_01((0, char2uni_1.char2uni)(char));
}
function char2pinyinTypeValue_01(char, pinyinType) {
    pinyinType = (0, uni2zhuyin_2.handlePinyinType)(pinyinType);
    return char2pinyin_01(char)[pinyinType];
}
exports.default = uni2pinyin_01;
//# sourceMappingURL=uni2pinyin_01.js.map