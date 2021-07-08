"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._buildTablePlus = void 0;
const array_hyper_unique_1 = require("array-hyper-unique");
function _buildTablePlus(table_plus) {
    Object.keys(table_plus)
        .forEach(function (key) {
        table_plus[key] = Object.freeze((0, array_hyper_unique_1.array_unique)(table_plus[key]));
        table_plus[key].forEach(function (s) {
            table_plus[s] = table_plus[key];
        });
    });
    // @ts-ignore
    return table_plus;
}
exports._buildTablePlus = _buildTablePlus;
//# sourceMappingURL=core.js.map