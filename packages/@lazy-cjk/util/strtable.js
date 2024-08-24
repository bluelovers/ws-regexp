"use strict";
/**
 * Created by user on 2020/5/29.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toStrTableArray = toStrTableArray;
exports.toStrTable = toStrTable;
exports.jsSplit = jsSplit;
exports.utf8Split = utf8Split;
const uni_string_1 = require("uni-string");
function toStrTableArray(table, options = {}) {
    if (typeof table !== 'object' || Array.isArray(table)) {
        throw new TypeError(`table '${typeof table}' ${table}`);
    }
    let from = [];
    let to = [];
    const ks = Object.keys(table);
    ks.sort();
    let split = options.coreJs ? jsSplit : utf8Split;
    for (let k of ks) {
        let k2 = table[k];
        let s1 = split(k);
        let s2 = split(k2);
        if (s1.length !== 1 || s2.length !== 1) {
            let msg = `'${k}' s1: ${s1.length} ${s1} ; s2: ${s2.length} ${s2}`;
            if (options.ignore) {
                console.error(msg);
                continue;
            }
            else {
                //console.dir(s1);
                //console.dir(s2);
                throw new TypeError(msg);
                break;
            }
        }
        from.push(k);
        to.push(k2);
    }
    return {
        from,
        to,
    };
}
function toStrTable(table, options) {
    let { from, to, } = toStrTableArray(table, options);
    return {
        from: from.join(''),
        to: to.join(''),
    };
}
function jsSplit(s) {
    return s.split('');
}
function utf8Split(s) {
    return uni_string_1.UString.split(s, '');
}
exports.default = exports;
//# sourceMappingURL=strtable.js.map