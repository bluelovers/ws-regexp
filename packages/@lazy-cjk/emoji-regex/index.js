"use strict";
/**
 * Created by user on 2020/6/12.
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
const re_1 = require("./lib/re");
__exportStar(require("./lib/table"), exports);
__exportStar(require("./lib/re"), exports);
__exportStar(require("./lib/util"), exports);
exports.default = re_1.reEmoji;
//# sourceMappingURL=index.js.map