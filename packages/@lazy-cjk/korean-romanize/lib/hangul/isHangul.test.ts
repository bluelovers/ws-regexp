import isHangul from './isHangul';

import {
	BASIC_LATIN,
	CJK_UNIFIED_IDEOGRAPHS,
	CJK_SYMBOLS_AND_PUNCTUATION,
	HANGUL_SYLLABLES,
	HANGUL_JAMO, HANGUL_COMPATIBILITY_JAMO, HANGUL_JAMO_EXTENDED_A, HANGUL_JAMO_EXTENDED_B,
} from './unicode/blocks';

const describeTestBlock = (description, jamoBlock, expected) =>
	describe(description, () =>
	{
		const [start, stop] = jamoBlock;
		for (let charCode = start; charCode <= stop; charCode += 1)
		{
			const char = String.fromCodePoint(charCode);
			test(`should determine ${char} is not hangul`, () =>
			{
				if (expected)
				{
					expect(isHangul(char)).toBeTruthy();
				}
				else
				{
					expect(isHangul(char)).toBe(false);
				}
			});
		}
	});

describe("isHangul", () =>
{
	describe("should return null", () =>
	{
		test("for an undefined input", () =>
		{
			expect(isHangul()).toBeNull();
		});

		test("for a null input", () =>
		{
			expect(isHangul(null)).toBeNull();
		});

		test("for NaN input", () =>
		{
			expect(isHangul(NaN as any)).toBeNull();
		});

		test("for an object input", () =>
		{
			expect(isHangul({} as any)).toBeNull();
		});

		test("for a number input", () =>
		{
			expect(isHangul(1945 as any)).toBeNull();
		});
	});

	test("should return truthy for ㄱ", () =>
	{
		expect(isHangul("ㄱ")).toBeTruthy();
	});

	test("should return truthy for ㅏ", () =>
	{
		expect(isHangul("ㅏ")).toBeTruthy();
	});

	test("should return truthy for 가", () =>
	{
		expect(isHangul("가")).toBeTruthy();
	});

	describeTestBlock("basic Latin", BASIC_LATIN, false);

	// describeTestBlock(
	//   "Chinese/Japanese/Korean unified ideographs",
	//   CJK_UNIFIED_IDEOGRAPHS,
	//   false
	// );

	// describeTestBlock(
	//   "Chinese/Japanese/Korean symbols and punctuation",
	//   CJK_SYMBOLS_AND_PUNCTUATION,
	//   false
	// );

	// describeTestBlock("Hangul syllables", HANGUL_SYLLABLES, true);

	// describeTestBlock("Hangul jamo", HANGUL_JAMO, true);

	// describeTestBlock(
	//   "Hangul compatibility jamo",
	//   HANGUL_COMPATIBILITY_JAMO,
	//   true
	// );

	// describeTestBlock("Hangul jamo extended-A", HANGUL_JAMO_EXTENDED_A, true);

	// describeTestBlock("Hangul jamo extended-B", HANGUL_JAMO_EXTENDED_B, true);
});
