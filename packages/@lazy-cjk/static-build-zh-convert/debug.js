"use strict";
/**
 * Created by user on 2020/6/1.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableTw2CnDebug = exports.tableCn2TwDebug = void 0;
const tslib_1 = require("tslib");
const table_cn2tw_debug_1 = tslib_1.__importDefault(require("./data/table_cn2tw.debug"));
exports.tableCn2TwDebug = table_cn2tw_debug_1.default;
const table_tw2cn_debug_1 = tslib_1.__importDefault(require("./data/table_tw2cn.debug"));
exports.tableTw2CnDebug = table_tw2cn_debug_1.default;
tslib_1.__exportStar(require("./types"), exports);
exports.default = {
    tableCn2TwDebug: table_cn2tw_debug_1.default,
    tableTw2CnDebug: table_tw2cn_debug_1.default,
};
//# sourceMappingURL=debug.js.map