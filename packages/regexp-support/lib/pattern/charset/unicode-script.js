"use strict";
/**
 * Created by user on 2018/5/6/006.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapToRegexName = exports.testUnicodeScriptAll = exports.testUnicodeScript = exports._testUnicodeScript = exports.PatternTest = exports.UNICODE_SCRIPTS_NAME_ALIAS = exports.UNICODE_SCRIPTS_ALL = exports.UNICODE_SCRIPTS = exports.KEY_SUFFIX = exports.KEY_PREFIX_NEGATION = exports.KEY_PREFIX = void 0;
const tslib_1 = require("tslib");
const property_data_1 = tslib_1.__importDefault(require("../cache/property-data"));
const index_1 = require("../../util/index");
const index_2 = require("./index");
const scripts_1 = tslib_1.__importDefault(require("../cache/scripts"));
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
exports.UNICODE_SCRIPTS_ALL = {
    ...scripts_1.default,
    ...property_data_1.default.Script,
    ...exports.UNICODE_SCRIPTS,
};
var UNICODE_SCRIPTS_NAME_ALIAS;
(function (UNICODE_SCRIPTS_NAME_ALIAS) {
    UNICODE_SCRIPTS_NAME_ALIAS["Arabic"] = "Arab";
    UNICODE_SCRIPTS_NAME_ALIAS["Bengali"] = "Beng";
    UNICODE_SCRIPTS_NAME_ALIAS["Coptic"] = "Copt";
    UNICODE_SCRIPTS_NAME_ALIAS["Cyrillic"] = "Cyrl";
    UNICODE_SCRIPTS_NAME_ALIAS["Ethiopic"] = "Ethi";
    UNICODE_SCRIPTS_NAME_ALIAS["Georgian"] = "Geor";
    UNICODE_SCRIPTS_NAME_ALIAS["Greek"] = "Grek";
    UNICODE_SCRIPTS_NAME_ALIAS["Han"] = "Hani";
    UNICODE_SCRIPTS_NAME_ALIAS["Katakana"] = "Kana";
    UNICODE_SCRIPTS_NAME_ALIAS["Hiragana"] = "Hira";
    UNICODE_SCRIPTS_NAME_ALIAS["Latin"] = "Latn";
    UNICODE_SCRIPTS_NAME_ALIAS["Tamil"] = "Taml";
    UNICODE_SCRIPTS_NAME_ALIAS["Tibetan"] = "Tibt";
})(UNICODE_SCRIPTS_NAME_ALIAS = exports.UNICODE_SCRIPTS_NAME_ALIAS || (exports.UNICODE_SCRIPTS_NAME_ALIAS = {}));
Object.keys(UNICODE_SCRIPTS_NAME_ALIAS)
    .forEach(function (key) {
    let k2 = UNICODE_SCRIPTS_NAME_ALIAS[key];
    if (k2 && !UNICODE_SCRIPTS_NAME_ALIAS[k2]) {
        // @ts-ignore
        UNICODE_SCRIPTS_NAME_ALIAS[k2] = key;
    }
});
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
    Common: [
        ['^\\p{Script=Common}+$', 'u', '!', true, 'test'],
    ],
    Arabic: [
        ['^\\p{Script=Arabic}+$', 'u', 'لمو', true, 'test'],
    ],
    Bengali: [
        ['^\\p{Script=Bengali}+$', 'u', 'আমার', true, 'test'],
    ],
    Cyrillic: [
        ['^\\p{Script=Cyrillic}+$', 'u', 'летачко', true, 'test'],
    ],
    Ethiopic: [
        ['^\\p{Script=Ethiopic}+$', 'u', 'ማንዣበቢያ', true, 'test'],
    ],
    Georgian: [
        ['^\\p{Script=Georgian}+$', 'u', 'ხომალდი', true, 'test'],
    ],
    Coptic: [
        ['^\\p{Script=Coptic}+$', 'u', 'Ϫ', true, 'test'],
        ['^\\p{Script=Coptic}+$', 'u', '\u03ea', true, 'test'],
    ],
    Tamil: [
        ['^\\p{Script=Tamil}+$', 'u', '்', true, 'test'],
        ['^\\p{Script=Tamil}+$', 'u', '\u0bcd', true, 'test'],
    ],
    Tibetan: [
        ['^\\p{Script=Tibetan}+$', 'u', '༬', true, 'test'],
        ['^\\p{Script=Tibetan}+$', 'u', '\u0f2c', true, 'test'],
    ],
};
exports._testUnicodeScript = (0, index_1._createFnTestPattern)(exports.PatternTest);
function testUnicodeScript(name, RegExpClass, testPatterns = exports.PatternTest) {
    if (!exports.PatternTest.hasOwnProperty(name) && UNICODE_SCRIPTS_NAME_ALIAS[name] && exports.PatternTest.hasOwnProperty(UNICODE_SCRIPTS_NAME_ALIAS[name])) {
        name = UNICODE_SCRIPTS_NAME_ALIAS[name];
    }
    return (0, exports._testUnicodeScript)(name, RegExpClass, testPatterns);
}
exports.testUnicodeScript = testUnicodeScript;
// @ts-ignore
function testUnicodeScriptAll(RegExpClass = RegExp, testPatterns = exports.PatternTest) {
    return Object.keys(exports.UNICODE_SCRIPTS_ALL).reduce(function (a, key) {
        a[key] = testUnicodeScript(key, RegExpClass, testPatterns);
        return a;
    }, {});
}
exports.testUnicodeScriptAll = testUnicodeScriptAll;
function wrapToRegexName(name, negation) {
    let prefix = exports.KEY_PREFIX;
    if (negation) {
        prefix = exports.KEY_PREFIX_NEGATION;
    }
    return (0, index_2._wrapToRegexName)(name, prefix, exports.KEY_SUFFIX);
}
exports.wrapToRegexName = wrapToRegexName;
//# sourceMappingURL=unicode-script.js.map