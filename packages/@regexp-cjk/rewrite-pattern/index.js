"use strict";
/**
 * Created by user on 2020/6/8.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriteRegExp = exports.rewriteRegExpCore = exports.rewritePatternByRegExp = exports.rewritePatternByRegExpCore = exports.rewritePattern = exports.rewritePatternCore = void 0;
const regexpu_core_1 = __importDefault(require("regexpu-core"));
const util_1 = require("./lib/util");
function rewritePatternCore(source, flags, options) {
    return regexpu_core_1.default(source, flags, options);
}
exports.rewritePatternCore = rewritePatternCore;
function rewritePattern(source, flags, options) {
    ({ options, flags } = util_1.handleOptions(options, flags));
    return regexpu_core_1.default(source, flags, options);
}
exports.rewritePattern = rewritePattern;
function rewritePatternByRegExpCore(re, options) {
    var _a;
    return rewritePattern(re.source, (_a = options === null || options === void 0 ? void 0 : options.flags) !== null && _a !== void 0 ? _a : re.flags, options);
}
exports.rewritePatternByRegExpCore = rewritePatternByRegExpCore;
function rewritePatternByRegExp(re, options) {
    var _a;
    return rewritePattern(re.source, (_a = options === null || options === void 0 ? void 0 : options.flags) !== null && _a !== void 0 ? _a : re.flags, options);
}
exports.rewritePatternByRegExp = rewritePatternByRegExp;
function rewriteRegExpCore(re, options) {
    var _a;
    let flags = (_a = options === null || options === void 0 ? void 0 : options.flags) !== null && _a !== void 0 ? _a : re.flags;
    let source = regexpu_core_1.default(re.source, flags, options);
    return new RegExp(source, flags);
}
exports.rewriteRegExpCore = rewriteRegExpCore;
function rewriteRegExp(re, options) {
    let flags;
    ({ options, flags } = util_1.handleOptions(options, re.flags));
    let source = regexpu_core_1.default(re.source, flags, options);
    return new RegExp(source, flags);
}
exports.rewriteRegExp = rewriteRegExp;
exports.default = rewritePattern;
//# sourceMappingURL=index.js.map