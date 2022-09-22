import { fill as e } from "@bluelovers/fill-range";

import { TABLE_RANGE as t } from "@lazy-cjk/regexp-range-table";

export { TABLE_RANGE } from "@lazy-cjk/regexp-range-table";

import { array_unique_overwrite as n } from "array-hyper-unique";

function matchRange(e, t, a = {}) {
  a = getOptions(a);
  let r = e, g = t, i = [], l = !!a.findFirstOne;
  return Object.keys(a.dataTables).some((function(e) {
    let t;
    if (a.dataTables[e].some((function(e) {
      let n = e.indexOf(r), a = e.indexOf(g, n);
      if (-1 !== n && -1 !== a) return i.push(...e.slice(n, a + 1)), t = !0, l;
    })), t) return !0;
  })), i && i.length ? (n(i), a.createRegExpString ? toRegExpString(i, a.createRegExpClass) : i) : null;
}

function toRegExpString(e, t) {
  if (1 == e.length) return e[0];
  let n = e.join("");
  return t ? "[" + n + "]" : n;
}

function fillRange(t, n, a = {}) {
  let r = t, g = n, i = null;
  if (i = matchRange(t, n, a = getOptions(a)), !i && (a.arrayMode || 1 == String(r).length && 1 == String(g).length)) {
    var l;
    let t;
    t = "string" != typeof r || "string" != typeof g || r.charCodeAt(0) <= g.charCodeAt(0), 
    t && (i = e(r, g)), null !== (l = i) && void 0 !== l && l.length || (i = null);
  }
  return Array.isArray(i) && (i = i.map((e => String(e)))), i;
}

function getOptions(e) {
  let n = Object.assign({}, e);
  return n.dataTables = n.dataTables || t, n;
}

Object.defineProperty(matchRange, "__esModule", {
  value: !0
}), Object.defineProperty(matchRange, "matchRange", {
  value: matchRange
}), Object.defineProperty(matchRange, "getOptions", {
  value: getOptions
}), Object.defineProperty(matchRange, "toRegExpString", {
  value: toRegExpString
}), Object.defineProperty(matchRange, "TABLE_RANGE", {
  value: t
}), Object.defineProperty(matchRange, "fillRange", {
  value: fillRange
}), Object.defineProperty(matchRange, "default", {
  value: matchRange
});

export { matchRange as default, fillRange, getOptions, matchRange, toRegExpString };
//# sourceMappingURL=index.esm.mjs.map
