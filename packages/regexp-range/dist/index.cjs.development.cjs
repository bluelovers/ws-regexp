'use strict';

var fillRange$1 = require('@bluelovers/fill-range');
var regexpRangeTable = require('@lazy-cjk/regexp-range-table');
var arrayHyperUnique = require('array-hyper-unique');

function matchRange(from, to, options = {}) {
  options = getOptions(options);
  let s = from;
  let e = to;
  let ret = [];
  let findFirstOne = !!options.findFirstOne;
  Object.keys(options.dataTables).some(function (key) {
    let bool;
    options.dataTables[key].some(function (arr) {
      let i = arr.indexOf(s);
      let j = arr.indexOf(e, i);
      if (i !== -1 && j !== -1) {
        ret.push(...arr.slice(i, j + 1));
        bool = true;
        return findFirstOne;
      }
    });
    if (bool) {
      return true;
    }
  });
  if (!ret || !ret.length) {
    return null;
  }
  arrayHyperUnique.array_unique_overwrite(ret);
  if (options.createRegExpString) {
    return toRegExpString(ret, options.createRegExpClass);
  }
  return ret;
}
function toRegExpString(arr, warpClass) {
  if (arr.length === 1) {
    return arr[0];
  }
  let s = arr.join('');
  return warpClass ? '[' + s + ']' : s;
}
function fillRange(from, to, options = {}) {
  options = getOptions(options);
  let s = from;
  let e = to;
  let ret = null;
  ret = matchRange(from, to, options);
  if (!ret && (options.arrayMode || String(s).length === 1 && String(e).length === 1)) {
    var _ret;
    let _ok;
    if (typeof s === 'string' && typeof e === 'string') {
      let a = s.charCodeAt(0);
      let b = e.charCodeAt(0);
      _ok = a <= b;
    } else {
      _ok = true;
    }
    if (_ok) {
      ret = fillRange$1.fill(s, e);
    }
    if (!((_ret = ret) !== null && _ret !== void 0 && _ret.length)) {
      ret = null;
    }
  }
  if (Array.isArray(ret)) {
    ret = ret.map(v => String(v));
  }
  return ret;
}
function getOptions(options) {
  let opts = Object.assign({}, options);
  opts.dataTables = opts.dataTables || regexpRangeTable.TABLE_RANGE;
  return opts;
}
{
  Object.defineProperty(matchRange, "__esModule", {
    value: true
  });
  Object.defineProperty(matchRange, 'matchRange', {
    value: matchRange
  });
  Object.defineProperty(matchRange, 'default', {
    value: matchRange
  });
  Object.defineProperty(matchRange, 'getOptions', {
    value: getOptions
  });
  Object.defineProperty(matchRange, 'toRegExpString', {
    value: toRegExpString
  });
  Object.defineProperty(matchRange, 'TABLE_RANGE', {
    value: regexpRangeTable.TABLE_RANGE
  });
  Object.defineProperty(matchRange, 'fillRange', {
    value: fillRange
  });
}

// @ts-ignore
module.exports = matchRange;
//# sourceMappingURL=index.cjs.development.cjs.map
