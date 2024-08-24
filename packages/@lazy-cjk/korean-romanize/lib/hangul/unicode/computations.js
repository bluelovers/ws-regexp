"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intDiv = intDiv;
exports.handleSIndexInput = handleSIndexInput;
exports.computeSIndex = computeSIndex;
exports.computeLIndex = computeLIndex;
exports.computeVIndex = computeVIndex;
exports.computeTIndex = computeTIndex;
exports.computeLVIndex = computeLVIndex;
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
function handleSIndexInput(s) {
    const SIndex = (typeof s === "string" ? s.charCodeAt(0) : s) - constraints_1.SBase;
    return SIndex;
}
/**
 *
 * @param {(string|integer)} s
 */
function computeSIndex(s) {
    const SIndex = handleSIndexInput(s);
    if (0 > SIndex || SIndex >= constraints_1.SCount) {
        throw new RangeError(`Not a Hangul syllable: ${s}, index: ${SIndex} should not >= ${constraints_1.SCount}`);
    }
    return SIndex;
}
/**
 *
 * @param {integer} SIndex
 */
function computeLIndex(SIndex) {
    return intDiv(SIndex, constraints_1.NCount);
} // integer division rounded down
/**
 *
 * @param {integer} SIndex
 */
function computeVIndex(SIndex) {
    return intDiv(SIndex % constraints_1.NCount, constraints_1.TCount);
}
/**
 *
 * @param {integer} SIndex
 */
function computeTIndex(SIndex) {
    return SIndex % constraints_1.TCount;
}
/**
 *
 * @param {integer} SIndex
 */
function computeLVIndex(SIndex) {
    return (SIndex / constraints_1.TCount) * constraints_1.TCount;
}
//# sourceMappingURL=computations.js.map