"use strict";
/**
 * Created by user on 2018/4/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
const flags_1 = require("./lib/flags");
const index_1 = require("./lib/index");
const pattern_1 = require("./lib/pattern");
const _support = {
    /**
     * flag support with name
     */
    flags: Object
        .keys(flags_1.default)
        .reduce(function (a, flags) {
        let bool = false;
        if (flags in a) {
            bool = a[flags];
        }
        else if (flags_1.default[flags] in a) {
            bool = a[flags_1.default[flags]];
        }
        else {
            bool = lib_1.hasSupportFlag(flags_1.default[flags]);
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
};
exports.support = Object.freeze(_support);
exports.hasSupportFlag = lib_1.default.hasSupportFlag;
exports.testFlag = lib_1.default.testFlag;
exports.testPattern = pattern_1.default.testPattern;
exports.default = exports.support;
