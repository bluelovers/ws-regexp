"use strict";
/**
 * Created by user on 2020/5/30.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.char2pinyinTypeValue_02 = exports.char2pinyin_02 = exports.uni2pinyinTypeValue_02 = exports.uni2pinyin_02 = exports.zhuyin2pinyin_02 = exports.zhuyin2pinyin_02_table = void 0;
const tslib_1 = require("tslib");
const uni2zhuyin_1 = tslib_1.__importDefault(require("./uni2zhuyin"));
const char2uni_1 = require("./char2uni");
const uni2zhuyin_2 = require("./util/uni2zhuyin");
/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_2」以聲調符號呈現
 *
 * 第一個欄位：注音
 * 第二個欄位：漢語(han)
 * 第三個欄位：注音第二式(zuin2)
 * 第四個欄位：耶魯(yale)
 * 第五個欄位：韋式(wei)
 */
function zhuyin2pinyin_02_table() {
    return require('./cns/pinyin/pinyin_02.json');
}
exports.zhuyin2pinyin_02_table = zhuyin2pinyin_02_table;
function zhuyin2pinyin_02(zhuyin) {
    return zhuyin2pinyin_02_table()[zhuyin];
}
exports.zhuyin2pinyin_02 = zhuyin2pinyin_02;
/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_2」以聲調符號呈現
 */
function uni2pinyin_02(uni) {
    let zhuyin = uni2zhuyin_1.default(uni);
    return zhuyin2pinyin_02_table()[zhuyin];
}
exports.uni2pinyin_02 = uni2pinyin_02;
function uni2pinyinTypeValue_02(uni, pinyinType) {
    pinyinType = uni2zhuyin_2.handlePinyinType(pinyinType);
    return uni2pinyin_02(uni)[pinyinType];
}
exports.uni2pinyinTypeValue_02 = uni2pinyinTypeValue_02;
/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_2」以聲調符號呈現
 */
function char2pinyin_02(char) {
    return uni2pinyin_02(char2uni_1.char2uni(char));
}
exports.char2pinyin_02 = char2pinyin_02;
function char2pinyinTypeValue_02(char, pinyinType) {
    pinyinType = uni2zhuyin_2.handlePinyinType(pinyinType);
    return char2pinyin_02(char)[pinyinType];
}
exports.char2pinyinTypeValue_02 = char2pinyinTypeValue_02;
exports.default = uni2pinyin_02;
//# sourceMappingURL=uni2pinyin_02.js.map