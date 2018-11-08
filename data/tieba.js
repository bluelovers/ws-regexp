"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_hyper_unique_1 = require("array-hyper-unique");
const util_1 = require("../lib/util");
exports.star = util_1.arrCjk([
    '下流',
    '下賤',
    '你媽',
    '卖比',
    '口射',
    '奴隶',
    '奴隷',
    '妹死',
    '娘比',
    '娼妇',
    '娼妓',
    '娼婦',
    '尼馬',
    '废物',
    '強奸',
    '強姦',
    '强奸',
    '性奴',
    '我靠',
    '法克',
    '混蛋',
    '玛的',
    '畜生',
    '白痴',
    '笨蛋',
    '蠢货',
    '被操',
    '裸体',
    '賤人',
    '馬的',
    '麻痹',
    '麻痺',
]);
exports.star.sort();
exports.block = util_1.arrCjk([
    '尼玛',
]);
exports.block.sort();
exports.data = array_hyper_unique_1.array_unique([
    ...exports.star,
    ...exports.block,
]);
exports.data.sort();
exports.sep = [
    '圌',
    '圝',
    '吅',
    '（和谐）',
    '（河蟹）',
];
const self = require("./tieba");
exports.default = self;
