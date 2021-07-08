"use strict";
/**
 * Created by user on 2018/4/28/028.
 */
/// <reference lib="es2015.core" />
/// <reference lib="es2015.symbol.wellknown" />
/// <reference lib="es2018.regexp" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.testStatic = exports.REGEXP_STATIC = void 0;
const index_1 = require("../index");
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
    input: false,
    $_: false,
    lastMatch: false,
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
    let rc = RegExpClass;
    let re = (0, index_1.createRegExp)('(wor)(ld)', 'g', RegExpClass);
    re.test('hello world!');
    return Object.keys(exports.REGEXP_STATIC)
        .reduce(function (a, b) {
        a[b] = (b in rc);
        if (a[b]) {
            switch (b) {
                case 'leftContext':
                case '$`':
                    a[b] = rc[b] === 'hello ';
                    break;
                case 'rightContext':
                case "$'":
                    a[b] = rc[b] === '!';
                    break;
                case 'lastParen':
                case "$+":
                    a[b] = rc[b] === 'ld';
                    break;
                case 'lastMatch':
                case '$&':
                    a[b] = rc[b] === 'world';
                    break;
                case 'input':
                case '$_':
                    a[b] = rc[b] === 'hello world!';
                    break;
                case '$1':
                    a[b] = rc[b] === 'wor';
                    break;
                case '$2':
                    a[b] = rc[b] === 'ld';
                    break;
                default:
                //console.log(b, rc[b]);
            }
        }
        return a;
    }, {});
}
exports.testStatic = testStatic;
//# sourceMappingURL=static.js.map