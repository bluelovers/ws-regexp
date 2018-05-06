"use strict";
/**
 * Created by user on 2018/5/6/006.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../util/index");
const index_2 = require("./index");
const blocks_1 = require("../cache/blocks");
const categories_1 = require("../cache/categories");
const properties_1 = require("../cache/properties");
//console.log(properties);
exports.KEY_PREFIX = '\\p{';
exports.KEY_PREFIX_NEGATION = '\\P{';
exports.KEY_SUFFIX = '}';
/**
 * @link http://2ality.com/2017/07/regexp-unicode-property-escapes.html
 * @link https://en.wikipedia.org/wiki/Unicode_character_property
 */
exports.UNICODE = {
    White_Space: false,
    Letter: false,
};
exports.UNICODE_ALL = Object.assign({}, blocks_1.default, categories_1.default, properties_1.default, exports.UNICODE);
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
    Any: [
        ['^\\p{Any}+$', 'u', '1', true, 'test'],
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
