"use strict";
/**
 * Created by user on 2020/5/31.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._slice = exports._trim = exports._core = exports._coreTextAfter = exports._coreText = exports._coreCase = exports.handleOptions = void 0;
const tslib_1 = require("tslib");
const deburr_1 = (0, tslib_1.__importDefault)(require("lodash/deburr"));
const upperFirst_1 = (0, tslib_1.__importDefault)(require("lodash/upperFirst"));
const upperCase_1 = (0, tslib_1.__importDefault)(require("lodash/upperCase"));
const regex_pinyin_1 = require("@regexp-cjk/regex-pinyin");
const transliterate_1 = require("./core/transliterate");
const reDefaultSeparator = new RegExp(`${regex_pinyin_1.reNotPinyinChar}+`, 'ug');
function handleOptions(options) {
    var _a, _b, _c, _d;
    options = options || {};
    options.separatorRegexp = (_a = options.separatorRegexp) !== null && _a !== void 0 ? _a : reDefaultSeparator;
    options.trimRegexp = (_b = options.trimRegexp) !== null && _b !== void 0 ? _b : new RegExp(`^(?:${options.separatorRegexp.source})|(?:${options.separatorRegexp.source})$`, 'ugi');
    options.separator = (_c = options.separator) !== null && _c !== void 0 ? _c : '-';
    options.transliterate = (_d = options.transliterate) !== null && _d !== void 0 ? _d : true;
    return options;
}
exports.handleOptions = handleOptions;
function _coreCase(word, options) {
    options = options || {};
    if (options.upperCaseExtra) {
        word = (0, upperCase_1.default)(word);
    }
    if (options.lowerCaseExtra) {
        word = (0, upperCase_1.default)(word);
    }
    if (options.upperCase) {
        word = word.toUpperCase();
    }
    else {
        if (options.lowerCase) {
            word = word.toLowerCase();
        }
        if (options.upperFirst) {
            word = (0, upperFirst_1.default)(word);
        }
    }
    return word;
}
exports._coreCase = _coreCase;
function _coreText(word, options) {
    word = (0, transliterate_1._text)(word, options);
    word = _coreCase(word, options);
    if (options.deburr) {
        word = (0, deburr_1.default)(word);
    }
    return word;
}
exports._coreText = _coreText;
function _coreTextAfter(word, options) {
    word = _slice(word, options);
    word = _trim(word, options);
    return word;
}
exports._coreTextAfter = _coreTextAfter;
function _core(word, options) {
    if (word === '') {
        return '';
    }
    options = handleOptions(options);
    word = _coreText(word, options);
    if (!options.noStripOthers) {
        word = word
            .replace(options.separatorRegexp, options.separator);
    }
    word = _coreTextAfter(word, options);
    if (word === '' && !options.allowEmptyResult) {
        throw new RangeError(`result is empty`);
    }
    return word;
}
exports._core = _core;
function _trim(word, options) {
    return word
        .trim()
        .replace(options.trimRegexp, '');
}
exports._trim = _trim;
function _slice(word, options) {
    if (word.length && options.maxLength) {
        word = word.slice(0, options.maxLength);
    }
    word = _trim(word, options);
    return word;
}
exports._slice = _slice;
//# sourceMappingURL=core.js.map