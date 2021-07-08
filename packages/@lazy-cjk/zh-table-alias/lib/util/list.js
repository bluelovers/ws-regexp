"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jpListLazyAll = exports.jpListLazyAllMap = void 0;
const jp_table_alias_1 = require("@lazy-cjk/jp-table-alias");
function jpListLazyAllMap(arr) {
    return arr.reduce((a, b) => {
        a[b] = jpListLazyAll(b);
        return a;
    }, {});
}
exports.jpListLazyAllMap = jpListLazyAllMap;
function jpListLazyAll(char) {
    return (0, jp_table_alias_1.lazyAll)(char, {
        safe: false,
        includeSelf: true,
    });
}
exports.jpListLazyAll = jpListLazyAll;
//# sourceMappingURL=list.js.map