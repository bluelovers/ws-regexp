import { computeSIndex, computeLIndex, computeVIndex, computeTIndex } from './computations';

import { JAMO_L_TABLE, JAMO_V_TABLE, JAMO_T_TABLE } from './jamoShortNames';

/**
 * Generates a letter/jamo-derived short name for a given precomposed Hangul syllable
 *
 * @param {(string|integer)} s
 * @returns {string} Unicode Hangul syllable short name
 */
export function getHangulCharShortName(s)
{
	const SIndex = computeSIndex(s);
	const LIndex = computeLIndex(SIndex);
	const VIndex = computeVIndex(SIndex);
	const TIndex = computeTIndex(SIndex);

	return JAMO_L_TABLE[LIndex] + JAMO_V_TABLE[VIndex] + JAMO_T_TABLE[TIndex];
}

/**
 * Constructs a precomposed Hangul syllable name
 *
 * Based on "Hangul Character Name Generation" as described in Unicode core
 * specification for sample code for Hangul algorithms, under section
 * "3.12 Conjoining Jamo Behavior" (pp. 142-151)
 *
 * @param {(string|integer)} s
 * @returns {string} Unicode Hangul syllable name
 */
export function getHangulCharName(s)
{
	return "HANGUL SYLLABLE " + getHangulCharShortName(s);
}

