"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChainInput = void 0;
const clone_regexp_1 = __importDefault(require("@regexp-cjk/clone-regexp"));
function handleChainInput(row, options) {
    let regexp;
    let backref = 0;
    if (row instanceof RegExp) {
        regexp = row;
    }
    else {
        regexp = row.regexp;
        backref = row.backref;
    }
    regexp = clone_regexp_1.default(regexp, options);
    return {
        regexp,
        backref,
    };
}
exports.handleChainInput = handleChainInput;
exports.default = handleChainInput;
//# sourceMappingURL=handleChainInput.js.map