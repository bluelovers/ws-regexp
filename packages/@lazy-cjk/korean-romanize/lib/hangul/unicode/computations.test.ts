import { intDiv, computeSIndex, computeVIndex, computeLIndex } from './computations';

describe("Integer division function", () =>
{
	test("should divide 5 by 2 and round the quotient down to the nearest integer", () =>
	{
		expect(intDiv(5, 2)).toBe(2);
	});

	test("should divide 4 by 2 and arrive at an integer quotient (no rounding needed)", () =>
	{
		expect(intDiv(4, 2)).toBe(2);
	});
});

describe("computeSIndex function", () =>
{
	test.todo("should be tested");

	test("should throw an error for a non-Korean character", () =>
	{
		expect(() => computeSIndex("A")).toThrow();
	});
});

describe("computeVIndex function", () =>
{
	test.todo("should be tested");
});

describe("computeLIndex function", () =>
{
	test.todo("should be tested");
});
