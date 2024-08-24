"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._uniqueTable = _uniqueTable;
exports._buildTablePlus = _buildTablePlus;
const array_hyper_unique_1 = require("array-hyper-unique");
function _uniqueTable(table_jp) {
    Object.keys(table_jp)
        .forEach(function (key) {
        // @ts-ignore
        table_jp[key] = (0, array_hyper_unique_1.array_unique)(table_jp[key]);
    });
    return table_jp;
}
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
//# sourceMappingURL=unique.js.map