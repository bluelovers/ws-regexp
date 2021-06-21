"use strict";
/**
 * Created by user on 2020/6/1.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.table_tw2cn = exports.table_cn2tw = void 0;
const tslib_1 = require("tslib");
const table_cn2tw_1 = tslib_1.__importDefault(require("./data/table_cn2tw"));
exports.table_cn2tw = table_cn2tw_1.default;
const table_tw2cn_1 = tslib_1.__importDefault(require("./data/table_tw2cn"));
exports.table_tw2cn = table_tw2cn_1.default;
tslib_1.__exportStar(require("./types"), exports);
exports.default = {
    table_cn2tw: table_cn2tw_1.default,
    table_tw2cn: table_tw2cn_1.default,
};
//# sourceMappingURL=table.js.map