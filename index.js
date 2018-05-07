"use strict";
/**
 * Created by user on 2018/1/31/031.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const conv_1 = require("./lib/conv");
const regexp_parser_event_1 = require("regexp-parser-event");
const regexp_parser_literal_1 = require("regexp-parser-literal");
const regexp_support_1 = require("regexp-support");
const regexp_range_1 = require("regexp-range");
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
        if (1 && (!options.disableZh || !options.disableLocalRange || options.on)) {
            let ev;
            if (str instanceof RegExp) {
                let ast = regexp_parser_literal_1.parseRegExp(str.toString());
                ev = new regexp_parser_event_1.default(ast);
            }
            else {
                if (options.parseRegularExpressionString && typeof str == 'string') {
                    let m = zhRegExp.parseRegularExpressionString(str);
                    if (m) {
                        str = m.source;
                        flags = hasFlags ? flags : m.flags;
                    }
                }
                ev = regexp_parser_event_1.default.create(str, flags || '');
            }
            if (!options.disableZh) {
                ev.on(regexp_parser_event_1.ParserEventEmitterEvent.default, function (ast) {
                    ast.old_raw = ast.old_raw || ast.raw;
                    ast.raw = conv_1._word_zh_core(ast.raw, options.skip);
                    ev.emit(regexp_parser_event_1.ParserEventEmitterEvent.change, ast);
                });
            }
            if (!options.disableLocalRange) {
                ev.on(regexp_parser_event_1.ParserEventEmitterEvent.class_range, function (ast, ...argv) {
                    let s = ast.min.raw;
                    let e = ast.max.raw;
                    let ret = regexp_range_1.default(s, e, {
                        createRegExpString: true,
                    });
                    if (ret) {
                        if (options.allowLocalRangeAutoZh) {
                            ret = conv_1._word_zh_core2(ret, options.skip);
                        }
                        ast.old_raw = ast.old_raw || ast.raw;
                        ast.raw = ret;
                        ev.emit(regexp_parser_event_1.ParserEventEmitterEvent.change, ast);
                    }
                    /*
                    for (let r of local_range)
                    {
                        let i = r.indexOf(s);
                        let j = r.indexOf(e, i);

                        if (i !== -1 && j !== -1)
                        {
                            ast.old_raw = ast.old_raw || ast.raw;
                            ast.raw = r.slice(i, j + 1).join('');

                            ev.emit(ParserEventEmitterEvent.change, ast);
                            break;
                        }
                    }
                    */
                });
            }
            if (options.on) {
                Object
                    .keys(options.on)
                    .forEach(function (event) {
                    // @ts-ignore
                    ev.on(event, options.on[event]);
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
exports.default = zhRegExp;
