"use strict";
/**
 * Created by user on 2018/4/28/028.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGEXP_SYMBOL = void 0;
exports.testSymbol = testSymbol;
const index_1 = require("./index");
exports.REGEXP_SYMBOL = {
    species: false,
    match: false,
    replace: false,
    search: false,
    split: false,
};
// @ts-ignore
function testSymbol(RegExpClass = RegExp) {
    let r = (0, index_1.createRegExp)('', '', RegExpClass);
    return Object.keys(exports.REGEXP_SYMBOL)
        .reduce(function (a, key) {
        a[key] = (Symbol[key] && Symbol[key] in r);
        return a;
    }, {});
}
//# sourceMappingURL=symbol.js.map