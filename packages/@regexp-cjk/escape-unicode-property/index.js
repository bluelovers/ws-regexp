"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeUnicodePropertyPattern = exports.escapeUnicodePropertyPatternCore = exports.replaceUnicodePropertyPattern = exports.matchUnicodePropertyPattern = exports.isUnicodePropertyPattern = exports.hasUnicodePropertyPattern = void 0;
const rewrite_pattern_1 = require("@regexp-cjk/rewrite-pattern");
const util_1 = require("./lib/util");
function hasUnicodePropertyPattern(source) {
    return /\\[pP]\{[A-Z][\w=_]*}/.test(source);
}
exports.hasUnicodePropertyPattern = hasUnicodePropertyPattern;
function isUnicodePropertyPattern(source) {
    return /^\\[pP]\{[A-Z][\w=_]*}$/.test(source);
}
exports.isUnicodePropertyPattern = isUnicodePropertyPattern;
function matchUnicodePropertyPattern(source) {
    return /\\([pP])\{([A-Z][\w_]*)(?:=([\w_]+))?}/.exec(source);
}
exports.matchUnicodePropertyPattern = matchUnicodePropertyPattern;
function replaceUnicodePropertyPattern(source, cb) {
    return source.replace(/\\([pP])\{([A-Z][\w_]*)(?:=([\w_]+))?}/g, cb);
}
exports.replaceUnicodePropertyPattern = replaceUnicodePropertyPattern;
function escapeUnicodePropertyPatternCore(source, flags, options) {
    return rewrite_pattern_1.rewritePatternCore(source, flags !== null && flags !== void 0 ? flags : 'u', {
        ...options,
        unicodePropertyEscape: true,
    });
}
exports.escapeUnicodePropertyPatternCore = escapeUnicodePropertyPatternCore;
function escapeUnicodePropertyPattern(source, flags, options) {
    ({ flags, options } = util_1.handleOptions(options, flags));
    return rewrite_pattern_1.rewritePatternCore(source, flags, options);
}
exports.escapeUnicodePropertyPattern = escapeUnicodePropertyPattern;
exports.default = escapeUnicodePropertyPattern;
//# sourceMappingURL=index.js.map