'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const REGEXP_TO_STRING_TAG = /*#__PURE__*/Object.prototype.toString.call(/a/);
function toHex(n, toUpperCase) {
  const s = n.toString(16).padStart(4, '0');
  return toUpperCase ? s.toUpperCase() : s;
}
function toUnicode(charCode, noMerge, wrap) {
  let s;
  if (typeof charCode === 'string') {
    s = charCode;
    charCode = s.codePointAt(0);
  }
  if (charCode > 0xffff && noMerge) {
    let p;
    if (typeof s !== 'string') {
      p = surrogatePair(charCode);
    } else {
      p = [s.charCodeAt(0), s.charCodeAt(1)];
    }
    return p.map(function (n) {
      return _toUnicode(n, wrap);
    }).join('');
  }
  return _toUnicode(charCode, wrap);
}
function toUnicode2(charCode, options = {}) {
  return toUnicode(charCode, options.noMerge, options.wrap);
}
function _toUnicode(charCode, wrap) {
  const hex = toHex(charCode);
  return wrap || hex.length > 4 ? `\\u{${hex}}` : `\\u${hex}`;
}
function isDoubleUnicode(str) {
  return str.charCodeAt(0) === str.codePointAt(0);
}
function isRegExp(r) {
  if (r instanceof RegExp || Object.prototype.toString.call(r) === REGEXP_TO_STRING_TAG) {
    return r;
  }
  return null;
}
function surrogatePair(codepoint) {
  const h = Math.floor((codepoint - 0x10000) / 0x400) + 0xd800;
  const l = (codepoint - 0x10000) % 0x400 + 0xdc00;
  return Object.assign([h, l], {
    h,
    l
  });
}
function unicodeUnEscape(string, noLeadingSolidus) {
  const r = noLeadingSolidus ? /u\{([0-9a-fA-F]{1,8})\}/g : /\\u\{([0-9a-fA-F]{1,8})\}/g;
  return string.replace(r, ($0, $1) => {
    return String.fromCodePoint(parseInt($1, 16));
  });
}
function unicodeUnEscape2(string, options = {}) {
  return unicodeUnEscape(string, options.noLeadingSolidus);
}
function unicodeEscape(string, noLeadingSolidus, noMerge, noWrap, filter = /./ug) {
  return string.replace(filter, $0 => {
    const s = toUnicode($0, noMerge, !noWrap);
    return noLeadingSolidus ? s.replace(/\\/, '') : s;
  });
}
function unicodeEscape2(string, options = {}) {
  return unicodeEscape(string, options.noLeadingSolidus, options.noMerge, options.noWrap, options.filter);
}
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
var index = {
  REGEXP_TO_STRING_TAG,
  _toUnicode,
  escapeRegExp,
  isDoubleUnicode,
  isRegExp,
  surrogatePair,
  toHex,
  toUnicode,
  toUnicode2,
  unicodeEscape,
  unicodeEscape2,
  unicodeUnEscape,
  unicodeUnEscape2
};

exports.REGEXP_TO_STRING_TAG = REGEXP_TO_STRING_TAG;
exports._toUnicode = _toUnicode;
exports.default = index;
exports.escapeRegExp = escapeRegExp;
exports.isDoubleUnicode = isDoubleUnicode;
exports.isRegExp = isRegExp;
exports.surrogatePair = surrogatePair;
exports.toHex = toHex;
exports.toUnicode = toUnicode;
exports.toUnicode2 = toUnicode2;
exports.unicodeEscape = unicodeEscape;
exports.unicodeEscape2 = unicodeEscape2;
exports.unicodeUnEscape = unicodeUnEscape;
exports.unicodeUnEscape2 = unicodeUnEscape2;
//# sourceMappingURL=index.cjs.development.cjs.map
