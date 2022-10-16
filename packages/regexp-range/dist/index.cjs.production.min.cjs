"use strict";

var e = require("@bluelovers/fill-range"), t = require("@lazy-cjk/regexp-range-table"), n = require("array-hyper-unique");

function matchRange(e, t, r = {}) {
  r = getOptions(r);
  let a = e, i = t, l = [], g = !!r.findFirstOne;
  return Object.keys(r.dataTables).some((function(e) {
    let t;
    if (r.dataTables[e].some((function(e) {
      let n = e.indexOf(a), r = e.indexOf(i, n);
      if (-1 !== n && -1 !== r) return l.push(...e.slice(n, r + 1)), t = !0, g;
    })), t) return !0;
  })), l && l.length ? (n.array_unique_overwrite(l), r.createRegExpString ? toRegExpString(l, r.createRegExpClass) : l) : null;
}

function toRegExpString(e, t) {
  if (1 === e.length) return e[0];
  let n = e.join("");
  return t ? "[" + n + "]" : n;
}

function getOptions(e) {
  let n = Object.assign({}, e);
  return n.dataTables = n.dataTables || t.TABLE_RANGE, n;
}

Object.defineProperty(matchRange, "__esModule", {
  value: !0
}), Object.defineProperty(matchRange, "matchRange", {
  value: matchRange
}), Object.defineProperty(matchRange, "default", {
  value: matchRange
}), Object.defineProperty(matchRange, "getOptions", {
  value: getOptions
}), Object.defineProperty(matchRange, "toRegExpString", {
  value: toRegExpString
}), Object.defineProperty(matchRange, "TABLE_RANGE", {
  value: t.TABLE_RANGE
}), Object.defineProperty(matchRange, "fillRange", {
  value: function fillRange(t, n, r = {}) {
    let a = t, i = n, l = null;
    if (l = matchRange(t, n, r = getOptions(r)), !l && (r.arrayMode || 1 === String(a).length && 1 === String(i).length)) {
      var g;
      let t;
      t = "string" != typeof a || "string" != typeof i || a.charCodeAt(0) <= i.charCodeAt(0), 
      t && (l = e.fill(a, i)), null !== (g = l) && void 0 !== g && g.length || (l = null);
    }
    return Array.isArray(l) && (l = l.map((e => String(e)))), l;
  }
}), module.exports = matchRange;
//# sourceMappingURL=index.cjs.production.min.cjs.map
