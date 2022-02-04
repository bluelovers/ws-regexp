"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._wrapFn = exports._get = void 0;
const tslib_1 = require("tslib");
const array_hyper_unique_1 = require("array-hyper-unique");
const core_1 = require("@lazy-cjk/zh-table-alias/lib/util/core");
const zh_table_alias_1 = tslib_1.__importDefault(require("@lazy-cjk/zh-table-alias"));
function _get(a, value, ...values) {
    a = (0, core_1._get)(a, value, ...values);
    return (0, array_hyper_unique_1.array_unique)(a).sort();
}
exports._get = _get;
function _wrapFn(fn) {
    return function (char, options = {}) {
        if (!char) {
            return null;
        }
        if (options.skip && options.skip.indexOf(char) != -1) {
            return [char];
        }
        let a = zh_table_alias_1.default[fn](char, options);
        a = (0, array_hyper_unique_1.array_unique)(a);
        a.sort();
        return a;
    };
}
exports._wrapFn = _wrapFn;
//# sourceMappingURL=util.js.map