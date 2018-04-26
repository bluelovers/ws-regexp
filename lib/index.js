"use strict";
/**
 * Created by user on 2018/4/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const flags_1 = require("./flags");
exports.FlagsName = flags_1.default;
/**
 * Check whether a RegExp flag is supported
 */
function hasSupportFlag(flag, RegExpClass = RegExp, skipPatternCheck) {
    if (!flag || typeof flag != 'string' || flag.length != 1) {
        throw new TypeError(`"${flag}" not a valid flag`);
    }
    let isSupported = null;
    try {
        if (!skipPatternCheck && flags_1.FlagsPattern[flag]) {
            isSupported = testFlag(flag, RegExpClass);
        }
        else {
            new RegExpClass('', flag);
            isSupported = true;
        }
    }
    catch (exception) {
        isSupported = false;
    }
    return isSupported;
}
exports.hasSupportFlag = hasSupportFlag;
function testFlag(flag, RegExpClass = RegExp, flagsPattern = flags_1.FlagsPattern) {
    if (flagsPattern[flag] && flagsPattern[flag].length) {
        return flagsPattern[flag].every(function (v) {
            let [pattern, input, value, fn] = v;
            let bool;
            let r = new RegExpClass(pattern, flag);
            if (fn) {
                if (typeof fn == 'function') {
                    bool = fn(r, value, input, pattern, RegExpClass, flag);
                }
                else {
                    bool = r[fn](input) === value;
                }
            }
            else {
                bool = r.test(input) === value;
            }
            return bool;
        }) === true;
    }
    return false;
}
exports.testFlag = testFlag;
const self = require("./index");
exports.default = self;
