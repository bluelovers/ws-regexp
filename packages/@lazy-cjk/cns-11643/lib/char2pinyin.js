"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zhuyin2pinyin_table = zhuyin2pinyin_table;
exports.zhuyin2pinyin = zhuyin2pinyin;
exports.uni2pinyin = uni2pinyin;
exports.uni2pinyinTypeValue = uni2pinyinTypeValue;
exports.char2pinyin = char2pinyin;
exports.char2pinyinTypeValue = char2pinyinTypeValue;
const tslib_1 = require("tslib");
const uni2pinyin_01_1 = tslib_1.__importStar(require("./uni2pinyin_01"));
const uni2pinyin_02_1 = tslib_1.__importStar(require("./uni2pinyin_02"));
const uni2zhuyin_1 = require("./util/uni2zhuyin");
function zhuyin2pinyin_table(pinyinMode) {
    const zhuyin2pinyinMode = pinyinMode ? uni2pinyin_01_1.zhuyin2pinyin_01_table : uni2pinyin_02_1.zhuyin2pinyin_02_table;
    return zhuyin2pinyinMode();
}
function zhuyin2pinyin(zhuyin, pinyinMode) {
    const zhuyin2pinyinMode = pinyinMode ? uni2pinyin_01_1.zhuyin2pinyin_01 : uni2pinyin_02_1.zhuyin2pinyin_02;
    return zhuyin2pinyinMode(zhuyin);
}
function uni2pinyin(uni, pinyinMode) {
    const uni2pinyinMode = pinyinMode ? uni2pinyin_01_1.default : uni2pinyin_02_1.default;
    return uni2pinyinMode(uni);
}
function uni2pinyinTypeValue(uni, pinyinMode, pinyinType) {
    pinyinType = (0, uni2zhuyin_1.handlePinyinType)(pinyinType);
    return uni2pinyin(uni, pinyinMode)[pinyinType];
}
function char2pinyin(char, pinyinMode) {
    const char2pinyinMode = pinyinMode ? uni2pinyin_01_1.char2pinyin_01 : uni2pinyin_02_1.char2pinyin_02;
    return char2pinyinMode(char);
}
function char2pinyinTypeValue(char, pinyinMode, pinyinType) {
    pinyinType = (0, uni2zhuyin_1.handlePinyinType)(pinyinType);
    return char2pinyin(char, pinyinMode)[pinyinType];
}
exports.default = char2pinyin;
//# sourceMappingURL=char2pinyin.js.map