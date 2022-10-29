"use strict";
/**
 * Created by user on 2020/5/29.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn2tw_min = exports.tw2cn_min = void 0;
const tslib_1 = require("tslib");
const util_1 = require("./lib/min/util");
const table_tw2cn_debug_safe_json_1 = tslib_1.__importDefault(require("@lazy-cjk/static-build-zh-convert/data/table_tw2cn.debug.safe.json"));
const index_1 = require("./index");
const table_cn2tw_debug_safe_json_1 = tslib_1.__importDefault(require("@lazy-cjk/static-build-zh-convert/data/table_cn2tw.debug.safe.json"));
tslib_1.__exportStar(require("./lib/types"), exports);
/**
 * 以不造成歧異的字典表來取代
 */
function tw2cn_min(text, options = {}, ...argv) {
    options = (0, util_1.fixOptions)(options, table_tw2cn_debug_safe_json_1.default);
    return (0, index_1.tw2cn)(text, options, ...argv);
}
exports.tw2cn_min = tw2cn_min;
/**
 * 以不造成歧異的字典表來取代
 */
function cn2tw_min(text, options = {}, ...argv) {
    options = (0, util_1.fixOptions)(options, table_cn2tw_debug_safe_json_1.default);
    return (0, index_1.cn2tw)(text, options, ...argv);
}
exports.cn2tw_min = cn2tw_min;
exports.default = {
    tw2cn_min,
    cn2tw_min,
};
//# sourceMappingURL=min.js.map