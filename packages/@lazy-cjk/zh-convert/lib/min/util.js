"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixOptions = fixOptions;
const util_1 = require("../util");
const const_1 = require("../const");
const const_2 = require("./const");
function fixOptions(options = {}, table) {
    options = Object.assign({}, options);
    options.table = options.table || Object.create(table);
    options.tableOnly = options.tableOnly !== false;
    options = (0, util_1.getOptions)(options, const_1.defaultOptions, const_2.SAFE_MODE_CHAR_MIN);
    return options;
}
//# sourceMappingURL=util.js.map