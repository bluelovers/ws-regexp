"use strict";
/**
 * Created by user on 2020/6/1.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableTw2CnDebug = exports.tableCn2TwDebug = void 0;
const table_cn2tw_debug_1 = __importDefault(require("./data/table_cn2tw.debug"));
exports.tableCn2TwDebug = table_cn2tw_debug_1.default;
const table_tw2cn_debug_1 = __importDefault(require("./data/table_tw2cn.debug"));
exports.tableTw2CnDebug = table_tw2cn_debug_1.default;
__exportStar(require("./types"), exports);
exports.default = {
    tableCn2TwDebug: table_cn2tw_debug_1.default,
    tableTw2CnDebug: table_tw2cn_debug_1.default,
};
//# sourceMappingURL=debug.js.map