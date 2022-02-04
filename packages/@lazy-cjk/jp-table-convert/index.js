"use strict";
/**
 * Created by user on 2017/12/24/024.
 *
 * this module only do the char is exists in jp, zht, zhs
 * so don't use this module when u wanna fully zht <=> zhs
 *
 * 目前只支援 簡繁日漢字 並非全 cjk 漢字支援
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = exports.TABLE_SAFE = exports.TABLE = exports.ZHJP_TABLE_SAFE = exports.ZHJP_TABLE = void 0;
const tslib_1 = require("tslib");
const table_1 = require("./lib/table");
Object.defineProperty(exports, "TABLE", { enumerable: true, get: function () { return table_1.TABLE; } });
Object.defineProperty(exports, "TABLE_SAFE", { enumerable: true, get: function () { return table_1.TABLE_SAFE; } });
tslib_1.__exportStar(require("./lib/types"), exports);
tslib_1.__exportStar(require("./lib/index"), exports);
const jp_table_comparison_1 = require("@lazy-cjk/jp-table-comparison");
Object.defineProperty(exports, "ZHJP_TABLE", { enumerable: true, get: function () { return jp_table_comparison_1.ZHJP_TABLE; } });
Object.defineProperty(exports, "ZHJP_TABLE_SAFE", { enumerable: true, get: function () { return jp_table_comparison_1.ZHJP_TABLE_SAFE; } });
exports.defaultOptions = {
    safe: true,
};
exports.default = exports;
//# sourceMappingURL=index.js.map