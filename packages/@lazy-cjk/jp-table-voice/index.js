"use strict";
/**
 * Created by user on 2020/5/27.
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
exports.EnumTableVoice = exports.table_voice = void 0;
__exportStar(require("./lib/core"), exports);
__exportStar(require("./lib/util"), exports);
const table_1 = require("./lib/table");
Object.defineProperty(exports, "table_voice", { enumerable: true, get: function () { return table_1.table_voice; } });
const util_1 = require("./lib/util");
var EnumTableVoice;
(function (EnumTableVoice) {
    /**
     * 清音
     */
    EnumTableVoice[EnumTableVoice["01"] = 0] = "01";
    /**
     * 濁音
     */
    EnumTableVoice[EnumTableVoice["02"] = 1] = "02";
    /**
     * 半濁音
     */
    EnumTableVoice[EnumTableVoice["03"] = 2] = "03";
})(EnumTableVoice = exports.EnumTableVoice || (exports.EnumTableVoice = {}));
exports.default = util_1.getVoiceAll;
//# sourceMappingURL=index.js.map