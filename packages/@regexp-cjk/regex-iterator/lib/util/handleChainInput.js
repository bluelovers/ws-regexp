"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChainInputCore2 = handleChainInputCore2;
exports.handleChainInputCore = handleChainInputCore;
exports.handleChainInput = handleChainInput;
const clone_regexp_1 = require("@regexp-cjk/clone-regexp");
function handleChainInputCore2(row, options) {
    let regexp;
    let replaceValue;
    if (row instanceof RegExp) {
        regexp = row;
    }
    else if (Array.isArray(row)) {
        ([
            regexp,
            replaceValue,
        ] = row);
    }
    else {
        ({
            regexp,
            replaceValue,
        } = row);
    }
    return [regexp, replaceValue];
}
function handleChainInputCore(row, options) {
    let regexp;
    let backref = 0;
    let replaceValue;
    if (row instanceof RegExp) {
        regexp = row;
    }
    else {
        ({
            regexp,
            backref,
            replaceValue,
        } = row);
    }
    return {
        regexp,
        backref,
        replaceValue,
    };
}
function handleChainInput(row, options) {
    let ret = handleChainInputCore(row, options);
    ret.regexp = (0, clone_regexp_1.cloneRegexp)(ret.regexp, options);
    return ret;
}
exports.default = handleChainInput;
//# sourceMappingURL=handleChainInput.js.map