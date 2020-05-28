"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZHJP_TABLE_SAFE = exports.ZHJP_TABLE = exports.TABLE_SAFE = exports.TABLE = void 0;
/**
 * Created by user on 2017/12/24/024.
 *
 * @see https://www.jcinfo.net/tw/tools/kanji
 * @see http://dict.variants.moe.edu.tw/variants/rbt/japan_chinese_character_tiles.rbt?pageId=2981908
 * @see https://en.wikipedia.org/wiki/List_of_j%C5%8Dy%C5%8D_kanji
 * @see https://hanzi.unihan.com.cn/CJKCompare
 * @see http://www5b.biglobe.ne.jp/%7Eharigaya/variants.html
 */
const table_1 = require("./lib/table");
Object.defineProperty(exports, "TABLE", { enumerable: true, get: function () { return table_1.TABLE; } });
Object.defineProperty(exports, "TABLE_SAFE", { enumerable: true, get: function () { return table_1.TABLE_SAFE; } });
const table_2 = require("./lib/table");
Object.defineProperty(exports, "ZHJP_TABLE", { enumerable: true, get: function () { return table_2.TABLE; } });
Object.defineProperty(exports, "ZHJP_TABLE_SAFE", { enumerable: true, get: function () { return table_2.TABLE_SAFE; } });
__exportStar(require("./lib/table"), exports);
exports.default = table_1.TABLE;
//# sourceMappingURL=index.js.map