"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatinSmallLetterR = exports.LatinSmallLetterP = exports.LatinSmallLetterN = exports.LatinSmallLetterM = exports.LatinSmallLetterK = exports.LatinSmallLetterI = exports.LatinSmallLetterG = exports.LatinSmallLetterF = exports.LatinSmallLetterD = exports.LatinSmallLetterC = exports.LatinSmallLetterB = exports.LatinSmallLetterA = exports.LowLine = exports.LatinCapitalLetterZ = exports.LatinCapitalLetterW = exports.LatinCapitalLetterS = exports.LatinCapitalLetterP = exports.LatinCapitalLetterF = exports.LatinCapitalLetterD = exports.LatinCapitalLetterB = exports.LatinCapitalLetterA = exports.QuestionMark = exports.GreaterThanSign = exports.EqualsSign = exports.LessThanSign = exports.Colon = exports.DigitNine = exports.DigitSeven = exports.DigitOne = exports.DigitZero = exports.Solidus = exports.FullStop = exports.HyphenMinus = exports.Comma = exports.PlusSign = exports.Asterisk = exports.RightParenthesis = exports.LeftParenthesis = exports.DollarSign = exports.ExclamationMark = exports.CarriageReturn = exports.FormFeed = exports.LineTabulation = exports.LineFeed = exports.CharacterTabulation = exports.Backspace = exports.Null = exports.PropertyData = exports.isIdStart = exports.isIdContinue = void 0;
exports.digitToInt = exports.isValidUnicode = exports.isLineTerminator = exports.isHexDigit = exports.isOctalDigit = exports.isDecimalDigit = exports.isLatinLetter = exports.MaxCodePoint = exports.MinCodePoint = exports.ParagraphSeparator = exports.LineSeparator = exports.ZeroWidthJoiner = exports.ZeroWidthNonJoiner = exports.RightCurlyBracket = exports.VerticalLine = exports.LeftCurlyBracket = exports.CircumflexAccent = exports.RightSquareBracket = exports.ReverseSolidus = exports.LeftSquareBracket = exports.LatinSmallLetterZ = exports.LatinSmallLetterY = exports.LatinSmallLetterX = exports.LatinSmallLetterW = exports.LatinSmallLetterV = exports.LatinSmallLetterU = exports.LatinSmallLetterT = exports.LatinSmallLetterS = void 0;
var ids_1 = require("./ids");
Object.defineProperty(exports, "isIdContinue", { enumerable: true, get: function () { return ids_1.isIdContinue; } });
Object.defineProperty(exports, "isIdStart", { enumerable: true, get: function () { return ids_1.isIdStart; } });
var property_data_1 = require("./property-data");
Object.defineProperty(exports, "PropertyData", { enumerable: true, get: function () { return property_data_1.PropertyData; } });
exports.Null = 0x00;
exports.Backspace = 0x08;
exports.CharacterTabulation = 0x09;
exports.LineFeed = 0x0a;
exports.LineTabulation = 0x0b;
exports.FormFeed = 0x0c;
exports.CarriageReturn = 0x0d;
exports.ExclamationMark = 0x21;
exports.DollarSign = 0x24;
exports.LeftParenthesis = 0x28;
exports.RightParenthesis = 0x29;
exports.Asterisk = 0x2a;
exports.PlusSign = 0x2b;
exports.Comma = 0x2c;
exports.HyphenMinus = 0x2d;
exports.FullStop = 0x2e;
exports.Solidus = 0x2f;
exports.DigitZero = 0x30;
exports.DigitOne = 0x31;
exports.DigitSeven = 0x37;
exports.DigitNine = 0x39;
exports.Colon = 0x3a;
exports.LessThanSign = 0x3c;
exports.EqualsSign = 0x3d;
exports.GreaterThanSign = 0x3e;
exports.QuestionMark = 0x3f;
exports.LatinCapitalLetterA = 0x41;
exports.LatinCapitalLetterB = 0x42;
exports.LatinCapitalLetterD = 0x44;
exports.LatinCapitalLetterF = 0x46;
exports.LatinCapitalLetterP = 0x50;
exports.LatinCapitalLetterS = 0x53;
exports.LatinCapitalLetterW = 0x57;
exports.LatinCapitalLetterZ = 0x5a;
exports.LowLine = 0x5f;
exports.LatinSmallLetterA = 0x61;
exports.LatinSmallLetterB = 0x62;
exports.LatinSmallLetterC = 0x63;
exports.LatinSmallLetterD = 0x64;
exports.LatinSmallLetterF = 0x66;
exports.LatinSmallLetterG = 0x67;
exports.LatinSmallLetterI = 0x69;
exports.LatinSmallLetterK = 0x6b;
exports.LatinSmallLetterM = 0x6d;
exports.LatinSmallLetterN = 0x6e;
exports.LatinSmallLetterP = 0x70;
exports.LatinSmallLetterR = 0x72;
exports.LatinSmallLetterS = 0x73;
exports.LatinSmallLetterT = 0x74;
exports.LatinSmallLetterU = 0x75;
exports.LatinSmallLetterV = 0x76;
exports.LatinSmallLetterW = 0x77;
exports.LatinSmallLetterX = 0x78;
exports.LatinSmallLetterY = 0x79;
exports.LatinSmallLetterZ = 0x7a;
exports.LeftSquareBracket = 0x5b;
exports.ReverseSolidus = 0x5c;
exports.RightSquareBracket = 0x5d;
exports.CircumflexAccent = 0x5e;
exports.LeftCurlyBracket = 0x7b;
exports.VerticalLine = 0x7c;
exports.RightCurlyBracket = 0x7d;
exports.ZeroWidthNonJoiner = 0x200c;
exports.ZeroWidthJoiner = 0x200d;
exports.LineSeparator = 0x2028;
exports.ParagraphSeparator = 0x2029;
exports.MinCodePoint = 0x00;
exports.MaxCodePoint = 0x10ffff;
function isLatinLetter(code) {
    return ((code >= exports.LatinCapitalLetterA && code <= exports.LatinCapitalLetterZ) ||
        (code >= exports.LatinSmallLetterA && code <= exports.LatinSmallLetterZ));
}
exports.isLatinLetter = isLatinLetter;
function isDecimalDigit(code) {
    return code >= exports.DigitZero && code <= exports.DigitNine;
}
exports.isDecimalDigit = isDecimalDigit;
function isOctalDigit(code) {
    return code >= exports.DigitZero && code <= exports.DigitSeven;
}
exports.isOctalDigit = isOctalDigit;
function isHexDigit(code) {
    return ((code >= exports.DigitZero && code <= exports.DigitNine) ||
        (code >= exports.LatinCapitalLetterA && code <= exports.LatinCapitalLetterF) ||
        (code >= exports.LatinSmallLetterA && code <= exports.LatinSmallLetterF));
}
exports.isHexDigit = isHexDigit;
function isLineTerminator(code) {
    return (code === exports.LineFeed ||
        code === exports.CarriageReturn ||
        code === exports.LineSeparator ||
        code === exports.ParagraphSeparator);
}
exports.isLineTerminator = isLineTerminator;
function isValidUnicode(code) {
    return code >= exports.MinCodePoint && code <= exports.MaxCodePoint;
}
exports.isValidUnicode = isValidUnicode;
function digitToInt(code) {
    if (code >= exports.LatinSmallLetterA && code <= exports.LatinSmallLetterF) {
        return code - exports.LatinSmallLetterA + 10;
    }
    if (code >= exports.LatinCapitalLetterA && code <= exports.LatinCapitalLetterF) {
        return code - exports.LatinCapitalLetterA + 10;
    }
    return code - exports.DigitZero;
}
exports.digitToInt = digitToInt;
//# sourceMappingURL=index.js.map