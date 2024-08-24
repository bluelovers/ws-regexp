"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = assert;
exports.last = last;
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "AssertionError" /* EnumError.AssertionError */);
    }
}
function last(xs) {
    return xs.length === 0 ? undefined : xs[xs.length - 1];
}
//# sourceMappingURL=util.js.map