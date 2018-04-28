"use strict";
/**
 * Created by user on 2018/4/28/028.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../regexp-support/index");
exports.RE_NATIVE_FLAGS = new RegExp(`[${index_1.default.nativeFlags}]`, 'g');
exports.RE_NON_NATIVE_FLAGS = new RegExp(`[^${index_1.default.nativeFlags}]`, 'g');
exports.hasFlagsProp = index_1.default.prototype.flags;
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
const self = require("./index");
exports.default = self;
