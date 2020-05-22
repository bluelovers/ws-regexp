"use strict";
/**
 * Created by user on 2018/5/3/003.
 *
 * 已廢棄 僅用於舊版相容
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._word_zh_core = exports._word_zh = void 0;
const __1 = require("..");
const conv_1 = require("./conv");
Object.defineProperty(exports, "_word_zh_core", { enumerable: true, get: function () { return conv_1._word_zh_core; } });
function _word_zh(search, ret, flags = 'ig', skip) {
    let s;
    if (search instanceof RegExp) {
        s = new __1.zhRegExp(search, {
            skip,
        });
        flags = s.flags;
    }
    else {
        s = new __1.zhRegExp(search, flags, {
            skip,
        }).source;
    }
    return [s, ret, flags];
}
exports._word_zh = _word_zh;
//# sourceMappingURL=index.js.map