"use strict";
/**
 * Created by user on 2018/6/10/010.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.charTableList = charTableList;
exports.textList = textList;
exports.arrCjk = arrCjk;
const tslib_1 = require("tslib");
const index_1 = tslib_1.__importDefault(require("./index"));
const uni_string_1 = require("uni-string");
const jp_table_convert_1 = require("@lazy-cjk/jp-table-convert");
const zh_convert_1 = require("@lazy-cjk/zh-convert");
/**
 *
 * @example
 * ```
 * charTableList('司马')
 * // => [ [ '司' ], [ '馬', '马' ] ]
 * ```
 */
function charTableList(text, options = {}) {
    let a = uni_string_1.UString.split(text, '');
    options = Object.assign({}, options);
    let optionsZhTable = Object.assign({
        safe: true,
        skip: options.skip,
    }, options.optionsZhTable);
    let fn = index_1.default[options.lang || 'auto'];
    return a
        .reduce(function (a, c) {
        // @ts-ignore
        a.push(fn(c, optionsZhTable));
        return a;
    }, []);
}
/**
 *
 * @example
 * textList('司马')
 * // => [ '司馬', '司马' ]
 */
function textList(text, options = {}) {
    let aa = [];
    let arr = charTableList(text, options);
    if (arr.length <= 1) {
        if (Array.isArray(arr[0])) {
            // @ts-ignore
            arr = arr[0];
        }
        // @ts-ignore
        return arr;
    }
    arr
        .forEach(function (v, index, arr) {
        f(v, '', index, arr);
    });
    function f(v, str = '', index, arr, depth = 0) {
        return v.reduce(function (a, c) {
            let s = str + c;
            let i = index + 1;
            if (i < arr.length) {
                let r = f(arr[i], s, i, arr, depth + 1);
            }
            else if ((depth + 1) == arr.length) {
                //console.log(777, s, [str, c], index, depth);
                aa.push(s);
            }
            return a;
        }, []);
    }
    aa.sort();
    return aa;
}
/**
 * @example
 * arrCjk(['司马', '上官', '欧阳', '夏侯'])
 * // => [ '司马', '上官', '欧阳', '夏侯', '司馬', '歐陽', '欧陽' ]
 */
function arrCjk(arr, options = {}) {
    return arr
        // @ts-ignore
        .concat(arr.map(w(jp_table_convert_1.cjk2zht)))
        // @ts-ignore
        .concat(arr.map(w(zh_convert_1.cn2tw)))
        // @ts-ignore
        .concat(arr.map(w(jp_table_convert_1.cjk2zhs)))
        // @ts-ignore
        .concat(arr.map(w(jp_table_convert_1.cjk2jp)))
        .filter(function (value, index, array) {
        return array.indexOf(value) == index;
    });
    function w(fn, ...argv) {
        return function (s) {
            return fn(s, options);
        };
    }
}
exports.default = exports;
//# sourceMappingURL=list.js.map