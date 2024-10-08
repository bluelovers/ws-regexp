"use strict";
/**
 * Created by user on 2020/5/22.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._greedyTableBuild = exports._greedyTableCacheRegexp = exports._greedyTableCacheMap = exports._greedyTableCacheTest = void 0;
exports.greedyTableTest = greedyTableTest;
exports.greedyTableCharArray = greedyTableCharArray;
exports.greedyTableReplace = greedyTableReplace;
const core_1 = require("./lib/core");
Object.defineProperty(exports, "_greedyTableBuild", { enumerable: true, get: function () { return core_1._greedyTableBuild; } });
const table_1 = require("./lib/table");
Object.defineProperty(exports, "_greedyTableCacheTest", { enumerable: true, get: function () { return table_1._greedyTableCacheTest; } });
Object.defineProperty(exports, "_greedyTableCacheMap", { enumerable: true, get: function () { return table_1._greedyTableCacheMap; } });
Object.defineProperty(exports, "_greedyTableCacheRegexp", { enumerable: true, get: function () { return table_1._greedyTableCacheRegexp; } });
function greedyTableTest(input) {
    return table_1._greedyTableCacheTest.test(input);
}
function greedyTableCharArray(char) {
    return table_1._greedyTableCacheMap.get(char);
}
function greedyTableReplace(input) {
    if (greedyTableTest(input)) {
        return table_1._greedyTableCacheRegexp
            .reduce(function (input, r) {
            return input.replace(r[0], r[1]);
        }, input);
    }
    return input;
}
exports.default = exports;
//# sourceMappingURL=index.js.map