"use strict";
/**
 * Created by user on 2019/4/9.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._re_cjk_conv = void 0;
/**
 * for cjk-conv and regexp-cjk only
 */
function _re_cjk_conv(flags, addSource) {
    flags = (flags || 'u');
    if (flags.indexOf('u') === -1) {
        flags += 'u';
    }
    return new RegExp(`[\\u2e80-\\u2e99\\u2e9b-\\u2ef3\\u2f00-\\u2fd5\\u3038-\\u303b\\u3400-\\u4db5\\u4E00-\\u9FFF\\u{20000}-\\u{2FA1F}${addSource || ''}]`, flags);
}
exports._re_cjk_conv = _re_cjk_conv;
exports.default = exports;
//# sourceMappingURL=cjk-conv.js.map