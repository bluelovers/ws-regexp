"use strict";
/**
 * Created by user on 2018/4/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
const flags_1 = require("./lib/flags");
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
     * all flag support without name
     */
    flagsAll: {},
};
{
    let flagsAll = {};
    for (let i = 65; i <= 90; i++) {
        let k1 = String.fromCharCode(i);
        let k2 = String.fromCharCode(i + 32);
        flagsAll[k1] = lib_1.hasSupportFlag(k1);
        flagsAll[k2] = lib_1.hasSupportFlag(k2);
    }
    // @ts-ignore
    _support.flagsAll = Object.keys(flagsAll).sort().reduce(function (a, flag) {
        if (flagsAll[flag]) {
            a[flag] = flagsAll[flag];
        }
        return a;
    }, {});
}
exports.support = Object.freeze(_support);
exports.hasSupportFlag = lib_1.default.hasSupportFlag;
exports.testFlag = lib_1.default.testFlag;
exports.default = exports.support;
