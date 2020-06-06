"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortBySlugify = exports.getCacheMap = exports.resetCacheMap = void 0;
const zh_slugify_1 = require("@lazy-cjk/zh-slugify");
const core_1 = require("@bluelovers/string-natural-compare/core");
let cacheMap;
let _get;
resetCacheMap();
function resetCacheMap() {
    var _a;
    (_a = cacheMap === null || cacheMap === void 0 ? void 0 : cacheMap.clear) === null || _a === void 0 ? void 0 : _a.call(cacheMap);
    cacheMap = new Map();
    _get = (s) => {
        if (!cacheMap.has(s)) {
            let n = zh_slugify_1.slugify(s, false);
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
exports.resetCacheMap = resetCacheMap;
function getCacheMap() {
    return cacheMap;
}
exports.getCacheMap = getCacheMap;
function sortBySlugify(s1, s2) {
    if (s1 === s2) {
        return 0;
    }
    return core_1.compareCaseInsensitive(_get(s1), _get(s2));
}
exports.sortBySlugify = sortBySlugify;
exports.default = sortBySlugify;
//# sourceMappingURL=slugify.js.map