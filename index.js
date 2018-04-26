"use strict";
/**
 * Created by user on 2018/4/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
const flags_1 = require("./lib/flags");
const _support = {
    flags: Object
        .keys(flags_1.default)
        .reduce(function (a, flags) {
        let bool = false;
        if (flags in a) {
            bool = a[flags];
        }
        else if (flags_1.default[flags] in a) {
            bool = flags_1.default[flags];
        }
        else {
            bool = lib_1.hasSupportFlag(flags_1.default[flags]);
        }
        a[flags] = bool;
        return a;
    }, {})
};
exports.support = Object.freeze(_support);
exports.hasSupportFlag = lib_1.default.hasSupportFlag;
exports.testFlag = lib_1.default.testFlag;
exports.default = exports.support;
