import { LBase, LCount, VBase, VCount, TBase, TCount } from './constraints';

import getUnicodeDataFor from './getData';
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
const indexJamo = (offset, numCurrent, numTotal) =>
	Array(numTotal || numCurrent)
		.fill({})
		.map((p, idx) =>
		{
			const codePoint = offset + idx;
			const unicodeData = getUnicodeDataFor(codePoint);

			return {
				jamo: String.fromCodePoint(codePoint),
				archaic: idx + 1 > numCurrent,
				unicodeData,
			};
		});

export = [
	// initial consonants
	indexJamo(LBase, LCount, LTotal),
	// medial vowels
	indexJamo(VBase, VCount, VTotal),
	// final consonants
	indexJamo(TBase, TCount, TTotal),
];
