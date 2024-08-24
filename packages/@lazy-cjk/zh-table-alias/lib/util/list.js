"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jpListLazyAllMap = jpListLazyAllMap;
exports.jpListLazyAll = jpListLazyAll;
const jp_table_alias_1 = require("@lazy-cjk/jp-table-alias");
function jpListLazyAllMap(arr) {
    return arr.reduce((a, b) => {
        a[b] = jpListLazyAll(b);
        return a;
    }, {});
}
function jpListLazyAll(char) {
    return (0, jp_table_alias_1.lazyAll)(char, {
        safe: false,
        includeSelf: true,
    });
}
//# sourceMappingURL=list.js.map