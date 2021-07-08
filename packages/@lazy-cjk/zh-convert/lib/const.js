"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SAFE_MODE_CHAR = exports.REGEXP_TEST = exports.defaultOptions = void 0;
const cjk_conv_1 = require("regexp-helper/lib/cjk-conv");
const array_hyper_unique_1 = require("array-hyper-unique");
exports.defaultOptions = Object.freeze({
    safe: true,
});
exports.REGEXP_TEST = (0, cjk_conv_1._re_cjk_conv)('ug');
exports.SAFE_MODE_CHAR = (0, array_hyper_unique_1.array_unique)([
    '后',
    '里',
    '餵',
    '志',
    '布',
    '佈',
    '系',
    '繫',
    '梁',
    '樑',
    '衝',
    '沖',
    '谷',
    '穀',
    '注',
    '克',
]);
//# sourceMappingURL=const.js.map