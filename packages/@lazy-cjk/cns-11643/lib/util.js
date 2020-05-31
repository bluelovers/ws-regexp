"use strict";
/**
 * Created by user on 2020/5/31.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitChar = exports.replaceChar = exports.isExistsChar = exports.newCharMatchRegExp = void 0;
const uniCharMatchSource_1 = __importDefault(require("./const/uniCharMatchSource"));
const re_full_match = newCharMatchRegExp('u', (uniCharMatchSource) => `^${uniCharMatchSource}$`);
const re_replace = newCharMatchRegExp('ug', (uniCharMatchSource) => `(${uniCharMatchSource})`);
function newCharMatchRegExp(flags = 'u', fn) {
    var _a;
    if (!flags.includes('u')) {
        flags += 'u';
    }
    return new RegExp((_a = fn === null || fn === void 0 ? void 0 : fn(uniCharMatchSource_1.default)) !== null && _a !== void 0 ? _a : uniCharMatchSource_1.default, flags);
}
exports.newCharMatchRegExp = newCharMatchRegExp;
function isExistsChar(char) {
    return re_full_match.test(char);
}
exports.isExistsChar = isExistsChar;
function replaceChar(input, fn) {
    return input.replace(re_replace, fn);
}
exports.replaceChar = replaceChar;
function splitChar(input) {
    return input.split(re_replace);
}
exports.splitChar = splitChar;
//# sourceMappingURL=util.js.map