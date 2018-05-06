"use strict";
/**
 * Created by user on 2018/5/6/006.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../util/index");
const index_2 = require("./index");
const scripts_1 = require("../cache/scripts");
exports.KEY_PREFIX = '\\p{Script=';
exports.KEY_PREFIX_NEGATION = '\\P{Script=';
exports.KEY_SUFFIX = '}';
/**
 * @link http://2ality.com/2017/07/regexp-unicode-property-escapes.html
 * @link https://en.wikipedia.org/wiki/Unicode_character_property
 */
exports.UNICODE_SCRIPTS = {
    Greek: false,
    Latin: false,
    Katakana: false,
    Hiragana: false,
    Han: false,
    Hangul: false,
};
exports.UNICODE_SCRIPTS_ALL = Object.assign({}, scripts_1.default, exports.UNICODE_SCRIPTS);
exports.PatternTest = {
    Greek: [
        ['^\\p{Script=Greek}+$', 'u', 'μετά', true, 'test'],
    ],
    Latin: [
        ['^\\p{Script=Latin}+$', 'u', 'Grüße', true, 'test'],
        ['^\\p{Script=Latin}+$', 'u', 'façon', true, 'test'],
        ['^\\p{Script=Latin}+$', 'u', 'mañana', true, 'test'],
    ],
    Katakana: [
        ['^\\p{Script=Katakana}+$', 'u', 'カタカナ', true, 'test'],
    ],
    Hiragana: [
        ['^\\p{Script=Hiragana}+$', 'u', 'ひらがな', true, 'test'],
    ],
    Han: [
        ['^\\p{Script=Han}+$', 'u', 'カタカナ', false, 'test'],
        ['^\\p{Script=Han}+$', 'u', '可以知道', true, 'test'],
    ],
    Hangul: [
        ['^\\p{Script=Hangul}+$', 'u', '\u1190', true, 'test'],
    ],
};
exports.testUnicodeScript = index_1._createFnTestPattern(exports.PatternTest);
// @ts-ignore
function testUnicodeScriptAll(RegExpClass = RegExp, testPatterns = exports.PatternTest) {
    return Object.keys(exports.UNICODE_SCRIPTS_ALL).reduce(function (a, key) {
        a[key] = exports.testUnicodeScript(key);
        return a;
    }, {});
}
exports.testUnicodeScriptAll = testUnicodeScriptAll;
function wrapToRegexName(name, negation) {
    let prefix = exports.KEY_PREFIX;
    if (negation) {
        prefix = exports.KEY_PREFIX_NEGATION;
    }
    return index_2._wrapToRegexName(name, prefix, exports.KEY_SUFFIX);
}
exports.wrapToRegexName = wrapToRegexName;
const self = require("./unicode-script");
exports.default = self;
