"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.each = each;
const _each_1 = require("./_each");
function each(input, re, cb, options = {}) {
    for (const m of (0, _each_1._each)(input, re, options)) {
        cb(m.match, m.index, m.re, m);
    }
}
exports.default = each;
//# sourceMappingURL=each.js.map