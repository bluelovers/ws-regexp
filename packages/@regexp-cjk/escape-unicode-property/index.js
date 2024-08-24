"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasUnicodePropertyPattern = hasUnicodePropertyPattern;
exports.isUnicodePropertyPattern = isUnicodePropertyPattern;
exports.matchUnicodePropertyPattern = matchUnicodePropertyPattern;
exports.replaceUnicodePropertyPattern = replaceUnicodePropertyPattern;
exports.escapeUnicodePropertyPatternCore = escapeUnicodePropertyPatternCore;
exports.escapeUnicodePropertyPattern = escapeUnicodePropertyPattern;
const rewrite_pattern_1 = require("@regexp-cjk/rewrite-pattern");
const util_1 = require("./lib/util");
function hasUnicodePropertyPattern(source) {
    return /\\[pP]\{[A-Z][\w=_]*}/.test(source);
}
function isUnicodePropertyPattern(source) {
    return /^\\[pP]\{[A-Z][\w=_]*}$/.test(source);
}
function matchUnicodePropertyPattern(source) {
    return /\\([pP])\{([A-Z][\w_]*)(?:=([\w_]+))?}/.exec(source);
}
function replaceUnicodePropertyPattern(source, cb) {
    return source.replace(/\\([pP])\{([A-Z][\w_]*)(?:=([\w_]+))?}/g, cb);
}
function escapeUnicodePropertyPatternCore(source, flags, options) {
    return (0, rewrite_pattern_1.rewritePatternCore)(source, flags !== null && flags !== void 0 ? flags : 'u', {
        ...options,
        unicodePropertyEscape: true,
    });
}
function escapeUnicodePropertyPattern(source, flags, options) {
    ({ flags, options } = (0, util_1.handleOptions)(options, flags));
    return (0, rewrite_pattern_1.rewritePatternCore)(source, flags, options);
}
exports.default = escapeUnicodePropertyPattern;
//# sourceMappingURL=index.js.map