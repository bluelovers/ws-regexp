"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tw2cn = exports.cn2tw = void 0;
const util_1 = require("./lib/util");
const core_1 = require("./lib/core");
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