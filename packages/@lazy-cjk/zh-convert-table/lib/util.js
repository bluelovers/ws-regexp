"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSame = removeSame;
function removeSame(table) {
    return Object.entries(table)
        .reduce(function (a, b) {
        let [k, v] = b;
        if (k != v) {
            a[k] = v;
        }
        return a;
    }, {});
}
//# sourceMappingURL=util.js.map