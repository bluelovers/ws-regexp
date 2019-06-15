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
exports.SymDefaults = Symbol.for('zhRegExp.defaults');
function coreHandler(str, flags = null, options = {}, ...argv) {
    const opts = mergeOptions_1.getSettingOptions(str, flags, options, ...argv);
    let source;
    let hasFlags;
    ({ options, argv } = opts);
    options = mergeOptions_1.fixOptions(options);
    ({ source, hasFlags, flags } = getSource_1.default(opts));
    str = source;
    if ((!options.disableZh || !options.disableLocalRange || options.on)) {
        let ev = regexp_parser_event_1.ParserEventEmitter.create(str, flags || '');
        const zhTableFn = options.zhTable || (options.greedyTable ? conv_1.zhTableAutoGreedyTable : index_1.auto);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpQ0FBK0U7QUFFL0UsNkRBTTZCO0FBUUssNkJBVmpDLHdDQUFrQixDQVVpQztBQVBwRCxnRUFBdUM7QUFFdkMsaURBQStEO0FBQy9ELDREQUFpRDtBQUVqRCx1REFBa0U7QUFNckQsUUFBQSxXQUFXLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBbUUzRCxTQUFnQixXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsVUFBa0MsRUFBRSxFQUFFLEdBQUcsSUFBSTtJQUUzRixNQUFNLElBQUksR0FBRyxnQ0FBaUIsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBRTdELElBQUksTUFBYyxDQUFDO0lBQ25CLElBQUksUUFBaUIsQ0FBQztJQUV0QixDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBRTNCLE9BQU8sR0FBRyx5QkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTlCLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLG1CQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFN0QsR0FBRyxHQUFHLE1BQU0sQ0FBQztJQUViLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUNwRTtRQUNDLElBQUksRUFBRSxHQUFHLHdDQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXJELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxD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QUMxQixDQUFDLENBQUMsQ0FDRjtRQUNGLENBQUMsQ0FBQyxDQUNGO0tBQ0Q7SUFFRCxPQUFPLEVBQUUsQ0FBQztBQUNYLENBQUM7QUFyQkQsMERBcUJDO0FBRUQsa0JBQWUsV0FBVyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX3dvcmRfemhfY29yZSwgX3dvcmRfemhfY29yZTIsIHpoVGFibGVBdXRvR3JlZWR5VGFibGUgfSBmcm9tICcuL2NvbnYnO1xuaW1wb3J0IHsgSUFzdFRvU3RyaW5nT3B0aW9ucyB9IGZyb20gJ3JlZ2V4cC1wYXJzZXItbGl0ZXJhbCc7XG5pbXBvcnQge1xuXHRJTm9kZUlucHV0LFxuXHRJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXIsXG5cdElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lck1hcCxcblx0UGFyc2VyRXZlbnRFbWl0dGVyLFxuXHRQYXJzZXJFdmVudEVtaXR0ZXJFdmVudCxcbn0gZnJvbSAncmVnZXhwLXBhcnNlci1ldmVudCc7XG5pbXBvcnQgcmVnZXhwUmFuZ2UgZnJvbSAncmVnZXhwLXJhbmdlJztcbmltcG9ydCB7IElPcHRpb25zIGFzIElPcHRpb25zWmhUYWJsZSB9IGZyb20gJ2Nqay1jb252L2xpYi96aC90YWJsZS9pbmRleCc7XG5pbXBvcnQgeyBmaXhPcHRpb25zLCBnZXRTZXR0aW5nT3B0aW9ucyB9IGZyb20gJy4vbWVyZ2VPcHRpb25zJztcbmltcG9ydCBnZXRSZWdFeHBTb3VyY2VQYXR0ZXJuIGZyb20gJy4vZ2V0U291cmNlJztcbmltcG9ydCAqIGFzIHpoVGFibGUgZnJvbSAnY2prLWNvbnYvbGliL3poL3RhYmxlL2luZGV4JztcbmltcG9ydCB7IGF1dG8gYXMgemhUYWJsZUF1dG8gfSBmcm9tICdjamstY29udi9saWIvemgvdGFibGUvaW5kZXgnO1xuXG5leHBvcnQgeyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudCwgUGFyc2VyRXZlbnRFbWl0dGVyLCBJTm9kZUlucHV0LCBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXIsIElBc3RUb1N0cmluZ09wdGlvbnMgfVxuXG5leHBvcnQgeyBJT3B0aW9uc1poVGFibGUgfVxuXG5leHBvcnQgY29uc3QgU3ltRGVmYXVsdHMgPSBTeW1ib2wuZm9yKCd6aFJlZ0V4cC5kZWZhdWx0cycpO1xuXG5leHBvcnQgdHlwZSBJT3B0aW9uc0NvcmUgPSB7XG5cdHNraXA/OiBzdHJpbmcsXG5cdGRpc2FibGVaaD86IGJvb2xlYW4sXG5cdC8qKlxuXHQgKiBkaXNhYmxlTG9jYWxSYW5nZSBvbmx5IHdvcmsgd2hlbiBkaXNhYmxlWmggaXMgdHJ1ZVxuXHQgKi9cblx0ZGlzYWJsZUxvY2FsUmFuZ2U/OiBib29sZWFuLFxuXHRhbGxvd0xvY2FsUmFuZ2VBdXRvWmg/OiBib29sZWFuLFxuXHRmbGFncz86IHN0cmluZyxcblxuXHQvKipcblx0ICogYWxsb3cgc3RyIGlzIC9hL2dcblx0ICogQGRlcHJlY2F0ZWRcblx0ICovXG5cdHBhcnNlUmVndWxhckV4cHJlc3Npb25TdHJpbmc/OiBib29sZWFuLFxuXG5cdC8qKlxuXHQgKiDorpMg5paH5a2X5q+U5bCNIOabtOWKoOWvrOmshlxuXHQgKi9cblx0Z3JlZWR5VGFibGU/OiBib29sZWFuIHwgbnVtYmVyLFxuXHR1bnNhZmU/OiBib29sZWFuLFxuXG5cdC8qKlxuXHQgKiBhbGxvdyBzZXQgYENqa0NvbnYuemhUYWJsZS5hdXRvYFxuXHQgKi9cblx0emhUYWJsZT8oY2hhcjogc3RyaW5nLCBvcHRpb25zPzogSU9wdGlvbnNaaFRhYmxlKTogc3RyaW5nW11cblxufSAmIElBc3RUb1N0cmluZ09wdGlvbnM7XG5cbmV4cG9ydCB0eXBlIElPcHRpb25zPFQgZXh0ZW5kcyBJTm9kZUlucHV0ID0gSU5vZGVJbnB1dD4gPSBJT3B0aW9uc0NvcmUgJiB7XG5cdG9uPzogSU9wdGlvbnNPbjxUPiB8IElPcHRpb25zT248VD5bXSxcbn1cblxuZXhwb3J0IHR5cGUgSU9wdGlvbnNSdW50aW1lPFQgZXh0ZW5kcyBJTm9kZUlucHV0ID0gSU5vZGVJbnB1dD4gPSBJT3B0aW9uc0NvcmUgJiB7XG5cdG9uPzogSU9wdGlvbnNPbjxUPltdLFxufVxuXG5leHBvcnQgdHlwZSBJT3B0aW9uc0lucHV0PFQgZXh0ZW5kcyBJTm9kZUlucHV0ID0gSU5vZGVJbnB1dD4gPSBJT3B0aW9uczxUPiB8IElPcHRpb25zUnVudGltZTxUPlxuXG5leHBvcnQgaW50ZXJmYWNlIElDb3JlSGFuZGxlclJldHVybjxUIGV4dGVuZHMgSU5vZGVJbnB1dCA9IElOb2RlSW5wdXQ+XG57XG5cdHNvdXJjZTogc3RyaW5nLFxuXHRmbGFnczogc3RyaW5nLFxuXHRvcHRpb25zOiBJT3B0aW9uc1J1bnRpbWU8VD4sXG59XG5cbi8qXG5leHBvcnQgdHlwZSBJT3B0aW9uc09uPFQgZXh0ZW5kcyBJTm9kZUlucHV0ID0gSU5vZGVJbnB1dD4gPSB7XG5cdFtrIGluIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50XT86IElQYXJzZXJFdmVudEVtaXR0ZXJMaXN0ZW5lcjxULCBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudD47XG59XG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBJT3B0aW9uc09uPFQgZXh0ZW5kcyBJTm9kZUlucHV0ID0gSU5vZGVJbnB1dD4gZXh0ZW5kcyBJUGFyc2VyRXZlbnRFbWl0dGVyTGlzdGVuZXJNYXA8VD5cbntcblx0Ly9cbn1cblxuZXhwb3J0IHR5cGUgSVJlZ0V4cFVzZXJJbnB1dCA9IHN0cmluZyB8IFJlZ0V4cDtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvcmVIYW5kbGVyKHN0cjogSVJlZ0V4cFVzZXJJbnB1dCxcblx0ZmxhZ3M/OiBzdHJpbmcsXG5cdG9wdGlvbnM/OiBJT3B0aW9uc0lucHV0IHwgc3RyaW5nLFxuXHQuLi5hcmd2XG4pOiBJQ29yZUhhbmRsZXJSZXR1cm5cbmV4cG9ydCBmdW5jdGlvbiBjb3JlSGFuZGxlcihzdHI6IElSZWdFeHBVc2VySW5wdXQsIG9wdGlvbnM/OiBJT3B0aW9uc0lucHV0LCAuLi5hcmd2KTogSUNvcmVIYW5kbGVyUmV0dXJuXG5leHBvcnQgZnVuY3Rpb24gY29yZUhhbmRsZXIoc3RyLCBmbGFncyA9IG51bGwsIG9wdGlvbnM6IElPcHRpb25zSW5wdXQgfCBzdHJpbmcgPSB7fSwgLi4uYXJndik6IElDb3JlSGFuZGxlclJldHVyblxue1xuXHRjb25zdCBvcHRzID0gZ2V0U2V0dGluZ09wdGlvbnMoc3RyLCBmbGFncywgb3B0aW9ucywgLi4uYXJndik7XG5cblx0bGV0IHNvdXJjZTogc3RyaW5nO1xuXHRsZXQgaGFzRmxhZ3M6IGJvb2xlYW47XG5cblx0KHsgb3B0aW9ucywgYXJndiB9ID0gb3B0cyk7XG5cblx0b3B0aW9ucyA9IGZpeE9wdGlvbnMob3B0aW9ucyk7XG5cblx0KHsgc291cmNlLCBoYXNGbGFncywgZmxhZ3MgfSA9IGdldFJlZ0V4cFNvdXJjZVBhdHRlcm4ob3B0cykpO1xuXG5cdHN0ciA9IHNvdXJjZTtcblxuXHRpZiAoKCFvcHRpb25zLmRpc2FibGVaaCB8fCAhb3B0aW9ucy5kaXNhYmxlTG9jYWxSYW5nZSB8fCBvcHRpb25zLm9uKSlcblx0e1xuXHRcdGxldCBldiA9IFBhcnNlckV2ZW50RW1pdHRlci5jcmVhdGUoc3RyLCBmbGFncyB8fCAnJyk7XG5cblx0XHRjb25zdCB6aFRhYmxlRm4gPSBvcHRpb25zLnpoVGFibGUgfHwgKG9wdGlvbnMuZ3JlZWR5VGFibGUgPyB6aFRhYmxlQXV0b0dyZWVkeVRhYmxlIDogemhUYWJsZUF1dG8pO1xuXG5cdFx0aWYgKCFvcHRpb25zLmRpc2FibGVaaClcblx0XHR7XG5cdFx0XHRldi5vbihQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5kZWZhdWx0LCBmdW5jdGlvbiAoYXN0KVxuXHRcdFx0e1xuXHRcdFx0XHRhc3Qub2xkX3JhdyA9IGFzdC5vbGRfcmF3IHx8IGFzdC5yYXc7XG5cblx0XHRcdFx0bGV0IHJhdyA9IF93b3JkX3poX2NvcmUoYXN0LnJhdywgKG9wdGlvbnMgYXMgSU9wdGlvbnMpLnNraXAsIHpoVGFibGVGbiwgb3B0aW9ucyBhcyBJT3B0aW9ucyk7XG5cblx0XHRcdFx0aWYgKGFzdC5yYXcgIT09IHJhdylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFzdC5yYXcgPSByYXc7XG5cdFx0XHRcdFx0ZXYuZW1pdChQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jaGFuZ2UsIGFzdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICghb3B0aW9ucy5kaXNhYmxlTG9jYWxSYW5nZSlcblx0XHR7XG5cdFx0XHRldi5vbihQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jbGFzc19yYW5nZSwgZnVuY3Rpb24gKGFzdCwgLi4uYXJndilcblx0XHRcdHtcblx0XHRcdFx0bGV0IHMgPSBhc3QubWluLnJhdztcblx0XHRcdFx0bGV0IGUgPSBhc3QubWF4LnJhdztcblxuXHRcdFx0XHRsZXQgcmV0ID0gcmVnZXhwUmFuZ2UocywgZSwge1xuXHRcdFx0XHRcdGNyZWF0ZVJlZ0V4cFN0cmluZzogdHJ1ZSxcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGlmIChyZXQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZiAoKG9wdGlvbnMgYXMgSU9wdGlvbnMpLmFsbG93TG9jYWxSYW5nZUF1dG9aaClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXQgPSBfd29yZF96aF9jb3JlMihyZXQsIChvcHRpb25zIGFzIElPcHRpb25zKS5za2lwLCB6aFRhYmxlRm4sIG9wdGlvbnMgYXMgSU9wdGlvbnMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGFzdC5vbGRfcmF3ID0gYXN0Lm9sZF9yYXcgfHwgYXN0LnJhdztcblxuXHRcdFx0XHRcdGlmIChhc3QucmF3ICE9PSByZXQpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0YXN0LnJhdyA9IHJldDtcblxuXHRcdFx0XHRcdFx0ZXYuZW1pdChQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jaGFuZ2UsIGFzdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRzZXR1cFBhcnNlckV2ZW50RW1pdHRlcihldiwgb3B0aW9ucyk7XG5cblx0XHRldi5yZXN1bWUoKTtcblxuXHRcdHN0ciA9IGV2LmdldFNvdXJjZSghIW9wdGlvbnMuZGVidWdDaGFuZ2VkXG5cdFx0XHR8fCAhb3B0aW9ucy5ub1VuaXF1ZUNsYXNzXG5cdFx0XHR8fCBvcHRpb25zLnNvcnRDbGFzc1xuXHRcdFx0LCBvcHRpb25zKTtcblx0XHRmbGFncyA9IGhhc0ZsYWdzID8gZmxhZ3MgOiBldi5mbGFncztcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0c291cmNlOiBzdHIsXG5cdFx0ZmxhZ3M6IGZsYWdzIHx8ICcnLFxuXHRcdG9wdGlvbnM6IG9wdGlvbnMgYXMgSU9wdGlvbnNSdW50aW1lLFxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFBhcnNlckV2ZW50RW1pdHRlcihldjogUGFyc2VyRXZlbnRFbWl0dGVyLCBvcHRpb25zOiBJT3B0aW9uc0lucHV0KVxue1xuXHRjb25zdCBvbkxpc3QgPSBmaXhPcHRpb25zKG9wdGlvbnMpLm9uO1xuXG5cdGlmIChvbkxpc3QpXG5cdHtcblx0XHRvbkxpc3Rcblx0XHRcdC5mb3JFYWNoKChjb25mKSA9PlxuXHRcdFx0e1xuXHRcdFx0XHRPYmplY3Rcblx0XHRcdFx0XHQua2V5cyhjb25mKVxuXHRcdFx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChldmVudDogUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZXYub24oZXZlbnQsIGNvbmZbZXZlbnRdKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdDtcblx0XHRcdH0pXG5cdFx0O1xuXHR9XG5cblx0cmV0dXJuIGV2O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb3JlSGFuZGxlclxuXG4iXX0=