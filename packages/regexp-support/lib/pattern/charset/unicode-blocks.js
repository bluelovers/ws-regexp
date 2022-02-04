"use strict";
/**
 * Created by user on 2018/5/6/006.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapToRegexName = exports.testUnicodeBlocksAll = exports.testUnicodeBlocks = exports.PatternTest = exports.UNICODE_BLOCKS_ALL = exports.UNICODE_BLOCKS = exports.KEY_SUFFIX = exports.KEY_PREFIX_NEGATION = exports.KEY_PREFIX = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../util/index");
const index_2 = require("./index");
const blocks_1 = tslib_1.__importDefault(require("../cache/blocks"));
exports.KEY_PREFIX = '\\p{';
exports.KEY_PREFIX_NEGATION = '\\P{';
exports.KEY_SUFFIX = '}';
/**
 * @link http://2ality.com/2017/07/regexp-unicode-property-escapes.html
 * @link https://en.wikipedia.org/wiki/Unicode_character_property
 */
exports.UNICODE_BLOCKS = {
    InBasic_Latin: false,
};
exports.UNICODE_BLOCKS_ALL = {
    ...blocks_1.default,
    ...exports.UNICODE_BLOCKS,
};
exports.PatternTest = {
    InBasic_Latin: [
        ['^\\p{InBasic_Latin}+$', 'u', '\u007F', true, 'test'],
        ['^\\p{InBasic_Latin}+$', 'u', '\u0080', false, 'test'],
    ],
};
exports.testUnicodeBlocks = (0, index_1._createFnTestPattern)(exports.PatternTest);
// @ts-ignore
function testUnicodeBlocksAll(RegExpClass = RegExp, testPatterns = exports.PatternTest) {
    return Object.keys(exports.UNICODE_BLOCKS_ALL).reduce(function (a, key) {
        a[key] = (0, exports.testUnicodeBlocks)(key, RegExpClass, testPatterns);
        return a;
    }, {});
}
exports.testUnicodeBlocksAll = testUnicodeBlocksAll;
function wrapToRegexName(name, negation) {
    let prefix = exports.KEY_PREFIX;
    if (negation) {
        prefix = exports.KEY_PREFIX_NEGATION;
    }
    return (0, index_2._wrapToRegexName)(name, prefix, exports.KEY_SUFFIX);
}
exports.wrapToRegexName = wrapToRegexName;
//# sourceMappingURL=unicode-blocks.js.map