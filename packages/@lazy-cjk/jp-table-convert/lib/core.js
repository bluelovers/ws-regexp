"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._build_table = exports._build_record = void 0;
const types_1 = require("./types");
function _build_record(src) {
    let to = {};
    to[types_1.KEY_JP] = {};
    to[types_1.KEY_ZHT] = {};
    to[types_1.KEY_ZHS] = {};
    src.forEach(function (vrow) {
        let [jp, zht, zhs] = vrow;
        let k = types_1.KEY_JP;
        for (let c of jp) {
            if (!c || to[k][c]) {
                continue;
            }
            to[k][c] = to[k][c] || {};
            to[k][c][k] = c;
            to[k][c][types_1.KEY_ZHT] = zht[0];
            to[k][c][types_1.KEY_ZHS] = zhs[0];
        }
        k = types_1.KEY_ZHT;
        for (let c of zht) {
            if (!c || to[k][c]) {
                continue;
            }
            to[k][c] = to[k][c] || {};
            to[k][c][types_1.KEY_JP] = jp[0];
            to[k][c][k] = c;
            to[k][c][types_1.KEY_ZHS] = zhs[0];
        }
        k = types_1.KEY_ZHS;
        for (let c of zhs) {
            if (!c || to[k][c]) {
                continue;
            }
            to[k][c] = to[k][c] || {};
            to[k][c][types_1.KEY_JP] = jp[0];
            to[k][c][types_1.KEY_ZHT] = zht[0];
            to[k][c][k] = c;
        }
    });
    return to;
}
exports._build_record = _build_record;
function _build_table(ZHJP_TABLE, ZHJP_TABLE_SAFE) {
    const TABLE = _build_record(ZHJP_TABLE);
    const TABLE_SAFE = _build_record(ZHJP_TABLE_SAFE);
    return {
        TABLE,
        TABLE_SAFE,
    };
}
exports._build_table = _build_table;
//# sourceMappingURL=core.js.map