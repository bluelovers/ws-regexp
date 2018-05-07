"use strict";
/**
 * Created by user on 2018/5/7/007.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
exports.list_range_raw = [
    [
        [0x2160, 0x2160 + 12],
    ],
    [
        [0x2170, 0x2170 + 12],
    ],
];
exports.list_range = util_1.listRawToRange(exports.list_range_raw);
exports.default = exports.list_range;
