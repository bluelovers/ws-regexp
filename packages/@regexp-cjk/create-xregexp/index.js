"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createXRegExp = void 0;
const tslib_1 = require("tslib");
const is_xregexp_1 = require("@regexp-cjk/is-xregexp");
const xregexp_1 = tslib_1.__importDefault(require("xregexp"));
function createXRegExp(pattern, flags, xr = xregexp_1.default) {
    if (typeof pattern === 'string') {
        return xr(pattern, flags);
    }
    else if ((0, is_xregexp_1.isXRegExp)(pattern)) {
        return xr(pattern);
    }
    return xr(pattern.source, typeof flags == 'string' ? flags : pattern.flags);
}
exports.createXRegExp = createXRegExp;
exports.default = createXRegExp;
//# sourceMappingURL=index.js.map