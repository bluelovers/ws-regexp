"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = map;
const _each_1 = require("./_each");
function _cb(match, index, re, _) {
    return match;
}
function map(input, re, cb, options = {}) {
    let ret = [];
    cb = cb !== null && cb !== void 0 ? cb : _cb;
    for (const m of (0, _each_1._each)(input, re, options)) {
        ret.push(cb(m.match, m.index, m.re, m));
    }
    return ret;
}
exports.default = map;
//# sourceMappingURL=map.js.map