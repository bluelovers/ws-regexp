"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.support = exports._multiEqual = exports.input = exports.lastMatch = exports.lastParen = exports.rightContext = exports.leftContext = void 0;
/**
 * Created by user on 2018/3/2/002.
 */
const re = /(wor)(ld)/g;
re.test('hello world!');
// @ts-ignore
exports.leftContext = _multiEqual(RegExp.leftContext, RegExp['$`'], 'hello ');
// @ts-ignore
exports.rightContext = _multiEqual(RegExp.rightContext, RegExp["$'"], '!');
// @ts-ignore
exports.lastParen = _multiEqual(RegExp.lastParen, RegExp["$+"], 'ld');
exports.lastMatch = _multiEqual(RegExp.lastMatch, RegExp["$&"], 'world');
// @ts-ignore
exports.input = _multiEqual(RegExp.input, RegExp["$_"], 'hello world!');
function _multiEqual(a, b, ...argv) {
    if (a === b) {
        if (argv.length) {
            for (let v of argv) {
                if (v !== a) {
                    return false;
                }
            }
        }
        return true;
    }
    return false;
}
exports._multiEqual = _multiEqual;
/**
 * @deprecated
 */
exports.support = (function () {
    let s = Object.assign({}, exports);
    delete s.default;
    // @ts-ignore
    delete s.support;
    for (let k in s) {
        if (/^_/.test(k)) {
            delete s[k];
        }
    }
    return Object.freeze(s);
})();
exports.default = exports.support;
//console.log(self);
//# sourceMappingURL=support.js.map