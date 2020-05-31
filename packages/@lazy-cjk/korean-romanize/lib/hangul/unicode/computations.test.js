"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const computations_1 = require("./computations");
describe("Integer division function", () => {
    test("should divide 5 by 2 and round the quotient down to the nearest integer", () => {
        expect(computations_1.intDiv(5, 2)).toBe(2);
    });
    test("should divide 4 by 2 and arrive at an integer quotient (no rounding needed)", () => {
        expect(computations_1.intDiv(4, 2)).toBe(2);
    });
});
describe("computeSIndex function", () => {
    test.todo("should be tested");
    test("should throw an error for a non-Korean character", () => {
        expect(() => computations_1.computeSIndex("A")).toThrow();
    });
});
describe("computeVIndex function", () => {
    test.todo("should be tested");
});
describe("computeLIndex function", () => {
    test.todo("should be tested");
});
//# sourceMappingURL=computations.test.js.map