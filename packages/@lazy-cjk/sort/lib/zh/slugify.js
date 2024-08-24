"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetCacheMap = resetCacheMap;
exports.getCacheMap = getCacheMap;
exports.sortBySlugify = sortBySlugify;
const zh_slugify_1 = require("@lazy-cjk/zh-slugify");
const string_natural_compare_1 = require("@bluelovers/string-natural-compare");
let cacheMap;
let _get;
resetCacheMap();
function resetCacheMap() {
    var _a;
    (_a = cacheMap === null || cacheMap === void 0 ? void 0 : cacheMap.clear) === null || _a === void 0 ? void 0 : _a.call(cacheMap);
    cacheMap = new Map();
    _get = (s) => {
        if (!cacheMap.has(s)) {
            let n = (0, zh_slugify_1.slugify)(s, false);
            cacheMap.set(s, n);
            return n;
        }
        return cacheMap.get(s);
    };
    return {
        cacheMap,
        _get,
    };
}
function getCacheMap() {
    return cacheMap;
}
function sortBySlugify(s1, s2) {
    if (s1 === s2) {
        return 0;
    }
    return (0, string_natural_compare_1.compareCaseInsensitive)(_get(s1), _get(s2));
}
exports.default = sortBySlugify;
//# sourceMappingURL=slugify.js.map