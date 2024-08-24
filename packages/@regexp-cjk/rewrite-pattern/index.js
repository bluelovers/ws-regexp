"use strict";
/**
 * Created by user on 2020/6/8.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewritePatternCore = rewritePatternCore;
exports.rewritePattern = rewritePattern;
exports.rewritePatternByRegExpCore = rewritePatternByRegExpCore;
exports.rewritePatternByRegExp = rewritePatternByRegExp;
exports.rewriteRegExpCore = rewriteRegExpCore;
exports.rewriteRegExp = rewriteRegExp;
const util_1 = require("./lib/util");
const regexpu_core_v4_1 = require("@regexp-cjk/regexpu-core-v4");
function rewritePatternCore(source, flags, options) {
    return (0, regexpu_core_v4_1.rewritePatternV4)(source, flags, options);
}
function rewritePattern(source, flags, options) {
    ({ options, flags } = (0, util_1.handleOptions)(options, flags));
    return (0, regexpu_core_v4_1.rewritePatternV4)(source, flags, options);
}
function rewritePatternByRegExpCore(re, options) {
    var _a;
    return rewritePattern(re.source, (_a = options === null || options === void 0 ? void 0 : options.flags) !== null && _a !== void 0 ? _a : re.flags, options);
}
function rewritePatternByRegExp(re, options) {
    var _a;
    return rewritePattern(re.source, (_a = options === null || options === void 0 ? void 0 : options.flags) !== null && _a !== void 0 ? _a : re.flags, options);
}
function rewriteRegExpCore(re, options) {
    var _a;
    let flags = (_a = options === null || options === void 0 ? void 0 : options.flags) !== null && _a !== void 0 ? _a : re.flags;
    let source = (0, regexpu_core_v4_1.rewritePatternV4)(re.source, flags, options);
    return new RegExp(source, flags);
}
function rewriteRegExp(re, options) {
    let flags;
    ({ options, flags } = (0, util_1.handleOptions)(options, re.flags));
    let source = (0, regexpu_core_v4_1.rewritePatternV4)(re.source, flags, options);
    return new RegExp(source, flags);
}
exports.default = rewritePattern;
//# sourceMappingURL=index.js.map