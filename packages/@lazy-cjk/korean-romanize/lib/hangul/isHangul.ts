import * as unicodeBlocks from './unicode/blocks';

const hangulBlocks = Object.entries(unicodeBlocks)
	.filter(([blockName]) =>
		blockName.startsWith("HANGUL"),
	);

/**
 * Check whether a provided character belongs to a Hangul Unicode block
 *
 * Returns null if input is not a string.
 *
 * @param {*} char
 * @param {blocks}
 */
export function isHangul(char?: string, blocks = hangulBlocks)
{
	if (typeof char !== "string")
	{
		return null as null;
	}

	const codePoint = char.codePointAt(0);

	// @ts-ignore
	for (const [block, [start, end]] of blocks)
	{
		if (codePoint >= start && codePoint <= end)
		{
			return block;
		}
	}
	return false;
}

export default isHangul;
