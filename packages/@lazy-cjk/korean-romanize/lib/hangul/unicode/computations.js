"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeLVIndex = exports.computeTIndex = exports.computeVIndex = exports.computeLIndex = exports.computeSIndex = exports.intDiv = void 0;
const constraints_1 = require("./constraints");
/**
 * Returns an integer division quotient (rounded down)
 *
 * @param {number} dividend
 * @param {number} divisor
 */
function intDiv(dividend, divisor) {
    return Math.floor(dividend / divisor);
}
exports.intDiv = intDiv;
/**
 *
 * @param {(string|integer)} s
 */
function computeSIndex(s) {
    const SIndex = (typeof s === "string" ? s.charCodeAt(0) : s) - constraints_1.SBase;
    if (0 > SIndex || SIndex >= constraints_1.SCount) {
        throw new Error(`Not a Hangul syllable: ${s}`);
    }
    return SIndex;
}
exports.computeSIndex = computeSIndex;
/**
 *
 * @param {integer} SIndex
 */
function computeLIndex(SIndex) {
    return intDiv(SIndex, constraints_1.NCount);
} // integer division rounded down
exports.computeLIndex = computeLIndex;
/**
 *
 * @param {integer} SIndex
 */
function computeVIndex(SIndex) {
    return intDiv(SIndex % constraints_1.NCount, constraints_1.TCount);
}
exports.computeVIndex = computeVIndex;
/**
 *
 * @param {integer} SIndex
 */
function computeTIndex(SIndex) {
    return SIndex % constraints_1.TCount;
}
exports.computeTIndex = computeTIndex;
/**
 *
 * @param {integer} SIndex
 */
function computeLVIndex(SIndex) {
    return (SIndex / constraints_1.TCount) * constraints_1.TCount;
}
exports.computeLVIndex = computeLVIndex;
//# sourceMappingURL=computations.js.map