"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChainInput = exports.handleChainInputCore = exports.handleChainInputCore2 = void 0;
const tslib_1 = require("tslib");
const clone_regexp_1 = (0, tslib_1.__importDefault)(require("@regexp-cjk/clone-regexp"));
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
exports.handleChainInputCore2 = handleChainInputCore2;
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
exports.handleChainInputCore = handleChainInputCore;
function handleChainInput(row, options) {
    let ret = handleChainInputCore(row, options);
    ret.regexp = (0, clone_regexp_1.default)(ret.regexp, options);
    return ret;
}
exports.handleChainInput = handleChainInput;
exports.default = handleChainInput;
//# sourceMappingURL=handleChainInput.js.map