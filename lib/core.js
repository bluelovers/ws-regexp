"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conv_1 = require("./conv");
const regexp_parser_literal_1 = require("regexp-parser-literal");
const regexp_parser_event_1 = require("regexp-parser-event");
exports.ParserEventEmitter = regexp_parser_event_1.ParserEventEmitter;
const regexp_range_1 = require("regexp-range");
const index_1 = require("cjk-conv/lib/zh/table/index");
exports.IOptionsZhTable = index_1.IOptions;
const mergeOptions_1 = require("./mergeOptions");
const zhTable = require("cjk-conv/lib/zh/table/index");
exports.SymDefaults = Symbol.for('zhRegExp.defaults');
function coreHandler(str, flags = null, options = {}, ...argv) {
    ({ str, flags, options, argv } = mergeOptions_1.getSettingOptions(str, flags, options, ...argv));
    let hasFlags = typeof flags == 'string';
    options = mergeOptions_1.fixOptions(options);
    if (1 && (!options.disableZh || !options.disableLocalRange || options.on)) {
        let ev;
        const zhTableFn = options.zhTable || (options.greedyTable ? conv_1.zhTableAutoGreedyTable : zhTable.auto);
        if (str instanceof RegExp) {
            let ast = regexp_parser_literal_1.parseRegExp(str.toString());
            // @ts-ignore
            ev = new regexp_parser_event_1.ParserEventEmitter(ast);
        }
        else {
            if (options.parseRegularExpressionString && typeof str == 'string') {
                let m = parseRegularExpressionString(str);
                if (m) {
                    str = m.source;
                    flags = hasFlags ? flags : m.flags;
                }
            }
            ev = regexp_parser_event_1.ParserEventEmitter.create(str, flags || '');
        }
        if (!options.disableZh) {
            ev.on("default" /* default */, function (ast) {
                ast.old_raw = ast.old_raw || ast.raw;
                let raw = conv_1._word_zh_core(ast.raw, options.skip, zhTableFn, options);
                if (ast.raw !== raw) {
                    ast.raw = raw;
                    ev.emit("change" /* change */, ast);
                }
            });
        }
        if (!options.disableLocalRange) {
            ev.on("class_range" /* class_range */, function (ast, ...argv) {
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
                        ev.emit("change" /* change */, ast);
                    }
                }
            });
        }
        setupParserEventEmitter(ev, options);
        ev.resume();
        str = ev.getSource(!!options.debugChanged
            || !options.noUniqueClass
            || options.sortClass, options);
        flags = hasFlags ? flags : ev.flags;
    }
    else {
        if (options.parseRegularExpressionString && typeof str == 'string') {
            let m = parseRegularExpressionString(str);
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
    return {
        source: str,
        flags: flags || '',
        options: options,
    };
}
exports.coreHandler = coreHandler;
function parseRegularExpressionString(str) {
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
exports.parseRegularExpressionString = parseRegularExpressionString;
function setupParserEventEmitter(ev, options) {
    if (options.on) {
        mergeOptions_1.fixOptions(options).on
            .forEach((conf) => {
            Object
                .keys(conf)
                .forEach(function (event) {
                ev.on(event, conf[event]);
            });
        });
    }
    return ev;
}
exports.setupParserEventEmitter = setupParserEventEmitter;
exports.default = coreHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBK0U7QUFDL0UsaUVBQXlFO0FBQ3pFLDZEQUs2QjtBQU1LLDZCQVJqQyx3Q0FBa0IsQ0FRaUM7QUFMcEQsK0NBQXVDO0FBQ3ZDLHVEQUEwRTtBQU1qRSwwQkFOWSxnQkFBZSxDQU1aO0FBTHhCLGlEQUErRDtBQUMvRCx1REFBd0Q7QUFNM0MsUUFBQSxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBZ0UzRCxTQUFnQixXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsVUFBa0MsRUFBRSxFQUFFLEdBQUcsSUFBSTtJQUUzRixDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsZ0NBQWlCLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRWxGLElBQUksUUFBUSxHQUFHLE9BQU8sS0FBSyxJQUFJLFFBQVEsQ0FBQztJQUV4QyxPQUFPLEdBQUcseUJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU5QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQ3pFO1FBQ0MsSUFBSSxFQUFzQixDQUFDO1FBRTNCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyw2QkFBc0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5HLElBQUksR0FBRyxZQUFZLE1BQU0sRUFDekI7WUFDQyxJQUFJLEdBQUcsR0FBRyxtQ0FBVyxDQUFDLEdBQUcs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R0FBRztTQUNWLENBQUM7S0FDRjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2IsQ0FBQztBQWhCRCxvRUFnQkM7QUFFRCxTQUFnQix1QkFBdUIsQ0FBQyxFQUFzQixFQUFFLE9BQXNCO0lBRXJGLElBQUksT0FBTyxDQUFDLEVBQUUsRUFDZDtRQUNDLHlCQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTthQUNwQixPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUVqQixNQUFNO2lCQUNKLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ1YsT0FBTyxDQUFDLFVBQVUsS0FBOEI7Z0JBRWhELEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQzFCLENBQUMsQ0FBQyxDQUNGO1FBRUYsQ0FBQyxDQUFDLENBQ0Y7S0FDRDtJQUVELE9BQU8sRUFBRSxDQUFDO0FBQ1gsQ0FBQztBQXBCRCwwREFvQkM7QUFFRCxrQkFBZSxXQUFXLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfd29yZF96aF9jb3JlLCBfd29yZF96aF9jb3JlMiwgemhUYWJsZUF1dG9HcmVlZHlUYWJsZSB9IGZyb20gJy4vY29udic7XG5pbXBvcnQgeyBJQXN0VG9TdHJpbmdPcHRpb25zLCBwYXJzZVJlZ0V4cCB9IGZyb20gJ3JlZ2V4cC1wYXJzZXItbGl0ZXJhbCc7XG5pbXBvcnQge1xuXHRJTm9kZUlucHV0LFxuXHRJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXIsIElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lck1hcCxcblx0UGFyc2VyRXZlbnRFbWl0dGVyLFxuXHRQYXJzZXJFdmVudEVtaXR0ZXJFdmVudCxcbn0gZnJvbSAncmVnZXhwLXBhcnNlci1ldmVudCc7XG5pbXBvcnQgcmVnZXhwUmFuZ2UgZnJvbSAncmVnZXhwLXJhbmdlJztcbmltcG9ydCB7IElPcHRpb25zIGFzIElPcHRpb25zWmhUYWJsZSB9IGZyb20gJ2Nqay1jb252L2xpYi96aC90YWJsZS9pbmRleCc7XG5pbXBvcnQgeyBmaXhPcHRpb25zLCBnZXRTZXR0aW5nT3B0aW9ucyB9IGZyb20gJy4vbWVyZ2VPcHRpb25zJztcbmltcG9ydCB6aFRhYmxlID0gcmVxdWlyZSgnY2prLWNvbnYvbGliL3poL3RhYmxlL2luZGV4Jyk7XG5cbmV4cG9ydCB7IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LCBQYXJzZXJFdmVudEVtaXR0ZXIsIElOb2RlSW5wdXQsIElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lciwgSUFzdFRvU3RyaW5nT3B0aW9ucyB9XG5cbmV4cG9ydCB7IElPcHRpb25zWmhUYWJsZSB9XG5cbmV4cG9ydCBjb25zdCBTeW1EZWZhdWx0cyA9IFN5bWJvbC5mb3IoJ3poUmVnRXhwLmRlZmF1bHRzJyk7XG5cbmV4cG9ydCB0eXBlIElPcHRpb25zQ29yZSA9IHtcblx0c2tpcD86IHN0cmluZyxcblx0ZGlzYWJsZVpoPzogYm9vbGVhbixcblx0LyoqXG5cdCAqIGRpc2FibGVMb2NhbFJhbmdlIG9ubHkgd29yayB3aGVuIGRpc2FibGVaaCBpcyB0cnVlXG5cdCAqL1xuXHRkaXNhYmxlTG9jYWxSYW5nZT86IGJvb2xlYW4sXG5cdGFsbG93TG9jYWxSYW5nZUF1dG9aaD86IGJvb2xlYW4sXG5cdGZsYWdzPzogc3RyaW5nLFxuXG5cdC8qKlxuXHQgKiBhbGxvdyBzdHIgaXMgL2EvZ1xuXHQgKi9cblx0cGFyc2VSZWd1bGFyRXhwcmVzc2lvblN0cmluZz86IGJvb2xlYW4sXG5cblx0LyoqXG5cdCAqIOiukyDmloflrZfmr5TlsI0g5pu05Yqg5a+s6ayGXG5cdCAqL1xuXHRncmVlZHlUYWJsZT86IGJvb2xlYW4gfCBudW1iZXIsXG5cdHVuc2FmZT86IGJvb2xlYW4sXG5cblx0LyoqXG5cdCAqIGFsbG93IHNldCBgQ2prQ29udi56aFRhYmxlLmF1dG9gXG5cdCAqL1xuXHR6aFRhYmxlPyhjaGFyOiBzdHJpbmcsIG9wdGlvbnM/OiBJT3B0aW9uc1poVGFibGUpOiBzdHJpbmdbXVxuXG59ICYgSUFzdFRvU3RyaW5nT3B0aW9ucztcblxuZXhwb3J0IHR5cGUgSU9wdGlvbnM8VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PiA9IElPcHRpb25zQ29yZSAmIHtcblx0b24/OiBJT3B0aW9uc09uPFQ+IHwgSU9wdGlvbnNPbjxUPltdLFxufVxuXG5leHBvcnQgdHlwZSBJT3B0aW9uc1J1bnRpbWU8VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PiA9IElPcHRpb25zQ29yZSAmIHtcblx0b24/OiBJT3B0aW9uc09uPFQ+W10sXG59XG5cbmV4cG9ydCB0eXBlIElPcHRpb25zSW5wdXQ8VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PiA9IElPcHRpb25zPFQ+IHwgSU9wdGlvbnNSdW50aW1lPFQ+XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvcmVIYW5kbGVyUmV0dXJuPFQgZXh0ZW5kcyBJTm9kZUlucHV0ID0gSU5vZGVJbnB1dD5cbntcblx0c291cmNlOiBzdHJpbmcsXG5cdGZsYWdzOiBzdHJpbmcsXG5cdG9wdGlvbnM6IElPcHRpb25zUnVudGltZTxUPixcbn1cblxuLypcbmV4cG9ydCB0eXBlIElPcHRpb25zT248VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PiA9IHtcblx0W2sgaW4gUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnRdPzogSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPFQsIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50Pjtcbn1cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIElPcHRpb25zT248VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PiBleHRlbmRzIElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lck1hcDxUPlxue1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3JlSGFuZGxlcihzdHI6IHN0cmluZyB8IFJlZ0V4cCxcblx0ZmxhZ3M/OiBzdHJpbmcsXG5cdG9wdGlvbnM/OiBJT3B0aW9uc0lucHV0IHwgc3RyaW5nLFxuXHQuLi5hcmd2XG4pOiBJQ29yZUhhbmRsZXJSZXR1cm5cbmV4cG9ydCBmdW5jdGlvbiBjb3JlSGFuZGxlcihzdHI6IHN0cmluZyB8IFJlZ0V4cCwgb3B0aW9ucz86IElPcHRpb25zSW5wdXQsIC4uLmFyZ3YpOiBJQ29yZUhhbmRsZXJSZXR1cm5cbmV4cG9ydCBmdW5jdGlvbiBjb3JlSGFuZGxlcihzdHIsIGZsYWdzID0gbnVsbCwgb3B0aW9uczogSU9wdGlvbnNJbnB1dCB8IHN0cmluZyA9IHt9LCAuLi5hcmd2KTogSUNvcmVIYW5kbGVyUmV0dXJuXG57XG5cdCh7IHN0ciwgZmxhZ3MsIG9wdGlvbnMsIGFyZ3YgfSA9IGdldFNldHRpbmdPcHRpb25zKHN0ciwgZmxhZ3MsIG9wdGlvbnMsIC4uLmFyZ3YpKTtcblxuXHRsZXQgaGFzRmxhZ3MgPSB0eXBlb2YgZmxhZ3MgPT0gJ3N0cmluZyc7XG5cblx0b3B0aW9ucyA9IGZpeE9wdGlvbnMob3B0aW9ucyk7XG5cblx0aWYgKDEgJiYgKCFvcHRpb25zLmRpc2FibGVaaCB8fCAhb3B0aW9ucy5kaXNhYmxlTG9jYWxSYW5nZSB8fCBvcHRpb25zLm9uKSlcblx0e1xuXHRcdGxldCBldjogUGFyc2VyRXZlbnRFbWl0dGVyO1xuXG5cdFx0Y29uc3QgemhUYWJsZUZuID0gb3B0aW9ucy56aFRhYmxlIHx8IChvcHRpb25zLmdyZWVkeVRhYmxlID8gemhUYWJsZUF1dG9HcmVlZHlUYWJsZSA6IHpoVGFibGUuYXV0byk7XG5cblx0XHRpZiAoc3RyIGluc3RhbmNlb2YgUmVnRXhwKVxuXHRcdHtcblx0XHRcdGxldCBhc3QgPSBwYXJzZVJlZ0V4cChzdHIudG9TdHJpbmcoKSk7XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRldiA9IG5ldyBQYXJzZXJFdmVudEVtaXR0ZXIoYXN0KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGlmIChvcHRpb25zLnBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcgJiYgdHlwZW9mIHN0ciA9PSAnc3RyaW5nJylcblx0XHRcdHtcblx0XHRcdFx0bGV0IG0gPSBwYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nKHN0cik7XG5cdFx0XHRcdGlmIChtKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0c3RyID0gbS5zb3VyY2U7XG5cdFx0XHRcdFx0ZmxhZ3MgPSBoYXNGbGFncyA/IGZsYWdzIDogbS5mbGFncztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRldiA9IFBhcnNlckV2ZW50RW1pdHRlci5jcmVhdGUoc3RyLCBmbGFncyB8fCAnJyk7XG5cdFx0fVxuXG5cdFx0aWYgKCFvcHRpb25zLmRpc2FibGVaaClcblx0XHR7XG5cdFx0XHRldi5vbihQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5kZWZhdWx0LCBmdW5jdGlvbiAoYXN0KVxuXHRcdFx0e1xuXHRcdFx0XHRhc3Qub2xkX3JhdyA9IGFzdC5vbGRfcmF3IHx8IGFzdC5yYXc7XG5cblx0XHRcdFx0bGV0IHJhdyA9IF93b3JkX3poX2NvcmUoYXN0LnJhdywgKG9wdGlvbnMgYXMgSU9wdGlvbnMpLnNraXAsIHpoVGFibGVGbiwgb3B0aW9ucyBhcyBJT3B0aW9ucyk7XG5cblx0XHRcdFx0aWYgKGFzdC5yYXcgIT09IHJhdylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFzdC5yYXcgPSByYXc7XG5cdFx0XHRcdFx0ZXYuZW1pdChQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jaGFuZ2UsIGFzdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICghb3B0aW9ucy5kaXNhYmxlTG9jYWxSYW5nZSlcblx0XHR7XG5cdFx0XHRldi5vbihQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzc19yYW5nZSwgZnVuY3Rpb24gKGFzdCwgLi4uYXJndilcblx0XHRcdHtcblx0XHRcdFx0bGV0IHMgPSBhc3QubWluLnJhdztcblx0XHRcdFx0bGV0IGUgPSBhc3QubWF4LnJhdztcblxuXHRcdFx0XHRsZXQgcmV0ID0gcmVnZXhwUmFuZ2UocywgZSwge1xuXHRcdFx0XHRcdGNyZWF0ZVJlZ0V4cFN0cmluZzogdHJ1ZSxcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGlmIChyZXQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZiAoKG9wdGlvbnMgYXMgSU9wdGlvbnMpLmFsbG93TG9jYWxSYW5nZUF1dG9aaClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXQgPSBfd29yZF96aF9jb3JlMihyZXQsIChvcHRpb25zIGFzIElPcHRpb25zKS5za2lwLCB6aFRhYmxlRm4sIG9wdGlvbnMgYXMgSU9wdGlvbnMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGFzdC5vbGRfcmF3ID0gYXN0Lm9sZF9yYXcgfHwgYXN0LnJhdztcblxuXHRcdFx0XHRcdGlmIChhc3QucmF3ICE9PSByZXQpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0YXN0LnJhdyA9IHJldDtcblxuXHRcdFx0XHRcdFx0ZXYuZW1pdChQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jaGFuZ2UsIGFzdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRzZXR1cFBhcnNlckV2ZW50RW1pdHRlcihldiwgb3B0aW9ucyk7XG5cblx0XHRldi5yZXN1bWUoKTtcblxuXHRcdHN0ciA9IGV2LmdldFNvdXJjZSghIW9wdGlvbnMuZGVidWdDaGFuZ2VkXG5cdFx0XHR8fCAhb3B0aW9ucy5ub1VuaXF1ZUNsYXNzXG5cdFx0XHR8fCBvcHRpb25zLnNvcnRDbGFzc1xuXHRcdFx0LCBvcHRpb25zKTtcblx0XHRmbGFncyA9IGhhc0ZsYWdzID8gZmxhZ3MgOiBldi5mbGFncztcblx0fVxuXHRlbHNlXG5cdHtcblx0XHRpZiAob3B0aW9ucy5wYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nICYmIHR5cGVvZiBzdHIgPT0gJ3N0cmluZycpXG5cdFx0e1xuXHRcdFx0bGV0IG0gPSBwYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nKHN0cik7XG5cdFx0XHRpZiAobSlcblx0XHRcdHtcblx0XHRcdFx0c3RyID0gbmV3IFJlZ0V4cChtLnNvdXJjZSwgbS5mbGFncyk7XG5cdFx0XHRcdGZsYWdzID0gaGFzRmxhZ3MgPyBmbGFncyA6IHN0ci5mbGFncztcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAoc3RyIGluc3RhbmNlb2YgUmVnRXhwKVxuXHRcdHtcblx0XHRcdHN0ciA9IHN0ci5zb3VyY2U7XG5cdFx0XHRmbGFncyA9IGhhc0ZsYWdzID8gZmxhZ3MgOiBzdHIuZmxhZ3M7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRzb3VyY2U6IHN0cixcblx0XHRmbGFnczogZmxhZ3MgfHwgJycsXG5cdFx0b3B0aW9uczogb3B0aW9ucyBhcyBJT3B0aW9uc1J1bnRpbWUsXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmcoc3RyOiBzdHJpbmcpXG57XG5cdGxldCBtID0gL14oW1xcLyMkJV0pKC4rPylcXDEoW2Etel0qKSQvLmV4ZWMoc3RyKTtcblx0aWYgKG0pXG5cdHtcblx0XHRsZXQgW3MsIGQsIHIsIGZdID0gbTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRzb3VyY2U6IHR5cGVvZiByICE9PSAndW5kZWZpbmVkJyA/IHIgOiAnJyxcblx0XHRcdGZsYWdzOiB0eXBlb2YgZiAhPT0gJ3VuZGVmaW5lZCcgPyBmIDogJycsXG5cdFx0XHRzbGFzaDogcyxcblx0XHRcdGlucHV0OiBzdHIsXG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBQYXJzZXJFdmVudEVtaXR0ZXIoZXY6IFBhcnNlckV2ZW50RW1pdHRlciwgb3B0aW9uczogSU9wdGlvbnNJbnB1dClcbntcblx0aWYgKG9wdGlvbnMub24pXG5cdHtcblx0XHRmaXhPcHRpb25zKG9wdGlvbnMpLm9uXG5cdFx0XHQuZm9yRWFjaCgoY29uZikgPT5cblx0XHRcdHtcblx0XHRcdFx0T2JqZWN0XG5cdFx0XHRcdFx0LmtleXMoY29uZilcblx0XHRcdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQ6IFBhcnNlckV2ZW50RW1pdHRlckV2ZW50KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGV2Lm9uKGV2ZW50LCBjb25mW2V2ZW50XSlcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHQ7XG5cblx0XHRcdH0pXG5cdFx0O1xuXHR9XG5cblx0cmV0dXJuIGV2O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb3JlSGFuZGxlclxuXG4iXX0=