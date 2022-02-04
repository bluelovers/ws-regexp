"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._mergeTable = void 0;
const tslib_1 = require("tslib");
const deepmerge_plus_1 = tslib_1.__importDefault(require("deepmerge-plus"));
function _mergeTable(table_jp, table_plus) {
    // @ts-ignore
    return (0, deepmerge_plus_1.default)(table_jp, table_plus);
}
exports._mergeTable = _mergeTable;
//# sourceMappingURL=table.js.map