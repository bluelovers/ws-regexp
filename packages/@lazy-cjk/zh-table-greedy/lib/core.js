"use strict";
/**
 * Created by user on 2020/5/22.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._greedyTableBuild = void 0;
const uni_string_1 = __importDefault(require("uni-string"));
const array_hyper_unique_1 = require("array-hyper-unique");
function _greedyTableBuild(data) {
    const _greedyTableCacheRegexp = data;
    let _greedyTableCacheMap;
    let _greedyTableCacheTest;
    _greedyTableCacheMap = new Map();
    let arr = _greedyTableCacheRegexp
        .reduce(function (arr, r) {
        let s = r[0].source
            .replace(/^.*\[|\].*$/ug, '');
        let a = uni_string_1.default.split(s, '').concat(r[1]);
        a.forEach(c => {
            _greedyTableCacheMap.set(c, a);
        });
        arr.push(...a);
        return arr;
    }, []);
    _greedyTableCacheTest = new RegExp(`[${array_hyper_unique_1.array_unique(arr).join('')}]`, 'u');
    return {
        _greedyTableCacheRegexp,
        _greedyTableCacheMap,
        _greedyTableCacheTest,
    };
}
exports._greedyTableBuild = _greedyTableBuild;
//# sourceMappingURL=core.js.map