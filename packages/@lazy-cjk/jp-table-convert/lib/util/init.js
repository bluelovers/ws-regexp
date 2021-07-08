"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const table_1 = require("../table");
const core_1 = require("../core");
const jp_table_comparison_1 = require("@lazy-cjk/jp-table-comparison");
function init(overwrite) {
    if (!overwrite) {
        return {
            TABLE: table_1.TABLE,
            TABLE_SAFE: table_1.TABLE_SAFE,
        };
    }
    return (0, core_1._build_table)(jp_table_comparison_1.ZHJP_TABLE, jp_table_comparison_1.ZHJP_TABLE_SAFE);
}
exports.init = init;
//# sourceMappingURL=init.js.map