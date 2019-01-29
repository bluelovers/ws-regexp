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
    zhRegExp.isRegExp = RegexpHelper.isRegExp;
})(zhRegExp = exports.zhRegExp || (exports.zhRegExp = {}));
exports.parseRegularExpressionString = zhRegExp.parseRegularExpressionString;
exports.isRegExp = zhRegExp.isRegExp;
exports.create = zhRegExp.create.bind(zhRegExp);
exports.version = PackageJson.version;
exports.default = zhRegExp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgscUNBQW1GO0FBQ25GLDZEQUErRztBQUMvRyxpRUFBeUU7QUFDekUsbURBQXNDO0FBQ3RDLCtDQUF1QztBQUN2Qyw4Q0FBK0M7QUFFL0MsOENBQStDO0FBQy9DLHVEQUF3RDtBQThCM0MsUUFBQSxjQUFjLEdBQWEsRUFBRSxDQUFDO0FBRTNDLE1BQWEsUUFBUyxTQUFRLE1BQU07SUFnRG5DLFlBQVksR0FBRyxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsVUFBNkIsRUFBRSxFQUFFLEdBQUcsSUFBSTtRQUV0RSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxFQUM5QztZQUNDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQWEsQ0FBQztZQUMvQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7U0FDOUI7UUFFRCxJQUFJLE9BQU8sT0FBTyxJQUFJLFFBQVEsRUFDOUI7WUFDQyxPQUFPLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLE9BQU87YUFDYixDQUFDO1NBQ0Y7UUFFRCxJQUFJLE9BQU8sT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLEVBQ3BDO1lBQ0MsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7U0FDdEI7UUFFRCxJQUFJLFFBQVEsR0FBRyxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUM7UUFFeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUN6RTtZQUNDLElBQUksRUFBc0IsQ0FBQztZQUUzQixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxD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LEtBQVIsZ0JBQVEsUUFHeEI7QUFFYSxRQUFBLDRCQUE0QixHQUFHLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQztBQUNyRSxRQUFBLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO0FBQzlCLFFBQUEsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBMkIsQ0FBQztBQVFsRSxRQUFBLE9BQU8sR0FBVyxXQUFXLENBQUMsT0FBTyxDQUFDO0FBRW5ELGtCQUFlLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTgvMS8zMS8wMzEuXG4gKi9cblxuaW1wb3J0IHsgX3dvcmRfemhfY29yZSwgX3dvcmRfemhfY29yZTIsIHpoVGFibGVBdXRvR3JlZWR5VGFibGUgfSBmcm9tICcuL2xpYi9jb252JztcbmltcG9ydCBQYXJzZXJFdmVudEVtaXR0ZXIsIHsgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQsIElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lciB9IGZyb20gJ3JlZ2V4cC1wYXJzZXItZXZlbnQnO1xuaW1wb3J0IHsgSUFzdFRvU3RyaW5nT3B0aW9ucywgcGFyc2VSZWdFeHAgfSBmcm9tICdyZWdleHAtcGFyc2VyLWxpdGVyYWwnO1xuaW1wb3J0IF9zdXBwb3J0IGZyb20gJ3JlZ2V4cC1zdXBwb3J0JztcbmltcG9ydCByZWdleHBSYW5nZSBmcm9tICdyZWdleHAtcmFuZ2UnO1xuaW1wb3J0IFJlZ2V4cEhlbHBlciA9IHJlcXVpcmUoJ3JlZ2V4cC1oZWxwZXInKTtcbmltcG9ydCBDamtDb252IGZyb20gJ2Nqay1jb252JztcbmltcG9ydCBQYWNrYWdlSnNvbiA9IHJlcXVpcmUoJy4vcGFja2FnZS5qc29uJyk7XG5pbXBvcnQgemhUYWJsZSA9IHJlcXVpcmUoJ2Nqay1jb252L2xpYi96aC90YWJsZS9pbmRleCcpO1xuXG5leHBvcnQgdHlwZSBJT3B0aW9ucyA9IHtcblx0c2tpcD86IHN0cmluZyxcblx0ZGlzYWJsZVpoPzogYm9vbGVhbixcblx0LyoqXG5cdCAqIGRpc2FibGVMb2NhbFJhbmdlIG9ubHkgd29yayB3aGVuIGRpc2FibGVaaCBpcyB0cnVlXG5cdCAqL1xuXHRkaXNhYmxlTG9jYWxSYW5nZT86IGJvb2xlYW4sXG5cdGFsbG93TG9jYWxSYW5nZUF1dG9aaD86IGJvb2xlYW4sXG5cdGZsYWdzPzogc3RyaW5nLFxuXG5cdC8qKlxuXHQgKiBhbGxvdyBzdHIgaXMgL2EvZ1xuXHQgKi9cblx0cGFyc2VSZWd1bGFyRXhwcmVzc2lvblN0cmluZz86IGJvb2xlYW4sXG5cblx0b24/OiB7XG5cdFx0W2sgaW4ga2V5b2YgdHlwZW9mIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50XT86IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxhbnk+O1xuXHR9LFxuXG5cdGdyZWVkeVRhYmxlPzogYm9vbGVhbixcblxuXHQvKipcblx0ICogYWxsb3cgc2V0IGBDamtDb252LnpoVGFibGUuYXV0b2Bcblx0ICovXG5cdHpoVGFibGU/OiAoY2hhcjogc3RyaW5nKSA9PiBzdHJpbmdbXVxuXG59ICYgSUFzdFRvU3RyaW5nT3B0aW9ucztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyA9IHt9O1xuXG5leHBvcnQgY2xhc3MgemhSZWdFeHAgZXh0ZW5kcyBSZWdFeHBcbntcblx0cHVibGljIHNvdXJjZTogc3RyaW5nO1xuXHRwdWJsaWMgZmxhZ3M6IHN0cmluZztcblxuXHRwdWJsaWMgZG90QWxsOiBib29sZWFuO1xuXG5cdHB1YmxpYyBpZ25vcmVDYXNlOiBib29sZWFuO1xuXHRwdWJsaWMgZ2xvYmFsOiBib29sZWFuO1xuXHRwdWJsaWMgbXVsdGlsaW5lOiBib29sZWFuO1xuXHRwdWJsaWMgc3RpY2t5OiBib29sZWFuO1xuXHRwdWJsaWMgdW5pY29kZTogYm9vbGVhbjtcblxuXHRwdWJsaWMgbGFzdEluZGV4OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBub24tc3RhbmRhcmQgbGVmdENvbnRleHQgcHJvcGVydHkgaXMgYSBzdGF0aWMgYW5kIHJlYWQtb25seSBwcm9wZXJ0eSBvZiByZWd1bGFyIGV4cHJlc3Npb25zIHRoYXQgY29udGFpbnMgdGhlIHN1YnN0cmluZyBwcmVjZWRpbmcgdGhlIG1vc3QgcmVjZW50IG1hdGNoLiBSZWdFeHAuJGAgaXMgYW4gYWxpYXMgZm9yIHRoaXMgcHJvcGVydHkuXG5cdCAqXG5cdCAqIEBhbGlhcyAkYFxuXHQgKi9cblx0cHVibGljIHN0YXRpYyByZWFkb25seSBsZWZ0Q29udGV4dDogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIG5vbi1zdGFuZGFyZCByaWdodENvbnRleHQgcHJvcGVydHkgaXMgYSBzdGF0aWMgYW5kIHJlYWQtb25seSBwcm9wZXJ0eSBvZiByZWd1bGFyIGV4cHJlc3Npb25zIHRoYXQgY29udGFpbnMgdGhlIHN1YnN0cmluZyBmb2xsb3dpbmcgdGhlIG1vc3QgcmVjZW50IG1hdGNoLiBSZWdFeHAuJCcgaXMgYW4gYWxpYXMgZm9yIHRoaXMgcHJvcGVydHkuXG5cdCAqXG5cdCAqIEBhbGlhcyAkJ1xuXHQgKi9cblx0cHVibGljIHN0YXRpYyByZWFkb25seSByaWdodENvbnRleHQ6IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBub24tc3RhbmRhcmQgbGFzdFBhcmVuIHByb3BlcnR5IGlzIGEgc3RhdGljIGFuZCByZWFkLW9ubHkgcHJvcGVydHkgb2YgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGNvbnRhaW5zIHRoZSBsYXN0IHBhcmVudGhlc2l6ZWQgc3Vic3RyaW5nIG1hdGNoLCBpZiBhbnkuIFJlZ0V4cC4kKyBpcyBhbiBhbGlhcyBmb3IgdGhpcyBwcm9wZXJ0eS5cblx0ICpcblx0ICogQGFsaWFzICQrXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGxhc3RQYXJlbjogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIG5vbi1zdGFuZGFyZCBsYXN0TWF0Y2ggcHJvcGVydHkgaXMgYSBzdGF0aWMgYW5kIHJlYWQtb25seSBwcm9wZXJ0eSBvZiByZWd1bGFyIGV4cHJlc3Npb25zIHRoYXQgY29udGFpbnMgdGhlIGxhc3QgbWF0Y2hlZCBjaGFyYWN0ZXJzLiBSZWdFeHAuJCYgaXMgYW4gYWxpYXMgZm9yIHRoaXMgcHJvcGVydHkuXG5cdCAqXG5cdCAqIEBhbGlhcyAkJlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyByZWFkb25seSBsYXN0TWF0Y2g6IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBub24tc3RhbmRhcmQgaW5wdXQgcHJvcGVydHkgaXMgYSBzdGF0aWMgcHJvcGVydHkgb2YgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGNvbnRhaW5zIHRoZSBzdHJpbmcgYWdhaW5zdCB3aGljaCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBtYXRjaGVkLiBSZWdFeHAuJF8gaXMgYW4gYWxpYXMgZm9yIHRoaXMgcHJvcGVydHkuXG5cdCAqXG5cdCAqIEBhbGlhcyAkX1xuXHQgKi9cblx0cHVibGljIHN0YXRpYyByZWFkb25seSBpbnB1dDogc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKHN0cjogc3RyaW5nIHwgUmVnRXhwLCBmbGFncz86IHN0cmluZywgb3B0aW9ucz86IElPcHRpb25zIHwgc3RyaW5nLCAuLi5hcmd2KVxuXHRjb25zdHJ1Y3RvcihzdHI6IHN0cmluZyB8IFJlZ0V4cCwgb3B0aW9ucz86IElPcHRpb25zLCAuLi5hcmd2KVxuXHRjb25zdHJ1Y3RvcihzdHIsIGZsYWdzID0gbnVsbCwgb3B0aW9uczogSU9wdGlvbnMgfCBzdHJpbmcgPSB7fSwgLi4uYXJndilcblx0e1xuXHRcdGlmIChmbGFncyAhPT0gbnVsbCAmJiB0eXBlb2YgZmxhZ3MgPT0gJ29iamVjdCcpXG5cdFx0e1xuXHRcdFx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGZsYWdzKSBhcyBJT3B0aW9ucztcblx0XHRcdGZsYWdzID0gb3B0aW9ucy5mbGFncyB8fCBudWxsO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnc3RyaW5nJylcblx0XHR7XG5cdFx0XHRvcHRpb25zID0ge1xuXHRcdFx0XHRza2lwOiBvcHRpb25zLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIG9wdGlvbnMuZmxhZ3MgPT0gJ3N0cmluZycpXG5cdFx0e1xuXHRcdFx0ZmxhZ3MgPSBvcHRpb25zLmZsYWdzO1xuXHRcdH1cblxuXHRcdGxldCBoYXNGbGFncyA9IHR5cGVvZiBmbGFncyA9PSAnc3RyaW5nJztcblxuXHRcdGlmICgxICYmICghb3B0aW9ucy5kaXNhYmxlWmggfHwgIW9wdGlvbnMuZGlzYWJsZUxvY2FsUmFuZ2UgfHwgb3B0aW9ucy5vbikpXG5cdFx0e1xuXHRcdFx0bGV0IGV2OiBQYXJzZXJFdmVudEVtaXR0ZXI7XG5cblx0XHRcdGNvbnN0IHpoVGFibGVGbiA9IG9wdGlvbnMuemhUYWJsZSB8fCAob3B0aW9ucy5ncmVlZHlUYWJsZSA/IHpoVGFibGVBdXRvR3JlZWR5VGFibGUgOiB6aFRhYmxlLmF1dG8pO1xuXG5cdFx0XHRpZiAoc3RyIGluc3RhbmNlb2YgUmVnRXhwKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgYXN0ID0gcGFyc2VSZWdFeHAoc3RyLnRvU3RyaW5nKCkpO1xuXHRcdFx0XHRldiA9IG5ldyBQYXJzZXJFdmVudEVtaXR0ZXIoYXN0KTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0aWYgKG9wdGlvbnMucGFyc2VSZWd1bGFyRXhwcmVzc2lvblN0cmluZyAmJiB0eXBlb2Ygc3RyID09ICdzdHJpbmcnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGV0IG0gPSB6aFJlZ0V4cC5wYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nKHN0cik7XG5cdFx0XHRcdFx0aWYgKG0pXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c3RyID0gbS5zb3VyY2U7XG5cdFx0XHRcdFx0XHRmbGFncyA9IGhhc0ZsYWdzID8gZmxhZ3MgOiBtLmZsYWdzO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGV2ID0gUGFyc2VyRXZlbnRFbWl0dGVyLmNyZWF0ZShzdHIsIGZsYWdzIHx8ICcnKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFvcHRpb25zLmRpc2FibGVaaClcblx0XHRcdHtcblx0XHRcdFx0ZXYub24oUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuZGVmYXVsdCwgZnVuY3Rpb24gKGFzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFzdC5vbGRfcmF3ID0gYXN0Lm9sZF9yYXcgfHwgYXN0LnJhdztcblx0XHRcdFx0XHRhc3QucmF3ID0gX3dvcmRfemhfY29yZShhc3QucmF3LCAob3B0aW9ucyBhcyBJT3B0aW9ucykuc2tpcCwgemhUYWJsZUZuKTtcblx0XHRcdFx0XHRldi5lbWl0KFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNoYW5nZSwgYXN0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghb3B0aW9ucy5kaXNhYmxlTG9jYWxSYW5nZSlcblx0XHRcdHtcblx0XHRcdFx0ZXYub24oUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2xhc3NfcmFuZ2UsIGZ1bmN0aW9uIChhc3QsIC4uLmFyZ3YpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgcyA9IGFzdC5taW4ucmF3O1xuXHRcdFx0XHRcdGxldCBlID0gYXN0Lm1heC5yYXc7XG5cblx0XHRcdFx0XHRsZXQgcmV0ID0gcmVnZXhwUmFuZ2UocywgZSwge1xuXHRcdFx0XHRcdFx0Y3JlYXRlUmVnRXhwU3RyaW5nOiB0cnVlLFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGlmIChyZXQpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKChvcHRpb25zIGFzIElPcHRpb25zKS5hbGxvd0xvY2FsUmFuZ2VBdXRvWmgpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHJldCA9IF93b3JkX3poX2NvcmUyKHJldCwgKG9wdGlvbnMgYXMgSU9wdGlvbnMpLnNraXAsIHpoVGFibGVGbik7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGFzdC5vbGRfcmF3ID0gYXN0Lm9sZF9yYXcgfHwgYXN0LnJhdztcblx0XHRcdFx0XHRcdGFzdC5yYXcgPSByZXQ7XG5cblx0XHRcdFx0XHRcdGV2LmVtaXQoUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2hhbmdlLCBhc3QpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0Zm9yIChsZXQgciBvZiBsb2NhbF9yYW5nZSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRsZXQgaSA9IHIuaW5kZXhPZihzKTtcblx0XHRcdFx0XHRcdGxldCBqID0gci5pbmRleE9mKGUsIGkpO1xuXG5cdFx0XHRcdFx0XHRpZiAoaSAhPT0gLTEgJiYgaiAhPT0gLTEpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGFzdC5vbGRfcmF3ID0gYXN0Lm9sZF9yYXcgfHwgYXN0LnJhdztcblx0XHRcdFx0XHRcdFx0YXN0LnJhdyA9IHIuc2xpY2UoaSwgaiArIDEpLmpvaW4oJycpO1xuXG5cdFx0XHRcdFx0XHRcdGV2LmVtaXQoUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2hhbmdlLCBhc3QpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ki9cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcHRpb25zLm9uKVxuXHRcdFx0e1xuXHRcdFx0XHRPYmplY3Rcblx0XHRcdFx0XHQua2V5cyhvcHRpb25zLm9uKVxuXHRcdFx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChldmVudClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0XHRldi5vbihldmVudCwgKG9wdGlvbnMgYXMgSU9wdGlvbnMpLm9uW2V2ZW50XSlcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHQ7XG5cdFx0XHR9XG5cblx0XHRcdGV2LnJlc3VtZSgpO1xuXG5cdFx0XHQvL29wdGlvbnMuc29ydENsYXNzID0gdHJ1ZTtcblxuXHRcdFx0c3RyID0gZXYuZ2V0U291cmNlKCEhb3B0aW9ucy5kZWJ1Z0NoYW5nZWRcblx0XHRcdFx0fHwgIW9wdGlvbnMubm9VbmlxdWVDbGFzc1xuXHRcdFx0XHR8fCBvcHRpb25zLnNvcnRDbGFzc1xuXHRcdFx0XHQsIG9wdGlvbnMpO1xuXHRcdFx0ZmxhZ3MgPSBoYXNGbGFncyA/IGZsYWdzIDogZXYuZmxhZ3M7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRpZiAob3B0aW9ucy5wYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nICYmIHR5cGVvZiBzdHIgPT0gJ3N0cmluZycpXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBtID0gemhSZWdFeHAucGFyc2VSZWd1bGFyRXhwcmVzc2lvblN0cmluZyhzdHIpO1xuXHRcdFx0XHRpZiAobSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHN0ciA9IG5ldyBSZWdFeHAobS5zb3VyY2UsIG0uZmxhZ3MpO1xuXHRcdFx0XHRcdGZsYWdzID0gaGFzRmxhZ3MgPyBmbGFncyA6IHN0ci5mbGFncztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoc3RyIGluc3RhbmNlb2YgUmVnRXhwKVxuXHRcdFx0e1xuXHRcdFx0XHRzdHIgPSBzdHIuc291cmNlO1xuXHRcdFx0XHRmbGFncyA9IGhhc0ZsYWdzID8gZmxhZ3MgOiBzdHIuZmxhZ3M7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c3VwZXIoc3RyLCBmbGFncyB8fCAnJyk7XG5cblx0XHQvKlxuXHRcdGlmIChvcHRpb25zLnBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcgJiYgdHlwZW9mIHN0ciA9PSAnc3RyaW5nJylcblx0XHR7XG5cdFx0XHRsZXQgbSA9IHpoUmVnRXhwLnBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcoc3RyKTtcblx0XHRcdGlmIChtKVxuXHRcdFx0e1xuXHRcdFx0XHRzdHIgPSBuZXcgUmVnRXhwKG0uc291cmNlLCBtLmZsYWdzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsZXQgaGFzRmxhZ3MgPSB0eXBlb2YgZmxhZ3MgPT0gJ3N0cmluZyc7XG5cblx0XHRsZXQgcnMsIGY7XG5cblx0XHRpZiAoIW9wdGlvbnMuZGlzYWJsZVpoKVxuXHRcdHtcblx0XHRcdFtycywgZl0gPSBsaWIuX3dvcmRfemgoc3RyLCBudWxsLCBmbGFncyB8fCBzdHIuZmxhZ3MpO1xuXHRcdH1cblx0XHRlbHNlIGlmICghb3B0aW9ucy5kaXNhYmxlTG9jYWxSYW5nZSlcblx0XHR7XG5cdFx0XHRycyA9IGxpYi5yZXBsYWNlX2xpdGVyYWwoc3RyLCBmdW5jdGlvbiAodGV4dDogc3RyaW5nKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gdGV4dDtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGxldCBib29sID0gKHJzIGluc3RhbmNlb2YgUmVnRXhwKTtcblxuXHRcdGlmIChoYXNGbGFncylcblx0XHR7XG5cdFx0XHRmID0gZmxhZ3M7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRmID0gZiB8fCBmbGFncyB8fCBycy5mbGFncyB8fCAnJztcblx0XHR9XG5cblx0XHRpZiAoIWJvb2wpXG5cdFx0e1xuXHRcdFx0c3VwZXIocnMsIGYpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0c3VwZXIocnMuc291cmNlLCBmKTtcblx0XHR9XG5cdFx0Ki9cblx0fVxuXG5cdHN0YXRpYyBjcmVhdGU8VCA9IHpoUmVnRXhwPihzdHI6IHN0cmluZyB8IFJlZ0V4cCwgZmxhZ3M/OiBzdHJpbmcsIG9wdGlvbnM/OiBJT3B0aW9ucyB8IHN0cmluZyk6IFRcblx0c3RhdGljIGNyZWF0ZTxUID0gemhSZWdFeHA+KHN0cjogc3RyaW5nIHwgUmVnRXhwLCBvcHRpb25zPzogSU9wdGlvbnMpOiBUXG5cdHN0YXRpYyBjcmVhdGU8VCA9IHpoUmVnRXhwPihzdHIsIGZsYWdzID0gbnVsbCwgc2tpcD8sIC4uLmFyZ3YpXG5cdHtcblx0XHRyZXR1cm4gbmV3IHRoaXMoc3RyLCBmbGFncywgc2tpcCwgLi4uYXJndik7XG5cdH1cblxuXHRnZXRTdGF0aWM8VCA9IHR5cGVvZiB6aFJlZ0V4cD4oKTogVFxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAdG9kb1xuXHQgKi9cblx0dG9SZWd1bGFyRXhwcmVzc2lvblN0cmluZygpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50b1N0cmluZygpO1xuXHRcdC8vcmV0dXJuIGAvJHt0aGlzLnNvdXJjZX0vJHt0aGlzLmZsYWdzfWA7XG5cdH1cblxuXHRzdGF0aWMgcGFyc2VSZWd1bGFyRXhwcmVzc2lvblN0cmluZyhzdHI6IHN0cmluZylcblx0e1xuXHRcdGxldCBtID0gL14oW1xcLyMkJV0pKC4rPylcXDEoW2Etel0qKSQvLmV4ZWMoc3RyKTtcblx0XHRpZiAobSlcblx0XHR7XG5cdFx0XHRsZXQgW3MsIGQsIHIsIGZdID0gbTtcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0c291cmNlOiB0eXBlb2YgciAhPT0gJ3VuZGVmaW5lZCcgPyByIDogJycsXG5cdFx0XHRcdGZsYWdzOiB0eXBlb2YgZiAhPT0gJ3VuZGVmaW5lZCcgPyBmIDogJycsXG5cdFx0XHRcdHNsYXNoOiBzLFxuXHRcdFx0XHRpbnB1dDogc3RyLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHN0YXRpYyBnZXQgc3VwcG9ydCgpOiB0eXBlb2YgX3N1cHBvcnRcblx0e1xuXHRcdHJldHVybiBfc3VwcG9ydDtcblx0fVxuXG5cdHN0YXRpYyBnZXQgdmVyc2lvbigpOiBzdHJpbmdcblx0e1xuXHRcdHJldHVybiBQYWNrYWdlSnNvbi52ZXJzaW9uXG5cdH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSB6aFJlZ0V4cFxue1xuXHRleHBvcnQgaW1wb3J0IGlzUmVnRXhwID0gUmVnZXhwSGVscGVyLmlzUmVnRXhwO1xufVxuXG5leHBvcnQgaW1wb3J0IHBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcgPSB6aFJlZ0V4cC5wYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nO1xuZXhwb3J0IGltcG9ydCBpc1JlZ0V4cCA9IHpoUmVnRXhwLmlzUmVnRXhwO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IHpoUmVnRXhwLmNyZWF0ZS5iaW5kKHpoUmVnRXhwKSBhcyB0eXBlb2YgemhSZWdFeHAuY3JlYXRlO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBcGk8VCA9IHpoUmVnRXhwPlxue1xuXHQoc3RyOiBzdHJpbmcgfCBSZWdFeHAsIGZsYWdzPzogc3RyaW5nLCBvcHRpb25zPzogSU9wdGlvbnMgfCBzdHJpbmcpOiBULFxuXHQoc3RyOiBzdHJpbmcgfCBSZWdFeHAsIG9wdGlvbnM/OiBJT3B0aW9ucyk6IFQsXG59XG5cbmV4cG9ydCBjb25zdCB2ZXJzaW9uOiBzdHJpbmcgPSBQYWNrYWdlSnNvbi52ZXJzaW9uO1xuXG5leHBvcnQgZGVmYXVsdCB6aFJlZ0V4cDtcbiJdfQ==