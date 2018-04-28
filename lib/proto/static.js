"use strict";
/**
 * Created by user on 2018/4/28/028.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGEXP_STATIC = {
    $1: false,
    $2: false,
    $3: false,
    $4: false,
    $5: false,
    $6: false,
    $7: false,
    $8: false,
    $9: false,
    lastMatch: false,
    input: false,
    $_: false,
    '$&': false,
    lastParen: false,
    '$+': false,
    leftContext: false,
    '$`': false,
    rightContext: false,
    '$\'': false,
    $10: false,
    $100: false,
};
// @ts-ignore
function testStatic(RegExpClass = RegExp) {
    let r = RegExpClass;
    return Object.keys(exports.REGEXP_STATIC)
        .reduce(function (a, b) {
        a[b] = (b in r);
        return a;
    }, {});
}
exports.testStatic = testStatic;
const self = require("./static");
exports.default = self;
