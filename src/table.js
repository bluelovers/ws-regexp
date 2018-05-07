"use strict";
/**
 * Created by user on 2018/5/7/007.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const chinese_1 = require("./table/chinese");
const circle_1 = require("./table/circle");
exports.table_range = {
    chinese: chinese_1.default,
    circle: circle_1.default,
};
exports.default = exports.table_range;
