"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getdata = void 0;
const table_1 = require("./table");
function _getdata(char, from, to, safe) {
    var _a;
    return (_a = (safe ? table_1.TABLE_SAFE : table_1.TABLE)[from][char]) === null || _a === void 0 ? void 0 : _a[to];
}
exports._getdata = _getdata;
//# sourceMappingURL=util.js.map