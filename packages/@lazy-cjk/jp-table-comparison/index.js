"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZHJP_TABLE_SAFE = exports.ZHJP_TABLE = exports.TABLE_SAFE = exports.TABLE = void 0;
const tslib_1 = require("tslib");
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
tslib_1.__exportStar(require("./lib/table"), exports);
exports.default = table_1.TABLE;
//# sourceMappingURL=index.js.map