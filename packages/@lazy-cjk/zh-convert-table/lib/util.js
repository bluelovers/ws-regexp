"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSame = void 0;
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
exports.removeSame = removeSame;
//# sourceMappingURL=util.js.map