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
const PackageJson = require("./package.json");
const index_1 = require("cjk-conv/lib/zh/table/index");
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
            const zhTableFn = options.zhTable || (options.greedyTable ? conv_1.zhTableAutoGreedyTable : index_1.default.auto);
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
                    ast.raw = conv_1._word_zh_core(ast.raw, options.skip, zhTableFn);
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
                            ret = conv_1._word_zh_core2(ret, options.skip, zhTableFn);
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
    static get version() {
        return PackageJson.version;
    }
}
exports.zhRegExp = zhRegExp;
(function (zhRegExp) {
    zhRegExp.isRegExp = regexp_helper_1.default.isRegExp;
})(zhRegExp = exports.zhRegExp || (exports.zhRegExp = {}));
exports.parseRegularExpressionString = zhRegExp.parseRegularExpressionString;
exports.isRegExp = zhRegExp.isRegExp;
exports.create = zhRegExp.create.bind(zhRegExp);
exports.version = PackageJson.version;
exports.default = zhRegExp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgscUNBQW1GO0FBQ25GLDZEQUErRztBQUMvRyxpRUFBeUU7QUFDekUsbURBQXNDO0FBQ3RDLCtDQUF1QztBQUN2QyxpREFBb0U7QUFFcEUsOENBQStDO0FBQy9DLHVEQUFrRDtBQThCckMsUUFBQSxjQUFjLEdBQWEsRUFBRSxDQUFDO0FBRTNDLE1BQWEsUUFBUyxTQUFRLE1BQU07SUFnRG5DLFlBQVksR0FBRyxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsVUFBNkIsRUFBRSxFQUFFLEdBQUcsSUFBSTtRQUV0RSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxFQUM5QztZQUNDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQWEsQ0FBQztZQUMvQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7U0FDOUI7UUFFRCxJQUFJLE9BQU8sT0FBTyxJQUFJLFFBQVEsRUFDOUI7WUFDQyxPQUFPLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLE9BQU87YUFDYixDQUFDO1NBQ0Y7UUFFRCxJQUFJLE9BQU8sT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLEVBQ3BDO1lBQ0MsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7U0FDdEI7UUFFRCxJQUFJLFFBQVEsR0FBRyxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUM7UUFFeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUN6RTtZQUNDLElBQUksRUFBc0IsQ0FBQztZQUUzQixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxD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USxLQUFSLGdCQUFRLFFBR3hCO0FBRVksUUFBQSw0QkFBNEIsR0FBRyxRQUFRLENBQUMsNEJBQTRCLENBQUM7QUFDckUsUUFBQSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztBQUM3QixRQUFBLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQTJCLENBQUM7QUFRbEUsUUFBQSxPQUFPLEdBQVcsV0FBVyxDQUFDLE9BQU8sQ0FBQztBQUVuRCxrQkFBZSxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE4LzEvMzEvMDMxLlxuICovXG5cbmltcG9ydCB7IF93b3JkX3poX2NvcmUsIF93b3JkX3poX2NvcmUyLCB6aFRhYmxlQXV0b0dyZWVkeVRhYmxlIH0gZnJvbSAnLi9saWIvY29udic7XG5pbXBvcnQgUGFyc2VyRXZlbnRFbWl0dGVyLCB7IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LCBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXIgfSBmcm9tICdyZWdleHAtcGFyc2VyLWV2ZW50JztcbmltcG9ydCB7IElBc3RUb1N0cmluZ09wdGlvbnMsIHBhcnNlUmVnRXhwIH0gZnJvbSAncmVnZXhwLXBhcnNlci1saXRlcmFsJztcbmltcG9ydCBfc3VwcG9ydCBmcm9tICdyZWdleHAtc3VwcG9ydCc7XG5pbXBvcnQgcmVnZXhwUmFuZ2UgZnJvbSAncmVnZXhwLXJhbmdlJztcbmltcG9ydCBSZWdleHBIZWxwZXIsIHsgaXNSZWdFeHAgYXMgX2lzUmVnRXhwIH0gZnJvbSAncmVnZXhwLWhlbHBlcic7XG5pbXBvcnQgQ2prQ29udiBmcm9tICdjamstY29udic7XG5pbXBvcnQgUGFja2FnZUpzb24gPSByZXF1aXJlKCcuL3BhY2thZ2UuanNvbicpO1xuaW1wb3J0IHpoVGFibGUgZnJvbSAnY2prLWNvbnYvbGliL3poL3RhYmxlL2luZGV4JztcblxuZXhwb3J0IHR5cGUgSU9wdGlvbnMgPSB7XG5cdHNraXA/OiBzdHJpbmcsXG5cdGRpc2FibGVaaD86IGJvb2xlYW4sXG5cdC8qKlxuXHQgKiBkaXNhYmxlTG9jYWxSYW5nZSBvbmx5IHdvcmsgd2hlbiBkaXNhYmxlWmggaXMgdHJ1ZVxuXHQgKi9cblx0ZGlzYWJsZUxvY2FsUmFuZ2U/OiBib29sZWFuLFxuXHRhbGxvd0xvY2FsUmFuZ2VBdXRvWmg/OiBib29sZWFuLFxuXHRmbGFncz86IHN0cmluZyxcblxuXHQvKipcblx0ICogYWxsb3cgc3RyIGlzIC9hL2dcblx0ICovXG5cdHBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmc/OiBib29sZWFuLFxuXG5cdG9uPzoge1xuXHRcdFtrIGluIGtleW9mIHR5cGVvZiBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudF0/OiBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXI8YW55Pjtcblx0fSxcblxuXHRncmVlZHlUYWJsZT86IGJvb2xlYW4sXG5cblx0LyoqXG5cdCAqIGFsbG93IHNldCBgQ2prQ29udi56aFRhYmxlLmF1dG9gXG5cdCAqL1xuXHR6aFRhYmxlPzogKGNoYXI6IHN0cmluZykgPT4gc3RyaW5nW11cblxufSAmIElBc3RUb1N0cmluZ09wdGlvbnM7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMgPSB7fTtcblxuZXhwb3J0IGNsYXNzIHpoUmVnRXhwIGV4dGVuZHMgUmVnRXhwXG57XG5cdHB1YmxpYyBzb3VyY2U6IHN0cmluZztcblx0cHVibGljIGZsYWdzOiBzdHJpbmc7XG5cblx0cHVibGljIGRvdEFsbDogYm9vbGVhbjtcblxuXHRwdWJsaWMgaWdub3JlQ2FzZTogYm9vbGVhbjtcblx0cHVibGljIGdsb2JhbDogYm9vbGVhbjtcblx0cHVibGljIG11bHRpbGluZTogYm9vbGVhbjtcblx0cHVibGljIHN0aWNreTogYm9vbGVhbjtcblx0cHVibGljIHVuaWNvZGU6IGJvb2xlYW47XG5cblx0cHVibGljIGxhc3RJbmRleDogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbm9uLXN0YW5kYXJkIGxlZnRDb250ZXh0IHByb3BlcnR5IGlzIGEgc3RhdGljIGFuZCByZWFkLW9ubHkgcHJvcGVydHkgb2YgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGNvbnRhaW5zIHRoZSBzdWJzdHJpbmcgcHJlY2VkaW5nIHRoZSBtb3N0IHJlY2VudCBtYXRjaC4gUmVnRXhwLiRgIGlzIGFuIGFsaWFzIGZvciB0aGlzIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAYWxpYXMgJGBcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbGVmdENvbnRleHQ6IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBub24tc3RhbmRhcmQgcmlnaHRDb250ZXh0IHByb3BlcnR5IGlzIGEgc3RhdGljIGFuZCByZWFkLW9ubHkgcHJvcGVydHkgb2YgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGNvbnRhaW5zIHRoZSBzdWJzdHJpbmcgZm9sbG93aW5nIHRoZSBtb3N0IHJlY2VudCBtYXRjaC4gUmVnRXhwLiQnIGlzIGFuIGFsaWFzIGZvciB0aGlzIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAYWxpYXMgJCdcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgcmlnaHRDb250ZXh0OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgbm9uLXN0YW5kYXJkIGxhc3RQYXJlbiBwcm9wZXJ0eSBpcyBhIHN0YXRpYyBhbmQgcmVhZC1vbmx5IHByb3BlcnR5IG9mIHJlZ3VsYXIgZXhwcmVzc2lvbnMgdGhhdCBjb250YWlucyB0aGUgbGFzdCBwYXJlbnRoZXNpemVkIHN1YnN0cmluZyBtYXRjaCwgaWYgYW55LiBSZWdFeHAuJCsgaXMgYW4gYWxpYXMgZm9yIHRoaXMgcHJvcGVydHkuXG5cdCAqXG5cdCAqIEBhbGlhcyAkK1xuXHQgKi9cblx0cHVibGljIHN0YXRpYyByZWFkb25seSBsYXN0UGFyZW46IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBub24tc3RhbmRhcmQgbGFzdE1hdGNoIHByb3BlcnR5IGlzIGEgc3RhdGljIGFuZCByZWFkLW9ubHkgcHJvcGVydHkgb2YgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGNvbnRhaW5zIHRoZSBsYXN0IG1hdGNoZWQgY2hhcmFjdGVycy4gUmVnRXhwLiQmIGlzIGFuIGFsaWFzIGZvciB0aGlzIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAYWxpYXMgJCZcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbGFzdE1hdGNoOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgbm9uLXN0YW5kYXJkIGlucHV0IHByb3BlcnR5IGlzIGEgc3RhdGljIHByb3BlcnR5IG9mIHJlZ3VsYXIgZXhwcmVzc2lvbnMgdGhhdCBjb250YWlucyB0aGUgc3RyaW5nIGFnYWluc3Qgd2hpY2ggYSByZWd1bGFyIGV4cHJlc3Npb24gaXMgbWF0Y2hlZC4gUmVnRXhwLiRfIGlzIGFuIGFsaWFzIGZvciB0aGlzIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAYWxpYXMgJF9cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaW5wdXQ6IHN0cmluZztcblxuXHRjb25zdHJ1Y3RvcihzdHI6IHN0cmluZyB8IFJlZ0V4cCwgZmxhZ3M/OiBzdHJpbmcsIG9wdGlvbnM/OiBJT3B0aW9ucyB8IHN0cmluZywgLi4uYXJndilcblx0Y29uc3RydWN0b3Ioc3RyOiBzdHJpbmcgfCBSZWdFeHAsIG9wdGlvbnM/OiBJT3B0aW9ucywgLi4uYXJndilcblx0Y29uc3RydWN0b3Ioc3RyLCBmbGFncyA9IG51bGwsIG9wdGlvbnM6IElPcHRpb25zIHwgc3RyaW5nID0ge30sIC4uLmFyZ3YpXG5cdHtcblx0XHRpZiAoZmxhZ3MgIT09IG51bGwgJiYgdHlwZW9mIGZsYWdzID09ICdvYmplY3QnKVxuXHRcdHtcblx0XHRcdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBmbGFncykgYXMgSU9wdGlvbnM7XG5cdFx0XHRmbGFncyA9IG9wdGlvbnMuZmxhZ3MgfHwgbnVsbDtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ3N0cmluZycpXG5cdFx0e1xuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0c2tpcDogb3B0aW9ucyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLmZsYWdzID09ICdzdHJpbmcnKVxuXHRcdHtcblx0XHRcdGZsYWdzID0gb3B0aW9ucy5mbGFncztcblx0XHR9XG5cblx0XHRsZXQgaGFzRmxhZ3MgPSB0eXBlb2YgZmxhZ3MgPT0gJ3N0cmluZyc7XG5cblx0XHRpZiAoMSAmJiAoIW9wdGlvbnMuZGlzYWJsZVpoIHx8ICFvcHRpb25zLmRpc2FibGVMb2NhbFJhbmdlIHx8IG9wdGlvbnMub24pKVxuXHRcdHtcblx0XHRcdGxldCBldjogUGFyc2VyRXZlbnRFbWl0dGVyO1xuXG5cdFx0XHRjb25zdCB6aFRhYmxlRm4gPSBvcHRpb25zLnpoVGFibGUgfHwgKG9wdGlvbnMuZ3JlZWR5VGFibGUgPyB6aFRhYmxlQXV0b0dyZWVkeVRhYmxlIDogemhUYWJsZS5hdXRvKTtcblxuXHRcdFx0aWYgKHN0ciBpbnN0YW5jZW9mIFJlZ0V4cClcblx0XHRcdHtcblx0XHRcdFx0bGV0IGFzdCA9IHBhcnNlUmVnRXhwKHN0ci50b1N0cmluZygpKTtcblx0XHRcdFx0ZXYgPSBuZXcgUGFyc2VyRXZlbnRFbWl0dGVyKGFzdCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChvcHRpb25zLnBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcgJiYgdHlwZW9mIHN0ciA9PSAnc3RyaW5nJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxldCBtID0gemhSZWdFeHAucGFyc2VSZWd1bGFyRXhwcmVzc2lvblN0cmluZyhzdHIpO1xuXHRcdFx0XHRcdGlmIChtKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHN0ciA9IG0uc291cmNlO1xuXHRcdFx0XHRcdFx0ZmxhZ3MgPSBoYXNGbGFncyA/IGZsYWdzIDogbS5mbGFncztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRldiA9IFBhcnNlckV2ZW50RW1pdHRlci5jcmVhdGUoc3RyLCBmbGFncyB8fCAnJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghb3B0aW9ucy5kaXNhYmxlWmgpXG5cdFx0XHR7XG5cdFx0XHRcdGV2Lm9uKFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmRlZmF1bHQsIGZ1bmN0aW9uIChhc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhc3Qub2xkX3JhdyA9IGFzdC5vbGRfcmF3IHx8IGFzdC5yYXc7XG5cdFx0XHRcdFx0YXN0LnJhdyA9IF93b3JkX3poX2NvcmUoYXN0LnJhdywgKG9wdGlvbnMgYXMgSU9wdGlvbnMpLnNraXAsIHpoVGFibGVGbik7XG5cdFx0XHRcdFx0ZXYuZW1pdChQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jaGFuZ2UsIGFzdCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIW9wdGlvbnMuZGlzYWJsZUxvY2FsUmFuZ2UpXG5cdFx0XHR7XG5cdFx0XHRcdGV2Lm9uKFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzX3JhbmdlLCBmdW5jdGlvbiAoYXN0LCAuLi5hcmd2KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGV0IHMgPSBhc3QubWluLnJhdztcblx0XHRcdFx0XHRsZXQgZSA9IGFzdC5tYXgucmF3O1xuXG5cdFx0XHRcdFx0bGV0IHJldCA9IHJlZ2V4cFJhbmdlKHMsIGUsIHtcblx0XHRcdFx0XHRcdGNyZWF0ZVJlZ0V4cFN0cmluZzogdHJ1ZSxcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRpZiAocmV0KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICgob3B0aW9ucyBhcyBJT3B0aW9ucykuYWxsb3dMb2NhbFJhbmdlQXV0b1poKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRyZXQgPSBfd29yZF96aF9jb3JlMihyZXQsIChvcHRpb25zIGFzIElPcHRpb25zKS5za2lwLCB6aFRhYmxlRm4pO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRhc3Qub2xkX3JhdyA9IGFzdC5vbGRfcmF3IHx8IGFzdC5yYXc7XG5cdFx0XHRcdFx0XHRhc3QucmF3ID0gcmV0O1xuXG5cdFx0XHRcdFx0XHRldi5lbWl0KFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNoYW5nZSwgYXN0KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdGZvciAobGV0IHIgb2YgbG9jYWxfcmFuZ2UpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bGV0IGkgPSByLmluZGV4T2Yocyk7XG5cdFx0XHRcdFx0XHRsZXQgaiA9IHIuaW5kZXhPZihlLCBpKTtcblxuXHRcdFx0XHRcdFx0aWYgKGkgIT09IC0xICYmIGogIT09IC0xKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRhc3Qub2xkX3JhdyA9IGFzdC5vbGRfcmF3IHx8IGFzdC5yYXc7XG5cdFx0XHRcdFx0XHRcdGFzdC5yYXcgPSByLnNsaWNlKGksIGogKyAxKS5qb2luKCcnKTtcblxuXHRcdFx0XHRcdFx0XHRldi5lbWl0KFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNoYW5nZSwgYXN0KTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCovXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3B0aW9ucy5vbilcblx0XHRcdHtcblx0XHRcdFx0T2JqZWN0XG5cdFx0XHRcdFx0LmtleXMob3B0aW9ucy5vbilcblx0XHRcdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRcdFx0ZXYub24oZXZlbnQsIChvcHRpb25zIGFzIElPcHRpb25zKS5vbltldmVudF0pXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0O1xuXHRcdFx0fVxuXG5cdFx0XHRldi5yZXN1bWUoKTtcblxuXHRcdFx0Ly9vcHRpb25zLnNvcnRDbGFzcyA9IHRydWU7XG5cblx0XHRcdHN0ciA9IGV2LmdldFNvdXJjZSghIW9wdGlvbnMuZGVidWdDaGFuZ2VkXG5cdFx0XHRcdHx8ICFvcHRpb25zLm5vVW5pcXVlQ2xhc3Ncblx0XHRcdFx0fHwgb3B0aW9ucy5zb3J0Q2xhc3Ncblx0XHRcdFx0LCBvcHRpb25zKTtcblx0XHRcdGZsYWdzID0gaGFzRmxhZ3MgPyBmbGFncyA6IGV2LmZsYWdzO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0aWYgKG9wdGlvbnMucGFyc2VSZWd1bGFyRXhwcmVzc2lvblN0cmluZyAmJiB0eXBlb2Ygc3RyID09ICdzdHJpbmcnKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgbSA9IHpoUmVnRXhwLnBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcoc3RyKTtcblx0XHRcdFx0aWYgKG0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRzdHIgPSBuZXcgUmVnRXhwKG0uc291cmNlLCBtLmZsYWdzKTtcblx0XHRcdFx0XHRmbGFncyA9IGhhc0ZsYWdzID8gZmxhZ3MgOiBzdHIuZmxhZ3M7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKHN0ciBpbnN0YW5jZW9mIFJlZ0V4cClcblx0XHRcdHtcblx0XHRcdFx0c3RyID0gc3RyLnNvdXJjZTtcblx0XHRcdFx0ZmxhZ3MgPSBoYXNGbGFncyA/IGZsYWdzIDogc3RyLmZsYWdzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHN1cGVyKHN0ciwgZmxhZ3MgfHwgJycpO1xuXG5cdFx0Lypcblx0XHRpZiAob3B0aW9ucy5wYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nICYmIHR5cGVvZiBzdHIgPT0gJ3N0cmluZycpXG5cdFx0e1xuXHRcdFx0bGV0IG0gPSB6aFJlZ0V4cC5wYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nKHN0cik7XG5cdFx0XHRpZiAobSlcblx0XHRcdHtcblx0XHRcdFx0c3RyID0gbmV3IFJlZ0V4cChtLnNvdXJjZSwgbS5mbGFncyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bGV0IGhhc0ZsYWdzID0gdHlwZW9mIGZsYWdzID09ICdzdHJpbmcnO1xuXG5cdFx0bGV0IHJzLCBmO1xuXG5cdFx0aWYgKCFvcHRpb25zLmRpc2FibGVaaClcblx0XHR7XG5cdFx0XHRbcnMsIGZdID0gbGliLl93b3JkX3poKHN0ciwgbnVsbCwgZmxhZ3MgfHwgc3RyLmZsYWdzKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIW9wdGlvbnMuZGlzYWJsZUxvY2FsUmFuZ2UpXG5cdFx0e1xuXHRcdFx0cnMgPSBsaWIucmVwbGFjZV9saXRlcmFsKHN0ciwgZnVuY3Rpb24gKHRleHQ6IHN0cmluZylcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIHRleHQ7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRsZXQgYm9vbCA9IChycyBpbnN0YW5jZW9mIFJlZ0V4cCk7XG5cblx0XHRpZiAoaGFzRmxhZ3MpXG5cdFx0e1xuXHRcdFx0ZiA9IGZsYWdzO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0ZiA9IGYgfHwgZmxhZ3MgfHwgcnMuZmxhZ3MgfHwgJyc7XG5cdFx0fVxuXG5cdFx0aWYgKCFib29sKVxuXHRcdHtcblx0XHRcdHN1cGVyKHJzLCBmKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHN1cGVyKHJzLnNvdXJjZSwgZik7XG5cdFx0fVxuXHRcdCovXG5cdH1cblxuXHRzdGF0aWMgY3JlYXRlPFQgPSB6aFJlZ0V4cD4oc3RyOiBzdHJpbmcgfCBSZWdFeHAsIGZsYWdzPzogc3RyaW5nLCBvcHRpb25zPzogSU9wdGlvbnMgfCBzdHJpbmcpOiBUXG5cdHN0YXRpYyBjcmVhdGU8VCA9IHpoUmVnRXhwPihzdHI6IHN0cmluZyB8IFJlZ0V4cCwgb3B0aW9ucz86IElPcHRpb25zKTogVFxuXHRzdGF0aWMgY3JlYXRlPFQgPSB6aFJlZ0V4cD4oc3RyLCBmbGFncyA9IG51bGwsIHNraXA/LCAuLi5hcmd2KVxuXHR7XG5cdFx0cmV0dXJuIG5ldyB0aGlzKHN0ciwgZmxhZ3MsIHNraXAsIC4uLmFyZ3YpO1xuXHR9XG5cblx0Z2V0U3RhdGljPFQgPSB0eXBlb2YgemhSZWdFeHA+KCk6IFRcblx0e1xuXHRcdHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcyk7XG5cdH1cblxuXHQvKipcblx0ICogQHRvZG9cblx0ICovXG5cdHRvUmVndWxhckV4cHJlc3Npb25TdHJpbmcoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcblx0XHQvL3JldHVybiBgLyR7dGhpcy5zb3VyY2V9LyR7dGhpcy5mbGFnc31gO1xuXHR9XG5cblx0c3RhdGljIHBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcoc3RyOiBzdHJpbmcpXG5cdHtcblx0XHRsZXQgbSA9IC9eKFtcXC8jJCVdKSguKz8pXFwxKFthLXpdKikkLy5leGVjKHN0cik7XG5cdFx0aWYgKG0pXG5cdFx0e1xuXHRcdFx0bGV0IFtzLCBkLCByLCBmXSA9IG07XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHNvdXJjZTogdHlwZW9mIHIgIT09ICd1bmRlZmluZWQnID8gciA6ICcnLFxuXHRcdFx0XHRmbGFnczogdHlwZW9mIGYgIT09ICd1bmRlZmluZWQnID8gZiA6ICcnLFxuXHRcdFx0XHRzbGFzaDogcyxcblx0XHRcdFx0aW5wdXQ6IHN0cixcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IHN1cHBvcnQoKTogdHlwZW9mIF9zdXBwb3J0XG5cdHtcblx0XHRyZXR1cm4gX3N1cHBvcnQ7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IHZlcnNpb24oKTogc3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gUGFja2FnZUpzb24udmVyc2lvblxuXHR9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgemhSZWdFeHBcbntcblx0ZXhwb3J0IGltcG9ydCBpc1JlZ0V4cCA9IFJlZ2V4cEhlbHBlci5pc1JlZ0V4cDtcbn1cblxuZXhwb3J0IGNvbnN0IHBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcgPSB6aFJlZ0V4cC5wYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nO1xuZXhwb3J0IGNvbnN0IGlzUmVnRXhwID0gemhSZWdFeHAuaXNSZWdFeHA7XG5leHBvcnQgY29uc3QgY3JlYXRlID0gemhSZWdFeHAuY3JlYXRlLmJpbmQoemhSZWdFeHApIGFzIHR5cGVvZiB6aFJlZ0V4cC5jcmVhdGU7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFwaTxUID0gemhSZWdFeHA+XG57XG5cdChzdHI6IHN0cmluZyB8IFJlZ0V4cCwgZmxhZ3M/OiBzdHJpbmcsIG9wdGlvbnM/OiBJT3B0aW9ucyB8IHN0cmluZyk6IFQsXG5cdChzdHI6IHN0cmluZyB8IFJlZ0V4cCwgb3B0aW9ucz86IElPcHRpb25zKTogVCxcbn1cblxuZXhwb3J0IGNvbnN0IHZlcnNpb246IHN0cmluZyA9IFBhY2thZ2VKc29uLnZlcnNpb247XG5cbmV4cG9ydCBkZWZhdWx0IHpoUmVnRXhwO1xuIl19