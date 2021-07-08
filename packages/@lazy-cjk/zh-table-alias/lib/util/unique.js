"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._buildTablePlus = exports._uniqueTable = void 0;
const array_hyper_unique_1 = require("array-hyper-unique");
function _uniqueTable(table_jp) {
    Object.keys(table_jp)
        .forEach(function (key) {
        // @ts-ignore
        table_jp[key] = (0, array_hyper_unique_1.array_unique)(table_jp[key]);
    });
    return table_jp;
}
exports._uniqueTable = _uniqueTable;
function _buildTablePlus(table_plus) {
    Object.keys(table_plus)
        .forEach(function (key) {
        table_plus[key] = (0, array_hyper_unique_1.array_unique)(table_plus[key]);
        table_plus[key].forEach(function (s) {
            table_plus[s] = table_plus[key];
        });
    });
    // @ts-ignore
    return table_plus;
}
exports._buildTablePlus = _buildTablePlus;
//# sourceMappingURL=unique.js.map