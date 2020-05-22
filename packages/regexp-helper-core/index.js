"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeRegExp = exports.unicodeEscape2 = exports.unicodeEscape = exports.unicodeUnEscape2 = exports.unicodeUnEscape = exports.surrogatePair = exports.isRegExp = exports.isDoubleUnicode = exports._toUnicode = exports.toUnicode2 = exports.toUnicode = exports.toHex = exports.REGEXP_TO_STRING_TAG = void 0;
exports.REGEXP_TO_STRING_TAG = Object.prototype.toString.call(/a/);
function toHex(n, toUpperCase) {
    let s = n.toString(16).padStart(4, '0');
    return toUpperCase ? s.toUpperCase() : s;
}
exports.toHex = toHex;
/**
 * @code
 * console.log(core.toUnicode('𠮷')); // => \u{20bb7}
 * console.log(core.toUnicode('𠮷'.codePointAt(0)));
 *
 * console.log(core.toUnicode('𠮷', true)); // => \ud842\udfb7
 * console.log(core.toUnicode('𠮷'.codePointAt(0), true));
 *
 * /[𠮷]/u.test('𠮷')
 * /[\u{20bb7}]/u.test('𠮷')
 * /[\ud842\udfb7]/u.test('𠮷')
 */
function toUnicode(charCode, noMerge, wrap) {
    let s;
    if (typeof charCode == 'string') {
        s = charCode;
        charCode = s.codePointAt(0);
    }
    if (charCode > 0xffff && noMerge) {
        let p;
        if (typeof s != 'string') {
            //s = String.fromCodePoint(charCode);
            p = surrogatePair(charCode);
        }
        else {
            p = [s.charCodeAt(0), s.charCodeAt(1)];
        }
        return p.map(function (n) {
            return _toUnicode(n, wrap);
        }).join('');
    }
    return _toUnicode(charCode, wrap);
}
exports.toUnicode = toUnicode;
function toUnicode2(charCode, options = {}) {
    return toUnicode(charCode, options.noMerge, options.wrap);
}
exports.toUnicode2 = toUnicode2;
function _toUnicode(charCode, wrap) {
    let hex = toHex(charCode);
    return (wrap || hex.length > 4) ? `\\u{${hex}}` : `\\u${hex}`;
}
exports._toUnicode = _toUnicode;
function isDoubleUnicode(str) {
    return str.charCodeAt(0) == str.codePointAt(0);
}
exports.isDoubleUnicode = isDoubleUnicode;
function isRegExp(r) {
    if ((r instanceof RegExp) || Object.prototype.toString.call(r) === exports.REGEXP_TO_STRING_TAG) {
        return r;
    }
    return null;
}
exports.isRegExp = isRegExp;
/**
 * @link https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
 * @link https://github.com/ikatyang/regexp-util/blob/7810ce61ff8becd728b745eb6d5c1ca76adfebe0/src/charset.ts#L289
 *
 * @code
 * surrogatePair('𠮷'.codePointAt(0)) // => { h: 55362, l: 57271 }
 * console.log('𠮷'.charCodeAt(0), '𠮷'.charCodeAt(1)) // => 55362 57271
 */
function surrogatePair(codepoint) {
    let h = Math.floor((codepoint - 0x10000) / 0x400) + 0xd800;
    let l = (codepoint - 0x10000) % 0x400 + 0xdc00;
    return Object.assign([h, l], {
        h,
        l,
    });
}
exports.surrogatePair = surrogatePair;
/**
 * https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
 *
 * @code
 * unicodeUnEscape('\\u{48}\\u{65}\\u{6c}\\u{6c}\\u{6f}\\u{20}\\u{77}\\u{6f}\\u{72}\\u{6c}\\u{64}') // => 'Hello world'
 * unicodeUnEscape('\\u{20bb7}') // => '𠮷'
 */
function unicodeUnEscape(string, noLeadingSolidus) {
    // note: this will match `u{123}` (no leading `\`) as well
    const r = noLeadingSolidus ? /u\{([0-9a-fA-F]{1,8})\}/g : /\\u\{([0-9a-fA-F]{1,8})\}/g;
    return string.replace(r, function ($0, $1) {
        return String.fromCodePoint(parseInt($1, 16));
    });
}
exports.unicodeUnEscape = unicodeUnEscape;
function unicodeUnEscape2(string, options = {}) {
    return unicodeUnEscape(string, options.noLeadingSolidus);
}
exports.unicodeUnEscape2 = unicodeUnEscape2;
/**
 * @code
 * unicodeEscape('𠮷') // => '\\u{20bb7}'
 */
function unicodeEscape(string, noLeadingSolidus, noMerge, noWrap, filter = /./ug) {
    return string.replace(filter, function ($0, $1) {
        let s = toUnicode($0, noMerge, !noWrap);
        return noLeadingSolidus ? s.replace(/\\/, '') : s;
    });
}
exports.unicodeEscape = unicodeEscape;
function unicodeEscape2(string, options = {}) {
    return unicodeEscape(string, options.noLeadingSolidus, options.noMerge, options.noWrap, options.filter);
}
exports.unicodeEscape2 = unicodeEscape2;
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
exports.escapeRegExp = escapeRegExp;
exports.default = exports;
Object.freeze(exports);
//# sourceMappingURL=index.js.map