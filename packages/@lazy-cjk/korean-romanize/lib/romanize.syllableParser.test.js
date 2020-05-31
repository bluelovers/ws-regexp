"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const romanize_1 = require("./romanize");
describe("syllableParser", () => {
    const parseSyllable = romanize_1.syllableParser({});
    test("should return a function", () => {
        expect(parseSyllable).toBeInstanceOf(Function);
    });
    const hunminjeongeum = [
        [0x1112, 0x116e, 0x11ab],
        [0x1106, 0x1175, 0x11ab],
        [0x110c, 0x1165, 0x11bc],
        [0x110b, 0x1173, 0x11b7],
    ];
    test("should parse 훈민정음 to [[h,u,n],[m,i,n],[j,eo,ng-],[,eu,m]]", () => {
        expect(hunminjeongeum.map(parseSyllable)).toStrictEqual([
            ["h", "u", "n"],
            ["m", "i", "n"],
            ["j", "eo", "ng-"],
            ["", "eu", "m"],
        ]);
    });
});
//# sourceMappingURL=romanize.syllableParser.test.js.map