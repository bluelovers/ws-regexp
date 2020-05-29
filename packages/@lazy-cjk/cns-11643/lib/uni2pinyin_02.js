"use strict";
/**
 * Created by user on 2020/5/30.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.char2pinyin_02 = exports.uni2pinyin_02 = void 0;
const uni2zhuyin_1 = __importDefault(require("./uni2zhuyin"));
const char2uni_1 = require("./char2uni");
function uni2pinyin_02(uni) {
    let zhuyin = uni2zhuyin_1.default(uni);
    return require('./cns/pinyin/pinyin_02.json')[zhuyin];
}
exports.uni2pinyin_02 = uni2pinyin_02;
function char2pinyin_02(char) {
    return uni2pinyin_02(char2uni_1.char2uni(char));
}
exports.char2pinyin_02 = char2pinyin_02;
exports.default = uni2pinyin_02;
//# sourceMappingURL=uni2pinyin_02.js.map