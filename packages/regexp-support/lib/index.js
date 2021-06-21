"use strict";
/**
 * Created by user on 2018/4/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegExp = exports.testFlagsAll = exports.testFlag = exports.hasSupportFlag = exports.FlagsName = void 0;
const tslib_1 = require("tslib");
const flags_1 = tslib_1.__importStar(require("./flags"));
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
function testFlag(flag, 
// @ts-ignore
RegExpClass = RegExp, testPattern = flags_1.FlagsPattern) {
    if (testPattern[flag] && testPattern[flag].length) {
        return testPattern[flag].every(function (v) {
            let [pattern, input, value, fn] = v;
            let bool;
            try {
                let r = createRegExp(pattern, flag, RegExpClass);
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
            }
            catch (e) {
                return false;
            }
            return bool;
        }) === true;
    }
    return false;
}
exports.testFlag = testFlag;
function testFlagsAll(RegExpClass = RegExp, skipPatternCheck) {
    let flagsAll = {};
    for (let i = 65; i <= 90; i++) {
        let k1 = String.fromCharCode(i);
        let k2 = String.fromCharCode(i + 32);
        flagsAll[k1] = hasSupportFlag(k1, RegExpClass, skipPatternCheck);
        flagsAll[k2] = hasSupportFlag(k2, RegExpClass, skipPatternCheck);
    }
    let def = [
        'g',
        'i',
        'm',
        's',
        'u',
        'y',
    ];
    flagsAll = Object.keys(flagsAll).sort().reduce(function (a, flag) {
        if (flagsAll[flag] || def.includes(flag)) {
            a[flag] = flagsAll[flag];
        }
        return a;
    }, {});
    return flagsAll;
}
exports.testFlagsAll = testFlagsAll;
// @ts-ignore
function createRegExp(pattern, flag, RegExpClass = RegExp) {
    let r;
    if (typeof RegExpClass.create == 'function') {
        r = RegExpClass.create(pattern, flag);
    }
    else {
        r = new RegExpClass(pattern, flag);
    }
    return r;
}
exports.createRegExp = createRegExp;
//# sourceMappingURL=index.js.map