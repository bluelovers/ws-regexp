"use strict";
/**
 * Created by user on 2018/4/28/028.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prototypeToFlags = exports.prototypeToFlagsArray = exports._getNativeFlags = exports.isNativeFlags = exports.stripNonNativeFlags = exports.getNativeFlags = exports.hasFlagsProp = exports.RE_NON_NATIVE_FLAGS = exports.RE_NATIVE_FLAGS = void 0;
const regexp_support_1 = __importStar(require("regexp-support"));
exports.RE_NATIVE_FLAGS = new RegExp(`[${regexp_support_1.default.nativeFlags}]`, 'g');
exports.RE_NON_NATIVE_FLAGS = new RegExp(`[^${regexp_support_1.default.nativeFlags}]`, 'g');
exports.hasFlagsProp = regexp_support_1.default.prototype.flags;
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
function prototypeToFlagsArray(inputObject, 
// @ts-ignore
flagMap = regexp_support_1.FlagsName) {
    return Object
        .keys(flagMap)
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
function prototypeToFlags(inputObject, 
// @ts-ignore
flagMap = regexp_support_1.FlagsName) {
    return prototypeToFlagsArray(inputObject, flagMap)
        .join('');
}
exports.prototypeToFlags = prototypeToFlags;
exports.default = exports;
//# sourceMappingURL=index.js.map