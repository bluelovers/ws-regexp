"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reNotPinyinChar = exports.rePinyinChar = exports.rePinyinLike = exports.rePinyinLikeFull = void 0;
exports.isPinyinLike = isPinyinLike;
exports.matchPinyinLike = matchPinyinLike;
exports.replacePinyinChar = replacePinyinChar;
exports.replaceNotPinyinChar = replaceNotPinyinChar;
const rePinyinLike = /[\w\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc][\w\d\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc\u1ea0-\u1ef9\u02c6-\u02cf\u0300-\u0308\u0363-\u036f]*/;
exports.rePinyinLike = rePinyinLike;
const rePinyinLikeFull = /^(?:[a-zA-Z][\u0304\u0300]?|[\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc\u1ea0-\u1ef9])(?:(?:[a-zA-Z][\u0300-\u0308\u0363-\u036f]?|[\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc\u1ea0-\u1ef9\u02c6-\u02cf'])*[12345]?)?$/;
exports.rePinyinLikeFull = rePinyinLikeFull;
const rePinyinChar = /[\w\d\u0100-\u017F\u01D6\u01D5\u00c0-\u00d6\u00e0-\u00e5\u00e7-\u00f6\u00d9-\u00dd\u00e0-\u00e4\u00e7-\u00ef\u00f1-\u00f6\u00f9-\u00fd\u00ff\u01cd-\u01dc\u1ea0-\u1ef9\u02c6-\u02cf\u0300-\u0308\u0363-\u036f]/;
exports.rePinyinChar = rePinyinChar;
const reNotPinyinChar = new RegExp(rePinyinChar.source.replace(/^\[(?!^)/, '[^'));
exports.reNotPinyinChar = reNotPinyinChar;
function isPinyinLike(input) {
    return rePinyinLikeFull.test(input);
}
function matchPinyinLike(input) {
    return rePinyinLike.exec(input);
}
function replacePinyinChar(input, fn) {
    return input.replace(rePinyinChar, fn);
}
function replaceNotPinyinChar(input, fn) {
    return input.replace(reNotPinyinChar, fn);
}
exports.default = isPinyinLike;
//# sourceMappingURL=index.js.map