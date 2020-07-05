"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.each = void 0;
const _each_1 = require("./_each");
function each(input, re, cb, options = {}) {
    for (const m of _each_1._each(input, re, options)) {
        cb(m.match, m.index, m.re, m);
    }
}
exports.each = each;
exports.default = each;
//# sourceMappingURL=each.js.map