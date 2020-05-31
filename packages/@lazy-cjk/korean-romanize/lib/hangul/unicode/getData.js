"use strict";
// Unicode data for category "Letter (other)"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFor = void 0;
// @ts-ignore
const Lo_1 = __importDefault(require("unicode/category/Lo"));
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