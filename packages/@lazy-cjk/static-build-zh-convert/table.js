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
exports.table_tw2cn = exports.table_cn2tw = void 0;
const table_cn2tw_1 = __importDefault(require("./data/table_cn2tw"));
exports.table_cn2tw = table_cn2tw_1.default;
const table_tw2cn_1 = __importDefault(require("./data/table_tw2cn"));
exports.table_tw2cn = table_tw2cn_1.default;
__exportStar(require("./types"), exports);
exports.default = {
    table_cn2tw: table_cn2tw_1.default,
    table_tw2cn: table_tw2cn_1.default,
};
//# sourceMappingURL=table.js.map