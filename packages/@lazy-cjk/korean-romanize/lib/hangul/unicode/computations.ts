import { SBase, NCount, TCount, SCount } from './constraints';

/**
 * Returns an integer division quotient (rounded down)
 *
 * @param {number} dividend
 * @param {number} divisor
 */
export function intDiv(dividend, divisor)
{
	return Math.floor(dividend / divisor);
}

/**
 *
 * @param {(string|integer)} s
 */
export function computeSIndex(s)
{
	const SIndex = (typeof s === "string" ? s.charCodeAt(0) : s) - SBase;

	if (0 > SIndex || SIndex >= SCount)
	{
		throw new Error(`Not a Hangul syllable: ${s}`);
	}

	return SIndex;
}

/**
 *
 * @param {integer} SIndex
 */
export function computeLIndex(SIndex)
{
	return intDiv(SIndex, NCount);
} // integer division rounded down

/**
 *
 * @param {integer} SIndex
 */
export function computeVIndex(SIndex)
{
	return intDiv(SIndex % NCount, TCount);
}

/**
 *
 * @param {integer} SIndex
 */
export function computeTIndex(SIndex)
{
	return SIndex % TCount;
}

/**
 *
 * @param {integer} SIndex
 */
export function computeLVIndex(SIndex)
{
	return (SIndex / TCount) * TCount;
}
