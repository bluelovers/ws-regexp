"use strict";
/**
 * Created by user on 2018/4/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
exports.hasSupportFlag = lib_1.hasSupportFlag;
exports.testFlag = lib_1.testFlag;
const flags_1 = require("./lib/flags");
const index_1 = require("./lib/index");
const pattern_1 = require("./lib/pattern");
exports.testPattern = pattern_1.testPattern;
const prototype_1 = require("./lib/proto/prototype");
const static_1 = require("./lib/proto/static");
const symbol_1 = require("./lib/symbol");
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
            bool = lib_1.hasSupportFlag(flags_1.FlagsName[flags]);
        }
        a[flags] = bool;
        return a;
    }, {}),
    /**
     * all flag support without name and pattern test
     */
    flagsAll: index_1.testFlagsAll(RegExp, true),
    /**
     * pattern support
     */
    pattern: Object.keys(pattern_1.PatternSupport).reduce(function (a, key) {
        a[key] = pattern_1.testPattern(key);
        return a;
    }, {}),
    //hasFlagsProp: /x/g.flags === 'g',
    prototype: prototype_1.testPrototype(),
    static: static_1.testStatic(),
    symbol: symbol_1.testSymbol(),
};
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
exports.FlagsName = flags_1.FlagsName;
exports.default = exports.support;
