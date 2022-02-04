"use strict";
/**
 * Created by user on 2018/5/7/007.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.table_range = void 0;
const tslib_1 = require("tslib");
const chinese_1 = tslib_1.__importStar(require("./table/chinese"));
const circle_1 = tslib_1.__importDefault(require("./table/circle"));
exports.table_range = {
    chinese: chinese_1.default,
    chinese2: chinese_1.list_range2,
    circle: circle_1.default,
};
exports.default = exports.table_range;
//# sourceMappingURL=table.js.map