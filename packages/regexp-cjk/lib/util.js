"use strict";
/**
 * Created by user on 2018/5/5/005.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._re_cjk_conv = void 0;
const cjk_conv_1 = require("regexp-helper/lib/cjk-conv");
/**
 * for regexp-cjk only
 */
function _re_cjk_conv(flags) {
    return (0, cjk_conv_1._re_cjk_conv)(flags, 'のと㊥㊦㊤');
}
exports._re_cjk_conv = _re_cjk_conv;
//# sourceMappingURL=util.js.map