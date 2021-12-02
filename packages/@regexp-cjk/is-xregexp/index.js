"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isXRegExp = exports.internalXRegExpData = exports.X_REGEX_DATA = void 0;
const X_REGEX_DATA = 'xregexp';
exports.X_REGEX_DATA = X_REGEX_DATA;
function internalXRegExpData(xr) {
    return xr[X_REGEX_DATA];
}
exports.internalXRegExpData = internalXRegExpData;
function isXRegExp(xr) {
    return !!(xr === null || xr === void 0 ? void 0 : xr[X_REGEX_DATA]);
}
exports.isXRegExp = isXRegExp;
exports.default = isXRegExp;
//# sourceMappingURL=index.js.map