"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getdata = void 0;
const table_1 = require("./table");
function _getdata(char, from, to, safe) {
    if (safe) {
        return (table_1.TABLE_SAFE[from][char]) ? table_1.TABLE_SAFE[from][char][to] : null;
    }
    return (table_1.TABLE[from][char]) ? table_1.TABLE[from][char][to] : null;
}
exports._getdata = _getdata;
//# sourceMappingURL=util.js.map