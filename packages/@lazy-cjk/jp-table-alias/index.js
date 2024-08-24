"use strict";
/**
 * Created by user on 2019/7/26.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._fromA2B = _fromA2B;
exports.jp2zht = jp2zht;
exports.jp2zhs = jp2zhs;
exports.zht2jp = zht2jp;
exports.zhs2jp = zhs2jp;
exports.zh2jp = zh2jp;
exports.jp2zh = jp2zh;
exports.lazyAll = lazyAll;
const array_hyper_unique_1 = require("array-hyper-unique");
const types_1 = require("@lazy-cjk/jp-table-convert/lib/types");
const table_1 = require("@lazy-cjk/jp-table-convert/lib/table");
function _fromA2B(char, from, to, options = {}) {
    const _table = options && options.safe ? table_1.TABLE_SAFE : table_1.TABLE;
    if (_table[from] && _table[to]) {
        let list = [];
        if (_table[from][char]) {
            if (_table[from][char][to]) {
                list.push(_table[from][char][to]);
            }
            Object.values(_table[to])
                .forEach(row => {
                if (row[from] === char && row[to]) {
                    list.push(row[to]);
                }
            });
            if (options && options.includeSelf) {
                list.push(char);
            }
            list = (0, array_hyper_unique_1.array_unique_overwrite)(list);
        }
        return list;
    }
    throw new RangeError(`${from}, ${to} is not exists in TABLE`);
}
function jp2zht(char, options) {
    return _fromA2B(char, types_1.KEY_JP, types_1.KEY_ZHT, options);
}
function jp2zhs(char, options) {
    return _fromA2B(char, types_1.KEY_JP, types_1.KEY_ZHS, options);
}
function zht2jp(char, options) {
    return _fromA2B(char, types_1.KEY_ZHT, types_1.KEY_JP, options);
}
function zhs2jp(char, options) {
    return _fromA2B(char, types_1.KEY_ZHS, types_1.KEY_JP, options);
}
function zh2jp(char, options) {
    let arr = zht2jp(char, options)
        .concat(zhs2jp(char, options));
    return (0, array_hyper_unique_1.array_unique_overwrite)(arr);
}
function jp2zh(char, options) {
    let arr = jp2zht(char, options)
        .concat(jp2zhs(char, options));
    return (0, array_hyper_unique_1.array_unique_overwrite)(arr);
}
function lazyAll(char, options) {
    let arr = zh2jp(char, options)
        .reduce((a, b) => {
        a.push(b, ...jp2zh(b, options));
        return a;
    }, [])
        .concat(jp2zh(char, options)
        .reduce((a, b) => {
        a.push(b, ...zh2jp(b, options));
        return a;
    }, []));
    return (0, array_hyper_unique_1.array_unique_overwrite)(arr);
}
exports.default = exports;
//# sourceMappingURL=index.js.map