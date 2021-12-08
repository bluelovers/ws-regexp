"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNew = exports._jpTableCmparisonBuild = exports._jpTableCmparisonBuildPre = exports.fixPlusTable = void 0;
const array_hyper_unique_1 = require("array-hyper-unique");
const zero_width_1 = require("zero-width");
function fixPlusTable(table) {
    return table
        .map(row => {
        return row
            .map(s => {
            if (typeof s === 'string') {
                return (0, zero_width_1.trimWithZeroWidth)(s);
            }
            return s;
        });
    });
}
exports.fixPlusTable = fixPlusTable;
function _jpTableCmparisonBuildPre(table, options) {
    var _a, _b;
    const skip = (_a = options === null || options === void 0 ? void 0 : options.skip) !== null && _a !== void 0 ? _a : [];
    const skip_00 = (_b = options === null || options === void 0 ? void 0 : options.skip_00) !== null && _b !== void 0 ? _b : [];
    let { TABLE = [], PLUS_TABLE, PLUS_TABLE_SAFE } = table;
    PLUS_TABLE = fixPlusTable(PLUS_TABLE);
    PLUS_TABLE_SAFE = fixPlusTable(PLUS_TABLE_SAFE);
    PLUS_TABLE.forEach(function ([jp, zht, zhs]) {
        addNew(TABLE, jp, zht, zhs);
    });
    TABLE = (0, array_hyper_unique_1.array_unique)(TABLE.concat(table.teachKanjiComparison.filter(function (row) {
        if (skip_00.includes(row[0][0])) {
            return false;
        }
        return true;
    })));
    TABLE = TABLE.filter(function (v) {
        let [jp, zht, zhs] = v;
        if ((jp[0] == zht[0] && jp[0] == zhs[0]) || (skip.includes(jp[0]) || skip.includes(zht[0]) || skip.includes(zhs[0]))) {
            return false;
        }
        return true;
    });
    const TABLE_SAFE = [];
    PLUS_TABLE_SAFE.forEach(function ([jp, zht, zhs]) {
        addNew(TABLE, jp, zht, zhs);
        addNew(TABLE_SAFE, jp, zht, zhs);
    });
    return {
        TABLE,
        TABLE_SAFE,
        PLUS_TABLE,
        PLUS_TABLE_SAFE,
    };
}
exports._jpTableCmparisonBuildPre = _jpTableCmparisonBuildPre;
function _jpTableCmparisonBuild(table, options) {
    let { TABLE, TABLE_SAFE, PLUS_TABLE, PLUS_TABLE_SAFE, } = _jpTableCmparisonBuildPre(table, options);
    let cache = [];
    for (let i in TABLE) {
        if (cache.includes(i)) {
            continue;
        }
        let [jp, zht, zhs] = TABLE[i];
        let _do = true;
        let j;
        for (j in TABLE) {
            if (j == i) {
                continue;
            }
            let [jp2, zht2, zhs2] = TABLE[j];
            if (zht.includes(zht2[0])) {
                _do = false;
                break;
            }
            if (zhs.includes(zhs2[0])) {
                _do = false;
                break;
            }
        }
        if (!_do) {
            cache.push(i);
            cache.push(j);
            //console.log(jp, zht, zhs);
        }
        else {
            TABLE_SAFE.push(TABLE[i]);
        }
    }
    (0, array_hyper_unique_1.array_unique_overwrite)(TABLE);
    (0, array_hyper_unique_1.array_unique_overwrite)(TABLE_SAFE);
    (0, array_hyper_unique_1.array_unique_overwrite)(PLUS_TABLE);
    (0, array_hyper_unique_1.array_unique_overwrite)(PLUS_TABLE_SAFE);
    return {
        TABLE,
        TABLE_SAFE,
        PLUS_TABLE,
        PLUS_TABLE_SAFE,
    };
}
exports._jpTableCmparisonBuild = _jpTableCmparisonBuild;
function addNew(table, jp, zht, zhs) {
    jp = Array.isArray(jp) ? jp : [jp];
    zht = Array.isArray(zht) ? zht : [zht];
    zhs = Array.isArray(zhs) ? zhs : [zhs];
    table.push([
        jp,
        zht,
        zhs,
    ]);
    return table;
}
exports.addNew = addNew;
//# sourceMappingURL=core.js.map