import { SBase, NCount, TCount, SCount } from './constraints';

/**
 * Returns an integer division quotient (rounded down)
 *
 * @param {number} dividend
 * @param {number} divisor
 */
export function intDiv(dividend: number, divisor: number)
{
	return Math.floor(dividend / divisor);
}

export function handleSIndexInput(s: string | number)
{
	const SIndex = (typeof s === "string" ? s.charCodeAt(0) : s) - SBase;

	return SIndex
}

/**
 *
 * @param {(string|integer)} s
 */
export function computeSIndex(s: string | number)
{
	const SIndex = handleSIndexInput(s);

	if (0 > SIndex || SIndex >= SCount)
	{
		throw new RangeError(`Not a Hangul syllable: ${s}, index: ${SIndex} should not >= ${SCount}`);
	}

	return SIndex;
}

/**
 *
 * @param {integer} SIndex
 */
export function computeLIndex(SIndex: number)
{
	return intDiv(SIndex, NCount);
} // integer division rounded down

/**
 *
 * @param {integer} SIndex
 */
export function computeVIndex(SIndex: number)
{
	return intDiv(SIndex % NCount, TCount);
}

/**
 *
 * @param {integer} SIndex
 */
export function computeTIndex(SIndex: number)
{
	return SIndex % TCount;
}

/**
 *
 * @param {integer} SIndex
 */
export function computeLVIndex(SIndex: number)
{
	return (SIndex / TCount) * TCount;
}
