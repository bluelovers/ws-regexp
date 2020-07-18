"use strict";
/**
 * Created by user on 2017/12/24/024.
 *
 * this module only do the char is exists in jp, zht, zhs
 * so don't use this module when u wanna fully zht <=> zhs
 *
 * 目前只支援 簡繁日漢字 並非全 cjk 漢字支援
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = exports.TABLE_SAFE = exports.TABLE = exports.ZHJP_TABLE_SAFE = exports.ZHJP_TABLE = void 0;
const table_1 = require("./lib/table");
Object.defineProperty(exports, "TABLE", { enumerable: true, get: function () { return table_1.TABLE; } });
Object.defineProperty(exports, "TABLE_SAFE", { enumerable: true, get: function () { return table_1.TABLE_SAFE; } });
__exportStar(require("./lib/types"), exports);
__exportStar(require("./lib/index"), exports);
const jp_table_comparison_1 = require("@lazy-cjk/jp-table-comparison");
Object.defineProperty(exports, "ZHJP_TABLE", { enumerable: true, get: function () { return jp_table_comparison_1.ZHJP_TABLE; } });
Object.defineProperty(exports, "ZHJP_TABLE_SAFE", { enumerable: true, get: function () { return jp_table_comparison_1.ZHJP_TABLE_SAFE; } });
exports.defaultOptions = {
    safe: true,
};
exports.default = exports;
//# sourceMappingURL=index.js.map