"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SAFE_MODE_CHAR = exports.SAFE_MODE_CHAR_MIN = void 0;
const array_hyper_unique_1 = require("array-hyper-unique");
const const_1 = require("../const");
exports.SAFE_MODE_CHAR_MIN = (0, array_hyper_unique_1.array_unique)(const_1.SAFE_MODE_CHAR
    .slice()
    .concat([
    //'忧',
    //'脏',
    '划',
    '准',
    '发',
    '処',
    //'处',
    '處',
    //'憂',
    //'優',
    '餵',
    '炮',
    '砲',
    '奸',
    '姦',
    '鱷',
    '滷',
    '鑑',
    '發',
]));
exports.SAFE_MODE_CHAR = exports.SAFE_MODE_CHAR_MIN;
//# sourceMappingURL=const.js.map