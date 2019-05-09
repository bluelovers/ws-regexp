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
const RegexpHelper = require("regexp-helper");
const PackageJson = require("./package.json");
const zhTable = require("cjk-conv/lib/zh/table/index");
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
            const zhTableFn = options.zhTable || (options.greedyTable ? conv_1.zhTableAutoGreedyTable : zhTable.auto);
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
                    ast.raw = conv_1._word_zh_core(ast.raw, options.skip, zhTableFn, options);
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
                            ret = conv_1._word_zh_core2(ret, options.skip, zhTableFn, options);
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
    zhRegExp.isRegExp = RegexpHelper.isRegExp;
})(zhRegExp = exports.zhRegExp || (exports.zhRegExp = {}));
exports.parseRegularExpressionString = zhRegExp.parseRegularExpressionString;
exports.isRegExp = zhRegExp.isRegExp;
exports.create = zhRegExp.create.bind(zhRegExp);
exports.version = PackageJson.version;
exports.default = zhRegExp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgscUNBQW1GO0FBQ25GLDZEQUErRztBQUMvRyxpRUFBeUU7QUFDekUsbURBQXNDO0FBQ3RDLCtDQUF1QztBQUN2Qyw4Q0FBK0M7QUFFL0MsOENBQStDO0FBQy9DLHVEQUF3RDtBQStCM0MsUUFBQSxjQUFjLEdBQWEsRUFBRSxDQUFDO0FBRTNDLE1BQWEsUUFBUyxTQUFRLE1BQU07SUFnRG5DLFlBQVksR0FBRyxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsVUFBNkIsRUFBRSxFQUFFLEdBQUcsSUFBSTtRQUV0RSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxFQUM5QztZQUNDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQWEsQ0FBQztZQUMvQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7U0FDOUI7UUFFRCxJQUFJLE9BQU8sT0FBTyxJQUFJLFFBQVEsRUFDOUI7WUFDQyxPQUFPLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLE9BQU87YUFDYixDQUFDO1NBQ0Y7UUFFRCxJQUFJLE9BQU8sT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLEVBQ3BDO1lBQ0MsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7U0FDdEI7UUFFRCxJQUFJLFFBQVEsR0FBRyxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUM7UUFFeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUN6RTtZQUNDLElBQUksRUFBc0IsQ0FBQztZQUUzQixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxD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LEVBSGdCLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBR3hCO0FBRWEsUUFBQSw0QkFBNEIsR0FBRyxRQUFRLENBQUMsNEJBQTRCLENBQUM7QUFDckUsUUFBQSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztBQUM5QixRQUFBLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQTJCLENBQUM7QUFRbEUsUUFBQSxPQUFPLEdBQVcsV0FBVyxDQUFDLE9BQU8sQ0FBQztBQUVuRCxrQkFBZSxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE4LzEvMzEvMDMxLlxuICovXG5cbmltcG9ydCB7IF93b3JkX3poX2NvcmUsIF93b3JkX3poX2NvcmUyLCB6aFRhYmxlQXV0b0dyZWVkeVRhYmxlIH0gZnJvbSAnLi9saWIvY29udic7XG5pbXBvcnQgUGFyc2VyRXZlbnRFbWl0dGVyLCB7IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LCBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXIgfSBmcm9tICdyZWdleHAtcGFyc2VyLWV2ZW50JztcbmltcG9ydCB7IElBc3RUb1N0cmluZ09wdGlvbnMsIHBhcnNlUmVnRXhwIH0gZnJvbSAncmVnZXhwLXBhcnNlci1saXRlcmFsJztcbmltcG9ydCBfc3VwcG9ydCBmcm9tICdyZWdleHAtc3VwcG9ydCc7XG5pbXBvcnQgcmVnZXhwUmFuZ2UgZnJvbSAncmVnZXhwLXJhbmdlJztcbmltcG9ydCBSZWdleHBIZWxwZXIgPSByZXF1aXJlKCdyZWdleHAtaGVscGVyJyk7XG5pbXBvcnQgQ2prQ29udiBmcm9tICdjamstY29udic7XG5pbXBvcnQgUGFja2FnZUpzb24gPSByZXF1aXJlKCcuL3BhY2thZ2UuanNvbicpO1xuaW1wb3J0IHpoVGFibGUgPSByZXF1aXJlKCdjamstY29udi9saWIvemgvdGFibGUvaW5kZXgnKTtcblxuZXhwb3J0IHR5cGUgSU9wdGlvbnMgPSB7XG5cdHNraXA/OiBzdHJpbmcsXG5cdGRpc2FibGVaaD86IGJvb2xlYW4sXG5cdC8qKlxuXHQgKiBkaXNhYmxlTG9jYWxSYW5nZSBvbmx5IHdvcmsgd2hlbiBkaXNhYmxlWmggaXMgdHJ1ZVxuXHQgKi9cblx0ZGlzYWJsZUxvY2FsUmFuZ2U/OiBib29sZWFuLFxuXHRhbGxvd0xvY2FsUmFuZ2VBdXRvWmg/OiBib29sZWFuLFxuXHRmbGFncz86IHN0cmluZyxcblxuXHQvKipcblx0ICogYWxsb3cgc3RyIGlzIC9hL2dcblx0ICovXG5cdHBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmc/OiBib29sZWFuLFxuXG5cdG9uPzoge1xuXHRcdFtrIGluIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50XT86IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxhbnksIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50Pjtcblx0fSxcblxuXHRncmVlZHlUYWJsZT86IGJvb2xlYW4gfCBudW1iZXIsXG5cdHVuc2FmZT86IGJvb2xlYW4sXG5cblx0LyoqXG5cdCAqIGFsbG93IHNldCBgQ2prQ29udi56aFRhYmxlLmF1dG9gXG5cdCAqL1xuXHR6aFRhYmxlPzogKGNoYXI6IHN0cmluZykgPT4gc3RyaW5nW11cblxufSAmIElBc3RUb1N0cmluZ09wdGlvbnM7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0T3B0aW9uczogSU9wdGlvbnMgPSB7fTtcblxuZXhwb3J0IGNsYXNzIHpoUmVnRXhwIGV4dGVuZHMgUmVnRXhwXG57XG5cdHB1YmxpYyBzb3VyY2U6IHN0cmluZztcblx0cHVibGljIGZsYWdzOiBzdHJpbmc7XG5cblx0cHVibGljIGRvdEFsbDogYm9vbGVhbjtcblxuXHRwdWJsaWMgaWdub3JlQ2FzZTogYm9vbGVhbjtcblx0cHVibGljIGdsb2JhbDogYm9vbGVhbjtcblx0cHVibGljIG11bHRpbGluZTogYm9vbGVhbjtcblx0cHVibGljIHN0aWNreTogYm9vbGVhbjtcblx0cHVibGljIHVuaWNvZGU6IGJvb2xlYW47XG5cblx0cHVibGljIGxhc3RJbmRleDogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgbm9uLXN0YW5kYXJkIGxlZnRDb250ZXh0IHByb3BlcnR5IGlzIGEgc3RhdGljIGFuZCByZWFkLW9ubHkgcHJvcGVydHkgb2YgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGNvbnRhaW5zIHRoZSBzdWJzdHJpbmcgcHJlY2VkaW5nIHRoZSBtb3N0IHJlY2VudCBtYXRjaC4gUmVnRXhwLiRgIGlzIGFuIGFsaWFzIGZvciB0aGlzIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAYWxpYXMgJGBcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbGVmdENvbnRleHQ6IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBub24tc3RhbmRhcmQgcmlnaHRDb250ZXh0IHByb3BlcnR5IGlzIGEgc3RhdGljIGFuZCByZWFkLW9ubHkgcHJvcGVydHkgb2YgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGNvbnRhaW5zIHRoZSBzdWJzdHJpbmcgZm9sbG93aW5nIHRoZSBtb3N0IHJlY2VudCBtYXRjaC4gUmVnRXhwLiQnIGlzIGFuIGFsaWFzIGZvciB0aGlzIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAYWxpYXMgJCdcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgcmlnaHRDb250ZXh0OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgbm9uLXN0YW5kYXJkIGxhc3RQYXJlbiBwcm9wZXJ0eSBpcyBhIHN0YXRpYyBhbmQgcmVhZC1vbmx5IHByb3BlcnR5IG9mIHJlZ3VsYXIgZXhwcmVzc2lvbnMgdGhhdCBjb250YWlucyB0aGUgbGFzdCBwYXJlbnRoZXNpemVkIHN1YnN0cmluZyBtYXRjaCwgaWYgYW55LiBSZWdFeHAuJCsgaXMgYW4gYWxpYXMgZm9yIHRoaXMgcHJvcGVydHkuXG5cdCAqXG5cdCAqIEBhbGlhcyAkK1xuXHQgKi9cblx0cHVibGljIHN0YXRpYyByZWFkb25seSBsYXN0UGFyZW46IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBub24tc3RhbmRhcmQgbGFzdE1hdGNoIHByb3BlcnR5IGlzIGEgc3RhdGljIGFuZCByZWFkLW9ubHkgcHJvcGVydHkgb2YgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGNvbnRhaW5zIHRoZSBsYXN0IG1hdGNoZWQgY2hhcmFjdGVycy4gUmVnRXhwLiQmIGlzIGFuIGFsaWFzIGZvciB0aGlzIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAYWxpYXMgJCZcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbGFzdE1hdGNoOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgbm9uLXN0YW5kYXJkIGlucHV0IHByb3BlcnR5IGlzIGEgc3RhdGljIHByb3BlcnR5IG9mIHJlZ3VsYXIgZXhwcmVzc2lvbnMgdGhhdCBjb250YWlucyB0aGUgc3RyaW5nIGFnYWluc3Qgd2hpY2ggYSByZWd1bGFyIGV4cHJlc3Npb24gaXMgbWF0Y2hlZC4gUmVnRXhwLiRfIGlzIGFuIGFsaWFzIGZvciB0aGlzIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAYWxpYXMgJF9cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaW5wdXQ6IHN0cmluZztcblxuXHRjb25zdHJ1Y3RvcihzdHI6IHN0cmluZyB8IFJlZ0V4cCwgZmxhZ3M/OiBzdHJpbmcsIG9wdGlvbnM/OiBJT3B0aW9ucyB8IHN0cmluZywgLi4uYXJndilcblx0Y29uc3RydWN0b3Ioc3RyOiBzdHJpbmcgfCBSZWdFeHAsIG9wdGlvbnM/OiBJT3B0aW9ucywgLi4uYXJndilcblx0Y29uc3RydWN0b3Ioc3RyLCBmbGFncyA9IG51bGwsIG9wdGlvbnM6IElPcHRpb25zIHwgc3RyaW5nID0ge30sIC4uLmFyZ3YpXG5cdHtcblx0XHRpZiAoZmxhZ3MgIT09IG51bGwgJiYgdHlwZW9mIGZsYWdzID09ICdvYmplY3QnKVxuXHRcdHtcblx0XHRcdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBmbGFncykgYXMgSU9wdGlvbnM7XG5cdFx0XHRmbGFncyA9IG9wdGlvbnMuZmxhZ3MgfHwgbnVsbDtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ3N0cmluZycpXG5cdFx0e1xuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0c2tpcDogb3B0aW9ucyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLmZsYWdzID09ICdzdHJpbmcnKVxuXHRcdHtcblx0XHRcdGZsYWdzID0gb3B0aW9ucy5mbGFncztcblx0XHR9XG5cblx0XHRsZXQgaGFzRmxhZ3MgPSB0eXBlb2YgZmxhZ3MgPT0gJ3N0cmluZyc7XG5cblx0XHRpZiAoMSAmJiAoIW9wdGlvbnMuZGlzYWJsZVpoIHx8ICFvcHRpb25zLmRpc2FibGVMb2NhbFJhbmdlIHx8IG9wdGlvbnMub24pKVxuXHRcdHtcblx0XHRcdGxldCBldjogUGFyc2VyRXZlbnRFbWl0dGVyO1xuXG5cdFx0XHRjb25zdCB6aFRhYmxlRm4gPSBvcHRpb25zLnpoVGFibGUgfHwgKG9wdGlvbnMuZ3JlZWR5VGFibGUgPyB6aFRhYmxlQXV0b0dyZWVkeVRhYmxlIDogemhUYWJsZS5hdXRvKTtcblxuXHRcdFx0aWYgKHN0ciBpbnN0YW5jZW9mIFJlZ0V4cClcblx0XHRcdHtcblx0XHRcdFx0bGV0IGFzdCA9IHBhcnNlUmVnRXhwKHN0ci50b1N0cmluZygpKTtcblx0XHRcdFx0ZXYgPSBuZXcgUGFyc2VyRXZlbnRFbWl0dGVyKGFzdCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChvcHRpb25zLnBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcgJiYgdHlwZW9mIHN0ciA9PSAnc3RyaW5nJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxldCBtID0gemhSZWdFeHAucGFyc2VSZWd1bGFyRXhwcmVzc2lvblN0cmluZyhzdHIpO1xuXHRcdFx0XHRcdGlmIChtKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHN0ciA9IG0uc291cmNlO1xuXHRcdFx0XHRcdFx0ZmxhZ3MgPSBoYXNGbGFncyA/IGZsYWdzIDogbS5mbGFncztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRldiA9IFBhcnNlckV2ZW50RW1pdHRlci5jcmVhdGUoc3RyLCBmbGFncyB8fCAnJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghb3B0aW9ucy5kaXNhYmxlWmgpXG5cdFx0XHR7XG5cdFx0XHRcdGV2Lm9uKFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmRlZmF1bHQsIGZ1bmN0aW9uIChhc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhc3Qub2xkX3JhdyA9IGFzdC5vbGRfcmF3IHx8IGFzdC5yYXc7XG5cdFx0XHRcdFx0YXN0LnJhdyA9IF93b3JkX3poX2NvcmUoYXN0LnJhdywgKG9wdGlvbnMgYXMgSU9wdGlvbnMpLnNraXAsIHpoVGFibGVGbiwgb3B0aW9ucyBhcyBJT3B0aW9ucyk7XG5cblx0XHRcdFx0XHRldi5lbWl0KFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNoYW5nZSwgYXN0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghb3B0aW9ucy5kaXNhYmxlTG9jYWxSYW5nZSlcblx0XHRcdHtcblx0XHRcdFx0ZXYub24oUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3NfcmFuZ2UsIGZ1bmN0aW9uIChhc3QsIC4uLmFyZ3YpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgcyA9IGFzdC5taW4ucmF3O1xuXHRcdFx0XHRcdGxldCBlID0gYXN0Lm1heC5yYXc7XG5cblx0XHRcdFx0XHRsZXQgcmV0ID0gcmVnZXhwUmFuZ2UocywgZSwge1xuXHRcdFx0XHRcdFx0Y3JlYXRlUmVnRXhwU3RyaW5nOiB0cnVlLFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGlmIChyZXQpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKChvcHRpb25zIGFzIElPcHRpb25zKS5hbGxvd0xvY2FsUmFuZ2VBdXRvWmgpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHJldCA9IF93b3JkX3poX2NvcmUyKHJldCwgKG9wdGlvbnMgYXMgSU9wdGlvbnMpLnNraXAsIHpoVGFibGVGbiwgb3B0aW9ucyBhcyBJT3B0aW9ucyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGFzdC5vbGRfcmF3ID0gYXN0Lm9sZF9yYXcgfHwgYXN0LnJhdztcblx0XHRcdFx0XHRcdGFzdC5yYXcgPSByZXQ7XG5cblx0XHRcdFx0XHRcdGV2LmVtaXQoUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2hhbmdlLCBhc3QpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0Zm9yIChsZXQgciBvZiBsb2NhbF9yYW5nZSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRsZXQgaSA9IHIuaW5kZXhPZihzKTtcblx0XHRcdFx0XHRcdGxldCBqID0gci5pbmRleE9mKGUsIGkpO1xuXG5cdFx0XHRcdFx0XHRpZiAoaSAhPT0gLTEgJiYgaiAhPT0gLTEpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGFzdC5vbGRfcmF3ID0gYXN0Lm9sZF9yYXcgfHwgYXN0LnJhdztcblx0XHRcdFx0XHRcdFx0YXN0LnJhdyA9IHIuc2xpY2UoaSwgaiArIDEpLmpvaW4oJycpO1xuXG5cdFx0XHRcdFx0XHRcdGV2LmVtaXQoUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2hhbmdlLCBhc3QpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ki9cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcHRpb25zLm9uKVxuXHRcdFx0e1xuXHRcdFx0XHRPYmplY3Rcblx0XHRcdFx0XHQua2V5cyhvcHRpb25zLm9uKVxuXHRcdFx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChldmVudClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0XHRldi5vbihldmVudCwgKG9wdGlvbnMgYXMgSU9wdGlvbnMpLm9uW2V2ZW50XSlcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHQ7XG5cdFx0XHR9XG5cblx0XHRcdGV2LnJlc3VtZSgpO1xuXG5cdFx0XHQvL29wdGlvbnMuc29ydENsYXNzID0gdHJ1ZTtcblxuXHRcdFx0c3RyID0gZXYuZ2V0U291cmNlKCEhb3B0aW9ucy5kZWJ1Z0NoYW5nZWRcblx0XHRcdFx0fHwgIW9wdGlvbnMubm9VbmlxdWVDbGFzc1xuXHRcdFx0XHR8fCBvcHRpb25zLnNvcnRDbGFzc1xuXHRcdFx0XHQsIG9wdGlvbnMpO1xuXHRcdFx0ZmxhZ3MgPSBoYXNGbGFncyA/IGZsYWdzIDogZXYuZmxhZ3M7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRpZiAob3B0aW9ucy5wYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nICYmIHR5cGVvZiBzdHIgPT0gJ3N0cmluZycpXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBtID0gemhSZWdFeHAucGFyc2VSZWd1bGFyRXhwcmVzc2lvblN0cmluZyhzdHIpO1xuXHRcdFx0XHRpZiAobSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHN0ciA9IG5ldyBSZWdFeHAobS5zb3VyY2UsIG0uZmxhZ3MpO1xuXHRcdFx0XHRcdGZsYWdzID0gaGFzRmxhZ3MgPyBmbGFncyA6IHN0ci5mbGFncztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoc3RyIGluc3RhbmNlb2YgUmVnRXhwKVxuXHRcdFx0e1xuXHRcdFx0XHRzdHIgPSBzdHIuc291cmNlO1xuXHRcdFx0XHRmbGFncyA9IGhhc0ZsYWdzID8gZmxhZ3MgOiBzdHIuZmxhZ3M7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c3VwZXIoc3RyLCBmbGFncyB8fCAnJyk7XG5cblx0XHQvKlxuXHRcdGlmIChvcHRpb25zLnBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcgJiYgdHlwZW9mIHN0ciA9PSAnc3RyaW5nJylcblx0XHR7XG5cdFx0XHRsZXQgbSA9IHpoUmVnRXhwLnBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcoc3RyKTtcblx0XHRcdGlmIChtKVxuXHRcdFx0e1xuXHRcdFx0XHRzdHIgPSBuZXcgUmVnRXhwKG0uc291cmNlLCBtLmZsYWdzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsZXQgaGFzRmxhZ3MgPSB0eXBlb2YgZmxhZ3MgPT0gJ3N0cmluZyc7XG5cblx0XHRsZXQgcnMsIGY7XG5cblx0XHRpZiAoIW9wdGlvbnMuZGlzYWJsZVpoKVxuXHRcdHtcblx0XHRcdFtycywgZl0gPSBsaWIuX3dvcmRfemgoc3RyLCBudWxsLCBmbGFncyB8fCBzdHIuZmxhZ3MpO1xuXHRcdH1cblx0XHRlbHNlIGlmICghb3B0aW9ucy5kaXNhYmxlTG9jYWxSYW5nZSlcblx0XHR7XG5cdFx0XHRycyA9IGxpYi5yZXBsYWNlX2xpdGVyYWwoc3RyLCBmdW5jdGlvbiAodGV4dDogc3RyaW5nKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gdGV4dDtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGxldCBib29sID0gKHJzIGluc3RhbmNlb2YgUmVnRXhwKTtcblxuXHRcdGlmIChoYXNGbGFncylcblx0XHR7XG5cdFx0XHRmID0gZmxhZ3M7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRmID0gZiB8fCBmbGFncyB8fCBycy5mbGFncyB8fCAnJztcblx0XHR9XG5cblx0XHRpZiAoIWJvb2wpXG5cdFx0e1xuXHRcdFx0c3VwZXIocnMsIGYpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0c3VwZXIocnMuc291cmNlLCBmKTtcblx0XHR9XG5cdFx0Ki9cblx0fVxuXG5cdHN0YXRpYyBjcmVhdGU8VCA9IHpoUmVnRXhwPihzdHI6IHN0cmluZyB8IFJlZ0V4cCwgZmxhZ3M/OiBzdHJpbmcsIG9wdGlvbnM/OiBJT3B0aW9ucyB8IHN0cmluZyk6IFRcblx0c3RhdGljIGNyZWF0ZTxUID0gemhSZWdFeHA+KHN0cjogc3RyaW5nIHwgUmVnRXhwLCBvcHRpb25zPzogSU9wdGlvbnMpOiBUXG5cdHN0YXRpYyBjcmVhdGU8VCA9IHpoUmVnRXhwPihzdHIsIGZsYWdzID0gbnVsbCwgc2tpcD8sIC4uLmFyZ3YpXG5cdHtcblx0XHRyZXR1cm4gbmV3IHRoaXMoc3RyLCBmbGFncywgc2tpcCwgLi4uYXJndik7XG5cdH1cblxuXHRnZXRTdGF0aWM8VCA9IHR5cGVvZiB6aFJlZ0V4cD4oKTogVFxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAdG9kb1xuXHQgKi9cblx0dG9SZWd1bGFyRXhwcmVzc2lvblN0cmluZygpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50b1N0cmluZygpO1xuXHRcdC8vcmV0dXJuIGAvJHt0aGlzLnNvdXJjZX0vJHt0aGlzLmZsYWdzfWA7XG5cdH1cblxuXHRzdGF0aWMgcGFyc2VSZWd1bGFyRXhwcmVzc2lvblN0cmluZyhzdHI6IHN0cmluZylcblx0e1xuXHRcdGxldCBtID0gL14oW1xcLyMkJV0pKC4rPylcXDEoW2Etel0qKSQvLmV4ZWMoc3RyKTtcblx0XHRpZiAobSlcblx0XHR7XG5cdFx0XHRsZXQgW3MsIGQsIHIsIGZdID0gbTtcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0c291cmNlOiB0eXBlb2YgciAhPT0gJ3VuZGVmaW5lZCcgPyByIDogJycsXG5cdFx0XHRcdGZsYWdzOiB0eXBlb2YgZiAhPT0gJ3VuZGVmaW5lZCcgPyBmIDogJycsXG5cdFx0XHRcdHNsYXNoOiBzLFxuXHRcdFx0XHRpbnB1dDogc3RyLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHN0YXRpYyBnZXQgc3VwcG9ydCgpOiB0eXBlb2YgX3N1cHBvcnRcblx0e1xuXHRcdHJldHVybiBfc3VwcG9ydDtcblx0fVxuXG5cdHN0YXRpYyBnZXQgdmVyc2lvbigpOiBzdHJpbmdcblx0e1xuXHRcdHJldHVybiBQYWNrYWdlSnNvbi52ZXJzaW9uXG5cdH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSB6aFJlZ0V4cFxue1xuXHRleHBvcnQgaW1wb3J0IGlzUmVnRXhwID0gUmVnZXhwSGVscGVyLmlzUmVnRXhwO1xufVxuXG5leHBvcnQgaW1wb3J0IHBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcgPSB6aFJlZ0V4cC5wYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nO1xuZXhwb3J0IGltcG9ydCBpc1JlZ0V4cCA9IHpoUmVnRXhwLmlzUmVnRXhwO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IHpoUmVnRXhwLmNyZWF0ZS5iaW5kKHpoUmVnRXhwKSBhcyB0eXBlb2YgemhSZWdFeHAuY3JlYXRlO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBcGk8VCA9IHpoUmVnRXhwPlxue1xuXHQoc3RyOiBzdHJpbmcgfCBSZWdFeHAsIGZsYWdzPzogc3RyaW5nLCBvcHRpb25zPzogSU9wdGlvbnMgfCBzdHJpbmcpOiBULFxuXHQoc3RyOiBzdHJpbmcgfCBSZWdFeHAsIG9wdGlvbnM/OiBJT3B0aW9ucyk6IFQsXG59XG5cbmV4cG9ydCBjb25zdCB2ZXJzaW9uOiBzdHJpbmcgPSBQYWNrYWdlSnNvbi52ZXJzaW9uO1xuXG5leHBvcnQgZGVmYXVsdCB6aFJlZ0V4cDtcbiJdfQ==