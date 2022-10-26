const e = Object.prototype.toString.call(/a/);

function toHex(e, o) {
  const n = e.toString(16).padStart(4, "0");
  return o ? n.toUpperCase() : n;
}

function toUnicode(e, o, n) {
  let t;
  if ("string" == typeof e && (t = e, e = t.codePointAt(0)), e > 0xffff && o) {
    let o;
    return o = "string" != typeof t ? surrogatePair(e) : [ t.charCodeAt(0), t.charCodeAt(1) ], 
    o.map((function(e) {
      return _toUnicode(e, n);
    })).join("");
  }
  return _toUnicode(e, n);
}

function toUnicode2(e, o = {}) {
  return toUnicode(e, o.noMerge, o.wrap);
}

function _toUnicode(e, o) {
  const n = toHex(e);
  return o || n.length > 4 ? `\\u{${n}}` : `\\u${n}`;
}

function isDoubleUnicode(e) {
  return e.charCodeAt(0) === e.codePointAt(0);
}

function isRegExp(o) {
  return o instanceof RegExp || Object.prototype.toString.call(o) === e ? o : null;
}

function surrogatePair(e) {
  const o = Math.floor((e - 0x10000) / 0x400) + 0xd800, n = (e - 0x10000) % 0x400 + 0xdc00;
  return Object.assign([ o, n ], {
    h: o,
    l: n
  });
}

function unicodeUnEscape(e, o) {
  return e.replace(o ? /u\{([0-9a-fA-F]{1,8})\}/g : /\\u\{([0-9a-fA-F]{1,8})\}/g, ((e, o) => String.fromCodePoint(parseInt(o, 16))));
}

function unicodeUnEscape2(e, o = {}) {
  return unicodeUnEscape(e, o.noLeadingSolidus);
}

function unicodeEscape(e, o, n, t, c = /./gu) {
  return e.replace(c, (e => {
    const c = toUnicode(e, n, !t);
    return o ? c.replace(/\\/, "") : c;
  }));
}

function unicodeEscape2(e, o = {}) {
  return unicodeEscape(e, o.noLeadingSolidus, o.noMerge, o.noWrap, o.filter);
}

function escapeRegExp(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

var o = {
  REGEXP_TO_STRING_TAG: e,
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

export { e as REGEXP_TO_STRING_TAG, _toUnicode, o as default, escapeRegExp, isDoubleUnicode, isRegExp, surrogatePair, toHex, toUnicode, toUnicode2, unicodeEscape, unicodeEscape2, unicodeUnEscape, unicodeUnEscape2 };
//# sourceMappingURL=index.esm.mjs.map
