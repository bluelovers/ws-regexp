"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMap = void 0;
/**
 * This ES6 Map subclass calls the getter function passed to
 * the constructor to initialize undefined properties when they
 * are first retrieved.
 */
class DefaultMap extends Map {
    constructor(iterable, defaultGetter) {
        if (typeof iterable === 'function') {
            defaultGetter = iterable;
            iterable = null;
        }
        // @ts-ignore
        super(iterable);
        this.defaultGetter = defaultGetter;
    }
    get(key) {
        if (!super.has(key)) {
            let res = this.defaultGetter(key);
            this.set(key, res);
            return res;
        }
        return super.get(key);
    }
}
exports.DefaultMap = DefaultMap;
exports.default = DefaultMap;
//# sourceMappingURL=map.js.map