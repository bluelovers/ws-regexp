"use strict";
/**
 * @link https://unicode-table.com/cn/blocks/enclosed-alphanumerics/
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
exports.list_range_raw = [
    [
        // 带圆圈数字
        // 0
        9450,
        // 1 - 20
        [0x2460, 0x2460 + 20 - 1 + 1],
        // 21 - 35
        [12881, 12881 + 35 - 21 + 1],
        [12977, 12977 + 50 - 36 + 1],
    ],
    [
        // 反白带圆圈数字
        // 0
        0x24ff,
        // 1 - 10
        [0x2776, 0x2776 + 10],
        // 11 - 20
        [0x24eb, 0x24eb + 10],
    ],
    [
        //1 - 10
        [0x2776, 0x2776 + 10],
        [0x24eb, 0x24eb + 10],
    ],
    [
        //1 - 10
        [0x278a, 0x278a + 10],
        [0x24eb, 0x24eb + 10],
    ],
    [
        //1 - 10
        [0x24f5, 0x24f5 + 10],
    ],
    [
        //1 - 10
        [0x2780, 0x2780 + 10],
    ],
];
exports.list_range = util_1.listRawToRange(exports.list_range_raw);
exports.default = exports.list_range;
