"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneRegexp = void 0;
/// <reference lib="es2018.regexp" />
const clone_regexp_1 = __importDefault(require("clone-regexp"));
function cloneRegexp(inputRegExp, options = {}) {
    let { cloneRegexp: cloneRegexp2, disableDetectRegexpClone, ...opts } = options;
    if (cloneRegexp2) {
        return cloneRegexp2(inputRegExp, opts);
    }
    else if (disableDetectRegexpClone !== true && typeof inputRegExp.clone === 'function') {
        // @ts-ignore
        return inputRegExp.clone(opts);
    }
    return clone_regexp_1.default(inputRegExp, opts);
}
exports.cloneRegexp = cloneRegexp;
exports.default = cloneRegexp;
//# sourceMappingURL=index.js.map