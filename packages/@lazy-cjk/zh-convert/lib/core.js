"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._cn2tw = _cn2tw;
exports._tw2cn = _tw2cn;
const table_1 = require("./table");
const map_1 = require("./core/map");
function _cn2tw(text) {
    return (0, map_1.textMap)(text, table_1.table_cn2tw);
}
function _tw2cn(text) {
    return (0, map_1.textMap)(text, table_1.table_tw2cn);
}
//# sourceMappingURL=core.js.map