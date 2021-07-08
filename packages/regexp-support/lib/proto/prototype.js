"use strict";
/**
 * Created by user on 2018/4/28/028.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPrototype = exports.PROTOTYPE = void 0;
/// <reference lib="es2015.core" />
/// <reference lib="es2015.symbol.wellknown" />
/// <reference lib="es2018.regexp" />
const index_1 = require("../index");
exports.PROTOTYPE = {
    source: false,
    flags: false,
    lastIndex: false,
    dotAll: false,
    global: false,
    ignoreCase: false,
    multiline: false,
    sticky: false,
    unicode: false,
    hasIndices: false,
};
// @ts-ignore
function testPrototype(RegExpClass = RegExp) {
    const flags = 'g';
    let r = (0, index_1.createRegExp)('', flags, RegExpClass);
    return Object.keys(exports.PROTOTYPE)
        .reduce(function (a, b) {
        switch (b) {
            case 'flags':
                // @ts-ignore
                a[b] = (b in r) && r[b] === flags;
                break;
            default:
                a[b] = (b in r);
                break;
        }
        return a;
    }, {});
}
exports.testPrototype = testPrototype;
//# sourceMappingURL=prototype.js.map