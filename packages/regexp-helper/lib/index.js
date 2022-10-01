"use strict";
/**
 * Created by user on 2018/4/28/028.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.prototypeToFlags = exports.prototypeToFlagsArray = exports._getNativeFlags = exports.isNativeFlags = exports.stripNonNativeFlags = exports.getNativeFlags = exports.hasFlagsProp = exports.RE_NON_NATIVE_FLAGS = exports.RE_NATIVE_FLAGS = void 0;
const regexp_support_1 = require("regexp-support");
exports.RE_NATIVE_FLAGS = new RegExp(`[${regexp_support_1.support.nativeFlags}]`, 'g');
exports.RE_NON_NATIVE_FLAGS = new RegExp(`[^${regexp_support_1.support.nativeFlags}]`, 'g');
exports.hasFlagsProp = regexp_support_1.support.prototype.flags;
function getNativeFlags(target) {
    let flags;
    if (target instanceof RegExp) {
        target = _getNativeFlags(target);
    }
    if (typeof target === 'string') {
        flags = stripNonNativeFlags(target);
    }
    else {
        throw new TypeError(`target must is RegExp or String`);
    }
    return flags;
}
exports.getNativeFlags = getNativeFlags;
function stripNonNativeFlags(flags) {
    return flags.replace(exports.RE_NON_NATIVE_FLAGS, '');
}
exports.stripNonNativeFlags = stripNonNativeFlags;
function isNativeFlags(flags) {
    return (flags === '') || !exports.RE_NON_NATIVE_FLAGS.test(flags);
}
exports.isNativeFlags = isNativeFlags;
/**
 * Returns native `RegExp` flags used by a regex object.
 *
 * @private
 * @param {RegExp} regex Regex to check.
 * @returns {String} Native flags in use.
 */
function _getNativeFlags(regex) {
    return exports.hasFlagsProp ?
        regex.flags :
        /\/([a-z]*)$/i.exec(RegExp.prototype.toString.call(regex))[1];
}
exports._getNativeFlags = _getNativeFlags;
function prototypeToFlagsArray(inputObject, flagMap = regexp_support_1.FlagsName) {
    return Object.keys(flagMap)
        .reduce(function (a, name) {
        if (inputObject[name] === true
            && (name in flagMap)
            && (a.indexOf(flagMap[name]) === -1)) {
            a.push(flagMap[name]);
        }
        return a;
    }, [])
        .sort();
}
exports.prototypeToFlagsArray = prototypeToFlagsArray;
function prototypeToFlags(inputObject, flagMap = regexp_support_1.FlagsName) {
    return prototypeToFlagsArray(inputObject, flagMap)
        .join('');
}
exports.prototypeToFlags = prototypeToFlags;
exports.default = exports;
//# sourceMappingURL=index.js.map