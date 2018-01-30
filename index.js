"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib = require("./lib");
class zhRegExp extends RegExp {
    constructor(str, flags = '', skip = '') {
        let [rs, f] = lib._word_zh(str, null, flags);
        let bool = (rs instanceof RegExp);
        f = f || flags || '';
        if (!bool) {
            super(rs, f);
        }
        else {
            super(rs.source, f);
        }
    }
    static create(str, flags = '', skip = '', ...argv) {
        return new this(str, flags, skip, ...argv);
    }
}
exports.zhRegExp = zhRegExp;
exports.create = zhRegExp.create.bind(zhRegExp);
exports.default = zhRegExp;
