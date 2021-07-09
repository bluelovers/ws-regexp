"use strict";
/**
 * Created by user on 2020/5/22.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._greedyTableBuild = void 0;
const array_hyper_unique_1 = require("array-hyper-unique");
const util_1 = require("./util");
function _greedyTableBuild(data) {
    // @ts-ignore
    const _greedyTableCacheRegexp = data;
    let _greedyTableCacheMap;
    let _greedyTableCacheTest;
    _greedyTableCacheMap = new Map();
    const arr = _greedyTableCacheRegexp
        .reduce(function (arr, r) {
        const a = (0, util_1.reToStringList)(r[0], r[1]);
        a.forEach(c => {
            _greedyTableCacheMap.set(c, a);
        });
        arr.push(...a);
        return arr;
    }, []);
    _greedyTableCacheTest = new RegExp(`[${(0, array_hyper_unique_1.array_unique)(arr).join('')}]`, 'u');
    return {
        _greedyTableCacheRegexp,
        _greedyTableCacheMap,
        _greedyTableCacheTest,
    };
}
exports._greedyTableBuild = _greedyTableBuild;
//# sourceMappingURL=core.js.map