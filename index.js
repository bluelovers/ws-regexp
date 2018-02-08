"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib = require("./lib");
exports.defaultOptions = {};
class zhRegExp extends RegExp {
    constructor(str, flags = null, options = {}) {
        if (flags !== null && typeof flags == 'object') {
            options = Object.assign({}, flags);
            flags = options.flags || null;
        }
        if (typeof options == 'string') {
            options = {
                skip: options,
            };
        }
        if (typeof options.flags == 'string') {
            flags = options.flags;
        }
        let hasFlags = typeof flags == 'string';
        let rs, f;
        if (!options.disableZh) {
            [rs, f] = lib._word_zh(str, null, flags || str.flags);
        }
        else if (!options.disableLocalRange) {
            rs = lib.replace_literal(str, function (text) {
                return text;
            });
        }
        let bool = (rs instanceof RegExp);
        if (hasFlags) {
            f = flags;
        }
        else {
            f = f || flags || rs.flags || '';
        }
        if (!bool) {
            super(rs, f);
        }
        else {
            super(rs.source, f);
        }
    }
    static create(str, flags = null, skip, ...argv) {
        return new this(str, flags, skip, ...argv);
    }
}
exports.zhRegExp = zhRegExp;
function isRegExp(r) {
    if ((r instanceof RegExp) || Object.prototype.toString.call(r) === '[object RegExp]') {
        return r;
    }
    return null;
}
exports.isRegExp = isRegExp;
exports.create = zhRegExp.create.bind(zhRegExp);
exports.default = zhRegExp;
