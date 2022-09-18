"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reToStringList = void 0;
const uni_string_1 = require("uni-string");
const array_hyper_unique_1 = require("array-hyper-unique");
function reToStringList(re, char) {
    const s = re.source
        .replace(/^.*\[|\].*$/ug, '');
    const a = uni_string_1.UString.split(s, '').concat(char).sort();
    return (0, array_hyper_unique_1.array_unique_overwrite)(a);
}
exports.reToStringList = reToStringList;
//# sourceMappingURL=util.js.map