"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conv_1 = require("./conv");
const regexp_parser_event_1 = require("regexp-parser-event");
exports.ParserEventEmitter = regexp_parser_event_1.ParserEventEmitter;
const regexp_range_1 = __importDefault(require("regexp-range"));
const mergeOptions_1 = require("./mergeOptions");
const getSource_1 = __importDefault(require("./getSource"));
const index_1 = require("cjk-conv/lib/zh/table/index");
const plugin_1 = require("./plugin");
exports.SymDefaults = Symbol.for('zhRegExp.defaults');
function coreHandler(str, flags = null, options = {}, ...argv) {
    const opts = mergeOptions_1.getSettingOptions(str, flags, options, ...argv);
    let source;
    let hasFlags;
    ({ options, argv } = opts);
    options = mergeOptions_1.fixOptions(options);
    ({ source, hasFlags, flags } = getSource_1.default(opts));
    str = source;
    if (options.onCore) {
        let optsNew = options.onCore.reduce((a, setting) => {
            if (!setting.beforeStart) {
                return a;
            }
            return setting.beforeStart(a);
        }, {
            str,
            flags,
            options,
            argv,
            hasFlags,
        });
        ({ str, options, flags, argv, hasFlags } = optsNew);
    }
    if ((!options.disableZh || !options.disableLocalRange || options.on)) {
        let ev = regexp_parser_event_1.ParserEventEmitter.create(str, flags || '');
        const zhTableFn = options.zhTable || (options.greedyTable ? conv_1.zhTableAutoGreedyTable : index_1.auto);
        if (!options.disableZh) {
            ev.on("default" /* default */, function (ast) {
                plugin_1.astOldRaw(ast);
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
                    plugin_1.astOldRaw(ast);
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
    if (options.onCore) {
        let optsNew = options.onCore.reduce((a, setting) => {
            if (!setting.afterStart) {
                return a;
            }
            return setting.afterStart(a);
        }, {
            str,
            flags,
            options,
            argv,
            hasFlags,
        });
        ({ str, options, flags, argv, hasFlags } = optsNew);
    }
    return {
        source: str,
        flags: flags || '',
        options: options,
    };
}
exports.coreHandler = coreHandler;
function setupParserEventEmitter(ev, options) {
    const onList = mergeOptions_1.fixOptions(options).on;
    if (onList) {
        onList
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpQ0FBK0U7QUFFL0UsNkRBTTZCO0FBU0ssNkJBWGpDLHdDQUFrQixDQVdpQztBQVJwRCxnRUFBdUM7QUFFdkMsaURBQW1GO0FBQ25GLDREQUFpRDtBQUVqRCx1REFBa0U7QUFDbEUscUNBQW9EO0FBTXZDLFFBQUEsV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQW1HM0QsU0FBZ0IsV0FBVyxDQUFDLEdBQUcsRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLFVBQWtDLEVBQUUsRUFBRSxHQUFHLElBQUk7SUFFM0YsTUFBTSxJQUFJLEdBQUcsZ0NBQWlCLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUU3RCxJQUFJLE1BQWMsQ0FBQztJQUNuQixJQUFJLFFBQWlCLENBQUM7SUFFdEIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUUzQixPQUFPLEdBQUcseUJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU5QixDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxtQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRTdELEdBQUcsR0FBRyxNQUFNLENBQUM7SUFFYixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQ2xCO1FBQ0MsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFFbEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQ3hCO2dCQUNDLE9BQU8sQ0FBQyxDQUFBO2FBQ1I7WUFFRCxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7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ZUF1dG9HcmVlZHlUYWJsZSB9IGZyb20gJy4vY29udic7XG5pbXBvcnQgeyBJQXN0VG9TdHJpbmdPcHRpb25zIH0gZnJvbSAncmVnZXhwLXBhcnNlci1saXRlcmFsJztcbmltcG9ydCB7XG5cdElOb2RlSW5wdXQsXG5cdElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcixcblx0SVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyTWFwLFxuXHRQYXJzZXJFdmVudEVtaXR0ZXIsXG5cdFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LFxufSBmcm9tICdyZWdleHAtcGFyc2VyLWV2ZW50JztcbmltcG9ydCByZWdleHBSYW5nZSBmcm9tICdyZWdleHAtcmFuZ2UnO1xuaW1wb3J0IHsgSU9wdGlvbnMgYXMgSU9wdGlvbnNaaFRhYmxlIH0gZnJvbSAnY2prLWNvbnYvbGliL3poL3RhYmxlL2luZGV4JztcbmltcG9ydCB7IGZpeE9wdGlvbnMsIGdldFNldHRpbmdPcHRpb25zLCBJR2V0U2V0dGluZ09wdGlvbnMgfSBmcm9tICcuL21lcmdlT3B0aW9ucyc7XG5pbXBvcnQgZ2V0UmVnRXhwU291cmNlUGF0dGVybiBmcm9tICcuL2dldFNvdXJjZSc7XG5pbXBvcnQgKiBhcyB6aFRhYmxlIGZyb20gJ2Nqay1jb252L2xpYi96aC90YWJsZS9pbmRleCc7XG5pbXBvcnQgeyBhdXRvIGFzIHpoVGFibGVBdXRvIH0gZnJvbSAnY2prLWNvbnYvbGliL3poL3RhYmxlL2luZGV4JztcbmltcG9ydCB7IGFzdE5vdENoYW5nZWQsIGFzdE9sZFJhdyB9IGZyb20gJy4vcGx1Z2luJztcblxuZXhwb3J0IHsgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQsIFBhcnNlckV2ZW50RW1pdHRlciwgSU5vZGVJbnB1dCwgSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyLCBJQXN0VG9TdHJpbmdPcHRpb25zIH1cblxuZXhwb3J0IHsgSU9wdGlvbnNaaFRhYmxlIH1cblxuZXhwb3J0IGNvbnN0IFN5bURlZmF1bHRzID0gU3ltYm9sLmZvcignemhSZWdFeHAuZGVmYXVsdHMnKTtcblxuZXhwb3J0IHR5cGUgSU9wdGlvbnNDb3JlID0ge1xuXHRza2lwPzogc3RyaW5nLFxuXHRkaXNhYmxlWmg/OiBib29sZWFuLFxuXHQvKipcblx0ICogZGlzYWJsZUxvY2FsUmFuZ2Ugb25seSB3b3JrIHdoZW4gZGlzYWJsZVpoIGlzIHRydWVcblx0ICovXG5cdGRpc2FibGVMb2NhbFJhbmdlPzogYm9vbGVhbixcblx0YWxsb3dMb2NhbFJhbmdlQXV0b1poPzogYm9vbGVhbixcblx0LyoqXG5cdCAqIOW8t+WItuikh+WvqyBmbGFncyDoqK3lrppcblx0ICog5L2G55W25L2/55So5pa8IHpoUmVnRXhwLnVzZSDlhafmmYIg5YmH5pyD6Ieq5YuV6KKr6L2J5o+b54K6IGRlZmF1bHRGbGFnc1xuXHQgKi9cblx0ZmxhZ3M/OiBzdHJpbmcsXG5cdC8qKlxuXHQgKiDnlbbmspLmnInoqK3lrpogZmxhZ3Mg5pmC55qE6aCQ6Kit5YC8XG5cdCAqL1xuXHRkZWZhdWx0RmxhZ3M/OiBzdHJpbmcsXG5cblx0LyoqXG5cdCAqIGFsbG93IHN0ciBpcyAvYS9nXG5cdCAqIEBkZXByZWNhdGVkXG5cdCAqL1xuXHRwYXJzZVJlZ3VsYXJFeHByZXNzaW9uU3RyaW5nPzogYm9vbGVhbixcblxuXHQvKipcblx0ICog6K6TIOaWh+Wtl+avlOWwjSDmm7TliqDlr6zprIZcblx0ICovXG5cdGdyZWVkeVRhYmxlPzogYm9vbGVhbiB8IG51bWJlcixcblx0dW5zYWZlPzogYm9vbGVhbixcblxuXHQvKipcblx0ICogYWxsb3cgc2V0IGBDamtDb252LnpoVGFibGUuYXV0b2Bcblx0ICovXG5cdHpoVGFibGU/KGNoYXI6IHN0cmluZywgb3B0aW9ucz86IElPcHRpb25zWmhUYWJsZSk6IHN0cmluZ1tdLFxuXG5cdC8qKlxuXHQgKiDnlKjkvobop6Pmsbrmj5Lku7bpnIDmsYJcblx0ICovXG5cdG9uQ29yZT86IElPcHRpb25zT25Db3JlW10sXG5cbn0gJiBJQXN0VG9TdHJpbmdPcHRpb25zO1xuXG5leHBvcnQgaW50ZXJmYWNlIElPcHRpb25zT25Db3JlXG57XG5cdC8qKlxuXHQgKiDln7fooYzmlrzliIbmnpDlj4Pmlbjlvowg5Z+36KGMIOaguOW/g+iZleeQhuWJjVxuXHQgKiDlm57lgrPnmoTnianku7bmnIPlj5bku6Plj4Pmlbhcblx0ICovXG5cdGJlZm9yZVN0YXJ0PyhvcHRzOiBJR2V0U2V0dGluZ09wdGlvbnM8c3RyaW5nPiAmIHtcblx0XHRoYXNGbGFnczogYm9vbGVhbixcblx0fSk6IElHZXRTZXR0aW5nT3B0aW9ucyAmIHtcblx0XHRoYXNGbGFnczogYm9vbGVhbixcblx0fTtcblxuXHRhZnRlclN0YXJ0PyhvcHRzOiBJR2V0U2V0dGluZ09wdGlvbnM8c3RyaW5nPiAmIHtcblx0XHRoYXNGbGFnczogYm9vbGVhbixcblx0fSk6IElHZXRTZXR0aW5nT3B0aW9ucyAmIHtcblx0XHRoYXNGbGFnczogYm9vbGVhbixcblx0fTtcbn1cblxuZXhwb3J0IHR5cGUgSU9wdGlvbnM8VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PiA9IElPcHRpb25zQ29yZSAmIHtcblx0b24/OiBJT3B0aW9uc09uPFQ+IHwgSU9wdGlvbnNPbjxUPltdLFxufVxuXG5leHBvcnQgdHlwZSBJT3B0aW9uc1J1bnRpbWU8VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PiA9IElPcHRpb25zQ29yZSAmIHtcblx0b24/OiBJT3B0aW9uc09uPFQ+W10sXG59XG5cbmV4cG9ydCB0eXBlIElPcHRpb25zSW5wdXQ8VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PiA9IElPcHRpb25zPFQ+IHwgSU9wdGlvbnNSdW50aW1lPFQ+XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvcmVIYW5kbGVyUmV0dXJuPFQgZXh0ZW5kcyBJTm9kZUlucHV0ID0gSU5vZGVJbnB1dD5cbntcblx0c291cmNlOiBzdHJpbmcsXG5cdGZsYWdzOiBzdHJpbmcsXG5cdG9wdGlvbnM6IElPcHRpb25zUnVudGltZTxUPixcbn1cblxuLypcbmV4cG9ydCB0eXBlIElPcHRpb25zT248VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PiA9IHtcblx0W2sgaW4gUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnRdPzogSVBhcnNlckV2ZW50RW1pdHRlckxpc3RlbmVyPFQsIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50Pjtcbn1cbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIElPcHRpb25zT248VCBleHRlbmRzIElOb2RlSW5wdXQgPSBJTm9kZUlucHV0PiBleHRlbmRzIElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lck1hcDxUPlxue1xuXHQvL1xufVxuXG5leHBvcnQgdHlwZSBJUmVnRXhwVXNlcklucHV0ID0gc3RyaW5nIHwgUmVnRXhwO1xuXG5leHBvcnQgZnVuY3Rpb24gY29yZUhhbmRsZXIoc3RyOiBJUmVnRXhwVXNlcklucHV0LFxuXHRmbGFncz86IHN0cmluZyxcblx0b3B0aW9ucz86IElPcHRpb25zSW5wdXQgfCBzdHJpbmcsXG5cdC4uLmFyZ3Zcbik6IElDb3JlSGFuZGxlclJldHVyblxuZXhwb3J0IGZ1bmN0aW9uIGNvcmVIYW5kbGVyKHN0cjogSVJlZ0V4cFVzZXJJbnB1dCwgb3B0aW9ucz86IElPcHRpb25zSW5wdXQsIC4uLmFyZ3YpOiBJQ29yZUhhbmRsZXJSZXR1cm5cbmV4cG9ydCBmdW5jdGlvbiBjb3JlSGFuZGxlcihzdHIsIGZsYWdzID0gbnVsbCwgb3B0aW9uczogSU9wdGlvbnNJbnB1dCB8IHN0cmluZyA9IHt9LCAuLi5hcmd2KTogSUNvcmVIYW5kbGVyUmV0dXJuXG57XG5cdGNvbnN0IG9wdHMgPSBnZXRTZXR0aW5nT3B0aW9ucyhzdHIsIGZsYWdzLCBvcHRpb25zLCAuLi5hcmd2KTtcblxuXHRsZXQgc291cmNlOiBzdHJpbmc7XG5cdGxldCBoYXNGbGFnczogYm9vbGVhbjtcblxuXHQoeyBvcHRpb25zLCBhcmd2IH0gPSBvcHRzKTtcblxuXHRvcHRpb25zID0gZml4T3B0aW9ucyhvcHRpb25zKTtcblxuXHQoeyBzb3VyY2UsIGhhc0ZsYWdzLCBmbGFncyB9ID0gZ2V0UmVnRXhwU291cmNlUGF0dGVybihvcHRzKSk7XG5cblx0c3RyID0gc291cmNlO1xuXG5cdGlmIChvcHRpb25zLm9uQ29yZSlcblx0e1xuXHRcdGxldCBvcHRzTmV3ID0gb3B0aW9ucy5vbkNvcmUucmVkdWNlKChhLCBzZXR0aW5nKSA9PiB7XG5cblx0XHRcdGlmICghc2V0dGluZy5iZWZvcmVTdGFydClcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIGFcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHNldHRpbmcuYmVmb3JlU3RhcnQoYSk7XG5cdFx0fSwge1xuXHRcdFx0c3RyLFxuXHRcdFx0ZmxhZ3MsXG5cdFx0XHRvcHRpb25zLFxuXHRcdFx0YXJndixcblx0XHRcdGhhc0ZsYWdzLFxuXHRcdH0pO1xuXG5cdFx0KHsgc3RyLCBvcHRpb25zLCBmbGFncywgYXJndiwgaGFzRmxhZ3MgfSA9IG9wdHNOZXcpO1xuXHR9XG5cblx0aWYgKCghb3B0aW9ucy5kaXNhYmxlWmggfHwgIW9wdGlvbnMuZGlzYWJsZUxvY2FsUmFuZ2UgfHwgb3B0aW9ucy5vbikpXG5cdHtcblx0XHRsZXQgZXYgPSBQYXJzZXJFdmVudEVtaXR0ZXIuY3JlYXRlKHN0ciwgZmxhZ3MgfHwgJycpO1xuXG5cdFx0Y29uc3QgemhUYWJsZUZuID0gb3B0aW9ucy56aFRhYmxlIHx8IChvcHRpb25zLmdyZWVkeVRhYmxlID8gemhUYWJsZUF1dG9HcmVlZHlUYWJsZSA6IHpoVGFibGVBdXRvKTtcblxuXHRcdGlmICghb3B0aW9ucy5kaXNhYmxlWmgpXG5cdFx0e1xuXHRcdFx0ZXYub24oUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuZGVmYXVsdCwgZnVuY3Rpb24gKGFzdClcblx0XHRcdHtcblx0XHRcdFx0YXN0T2xkUmF3KGFzdCk7XG5cblx0XHRcdFx0bGV0IHJhdyA9IF93b3JkX3poX2NvcmUoYXN0LnJhdywgKG9wdGlvbnMgYXMgSU9wdGlvbnMpLnNraXAsIHpoVGFibGVGbiwgb3B0aW9ucyBhcyBJT3B0aW9ucyk7XG5cblx0XHRcdFx0aWYgKGFzdC5yYXcgIT09IHJhdylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFzdC5yYXcgPSByYXc7XG5cdFx0XHRcdFx0ZXYuZW1pdChQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jaGFuZ2UsIGFzdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICghb3B0aW9ucy5kaXNhYmxlTG9jYWxSYW5nZSlcblx0XHR7XG5cdFx0XHRldi5vbihQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzc19yYW5nZSwgZnVuY3Rpb24gKGFzdCwgLi4uYXJndilcblx0XHRcdHtcblx0XHRcdFx0bGV0IHMgPSBhc3QubWluLnJhdztcblx0XHRcdFx0bGV0IGUgPSBhc3QubWF4LnJhdztcblxuXHRcdFx0XHRsZXQgcmV0ID0gcmVnZXhwUmFuZ2UocywgZSwge1xuXHRcdFx0XHRcdGNyZWF0ZVJlZ0V4cFN0cmluZzogdHJ1ZSxcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGlmIChyZXQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZiAoKG9wdGlvbnMgYXMgSU9wdGlvbnMpLmFsbG93TG9jYWxSYW5nZUF1dG9aaClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXQgPSBfd29yZF96aF9jb3JlMihyZXQsIChvcHRpb25zIGFzIElPcHRpb25zKS5za2lwLCB6aFRhYmxlRm4sIG9wdGlvbnMgYXMgSU9wdGlvbnMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGFzdE9sZFJhdyhhc3QpO1xuXG5cdFx0XHRcdFx0aWYgKGFzdC5yYXcgIT09IHJldClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRhc3QucmF3ID0gcmV0O1xuXG5cdFx0XHRcdFx0XHRldi5lbWl0KFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNoYW5nZSwgYXN0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHNldHVwUGFyc2VyRXZlbnRFbWl0dGVyKGV2LCBvcHRpb25zKTtcblxuXHRcdGV2LnJlc3VtZSgpO1xuXG5cdFx0c3RyID0gZXYuZ2V0U291cmNlKCEhb3B0aW9ucy5kZWJ1Z0NoYW5nZWRcblx0XHRcdHx8ICFvcHRpb25zLm5vVW5pcXVlQ2xhc3Ncblx0XHRcdHx8IG9wdGlvbnMuc29ydENsYXNzXG5cdFx0XHQsIG9wdGlvbnMpO1xuXHRcdGZsYWdzID0gaGFzRmxhZ3MgPyBmbGFncyA6IGV2LmZsYWdzO1xuXHR9XG5cblx0aWYgKG9wdGlvbnMub25Db3JlKVxuXHR7XG5cdFx0bGV0IG9wdHNOZXcgPSBvcHRpb25zLm9uQ29yZS5yZWR1Y2UoKGEsIHNldHRpbmcpID0+IHtcblxuXHRcdFx0aWYgKCFzZXR0aW5nLmFmdGVyU3RhcnQpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBhXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzZXR0aW5nLmFmdGVyU3RhcnQoYSk7XG5cdFx0fSwge1xuXHRcdFx0c3RyLFxuXHRcdFx0ZmxhZ3MsXG5cdFx0XHRvcHRpb25zLFxuXHRcdFx0YXJndixcblx0XHRcdGhhc0ZsYWdzLFxuXHRcdH0pO1xuXG5cdFx0KHsgc3RyLCBvcHRpb25zLCBmbGFncywgYXJndiwgaGFzRmxhZ3MgfSA9IG9wdHNOZXcpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRzb3VyY2U6IHN0cixcblx0XHRmbGFnczogZmxhZ3MgfHwgJycsXG5cdFx0b3B0aW9uczogb3B0aW9ucyBhcyBJT3B0aW9uc1J1bnRpbWUsXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwUGFyc2VyRXZlbnRFbWl0dGVyKGV2OiBQYXJzZXJFdmVudEVtaXR0ZXIsIG9wdGlvbnM6IElPcHRpb25zSW5wdXQpXG57XG5cdGNvbnN0IG9uTGlzdCA9IGZpeE9wdGlvbnMob3B0aW9ucykub247XG5cblx0aWYgKG9uTGlzdClcblx0e1xuXHRcdG9uTGlzdFxuXHRcdFx0LmZvckVhY2goKGNvbmYpID0+XG5cdFx0XHR7XG5cdFx0XHRcdE9iamVjdFxuXHRcdFx0XHRcdC5rZXlzKGNvbmYpXG5cdFx0XHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGV2ZW50OiBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRldi5vbihldmVudCwgY29uZltldmVudF0gYXMgYW55KVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdDtcblx0XHRcdH0pXG5cdFx0O1xuXHR9XG5cblx0cmV0dXJuIGV2O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb3JlSGFuZGxlclxuXG4iXX0=