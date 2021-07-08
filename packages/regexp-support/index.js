"use strict";
/**
 * Created by user on 2018/4/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPattern = exports.testFlag = exports.hasSupportFlag = exports.FlagsName = exports.support = void 0;
const lib_1 = require("./lib");
Object.defineProperty(exports, "hasSupportFlag", { enumerable: true, get: function () { return lib_1.hasSupportFlag; } });
Object.defineProperty(exports, "testFlag", { enumerable: true, get: function () { return lib_1.testFlag; } });
const flags_1 = require("./lib/flags");
Object.defineProperty(exports, "FlagsName", { enumerable: true, get: function () { return flags_1.FlagsName; } });
const index_1 = require("./lib/index");
const pattern_1 = require("./lib/pattern");
Object.defineProperty(exports, "testPattern", { enumerable: true, get: function () { return pattern_1.testPattern; } });
const unicode_1 = require("./lib/pattern/charset/unicode");
const unicode_blocks_1 = require("./lib/pattern/charset/unicode-blocks");
const unicode_script_1 = require("./lib/pattern/charset/unicode-script");
const prototype_1 = require("./lib/proto/prototype");
const static_1 = require("./lib/proto/static");
const symbol_1 = require("./lib/symbol");
/**
 * @link https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
 * @link https://www.regular-expressions.info/posixbrackets.html
 * @link http://2ality.com/archive.html?tag=regexp
 */
const _support = {
    nativeFlags: '',
    /**
     * flag support with name and pattern test
     */
    flags: Object
        .keys(flags_1.FlagsName)
        .reduce(function (a, flags) {
        let bool = false;
        if (flags in a) {
            bool = a[flags];
        }
        else if (flags_1.FlagsName[flags] in a) {
            bool = a[flags_1.FlagsName[flags]];
        }
        else {
            bool = (0, lib_1.hasSupportFlag)(flags_1.FlagsName[flags]);
        }
        a[flags] = bool;
        return a;
    }, {}),
    /**
     * all flag support without name and pattern test
     */
    flagsAll: (0, index_1.testFlagsAll)(RegExp, true),
    /**
     * pattern support
     */
    pattern: Object.keys(pattern_1.PatternSupport).reduce(function (a, key) {
        a[key] = (0, pattern_1.testPattern)(key);
        return a;
    }, {}),
    //hasFlagsProp: /x/g.flags === 'g',
    prototype: (0, prototype_1.testPrototype)(),
    static: (0, static_1.testStatic)(),
    symbol: (0, symbol_1.testSymbol)(),
    objectStringTag: Object.prototype.toString.call(/a/),
    unicodeSet: (() => {
        return {
            unicode: false,
            script: false,
            blocks: false,
            //unicodeKeys: Object.keys(UNICODE_ALL),
            //scriptKeys: Object.keys(UNICODE_SCRIPTS_ALL),
            unicodeTest: Object.entries((0, unicode_1.testUnicodeAll)())
                .reduce(function (a, b) {
                if (b[1] !== null) {
                    a[b[0]] = b[1];
                }
                return a;
            }, {}),
            scriptTest: Object.entries((0, unicode_script_1.testUnicodeScriptAll)())
                .reduce(function (a, b) {
                if (b[1] !== null) {
                    a[b[0]] = b[1];
                }
                return a;
            }, {}),
            blocksTest: Object.entries((0, unicode_blocks_1.testUnicodeBlocksAll)())
                .reduce(function (a, b) {
                if (b[1] !== null) {
                    a[b[0]] = b[1];
                }
                return a;
            }, {}),
        };
    })(),
};
_support.unicodeSet.unicode = Object.values(_support.unicodeSet.unicodeTest).includes(true);
_support.unicodeSet.script = Object.values(_support.unicodeSet.scriptTest).includes(true);
_support.unicodeSet.blocks = Object.values(_support.unicodeSet.blocksTest).includes(true);
_support.nativeFlags = Object
    .keys(_support.flagsAll)
    .reduce(function (a, f) {
    if (_support.flagsAll[f]) {
        a.push(f);
    }
    return a;
}, [])
    .join('');
exports.support = Object.freeze(_support);
exports.default = exports.support;
//# sourceMappingURL=index.js.map