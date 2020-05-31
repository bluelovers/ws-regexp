"use strict";
/**
 * Created by user on 2020/5/31.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._slice = exports._trim = exports._core = exports._coreCase = exports.handleOptions = void 0;
const deburr_1 = __importDefault(require("lodash/deburr"));
const upperFirst_1 = __importDefault(require("lodash/upperFirst"));
const upperCase_1 = __importDefault(require("lodash/upperCase"));
function handleOptions(options) {
    var _a, _b, _c, _d;
    options = options || {};
    options.separatorRegexp = (_a = options.separatorRegexp) !== null && _a !== void 0 ? _a : /[^\w\d]+/g;
    options.trimRegexp = (_b = options.trimRegexp) !== null && _b !== void 0 ? _b : new RegExp(`^(?:${options.separatorRegexp.source})|(?:${options.separatorRegexp.source})$`, 'ugi');
    options.separator = (_c = options.separator) !== null && _c !== void 0 ? _c : '-';
    options.transliterate = (_d = options.transliterate) !== null && _d !== void 0 ? _d : true;
    return options;
}
exports.handleOptions = handleOptions;
function _coreCase(word, options) {
    options = options || {};
    if (options.upperCaseExtra) {
        word = upperCase_1.default(word);
    }
    if (options.lowerCaseExtra) {
        word = upperCase_1.default(word);
    }
    if (options.upperCase) {
        word = word.toUpperCase();
    }
    else {
        if (options.lowerCase) {
            word = word.toLowerCase();
        }
        if (options.upperFirst) {
            word = upperFirst_1.default(word);
        }
    }
    return word;
}
exports._coreCase = _coreCase;
function _core(word, options) {
    if (word === '') {
        return '';
    }
    options = handleOptions(options);
    if (options.deburr) {
        word = deburr_1.default(word);
    }
    word = _trim(word, options);
    word = _coreCase(word, options);
    word = word
        .replace(options.separatorRegexp, options.separator);
    word = _slice(word, options);
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