"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cjk2zhs = exports.cjk2zht = exports.cjk2jp = exports.zh2jp = exports.zhs2zht = exports.zht2zhs = exports.zht2jp = exports.zhs2jp = exports.jp2zhs = exports.jp2zht = void 0;
const types_1 = require("./types");
const table_1 = require("./table");
const cjk_conv_1 = require("regexp-helper/lib/cjk-conv");
const uni_string_1 = require("uni-string");
const util_1 = require("./util");
// /[\u4E00-\u9FFF\u{20000}-\u{2FA1F}]+/u
const REGEXP_TEST = new RegExp((0, cjk_conv_1._re_cjk_conv)('u').source + '+', 'u');
const defaultOptions = {
    safe: true,
};
var _;
(function (_) {
    let langs = Object.keys(table_1.TABLE);
    // @ts-ignore
    langs.forEach(function (from) {
        // @ts-ignore
        langs.forEach(function (to) {
            if (from == to)
                return;
            _[`${from}2${to}`] = function (str, options) {
                if (!REGEXP_TEST.test(str.toString())) {
                    return str;
                }
                options = Object.assign({}, defaultOptions, options);
                return uni_string_1.UString.split(str, '')
                    .map(function (char) {
                    if (options.skip && options.skip.indexOf(char) != -1) {
                        return char;
                    }
                    let c;
                    if (c = (0, util_1._getdata)(char, from, to, options.safe)) {
                        return c;
                    }
                    return char;
                })
                    .join('');
            };
        });
    });
})(_ || (_ = {}));
/**
 * only 只將 日文漢字 => 轉為繁漢字
 * @type {IFrom2To}
 */
exports.jp2zht = _.jp2zht;
/**
 * only 只將 日文漢字 => 轉為簡漢字
 * @type {IFrom2To}
 */
exports.jp2zhs = _.jp2zhs;
/**
 * only 簡漢字 => 轉為日漢字
 * @type {IFrom2To}
 */
exports.zhs2jp = _.zhs2jp;
/**
 * only 只將 繁漢字 => 轉為日文漢字
 * @type {IFrom2To}
 */
exports.zht2jp = _.zht2jp;
/**
 * only 只將簡繁日 當中共通的 繁漢字 => 轉為簡漢字
 * 請勿作為簡繁轉換用
 * @type {IFrom2To}
 */
exports.zht2zhs = _.zht2zhs;
/**
 * only 只將簡繁日 當中共通的 簡漢字 => 轉為繁漢字
 * 請勿作為簡繁轉換用
 * @type {IFrom2To}
 */
exports.zhs2zht = _.zhs2zht;
/**
 * only 只將簡繁日 當中共通的 簡繁漢字 => 轉為日文漢字
 *
 * @alias cjk2jp
 *
 * @param str
 * @param {IOptions} options
 * @returns {string}
 */
function zh2jp(str, options) {
    if (!REGEXP_TEST.test(str.toString())) {
        return str;
    }
    options = Object.assign({}, defaultOptions, options);
    return uni_string_1.UString.split(str, '')
        .map(function (char) {
        if (options.skip && options.skip.indexOf(char) != -1) {
            return char;
        }
        let c;
        if (c = (0, util_1._getdata)(char, types_1.KEY_ZHT, types_1.KEY_JP, options.safe)) {
            return c;
        }
        else if (c = (0, util_1._getdata)(char, types_1.KEY_ZHS, types_1.KEY_JP, options.safe)) {
            return c;
        }
        return char;
    })
        .join('');
}
exports.zh2jp = zh2jp;
/**
 * only 只將簡繁日 當中共通的 簡繁漢字 => 轉為日文漢字
 *
 * @alias zh2jp
 *
 * @param str
 * @param {IOptions} options
 * @returns {string}
 */
exports.cjk2jp = zh2jp;
/**
 * only 只將簡繁日 當中共通的 漢字 => 轉為繁體漢字
 * 請勿作為簡繁轉換用
 *
 * @param str
 * @param {IOptions} options
 * @returns {string}
 */
function cjk2zht(str, options) {
    if (!REGEXP_TEST.test(str.toString())) {
        return str;
    }
    options = Object.assign({}, defaultOptions, options);
    return uni_string_1.UString.split(str, '')
        .map(function (char) {
        if (options.skip && options.skip.indexOf(char) != -1) {
            return char;
        }
        let c;
        if (c = (0, util_1._getdata)(char, types_1.KEY_JP, types_1.KEY_ZHT, options.safe)) {
            return c;
        }
        else if (c = (0, util_1._getdata)(char, types_1.KEY_ZHS, types_1.KEY_ZHT, options.safe)) {
            return c;
        }
        return char;
    })
        .join('');
}
exports.cjk2zht = cjk2zht;
/**
 * only 只將簡繁日 當中共通的 漢字 => 轉為簡體漢字
 * 請勿作為簡繁轉換用
 *
 * @param str
 * @param {IOptions} options
 * @returns {string}
 */
function cjk2zhs(str, options) {
    if (!REGEXP_TEST.test(str.toString())) {
        return str;
    }
    options = Object.assign({}, defaultOptions, options);
    return uni_string_1.UString.split(str, '')
        .map(function (char) {
        if (options.skip && options.skip.indexOf(char) != -1) {
            return char;
        }
        let c;
        if (c = (0, util_1._getdata)(char, types_1.KEY_JP, types_1.KEY_ZHS, options.safe)) {
            return c;
        }
        else if (c = (0, util_1._getdata)(char, types_1.KEY_ZHT, types_1.KEY_ZHS, options.safe)) {
            return c;
        }
        return char;
    })
        .join('');
}
exports.cjk2zhs = cjk2zhs;
exports.default = exports;
//# sourceMappingURL=index.js.map