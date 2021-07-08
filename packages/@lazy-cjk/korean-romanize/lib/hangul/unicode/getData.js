"use strict";
// Unicode data for category "Letter (other)"
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFor = void 0;
const tslib_1 = require("tslib");
// @ts-ignore
const Lo_1 = (0, tslib_1.__importDefault)(require("unicode/category/Lo"));
function snakeToCamel(str) {
    return str.replace(/([-_][a-z])/g, group => group
        .toUpperCase()
        .replace("-", "")
        .replace("_", ""));
}
function clean(data) {
    return Object.entries(data)
        .map(([key, value]) => ({
        [snakeToCamel(key)]: typeof value === "string" && value.trim() === "" ? undefined : value,
    }))
        .reduce((acc, item) => Object.assign(acc, item), {});
}
function getDataFor(codePoint) {
    const data = Lo_1.default[codePoint];
    return clean(data);
}
exports.getDataFor = getDataFor;
exports.default = getDataFor;
//# sourceMappingURL=getData.js.map