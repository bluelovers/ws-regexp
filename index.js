"use strict";
/**
 * Created by user on 2018/4/28/028.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const regexp_support_1 = require("regexp-support");
const lib_1 = require("./lib");
exports.getNativeFlags = lib_1.getNativeFlags;
exports.stripNonNativeFlags = lib_1.stripNonNativeFlags;
exports.nativeFlags = regexp_support_1.default.nativeFlags;
const self = require("./index");
exports.default = self;
