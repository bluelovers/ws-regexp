"use strict";
/**
 * Created by user on 2018/1/31/031.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const conv_1 = require("./lib/conv");
const regexp_parser_event_1 = require("regexp-parser-event");
exports.ParserEventEmitterEvent = regexp_parser_event_1.ParserEventEmitterEvent;
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
                // @ts-ignore
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
                    let raw = conv_1._word_zh_core(ast.raw, options.skip, zhTableFn, options);
                    if (ast.raw !== raw) {
                        ast.raw = raw;
                        ev.emit(regexp_parser_event_1.ParserEventEmitterEvent.change, ast);
                    }
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
                        if (ast.raw !== ret) {
                            ast.raw = ret;
                            ev.emit(regexp_parser_event_1.ParserEventEmitterEvent.change, ast);
                        }
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgscUNBQW1GO0FBQ25GLDZEQUErRztBQVN0RyxrQ0FUb0IsNkNBQXVCLENBU3BCO0FBUmhDLGlFQUF5RTtBQUN6RSxtREFBc0M7QUFDdEMsK0NBQXVDO0FBQ3ZDLDhDQUErQztBQUUvQyw4Q0FBK0M7QUFDL0MsdURBQXdEO0FBaUMzQyxRQUFBLGNBQWMsR0FBYSxFQUFFLENBQUM7QUFFM0MsTUFBYSxRQUFTLFNBQVEsTUFBTTtJQWdEbkMsWUFBWSxHQUFHLEVBQUUsS0FBSyxHQUFHLElBQUksRUFBRSxVQUE2QixFQUFFLEVBQUUsR0FBRyxJQUFJO1FBRXRFLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQzlDO1lBQ0MsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBYSxDQUFDO1lBQy9DLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztTQUM5QjtRQUVELElBQUksT0FBTyxPQUFPLElBQUksUUFBUSxFQUM5QjtZQUNDLE9BQU8sR0FBRztnQkFDVCxJQUFJLEVBQUUsT0FBTzthQUNiLENBQUM7U0FDRjtRQUVELElBQUksT0FBTyxPQUFPLENBQUMsS0FBSyxJQUFJLFFBQVEsRUFDcEM7WUFDQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUN0QjtRQUVELElBQUksUUFBUSxHQUFHLE9BQU8sS0FBSyxJQUFJLFFBQVEsQ0FBQztRQUV4QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQ3pFO1lBQ0MsSUFBSSxFQUFzQixDQUFDO1lBRTNCLE1BQU0sU0FBUyxHQUFHLE9BQU8s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LDRCQXVPQztBQUVELFdBQWlCLFFBQVE7SUFFVixpQkFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7QUFDaEQsQ0FBQyxFQUhnQixRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUd4QjtBQUVhLFFBQUEsNEJBQTRCLEdBQUcsUUFBUSxDQUFDLDRCQUE0QixDQUFDO0FBQ3JFLFFBQUEsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7QUFDOUIsUUFBQSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUEyQixDQUFDO0FBUWxFLFFBQUEsT0FBTyxHQUFXLFdBQVcsQ0FBQyxPQUFPLENBQUM7QUFFbkQsa0JBQWUsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC8xLzMxLzAzMS5cbiAqL1xuXG5pbXBvcnQgeyBfd29yZF96aF9jb3JlLCBfd29yZF96aF9jb3JlMiwgemhUYWJsZUF1dG9HcmVlZHlUYWJsZSB9IGZyb20gJy4vbGliL2NvbnYnO1xuaW1wb3J0IFBhcnNlckV2ZW50RW1pdHRlciwgeyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudCwgSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyIH0gZnJvbSAncmVnZXhwLXBhcnNlci1ldmVudCc7XG5pbXBvcnQgeyBJQXN0VG9TdHJpbmdPcHRpb25zLCBwYXJzZVJlZ0V4cCB9IGZyb20gJ3JlZ2V4cC1wYXJzZXItbGl0ZXJhbCc7XG5pbXBvcnQgX3N1cHBvcnQgZnJvbSAncmVnZXhwLXN1cHBvcnQnO1xuaW1wb3J0IHJlZ2V4cFJhbmdlIGZyb20gJ3JlZ2V4cC1yYW5nZSc7XG5pbXBvcnQgUmVnZXhwSGVscGVyID0gcmVxdWlyZSgncmVnZXhwLWhlbHBlcicpO1xuaW1wb3J0IENqa0NvbnYgZnJvbSAnY2prLWNvbnYnO1xuaW1wb3J0IFBhY2thZ2VKc29uID0gcmVxdWlyZSgnLi9wYWNrYWdlLmpzb24nKTtcbmltcG9ydCB6aFRhYmxlID0gcmVxdWlyZSgnY2prLWNvbnYvbGliL3poL3RhYmxlL2luZGV4Jyk7XG5cbmV4cG9ydCB7IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LCBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXIgfVxuXG5leHBvcnQgdHlwZSBJT3B0aW9ucyA9IHtcblx0c2tpcD86IHN0cmluZyxcblx0ZGlzYWJsZVpoPzogYm9vbGVhbixcblx0LyoqXG5cdCAqIGRpc2FibGVMb2NhbFJhbmdlIG9ubHkgd29yayB3aGVuIGRpc2FibGVaaCBpcyB0cnVlXG5cdCAqL1xuXHRkaXNhYmxlTG9jYWxSYW5nZT86IGJvb2xlYW4sXG5cdGFsbG93TG9jYWxSYW5nZUF1dG9aaD86IGJvb2xlYW4sXG5cdGZsYWdzPzogc3RyaW5nLFxuXG5cdC8qKlxuXHQgKiBhbGxvdyBzdHIgaXMgL2EvZ1xuXHQgKi9cblx0cGFyc2VSZWd1bGFyRXhwcmVzc2lvblN0cmluZz86IGJvb2xlYW4sXG5cblx0b24/OiB7XG5cdFx0W2sgaW4gUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnRdPzogSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPGFueSwgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQ+O1xuXHR9LFxuXG5cdGdyZWVkeVRhYmxlPzogYm9vbGVhbiB8IG51bWJlcixcblx0dW5zYWZlPzogYm9vbGVhbixcblxuXHQvKipcblx0ICogYWxsb3cgc2V0IGBDamtDb252LnpoVGFibGUuYXV0b2Bcblx0ICovXG5cdHpoVGFibGU/OiAoY2hhcjogc3RyaW5nKSA9PiBzdHJpbmdbXVxuXG59ICYgSUFzdFRvU3RyaW5nT3B0aW9ucztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPcHRpb25zOiBJT3B0aW9ucyA9IHt9O1xuXG5leHBvcnQgY2xhc3MgemhSZWdFeHAgZXh0ZW5kcyBSZWdFeHBcbntcblx0cHVibGljIHNvdXJjZTogc3RyaW5nO1xuXHRwdWJsaWMgZmxhZ3M6IHN0cmluZztcblxuXHRwdWJsaWMgZG90QWxsOiBib29sZWFuO1xuXG5cdHB1YmxpYyBpZ25vcmVDYXNlOiBib29sZWFuO1xuXHRwdWJsaWMgZ2xvYmFsOiBib29sZWFuO1xuXHRwdWJsaWMgbXVsdGlsaW5lOiBib29sZWFuO1xuXHRwdWJsaWMgc3RpY2t5OiBib29sZWFuO1xuXHRwdWJsaWMgdW5pY29kZTogYm9vbGVhbjtcblxuXHRwdWJsaWMgbGFzdEluZGV4OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBub24tc3RhbmRhcmQgbGVmdENvbnRleHQgcHJvcGVydHkgaXMgYSBzdGF0aWMgYW5kIHJlYWQtb25seSBwcm9wZXJ0eSBvZiByZWd1bGFyIGV4cHJlc3Npb25zIHRoYXQgY29udGFpbnMgdGhlIHN1YnN0cmluZyBwcmVjZWRpbmcgdGhlIG1vc3QgcmVjZW50IG1hdGNoLiBSZWdFeHAuJGAgaXMgYW4gYWxpYXMgZm9yIHRoaXMgcHJvcGVydHkuXG5cdCAqXG5cdCAqIEBhbGlhcyAkYFxuXHQgKi9cblx0cHVibGljIHN0YXRpYyByZWFkb25seSBsZWZ0Q29udGV4dDogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIG5vbi1zdGFuZGFyZCByaWdodENvbnRleHQgcHJvcGVydHkgaXMgYSBzdGF0aWMgYW5kIHJlYWQtb25seSBwcm9wZXJ0eSBvZiByZWd1bGFyIGV4cHJlc3Npb25zIHRoYXQgY29udGFpbnMgdGhlIHN1YnN0cmluZyBmb2xsb3dpbmcgdGhlIG1vc3QgcmVjZW50IG1hdGNoLiBSZWdFeHAuJCcgaXMgYW4gYWxpYXMgZm9yIHRoaXMgcHJvcGVydHkuXG5cdCAqXG5cdCAqIEBhbGlhcyAkJ1xuXHQgKi9cblx0cHVibGljIHN0YXRpYyByZWFkb25seSByaWdodENvbnRleHQ6IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBub24tc3RhbmRhcmQgbGFzdFBhcmVuIHByb3BlcnR5IGlzIGEgc3RhdGljIGFuZCByZWFkLW9ubHkgcHJvcGVydHkgb2YgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGNvbnRhaW5zIHRoZSBsYXN0IHBhcmVudGhlc2l6ZWQgc3Vic3RyaW5nIG1hdGNoLCBpZiBhbnkuIFJlZ0V4cC4kKyBpcyBhbiBhbGlhcyBmb3IgdGhpcyBwcm9wZXJ0eS5cblx0ICpcblx0ICogQGFsaWFzICQrXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGxhc3RQYXJlbjogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIG5vbi1zdGFuZGFyZCBsYXN0TWF0Y2ggcHJvcGVydHkgaXMgYSBzdGF0aWMgYW5kIHJlYWQtb25seSBwcm9wZXJ0eSBvZiByZWd1bGFyIGV4cHJlc3Npb25zIHRoYXQgY29udGFpbnMgdGhlIGxhc3QgbWF0Y2hlZCBjaGFyYWN0ZXJzLiBSZWdFeHAuJCYgaXMgYW4gYWxpYXMgZm9yIHRoaXMgcHJvcGVydHkuXG5cdCAqXG5cdCAqIEBhbGlhcyAkJlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyByZWFkb25seSBsYXN0TWF0Y2g6IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBub24tc3RhbmRhcmQgaW5wdXQgcHJvcGVydHkgaXMgYSBzdGF0aWMgcHJvcGVydHkgb2YgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGNvbnRhaW5zIHRoZSBzdHJpbmcgYWdhaW5zdCB3aGljaCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBtYXRjaGVkLiBSZWdFeHAuJF8gaXMgYW4gYWxpYXMgZm9yIHRoaXMgcHJvcGVydHkuXG5cdCAqXG5cdCAqIEBhbGlhcyAkX1xuXHQgKi9cblx0cHVibGljIHN0YXRpYyByZWFkb25seSBpbnB1dDogc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKHN0cjogc3RyaW5nIHwgUmVnRXhwLCBmbGFncz86IHN0cmluZywgb3B0aW9ucz86IElPcHRpb25zIHwgc3RyaW5nLCAuLi5hcmd2KVxuXHRjb25zdHJ1Y3RvcihzdHI6IHN0cmluZyB8IFJlZ0V4cCwgb3B0aW9ucz86IElPcHRpb25zLCAuLi5hcmd2KVxuXHRjb25zdHJ1Y3RvcihzdHIsIGZsYWdzID0gbnVsbCwgb3B0aW9uczogSU9wdGlvbnMgfCBzdHJpbmcgPSB7fSwgLi4uYXJndilcblx0e1xuXHRcdGlmIChmbGFncyAhPT0gbnVsbCAmJiB0eXBlb2YgZmxhZ3MgPT0gJ29iamVjdCcpXG5cdFx0e1xuXHRcdFx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGZsYWdzKSBhcyBJT3B0aW9ucztcblx0XHRcdGZsYWdzID0gb3B0aW9ucy5mbGFncyB8fCBudWxsO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnc3RyaW5nJylcblx0XHR7XG5cdFx0XHRvcHRpb25zID0ge1xuXHRcdFx0XHRza2lwOiBvcHRpb25zLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIG9wdGlvbnMuZmxhZ3MgPT0gJ3N0cmluZycpXG5cdFx0e1xuXHRcdFx0ZmxhZ3MgPSBvcHRpb25zLmZsYWdzO1xuXHRcdH1cblxuXHRcdGxldCBoYXNGbGFncyA9IHR5cGVvZiBmbGFncyA9PSAnc3RyaW5nJztcblxuXHRcdGlmICgxICYmICghb3B0aW9ucy5kaXNhYmxlWmggfHwgIW9wdGlvbnMuZGlzYWJsZUxvY2FsUmFuZ2UgfHwgb3B0aW9ucy5vbikpXG5cdFx0e1xuXHRcdFx0bGV0IGV2OiBQYXJzZXJFdmVudEVtaXR0ZXI7XG5cblx0XHRcdGNvbnN0IHpoVGFibGVGbiA9IG9wdGlvbnMuemhUYWJsZSB8fCAob3B0aW9ucy5ncmVlZHlUYWJsZSA/IHpoVGFibGVBdXRvR3JlZWR5VGFibGUgOiB6aFRhYmxlLmF1dG8pO1xuXG5cdFx0XHRpZiAoc3RyIGluc3RhbmNlb2YgUmVnRXhwKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgYXN0ID0gcGFyc2VSZWdFeHAoc3RyLnRvU3RyaW5nKCkpO1xuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdGV2ID0gbmV3IFBhcnNlckV2ZW50RW1pdHRlcihhc3QpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAob3B0aW9ucy5wYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nICYmIHR5cGVvZiBzdHIgPT0gJ3N0cmluZycpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgbSA9IHpoUmVnRXhwLnBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcoc3RyKTtcblx0XHRcdFx0XHRpZiAobSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzdHIgPSBtLnNvdXJjZTtcblx0XHRcdFx0XHRcdGZsYWdzID0gaGFzRmxhZ3MgPyBmbGFncyA6IG0uZmxhZ3M7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZXYgPSBQYXJzZXJFdmVudEVtaXR0ZXIuY3JlYXRlKHN0ciwgZmxhZ3MgfHwgJycpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIW9wdGlvbnMuZGlzYWJsZVpoKVxuXHRcdFx0e1xuXHRcdFx0XHRldi5vbihQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5kZWZhdWx0LCBmdW5jdGlvbiAoYXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXN0Lm9sZF9yYXcgPSBhc3Qub2xkX3JhdyB8fCBhc3QucmF3O1xuXG5cdFx0XHRcdFx0bGV0IHJhdyA9IF93b3JkX3poX2NvcmUoYXN0LnJhdywgKG9wdGlvbnMgYXMgSU9wdGlvbnMpLnNraXAsIHpoVGFibGVGbiwgb3B0aW9ucyBhcyBJT3B0aW9ucyk7XG5cblx0XHRcdFx0XHRpZiAoYXN0LnJhdyAhPT0gcmF3KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGFzdC5yYXcgPSByYXc7XG5cdFx0XHRcdFx0XHRldi5lbWl0KFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNoYW5nZSwgYXN0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIW9wdGlvbnMuZGlzYWJsZUxvY2FsUmFuZ2UpXG5cdFx0XHR7XG5cdFx0XHRcdGV2Lm9uKFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzX3JhbmdlLCBmdW5jdGlvbiAoYXN0LCAuLi5hcmd2KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGV0IHMgPSBhc3QubWluLnJhdztcblx0XHRcdFx0XHRsZXQgZSA9IGFzdC5tYXgucmF3O1xuXG5cdFx0XHRcdFx0bGV0IHJldCA9IHJlZ2V4cFJhbmdlKHMsIGUsIHtcblx0XHRcdFx0XHRcdGNyZWF0ZVJlZ0V4cFN0cmluZzogdHJ1ZSxcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRpZiAocmV0KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICgob3B0aW9ucyBhcyBJT3B0aW9ucykuYWxsb3dMb2NhbFJhbmdlQXV0b1poKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRyZXQgPSBfd29yZF96aF9jb3JlMihyZXQsIChvcHRpb25zIGFzIElPcHRpb25zKS5za2lwLCB6aFRhYmxlRm4sIG9wdGlvbnMgYXMgSU9wdGlvbnMpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRhc3Qub2xkX3JhdyA9IGFzdC5vbGRfcmF3IHx8IGFzdC5yYXc7XG5cblx0XHRcdFx0XHRcdGlmIChhc3QucmF3ICE9PSByZXQpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGFzdC5yYXcgPSByZXQ7XG5cblx0XHRcdFx0XHRcdFx0ZXYuZW1pdChQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jaGFuZ2UsIGFzdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9wdGlvbnMub24pXG5cdFx0XHR7XG5cdFx0XHRcdE9iamVjdFxuXHRcdFx0XHRcdC5rZXlzKG9wdGlvbnMub24pXG5cdFx0XHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0XHRcdGV2Lm9uKGV2ZW50LCAob3B0aW9ucyBhcyBJT3B0aW9ucykub25bZXZlbnRdKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdDtcblx0XHRcdH1cblxuXHRcdFx0ZXYucmVzdW1lKCk7XG5cblx0XHRcdHN0ciA9IGV2LmdldFNvdXJjZSghIW9wdGlvbnMuZGVidWdDaGFuZ2VkXG5cdFx0XHRcdHx8ICFvcHRpb25zLm5vVW5pcXVlQ2xhc3Ncblx0XHRcdFx0fHwgb3B0aW9ucy5zb3J0Q2xhc3Ncblx0XHRcdFx0LCBvcHRpb25zKTtcblx0XHRcdGZsYWdzID0gaGFzRmxhZ3MgPyBmbGFncyA6IGV2LmZsYWdzO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0aWYgKG9wdGlvbnMucGFyc2VSZWd1bGFyRXhwcmVzc2lvblN0cmluZyAmJiB0eXBlb2Ygc3RyID09ICdzdHJpbmcnKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgbSA9IHpoUmVnRXhwLnBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcoc3RyKTtcblx0XHRcdFx0aWYgKG0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRzdHIgPSBuZXcgUmVnRXhwKG0uc291cmNlLCBtLmZsYWdzKTtcblx0XHRcdFx0XHRmbGFncyA9IGhhc0ZsYWdzID8gZmxhZ3MgOiBzdHIuZmxhZ3M7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKHN0ciBpbnN0YW5jZW9mIFJlZ0V4cClcblx0XHRcdHtcblx0XHRcdFx0c3RyID0gc3RyLnNvdXJjZTtcblx0XHRcdFx0ZmxhZ3MgPSBoYXNGbGFncyA/IGZsYWdzIDogc3RyLmZsYWdzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHN1cGVyKHN0ciwgZmxhZ3MgfHwgJycpO1xuXHR9XG5cblx0c3RhdGljIGNyZWF0ZTxUID0gemhSZWdFeHA+KHN0cjogc3RyaW5nIHwgUmVnRXhwLCBmbGFncz86IHN0cmluZywgb3B0aW9ucz86IElPcHRpb25zIHwgc3RyaW5nKTogVFxuXHRzdGF0aWMgY3JlYXRlPFQgPSB6aFJlZ0V4cD4oc3RyOiBzdHJpbmcgfCBSZWdFeHAsIG9wdGlvbnM/OiBJT3B0aW9ucyk6IFRcblx0c3RhdGljIGNyZWF0ZTxUID0gemhSZWdFeHA+KHN0ciwgZmxhZ3MgPSBudWxsLCBza2lwPywgLi4uYXJndilcblx0e1xuXHRcdHJldHVybiBuZXcgdGhpcyhzdHIsIGZsYWdzLCBza2lwLCAuLi5hcmd2KTtcblx0fVxuXG5cdGdldFN0YXRpYzxUID0gdHlwZW9mIHpoUmVnRXhwPigpOiBUXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEB0b2RvXG5cdCAqL1xuXHR0b1JlZ3VsYXJFeHByZXNzaW9uU3RyaW5nKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG5cdFx0Ly9yZXR1cm4gYC8ke3RoaXMuc291cmNlfS8ke3RoaXMuZmxhZ3N9YDtcblx0fVxuXG5cdHN0YXRpYyBwYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nKHN0cjogc3RyaW5nKVxuXHR7XG5cdFx0bGV0IG0gPSAvXihbXFwvIyQlXSkoLis/KVxcMShbYS16XSopJC8uZXhlYyhzdHIpO1xuXHRcdGlmIChtKVxuXHRcdHtcblx0XHRcdGxldCBbcywgZCwgciwgZl0gPSBtO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRzb3VyY2U6IHR5cGVvZiByICE9PSAndW5kZWZpbmVkJyA/IHIgOiAnJyxcblx0XHRcdFx0ZmxhZ3M6IHR5cGVvZiBmICE9PSAndW5kZWZpbmVkJyA/IGYgOiAnJyxcblx0XHRcdFx0c2xhc2g6IHMsXG5cdFx0XHRcdGlucHV0OiBzdHIsXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0c3RhdGljIGdldCBzdXBwb3J0KCk6IHR5cGVvZiBfc3VwcG9ydFxuXHR7XG5cdFx0cmV0dXJuIF9zdXBwb3J0O1xuXHR9XG5cblx0c3RhdGljIGdldCB2ZXJzaW9uKCk6IHN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIFBhY2thZ2VKc29uLnZlcnNpb25cblx0fVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIHpoUmVnRXhwXG57XG5cdGV4cG9ydCBpbXBvcnQgaXNSZWdFeHAgPSBSZWdleHBIZWxwZXIuaXNSZWdFeHA7XG59XG5cbmV4cG9ydCBpbXBvcnQgcGFyc2VSZWd1bGFyRXhwcmVzc2lvblN0cmluZyA9IHpoUmVnRXhwLnBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmc7XG5leHBvcnQgaW1wb3J0IGlzUmVnRXhwID0gemhSZWdFeHAuaXNSZWdFeHA7XG5leHBvcnQgY29uc3QgY3JlYXRlID0gemhSZWdFeHAuY3JlYXRlLmJpbmQoemhSZWdFeHApIGFzIHR5cGVvZiB6aFJlZ0V4cC5jcmVhdGU7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFwaTxUID0gemhSZWdFeHA+XG57XG5cdChzdHI6IHN0cmluZyB8IFJlZ0V4cCwgZmxhZ3M/OiBzdHJpbmcsIG9wdGlvbnM/OiBJT3B0aW9ucyB8IHN0cmluZyk6IFQsXG5cdChzdHI6IHN0cmluZyB8IFJlZ0V4cCwgb3B0aW9ucz86IElPcHRpb25zKTogVCxcbn1cblxuZXhwb3J0IGNvbnN0IHZlcnNpb246IHN0cmluZyA9IFBhY2thZ2VKc29uLnZlcnNpb247XG5cbmV4cG9ydCBkZWZhdWx0IHpoUmVnRXhwO1xuIl19