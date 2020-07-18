"use strict";
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
exports.tw2cn = exports.cn2tw = void 0;
const util_1 = require("./lib/util");
const core_1 = require("./lib/core");
__exportStar(require("./lib/types"), exports);
function cn2tw(text, options = {}, ...argv) {
    return util_1._call(core_1._cn2tw, text, options, ...argv);
}
exports.cn2tw = cn2tw;
function tw2cn(text, options = {}, ...argv) {
    return util_1._call(core_1._tw2cn, text, options, ...argv);
}
exports.tw2cn = tw2cn;
exports.default = {
    cn2tw,
    tw2cn,
};
//# sourceMappingURL=index.js.map