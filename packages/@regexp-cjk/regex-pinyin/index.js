"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceNotPinyinChar = exports.replacePinyinChar = exports.matchPinyinLike = exports.isPinyinLike = exports.reNotPinyinChar = exports.rePinyinChar = exports.rePinyinLike = exports.rePinyinLikeFull = void 0;
const rePinyinLike = /[\w\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc][\w\d\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc]+/;
exports.rePinyinLike = rePinyinLike;
const rePinyinLikeFull = /^[\w\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc][\w\d\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc]+$/;
exports.rePinyinLikeFull = rePinyinLikeFull;
const rePinyinChar = /[^\w\d\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc]/;
exports.rePinyinChar = rePinyinChar;
const reNotPinyinChar = /[^\w\d\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc]/;
exports.reNotPinyinChar = reNotPinyinChar;
function isPinyinLike(input) {
    return rePinyinLikeFull.test(input);
}
exports.isPinyinLike = isPinyinLike;
function matchPinyinLike(input) {
    return rePinyinLike.exec(input);
}
exports.matchPinyinLike = matchPinyinLike;
function replacePinyinChar(input, fn) {
    return input.replace(rePinyinChar, fn);
}
exports.replacePinyinChar = replacePinyinChar;
function replaceNotPinyinChar(input, fn) {
    return input.replace(reNotPinyinChar, fn);
}
exports.replaceNotPinyinChar = replaceNotPinyinChar;
exports.default = isPinyinLike;
//# sourceMappingURL=index.js.map