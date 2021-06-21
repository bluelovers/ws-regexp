"use strict";
const tslib_1 = require("tslib");
const constraints_1 = require("./constraints");
const getData_1 = tslib_1.__importDefault(require("./getData"));
// totals including archaic jamo
const LTotal = 90; // initial consonants
const VTotal = 4 * 16 + 2; // medial vowels
const TTotal = 8 * 10 + 3; // final consonants
/**
 * Produces an array of objects for each jamo for given range
 *
 * @param {integer} offset
 * @param {integer} numCurrent
 * @param {integer} numTotal
 */
const indexJamo = (offset, numCurrent, numTotal) => Array(numTotal || numCurrent)
    .fill({})
    .map((p, idx) => {
    const codePoint = offset + idx;
    const unicodeData = getData_1.default(codePoint);
    return {
        jamo: String.fromCodePoint(codePoint),
        archaic: idx + 1 > numCurrent,
        unicodeData,
    };
});
module.exports = [
    // initial consonants
    indexJamo(constraints_1.LBase, constraints_1.LCount, LTotal),
    // medial vowels
    indexJamo(constraints_1.VBase, constraints_1.VCount, VTotal),
    // final consonants
    indexJamo(constraints_1.TBase, constraints_1.TCount, TTotal),
];
//# sourceMappingURL=hangul-jamo.js.map