"use strict";
/**
 * Created by user on 2018/4/28/028.
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
};
// @ts-ignore
function testPrototype(RegExpClass = RegExp) {
    let r = index_1.createRegExp('', '', RegExpClass);
    return Object.keys(exports.PROTOTYPE)
        .reduce(function (a, b) {
        a[b] = (b in r);
        return a;
    }, {});
}
exports.testPrototype = testPrototype;
const self = require("./prototype");
exports.default = self;
