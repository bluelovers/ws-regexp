"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._get = exports._update = void 0;
function _update(target, source) {
    target = Object.keys(source)
        .reduce(function (a, b) {
        a[source[b]] = b;
        return a;
    }, {});
    return target;
}
exports._update = _update;
function _get(arr, value, ...values) {
    let ret = []
        .concat(value)
        .concat(...values)
        .filter(function (v) {
        return v;
    });
    //ret.length && ret.sort();
    return ret;
}
exports._get = _get;
//# sourceMappingURL=core.js.map