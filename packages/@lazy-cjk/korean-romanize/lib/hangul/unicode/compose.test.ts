const {
	computeTIndexFromTPart,
	arithmeticPrimaryCompositeMapping,
} = require("./compose");

describe("computeTIndexFromTPart", () =>
{
	test("should be tested", () =>
	{
		expect(computeTIndexFromTPart());
	});
});

const testCases = [
	{
		jamoCodePoints: [0x1111, 0x1171, 0x11b6],
		expectedCodePoint: 0xd4db,
	},
	// { // TODO
	//   jamoCodePoints: [0x1100, 0x1162],
	//   expectedCodePoint: 0xac1c
	// }
];

describe("arithmeticPrimaryCompositeMapping", () =>
{
	testCases.forEach(({ jamoCodePoints, expectedCodePoint }) =>
	{
		test(`should compose (${jamoCodePoints.join(", ")}) (${String.fromCodePoint(
			...jamoCodePoints,
		)}) to ${expectedCodePoint} (${String.fromCodePoint(
			expectedCodePoint,
		)})`, () =>
		{
			expect(arithmeticPrimaryCompositeMapping(...jamoCodePoints)).toBe(
				expectedCodePoint,
			);
		});
	});
});

describe("arithmeticPrimaryCompositeMappingWithLVPart", () =>
{
	test.todo("should be tested");
});
