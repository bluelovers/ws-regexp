"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.char2pinyinTypeValue = exports.char2pinyin = exports.uni2pinyinTypeValue = exports.uni2pinyin = exports.zhuyin2pinyin = exports.zhuyin2pinyin_table = void 0;
const uni2pinyin_01_1 = __importStar(require("./uni2pinyin_01"));
const uni2pinyin_02_1 = __importStar(require("./uni2pinyin_02"));
const uni2zhuyin_1 = require("./util/uni2zhuyin");
function zhuyin2pinyin_table(pinyinMode) {
    const zhuyin2pinyinMode = pinyinMode ? uni2pinyin_01_1.zhuyin2pinyin_01_table : uni2pinyin_02_1.zhuyin2pinyin_02_table;
    return zhuyin2pinyinMode();
}
exports.zhuyin2pinyin_table = zhuyin2pinyin_table;
function zhuyin2pinyin(zhuyin, pinyinMode) {
    const zhuyin2pinyinMode = pinyinMode ? uni2pinyin_01_1.zhuyin2pinyin_01 : uni2pinyin_02_1.zhuyin2pinyin_02;
    return zhuyin2pinyinMode(zhuyin);
}
exports.zhuyin2pinyin = zhuyin2pinyin;
function uni2pinyin(uni, pinyinMode) {
    const uni2pinyinMode = pinyinMode ? uni2pinyin_01_1.default : uni2pinyin_02_1.default;
    return uni2pinyinMode(uni);
}
exports.uni2pinyin = uni2pinyin;
function uni2pinyinTypeValue(uni, pinyinMode, pinyinType) {
    pinyinType = uni2zhuyin_1.handlePinyinType(pinyinType);
    return uni2pinyin(uni, pinyinMode)[pinyinType];
}
exports.uni2pinyinTypeValue = uni2pinyinTypeValue;
function char2pinyin(char, pinyinMode) {
    const char2pinyinMode = pinyinMode ? uni2pinyin_01_1.char2pinyin_01 : uni2pinyin_02_1.char2pinyin_02;
    return char2pinyinMode(char);
}
exports.char2pinyin = char2pinyin;
function char2pinyinTypeValue(char, pinyinMode, pinyinType) {
    pinyinType = uni2zhuyin_1.handlePinyinType(pinyinType);
    return char2pinyin(char, pinyinMode)[pinyinType];
}
exports.char2pinyinTypeValue = char2pinyinTypeValue;
exports.default = char2pinyin;
//# sourceMappingURL=char2pinyin.js.map