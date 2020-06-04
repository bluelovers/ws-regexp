"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_hyper_unique_1 = require("array-hyper-unique");
exports.array_unique = array_hyper_unique_1.array_unique;
const list_1 = require("cjk-conv/lib/zh/table/list");
exports.arrCjk = list_1.arrCjk;
const regexp_cjk_1 = require("regexp-cjk");
const uni_string_1 = require("uni-string");
function splitZh(s) {
    return s
        .split(/([\u4E00-\u9FFF\u{20000}-\u{2FA1F}])/u)
        .filter(v => v !== '');
}
exports.splitZh = splitZh;
/**
 * @example console.log(arraySep(star));
 */
function arraySep(arr) {
    let ret = arr.reduce(function (a, v) {
        let ls = uni_string_1.default.split(v, '');
        if (ls.length > 2) {
            let ret = [];
            splitZh(v)
                .reduce(function (a, b) {
                ret.push([a, b]);
                return b;
            });
            a.push(...ret);
        }
        else if (ls.length) {
            a.push(ls);
        }
        return a;
    }, []);
    ret.sort();
    ret = array_hyper_unique_1.array_unique(ret);
    return ret;
}
exports.arraySep = arraySep;
/**
 * @example arrayToRegExp(arraySep(star).map(v => v.join('')))
 */
function arrayToRegExp(arr, unique = true) {
    let ret = arr.map(function (v) {
        return regexp_cjk_1.default.create(v, 'ig');
    });
    if (unique) {
        ret = array_hyper_unique_1.array_unique(ret);
    }
    return ret;
}
exports.arrayToRegExp = arrayToRegExp;
