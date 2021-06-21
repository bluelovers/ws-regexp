"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reToStringList = void 0;
const tslib_1 = require("tslib");
const uni_string_1 = tslib_1.__importDefault(require("uni-string"));
const array_hyper_unique_1 = require("array-hyper-unique");
function reToStringList(re, char) {
    const s = re.source
        .replace(/^.*\[|\].*$/ug, '');
    const a = uni_string_1.default.split(s, '').concat(char).sort();
    return array_hyper_unique_1.array_unique_overwrite(a);
}
exports.reToStringList = reToStringList;
//# sourceMappingURL=util.js.map