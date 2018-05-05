"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "AssertionError");
    }
}
exports.assert = assert;
function last(xs) {
    return xs.length === 0 ? undefined : xs[xs.length - 1];
}
exports.last = last;
