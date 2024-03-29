"use strict";
/**
 * Created by user on 2020/6/8.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriteRegExp = exports.rewriteRegExpCore = exports.rewritePatternByRegExp = exports.rewritePatternByRegExpCore = exports.rewritePattern = exports.rewritePatternCore = void 0;
const util_1 = require("./lib/util");
const regexpu_core_v4_1 = require("@regexp-cjk/regexpu-core-v4");
function rewritePatternCore(source, flags, options) {
    return (0, regexpu_core_v4_1.rewritePatternV4)(source, flags, options);
}
exports.rewritePatternCore = rewritePatternCore;
function rewritePattern(source, flags, options) {
    ({ options, flags } = (0, util_1.handleOptions)(options, flags));
    return (0, regexpu_core_v4_1.rewritePatternV4)(source, flags, options);
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
    let source = (0, regexpu_core_v4_1.rewritePatternV4)(re.source, flags, options);
    return new RegExp(source, flags);
}
exports.rewriteRegExpCore = rewriteRegExpCore;
function rewriteRegExp(re, options) {
    let flags;
    ({ options, flags } = (0, util_1.handleOptions)(options, re.flags));
    let source = (0, regexpu_core_v4_1.rewritePatternV4)(re.source, flags, options);
    return new RegExp(source, flags);
}
exports.rewriteRegExp = rewriteRegExp;
exports.default = rewritePattern;
//# sourceMappingURL=index.js.map