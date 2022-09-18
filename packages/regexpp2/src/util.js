"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = exports.assert = void 0;
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "AssertionError" /* EnumError.AssertionError */);
    }
}
exports.assert = assert;
function last(xs) {
    return xs.length === 0 ? undefined : xs[xs.length - 1];
}
exports.last = last;
//# sourceMappingURL=util.js.map