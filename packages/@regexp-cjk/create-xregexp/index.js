"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createXRegExp = void 0;
const is_xregexp_1 = require("@regexp-cjk/is-xregexp");
const xregexp_1 = __importDefault(require("xregexp"));
function createXRegExp(pattern, flags, xr = xregexp_1.default) {
    if (typeof pattern == 'string') {
        return xr(pattern, flags);
    }
    else if (is_xregexp_1.isXRegExp(pattern)) {
        return xr(pattern);
    }
    return xr(pattern.source, typeof flags == 'string' ? flags : pattern.flags);
}
exports.createXRegExp = createXRegExp;
exports.default = createXRegExp;
//# sourceMappingURL=index.js.map