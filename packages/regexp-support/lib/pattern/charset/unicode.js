"use strict";
/**
 * Created by user on 2018/5/6/006.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapToRegexName = exports.testUnicodeAll = exports.testUnicode = exports._testUnicode = exports.PatternTest = exports.UNICODE_NAME_ALIAS_ALL = exports.UNICODE_NAME_ALIAS = exports.UNICODE_ALL = exports.UNICODE = exports.KEY_SUFFIX = exports.KEY_PREFIX_NEGATION = exports.KEY_PREFIX = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../util/index");
const index_2 = require("./index");
const categories_1 = tslib_1.__importStar(require("../cache/categories"));
const properties_1 = tslib_1.__importDefault(require("../cache/properties"));
const property_data_1 = tslib_1.__importDefault(require("../cache/property-data"));
//console.log(properties);
exports.KEY_PREFIX = '\\p{';
exports.KEY_PREFIX_NEGATION = '\\P{';
exports.KEY_SUFFIX = '}';
/**
 * @link http://2ality.com/2017/07/regexp-unicode-property-escapes.html
 * @link https://en.wikipedia.org/wiki/Unicode_character_property
 * @link http://www.wellho.net/regex/javare.html
 * @link https://zhuanlan.zhihu.com/p/33335629
 * @link https://github.com/Icemic/huozi.js/blob/master/lib/isCJK.js
 * @link https://github.com/ethantw/Han/blob/master/src/js/regex/unicode.js
 * @link https://github.com/tc39/proposal-regexp-unicode-property-escapes#why-not-support-the-name-property-pname
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
    Ideographic: false,
    Unified_Ideograph: false,
};
exports.UNICODE_ALL = {
    //	...CACHE_BLOCKS,
    ...categories_1.default,
    ...properties_1.default,
    //...CACHE_SCRIPTS,
    ...property_data_1.default.$LONE,
    ...property_data_1.default.General_Category,
    ...exports.UNICODE,
};
var UNICODE_NAME_ALIAS;
(function (UNICODE_NAME_ALIAS) {
    UNICODE_NAME_ALIAS["Quotation_Mark"] = "QMark";
    UNICODE_NAME_ALIAS["Pattern_Syntax"] = "Pat_Syn";
    UNICODE_NAME_ALIAS["Ideographic"] = "Ideo";
})(UNICODE_NAME_ALIAS = exports.UNICODE_NAME_ALIAS || (exports.UNICODE_NAME_ALIAS = {}));
Object.keys(UNICODE_NAME_ALIAS)
    .forEach(function (key) {
    let k2 = UNICODE_NAME_ALIAS[key];
    if (k2 && !UNICODE_NAME_ALIAS[k2]) {
        // @ts-ignore
        UNICODE_NAME_ALIAS[k2] = key;
    }
});
exports.UNICODE_NAME_ALIAS_ALL = Object.assign({}, categories_1.NAME_ALIAS, UNICODE_NAME_ALIAS, categories_1.NAME_ALIAS);
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
        ['^\\p{Decimal_Number}+', 'u', '𝟏𝟐𝟑𝟜𝟝𝟞𝟩𝟪𝟫𝟬𝟭𝟮𝟯𝟺𝟻𝟼', true, 'test'],
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
        //		['^\\p{P}+$', 'u', '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~', true, 'test'],
        ['^\\p{P}+$', 'u', 'az', false, 'test'],
        ['^\\p{P}+$', 'u', '-', true, 'test'],
    ],
    Punctuation: [
        //		['^\\p{Punctuation}+$', 'u', '!"#$%&\'()*+,-./:;<=>\?@\[\\\]^_`{|}~', true, 'test'],
        ['^[\\p{Punctuation}]+$', 'u', 'az', false, 'test'],
        ['^[\\p{Punctuation}]+$', 'u', '-', true, 'test'],
        ['^\\p{Punctuation}+$', 'u', 'az', false, 'test'],
        ['^\\p{Punctuation}+$', 'u', '-', true, 'test'],
        ['^[\\p{Punctuation}]+$', 'u', 'P', false, 'test'],
    ],
    Dash_Punctuation: [
        ['^\\p{Dash_Punctuation}+$', 'u', '-', true, 'test'],
    ],
    Pc: [
        ['^\\p{Pc}+$', 'u', '_', true, 'test'],
    ],
    Close_Punctuation: [
        ['^\\p{Close_Punctuation}+$', 'u', ')', true, 'test'],
    ],
    Other_Punctuation: [
        ['^\\p{Other_Punctuation}+$', 'u', '!', true, 'test'],
    ],
    Open_Punctuation: [
        ['^\\p{Open_Punctuation}+$', 'u', '(', true, 'test'],
    ],
    Decimal_Digit_Number: [
        ['^\\p{Decimal_Digit_Number}+$', 'u', '09', true, 'test'],
    ],
    Lowercase_Letter: [
        ['^\\p{Lowercase_Letter}+$', 'u', 'az', true, 'test'],
        ['^\\p{Lowercase_Letter}+$', 'u', 'aZ', false, 'test'],
        ['^\\p{Lowercase_Letter}+$', 'u', 'летачко', true, 'test'],
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
    /**
     * @link https://zhuanlan.zhihu.com/p/33335629
     * 匹配了除了汉字以外的其他一些字符
     */
    Ideographic: [
        ['^\\p{Ideographic}+', 'u', '\u4E00', true, 'test'],
        ['^\\p{Ideographic}+', 'u', '中文字符', true, 'test'],
        ['^\\p{Ideographic}+', 'u', '〆', true, 'test'],
        ['^\\p{Ideographic}+', 'u', 'カタカナ', false, 'test'],
    ],
    /**
     * 匹配所有汉字
     */
    Unified_Ideograph: [
        ['^\\p{Unified_Ideograph}+', 'u', '\u3400', true, 'test'],
        ['^\\p{Unified_Ideograph}+', 'u', '中文字符', true, 'test'],
        ['^\\p{Unified_Ideograph}+', 'u', '〆', false, 'test'],
        ['^\\p{Unified_Ideograph}+', 'u', 'カタカナ', false, 'test'],
    ],
    /**
     * @link https://stackoverflow.com/questions/6493954/how-to-properly-write-regex-for-unicode-first-name-in-java
     */
    Mark: [
        ['^\\p{Mark}+', 'u', '\u20d3\u3099', true, 'test'],
    ],
    Alphabetic: [
        ['^\\p{Alphabetic}+', 'u', 'aZ', true, 'test'],
        ['^\\p{Alphabetic}+', 'u', 'ማንዣበቢያ', true, 'test'],
        ['^\\p{Alphabetic}+', 'u', 'আমার', true, 'test'],
        ['^\\p{Alphabetic}+', 'u', 'ხომალდი', true, 'test'],
        ['^\\p{Alphabetic}+', 'u', 'летачко', true, 'test'],
        ['^\\p{Alphabetic}+', 'u', 'cánh', true, 'test'],
        ['^\\p{Alphabetic}+', 'u', '中文字符', true, 'test'],
        ['^\\p{Alphabetic}+', 'u', ':', false, 'test'],
        ['^\\p{Alphabetic}+', 'u', '09', false, 'test'],
    ],
    Symbol: [
        ['^\\p{Symbol}+', 'u', '$', true, 'test'],
    ],
    Currency_Symbol: [
        ['^\\p{Currency_Symbol}+', 'u', '$', true, 'test'],
    ],
    Modifier_Symbol: [
        ['^\\p{Modifier_Symbol}+', 'u', '^', true, 'test'],
        ['^\\p{Modifier_Symbol}+', 'u', '🏽', true, 'test'],
    ],
    Math_Symbol: [
        ['^\\p{Math_Symbol}+', 'u', '+', true, 'test'],
    ],
    Cased_Letter: [
        ['^\\p{Cased_Letter}+', 'u', 'летачко', true, 'test'],
    ],
    Other_Letter: [
        ['^\\p{Other_Letter}+', 'u', 'ማንዣበቢያ', true, 'test'],
    ],
    Other: [
        ['^\\p{Other}+', 'u', '\n', true, 'test'],
        ['^\\p{Other}+', 'u', '\u000a', true, 'test'],
    ],
    Enclosing_Mark: [
        ['^\\p{Enclosing_Mark}+', 'u', '⃝', true, 'test'],
        ['^\\p{Enclosing_Mark}+', 'u', '\u20dd', true, 'test'],
    ],
    Nonspacing_Mark: [
        ['^\\p{Nonspacing_Mark}+', 'u', '⃓', true, 'test'],
        ['^\\p{Nonspacing_Mark}+', 'u', '\u20d3', true, 'test'],
    ],
    Combining_Mark: [
        ['^\\p{Combining_Mark}+', 'u', '⃓', true, 'test'],
        ['^\\p{Combining_Mark}+', 'u', '\u20d3', true, 'test'],
    ],
    Initial_Punctuation: [
        ['^\\p{Initial_Punctuation}+', 'u', '‹', true, 'test'],
    ],
    Other_Symbol: [
        ['^\\p{Other_Symbol}+', 'u', '✄', true, 'test'],
    ],
    Final_Punctuation: [
        ['^\\p{Final_Punctuation}+', 'u', '»', true, 'test'],
        ['^\\p{Final_Punctuation}+', 'u', '\u00bb', true, 'test'],
    ],
    punct: [
        ['^\\p{punct}+', 'u', '!', true, 'test'],
    ],
    Quotation_Mark: [
        ['^\\p{Quotation_Mark}+', 'u', '"', true, 'test'],
    ],
    Emoji: [
        ['^\\p{Emoji}+', 'u', '👧👧👧🏻', true, 'test'],
    ],
    Emoji_Component: [
        ['^\\p{Emoji_Component}+', 'u', '🏽', true, 'test'],
    ],
    Emoji_Modifier: [
        ['^\\p{Emoji_Modifier}+', 'u', '🏽', true, 'test'],
    ],
    Emoji_Presentation: [
        ['^\\p{Emoji_Presentation}+', 'u', '👧👧👧🏻', true, 'test'],
    ],
};
exports._testUnicode = (0, index_1._createFnTestPattern)(exports.PatternTest);
function testUnicode(name, RegExpClass, testPatterns = exports.PatternTest) {
    if (!exports.PatternTest.hasOwnProperty(name) && exports.UNICODE_NAME_ALIAS_ALL[name] && exports.PatternTest.hasOwnProperty(exports.UNICODE_NAME_ALIAS_ALL[name])) {
        name = exports.UNICODE_NAME_ALIAS_ALL[name];
    }
    return (0, exports._testUnicode)(name, RegExpClass, testPatterns);
}
exports.testUnicode = testUnicode;
// @ts-ignore
function testUnicodeAll(RegExpClass = RegExp, testPatterns = exports.PatternTest) {
    return Object.keys(exports.UNICODE_ALL).reduce(function (a, name) {
        a[name] = testUnicode(name, RegExpClass, testPatterns);
        if (0 && exports.UNICODE_NAME_ALIAS_ALL[name] && typeof a[exports.UNICODE_NAME_ALIAS_ALL[name]] != 'boolean') {
            let k = exports.UNICODE_NAME_ALIAS_ALL[name];
            a[k] = testUnicode(k, RegExpClass, testPatterns);
        }
        return a;
    }, {});
}
exports.testUnicodeAll = testUnicodeAll;
function wrapToRegexName(name, negation) {
    let prefix = exports.KEY_PREFIX;
    if (negation) {
        prefix = exports.KEY_PREFIX_NEGATION;
    }
    return (0, index_2._wrapToRegexName)(name, prefix, exports.KEY_SUFFIX);
}
exports.wrapToRegexName = wrapToRegexName;
exports.default = exports;
//# sourceMappingURL=unicode.js.map