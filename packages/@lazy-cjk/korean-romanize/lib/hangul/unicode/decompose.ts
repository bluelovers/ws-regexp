import { SBase, LBase, VBase, TBase } from './constraints';

import { computeSIndex, computeLIndex, computeVIndex, computeLVIndex, computeTIndex } from './computations';

/**
 * Based on "Arithmetic Decomposition Mapping" as described in Unicode core spec for "LV" Hangul syllable types
 *
 * @param {(string|integer)} s
 * @returns {array}
 */
export function arithmeticDecompositionMappingLV(s)
{
	const SIndex = computeSIndex(s);
	const LIndex = computeLIndex(SIndex);
	const VIndex = computeVIndex(SIndex);

	const LPart = LBase + LIndex;
	const VPart = VBase + VIndex;

	return [LPart, VPart];
}

/**
 * Based on "Arithmetic Decomposition Mapping" as described in Unicode core spec for "LVT" Hangul syllable types
 *
 * @param {(string|integer)} s
 * @returns {array}
 */
export function arithmeticDecompositionMappingLVT(s)
{
	const SIndex = computeSIndex(s);
	const LVIndex = computeLVIndex(SIndex);
	const TIndex = computeTIndex(SIndex);

	const LVPart = SBase + LVIndex;
	const TPart = TBase + TIndex;

	return [LVPart, TPart];
}

/**
 * Derives a canonical decomposition of a precomposed/composite Hangul syllable
 *
 * Based on "Full Canonical Decomposition" as described in Unicode core
 * specification for canonical decomposition mappings.
 *
 * In other words:
 *
 * This function computes the code points for the Hangul letters (jamo) derived
 * algorithmically for a given Hangul syllable's code point.
 *
 * The algorithm is described in the core spec (v. 12.1, Chapter 3), under section
 * "3.12 Conjoining Jamo Behavior" (pp. 142-151).
 *
 * @param {(string|integer)} s
 * @returns {array}
 */
export function decomposeHangulChar(s)
{
	const SIndex = (typeof s === "string" ? s.charCodeAt(0) : s) - SBase;

	const LVPart = arithmeticDecompositionMappingLV(s);
	const TIndex = computeTIndex(SIndex);

	if (TIndex > 0)
	{
		const TPart = TBase + TIndex;
		return LVPart.concat([TPart]);
	}

	return LVPart;
}

/**
 * Returns a mapping of each Hangul character provided to an array of code points for the decomposed letters (jamo)
 *
 * @param {string} word
 * @returns {array}
 */
export function decomposeHangul(word)
{
	return [...word].map(decomposeHangulChar);
}

