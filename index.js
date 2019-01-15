"use strict";
/**
 * Created by user on 2018/4/28/028.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("regexp-helper-core"));
const regexp_support_1 = require("regexp-support");
const lib_1 = require("./lib");
exports.getNativeFlags = lib_1.getNativeFlags;
exports.stripNonNativeFlags = lib_1.stripNonNativeFlags;
exports.isNativeFlags = lib_1.isNativeFlags;
exports.prototypeToFlags = lib_1.prototypeToFlags;
exports.prototypeToFlagsArray = lib_1.prototypeToFlagsArray;
const parse_1 = require("./lib/parse");
exports.parseRegularExpressionString = parse_1.parseRegularExpressionString;
exports.nativeFlags = regexp_support_1.default.nativeFlags;
exports.default = exports;
