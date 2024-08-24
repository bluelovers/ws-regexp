"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListJamoHangul = void 0;
const constraints_1 = require("./constraints");
const getData_1 = require("./getData");
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
function indexJamo(offset, numCurrent, numTotal) {
    return Array(numTotal || numCurrent)
        .fill({})
        .map((p, idx) => {
        const codePoint = offset + idx;
        const unicodeData = (0, getData_1.getUnicodeDataFor)(codePoint);
        return {
            jamo: String.fromCodePoint(codePoint),
            archaic: idx + 1 > numCurrent,
            unicodeData,
        };
    });
}
exports.ListJamoHangul = [
    // initial consonants
    indexJamo(constraints_1.LBase, constraints_1.LCount, LTotal),
    // medial vowels
    indexJamo(constraints_1.VBase, constraints_1.VCount, VTotal),
    // final consonants
    indexJamo(constraints_1.TBase, constraints_1.TCount, TTotal),
];
//# sourceMappingURL=hangul-jamo.js.map