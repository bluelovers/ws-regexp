"use strict";
/**
 * Created by user on 2018/1/31/031.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const conv_1 = require("./lib/conv");
const event_1 = require("./lib/event");
const local_1 = require("./lib/local");
const parse_1 = require("./lib/parse");
const regexp_support_1 = require("regexp-support");
const regexp_helper_1 = require("regexp-helper");
exports.defaultOptions = {};
class zhRegExp extends RegExp {
    constructor(str, flags = null, options = {}, ...argv) {
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
        if (1 && (!options.disableZh || !options.disableLocalRange)) {
            let ev;
            if (str instanceof RegExp) {
                let ast = parse_1.parseRegExp(str.toString());
                ev = new event_1.default(ast);
            }
            else {
                if (options.parseRegularExpressionString && typeof str == 'string') {
                    let m = zhRegExp.parseRegularExpressionString(str);
                    if (m) {
                        str = m.source;
                        flags = hasFlags ? flags : m.flags;
                    }
                }
                ev = event_1.default.create(str, flags || '');
            }
            if (!options.disableZh) {
                ev.on(event_1.ParserEventEmitterEvent.default, function (ast) {
                    ast.old_raw = ast.old_raw || ast.raw;
                    ast.raw = conv_1._word_zh_core(ast.raw);
                    ev.emit(event_1.ParserEventEmitterEvent.change, ast);
                });
            }
            if (!options.disableLocalRange) {
                ev.on(event_1.ParserEventEmitterEvent.class_range, function (ast, ...argv) {
                    let s = ast.min.raw;
                    let e = ast.max.raw;
                    for (let r of local_1.local_range) {
                        let i = r.indexOf(s);
                        let j = r.indexOf(e, i);
                        if (i !== -1 && j !== -1) {
                            ast.old_raw = ast.old_raw || ast.raw;
                            ast.raw = r.slice(i, j + 1).join('');
                            ev.emit(event_1.ParserEventEmitterEvent.change, ast);
                            break;
                        }
                    }
                });
            }
            ev.resume();
            //options.sortClass = true;
            str = ev.getSource(!!options.debugChanged
                || !options.noUniqueClass
                || options.sortClass, options);
            flags = hasFlags ? flags : ev.flags;
        }
        else {
            if (options.parseRegularExpressionString && typeof str == 'string') {
                let m = zhRegExp.parseRegularExpressionString(str);
                if (m) {
                    str = new RegExp(m.source, m.flags);
                    flags = hasFlags ? flags : str.flags;
                }
            }
            else if (str instanceof RegExp) {
                str = str.source;
                flags = hasFlags ? flags : str.flags;
            }
        }
        super(str, flags || '');
        /*
        if (options.parseRegularExpressionString && typeof str == 'string')
        {
            let m = zhRegExp.parseRegularExpressionString(str);
            if (m)
            {
                str = new RegExp(m.source, m.flags);
            }
        }

        let hasFlags = typeof flags == 'string';

        let rs, f;

        if (!options.disableZh)
        {
            [rs, f] = lib._word_zh(str, null, flags || str.flags);
        }
        else if (!options.disableLocalRange)
        {
            rs = lib.replace_literal(str, function (text: string)
            {
                return text;
            });
        }

        let bool = (rs instanceof RegExp);

        if (hasFlags)
        {
            f = flags;
        }
        else
        {
            f = f || flags || rs.flags || '';
        }

        if (!bool)
        {
            super(rs, f);
        }
        else
        {
            super(rs.source, f);
        }
        */
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
        return regexp_support_1.default;
    }
}
exports.zhRegExp = zhRegExp;
(function (zhRegExp) {
    zhRegExp.isRegExp = regexp_helper_1.default.isRegExp;
})(zhRegExp = exports.zhRegExp || (exports.zhRegExp = {}));
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
