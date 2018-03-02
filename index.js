"use strict";
/**
 * Created by user on 2018/1/31/031.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
const support_1 = require("./support");
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
        if (options.parseRegularExpressionString && typeof str == 'string') {
            let m = zhRegExp.parseRegularExpressionString(str);
            if (m) {
                str = new RegExp(m.source, m.flags);
            }
        }
        let hasFlags = typeof flags == 'string';
        let rs, f;
        if (!options.disableZh) {
            [rs, f] = lib_1.default._word_zh(str, null, flags || str.flags);
        }
        else if (!options.disableLocalRange) {
            rs = lib_1.default.replace_literal(str, function (text) {
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
    getStatic() {
        return Object.getPrototypeOf(this);
    }
    /**
     * @todo
     */
    toRegularExpressionString() {
        return this.toString();
        //return `/${this.source}/${this.flags}`;
    }
    static parseRegularExpressionString(str) {
        let m = /^([\/#$%])(.+?)\1([a-z]*)$/.exec(str);
        if (m) {
            let [s, d, r, f] = m;
            return {
                source: typeof r !== 'undefined' ? r : '',
                flags: typeof f !== 'undefined' ? f : '',
                slash: s,
                input: str,
            };
        }
        return null;
    }
    static get support() {
        return support_1.default;
    }
    static isRegExp(r) {
        if ((r instanceof RegExp) || Object.prototype.toString.call(r) === '[object RegExp]') {
            return r;
        }
        return null;
    }
}
exports.zhRegExp = zhRegExp;
exports.parseRegularExpressionString = zhRegExp.parseRegularExpressionString;
exports.isRegExp = zhRegExp.isRegExp;
exports.create = zhRegExp.create.bind(zhRegExp);
/*
export function isRegExp(r: RegExp): RegExp
export function isRegExp(r): RegExp | null
export function isRegExp(r)
{
    if ((r instanceof RegExp) || Object.prototype.toString.call(r) === '[object RegExp]')
    {
        return r;
    }

    return null;
}

export const create = zhRegExp.create.bind(zhRegExp) as IApi<zhRegExp>;
*/
exports.default = zhRegExp;
