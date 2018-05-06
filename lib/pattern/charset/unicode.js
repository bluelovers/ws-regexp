"use strict";
/**
 * Created by user on 2018/5/6/006.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../util/index");
const index_2 = require("./index");
const categories_1 = require("../cache/categories");
const properties_1 = require("../cache/properties");
//console.log(properties);
exports.KEY_PREFIX = '\\p{';
exports.KEY_PREFIX_NEGATION = '\\P{';
exports.KEY_SUFFIX = '}';
/**
 * @link http://2ality.com/2017/07/regexp-unicode-property-escapes.html
 * @link https://en.wikipedia.org/wiki/Unicode_character_property
 * @link http://www.wellho.net/regex/javare.html
 */
exports.UNICODE = {
    White_Space: false,
    Letter: false,
    Lower: false,
    Upper: false,
    Alpha: false,
    Digit: false,
    Alnum: false,
    Punct: false,
    Graph: false,
    Blank: false,
    Cntrl: false,
    XDigit: false,
    Space: false,
    Decimal_Digit_Number: false,
};
exports.UNICODE_ALL = Object.assign({}, categories_1.default, properties_1.default, exports.UNICODE);
/**
 * @todo test more
 */
exports.PatternTest = {
    White_Space: [
        ['^\\p{White_Space}+$', 'u', '\t \n\r', true, 'test'],
    ],
    Letter: [
        ['^\\p{Letter}+$', 'u', 'πüé', true, 'test'],
        ['^\\p{L}+$', 'u', 'πüé', true, 'test'],
        ['^\\P{L}+$', 'u', 'πüé', false, 'test'],
        ['^\\P{L}+$', 'u', '\n', true, 'test'],
    ],
    Surrogate: [
        ['^\\p{Surrogate}+$', 'u', '\u{D83D}', true, 'test'],
        ['^\\p{Surrogate}+$', 'u', '\u{DE00}', true, 'test'],
    ],
    Number: [
        ['^\\p{Number}+$', 'u', '09', true, 'test'],
        ['^\\p{Number}+$', 'u', 'a', false, 'test'],
    ],
    Nd: [
        ['^\\p{Nd}+$', 'u', '09', true, 'test'],
    ],
    Letter_Number: [
        ['^\\p{Letter_Number}+$', 'u', '09', false, 'test'],
        ['^\\P{Letter_Number}+$', 'u', '09', true, 'test'],
    ],
    Other_Number: [
        ['^\\p{Other_Number}+$', 'u', '09', false, 'test'],
        ['^\\P{Other_Number}+$', 'u', '09', true, 'test'],
    ],
    Control: [
        ['^\\p{Control}+$', 'u', '\x1F\x9F', true, 'test'],
        ['^\\p{Control}+$', 'u', 'a', false, 'test'],
    ],
    Any: [
        ['^\\p{Any}+$', 'u', '1', true, 'test'],
    ],
    ASCII: [
        ['^\\p{ASCII}+$', 'u', '\x00\x7F', true, 'test'],
        ['^\\p{ASCII}+$', 'u', '\u007F', true, 'test'],
        ['^\\p{ASCII}+$', 'u', '\u0080', false, 'test'],
    ],
    Lower: [
        ['^\\p{Lower}+$', 'u', 'az', true, 'test'],
        ['^\\p{Lower}+$', 'u', 'aZ', false, 'test'],
    ],
    Upper: [
        ['^\\p{Upper}+$', 'u', 'AZ', true, 'test'],
        ['^\\p{Upper}+$', 'u', 'aZ', false, 'test'],
    ],
    Alpha: [
        ['^\\p{Alpha}+$', 'u', 'AZaz', true, 'test'],
        ['^\\p{Alpha}+$', 'u', '-', false, 'test'],
        ['^\\p{Alpha}+$', 'u', '0', false, 'test'],
    ],
    //-------------
    Digit: [
        ['^\\p{Digit}+$', 'u', '09', true, 'test'],
    ],
    Alnum: [
        ['^\\p{Alnum}+$', 'u', 'azAZ09', true, 'test'],
    ],
    Punct: [
        ['^\\p{Punct}+$', 'u', '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~', true, 'test'],
        ['^\\p{Punct}+$', 'u', 'az', false, 'test'],
    ],
    Graph: [
        ['^\\p{Graph}+$', 'u', 'azAZ09@', true, 'test'],
    ],
    Blank: [
        ['^\\p{Blank}+$', 'u', '\t', true, 'test'],
    ],
    Cntrl: [
        ['^\\p{Cntrl}+$', 'u', '\x00', true, 'test'],
    ],
    XDigit: [
        ['^\\p{XDigit}+$', 'u', '09afAF', true, 'test'],
    ],
    Space: [
        ['^\\p{Space}+$', 'u', ' ', true, 'test'],
    ],
    // -----------
    P: [
        //['^\\p{Punctuation}+$', '', '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~', true, 'test'],
        ['^\\p{P}+$', '', 'az', false, 'test'],
        ['^\\p{P}+$', '', '!', true, 'test'],
    ],
    Punctuation: [
        //['^\\p{Punctuation}+$', '', '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~', true, 'test'],
        ['^\\p{Punctuation}+$', '', 'az', false, 'test'],
        ['^\\p{Punctuation}+$', '', '!', true, 'test'],
    ],
    Decimal_Digit_Number: [
        ['^\\p{Decimal_Digit_Number}+$', 'u', '09', true, 'test'],
    ],
    Lowercase_Letter: [
        ['^\\p{Lowercase_Letter}+$', 'u', 'az', true, 'test'],
        ['^\\p{Lowercase_Letter}+$', 'u', 'aZ', false, 'test'],
    ],
    Uppercase_Letter: [
        ['^\\p{Uppercase_Letter}+$', 'u', 'AZ', true, 'test'],
        ['^\\p{Uppercase_Letter}+$', 'u', 'aZ', false, 'test'],
    ],
    Line_Separator: [
        ['^\\p{Line_Separator}+$', 'u', '\u2028', true, 'test'],
        ['^\\p{Line_Separator}+$', 'u', 'aZ', false, 'test'],
    ],
    Paragraph_Separator: [
        ['^\\p{Paragraph_Separator}+$', 'u', '\u2029', true, 'test'],
        ['^\\p{Paragraph_Separator}+$', 'u', 'aZ', false, 'test'],
    ],
    Separator: [
        ['^\\p{Separator}+$', 'u', ' 　', true, 'test'],
        ['^\\p{Separator}+$', 'u', '       　', true, 'test'],
    ],
    Space_Separator: [
        ['^\\p{Space_Separator}+$', 'u', ' 　', true, 'test'],
        ['^\\p{Space_Separator}+$', 'u', '       　', true, 'test'],
    ],
    Dash_Punctuation: [
        ['^\\p{Dash_Punctuation}+$', 'u', '-', true, 'test'],
    ],
};
exports._testUnicode = index_1._createFnTestPattern(exports.PatternTest);
function testUnicode(name, RegExpClass, testPatterns = exports.PatternTest) {
    if (!exports.PatternTest.hasOwnProperty(name) && categories_1.NAME_ALIAS[name] && exports.PatternTest.hasOwnProperty(categories_1.NAME_ALIAS[name])) {
        name = categories_1.NAME_ALIAS[name];
    }
    return exports._testUnicode(name, RegExpClass, testPatterns);
}
exports.testUnicode = testUnicode;
// @ts-ignore
function testUnicodeAll(RegExpClass = RegExp, testPatterns = exports.PatternTest) {
    return Object.keys(exports.UNICODE_ALL).reduce(function (a, key) {
        a[key] = testUnicode(key);
        return a;
    }, {});
}
exports.testUnicodeAll = testUnicodeAll;
function wrapToRegexName(name, negation) {
    let prefix = exports.KEY_PREFIX;
    if (negation) {
        prefix = exports.KEY_PREFIX_NEGATION;
    }
    return index_2._wrapToRegexName(name, prefix, exports.KEY_SUFFIX);
}
exports.wrapToRegexName = wrapToRegexName;
const self = require("./unicode");
exports.default = self;
