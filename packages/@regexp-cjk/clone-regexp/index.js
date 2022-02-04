"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneRegexp = void 0;
const tslib_1 = require("tslib");
/// <reference lib="es2018.regexp" />
const clone_regexp_1 = tslib_1.__importDefault(require("clone-regexp"));
function cloneRegexp(inputRegExp, options = {}) {
    var _a;
    let { cloneRegexp: cloneRegexp2, disableDetectRegexpClone, ...opts } = options;
    let re;
    if (cloneRegexp2) {
        re = cloneRegexp2(inputRegExp, opts);
    }
    else if (disableDetectRegexpClone !== true && typeof inputRegExp.clone === 'function') {
        // @ts-ignore
        re = inputRegExp.clone(opts);
    }
    else {
        re = (0, clone_regexp_1.default)(inputRegExp, opts);
    }
    if (typeof opts.lastIndex === 'number') {
        re.lastIndex = opts.lastIndex;
    }
    else if (((_a = opts.resetLastIndex) !== null && _a !== void 0 ? _a : true) === true) {
        re.lastIndex = 0;
    }
    return re;
}
exports.cloneRegexp = cloneRegexp;
exports.default = cloneRegexp;
//# sourceMappingURL=index.js.map