"use strict";
/**
 * Created by user on 2018/4/27/027.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPOXIX = exports.PatternTest = exports.POXIX = void 0;
const pattern_1 = require("../../pattern");
/**
 * @link https://www.regular-expressions.info/posixbrackets.html
 */
var POXIX;
(function (POXIX) {
    POXIX["alnum"] = "alnum";
    POXIX["alpha"] = "alpha";
    POXIX["ascii"] = "ascii";
    POXIX["blank"] = "blank";
    POXIX["cntrl"] = "cntrl";
    POXIX["digit"] = "digit";
    POXIX["graph"] = "graph";
    POXIX["lower"] = "lower";
    POXIX["print"] = "print";
    POXIX["punct"] = "punct";
    POXIX["space"] = "space";
    POXIX["upper"] = "upper";
    POXIX["word"] = "word";
    POXIX["xdigit"] = "xdigit";
})(POXIX = exports.POXIX || (exports.POXIX = {}));
exports.PatternTest = {
    alnum: [
        ['^[:alnum:]+$', 'g', 'azAZ09', true, 'test'],
    ],
    alpha: [
        ['^[:alpha:]+$', 'g', 'azAZ', true, 'test'],
        ['^[:alpha:]+$', 'g', 'azAZ09', false, 'test'],
    ],
};
// @ts-ignore
function testPOXIX(name, RegExpClass = RegExp, testPatterns = exports.PatternTest) {
    // @ts-ignore
    return (0, pattern_1.testPattern)(name, RegExpClass, testPatterns);
}
exports.testPOXIX = testPOXIX;
exports.default = POXIX;
//# sourceMappingURL=posix.js.map