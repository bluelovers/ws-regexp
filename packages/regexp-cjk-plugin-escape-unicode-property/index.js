"use strict";
/**
 * Created by user on 2019/6/15.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const regexp_parser_event_1 = __importDefault(require("regexp-parser-event"));
const regexpu_core_1 = __importDefault(require("regexpu-core"));
const plugin_1 = require("regexp-cjk/lib/plugin");
/**
 * use regexpu for escape unicode property
 * avoid some system or browser not fully support unicode property
 */
function createZhRegExpCorePlugin(options = {}) {
    const { escapeAuto = true, escapeAll } = options;
    return {
        afterStart(opts) {
            if (escapeAuto || escapeAll) {
                const { str, flags } = opts;
                const _flags = flags || '';
                const useUnicodeFlag = _flags.includes('u');
                let ev = regexp_parser_event_1.default.create(str, flags || '');
                let _do = escapeAll || escapeAuto && /\\p\{[^{}]+\}/i.test(str);
                if (_do) {
                    ev.on("uniset" /* uniset */, function (ast, eventName, ev) {
                        if (plugin_1.astNotChanged(ast) && astUnicodePropertyCharacterSet(ast)) {
                            let raw = unicodePropertyEscape(ast.raw, _flags, useUnicodeFlag);
                            if (raw !== ast.raw) {
                                ast.raw = raw;
                                ev.emitChange(ast);
                            }
                        }
                    });
                    ev.on("class" /* class */, function (ast, eventName, ev) {
                        if (plugin_1.astNotChanged(ast) && /\\p{/.test(ast.raw)) {
                            let raw = unicodePropertyEscape(ast.raw, _flags, useUnicodeFlag);
                            if (raw !== ast.raw) {
                                ast.raw = raw;
                                delete ast.elements;
                                ev.emitChange(ast);
                            }
                        }
                    });
                }
                ev.resume();
                opts.str = ev.getSource();
            }
            return opts;
        }
    };
}
exports.createZhRegExpCorePlugin = createZhRegExpCorePlugin;
function astUnicodePropertyCharacterSet(ast) {
    return (ast.kind === "property" /* UnicodePropertyCharacterSet */);
}
exports.astUnicodePropertyCharacterSet = astUnicodePropertyCharacterSet;
function checkUnicodePropertyEscape(ast) {
    if (ast.value == 'Punctuation') {
        return true;
    }
}
exports.checkUnicodePropertyEscape = checkUnicodePropertyEscape;
function unicodePropertyEscape(raw, flags, useUnicodeFlag) {
    return regexpu_core_1.default(raw, flags, {
        unicodePropertyEscape: true,
        useUnicodeFlag,
    });
}
exports.unicodePropertyEscape = unicodePropertyEscape;
exports.default = createZhRegExpCorePlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7O0FBU0gsOEVBQThGO0FBQzlGLGdFQUEwQztBQUkxQyxrREFBc0Q7QUFldEQ7OztHQUdHO0FBQ0gsU0FBZ0Isd0JBQXdCLENBQUMsVUFBc0MsRUFBRTtJQUVoRixNQUFNLEVBQUUsVUFBVSxHQUFHLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFFakQsT0FBTztRQUNOLFVBQVUsQ0FBQyxJQUFJO1lBRWQsSUFBSSxVQUFVLElBQUksU0FBUyxFQUMzQjtnQkFDQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQztnQkFFNUIsTUFBTSxNQUFNLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDM0IsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFNUMsSUFBSSxFQUFFLEdBQUcsNkJBQWtCLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBRXJELElBQUksR0FBRyxHQUFHLFNBQVMsSUFBSSxVQUFVLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVoRSxJQUFJLEdBQUcsRUFDUDtvQkFDQyxFQUFFLENBQUMsRUFBRSx3QkFBaUMsVUFBVSxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQUU7d0JBRWpFLElBQUksc0JBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSw4QkFBOEIsQ0FBQyxHQUFHLENBQUMsRUFDN0Q7NEJBQ0MsSUFBSSxHQUFHLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUM7NEJBRWpFLElBQUksR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQ25CO2dDQUNDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO2dDQUVkLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7NkJBQ25CO3lCQUNEO29CQUNGLENBQUMsQ0FBQyxDQUFDO29CQUVILEVBQUUsQ0FBQyxFQUFFLHNCQUFnQyxVQUFVLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRTt3QkFFaEUsSUFBSSxzQkFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUM5Qzs0QkFDQyxJQUFJLEdBQUcsR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQzs0QkFFakUsSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsRUFDbkI7Z0NBQ0MsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0NBRWQsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDO2dDQUVwQixFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzZCQUNuQjt5QkFDRDtvQkFFRixDQUFDLENBQUMsQ0FBQztpQkFFSDtnQkFFRCxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBRVosSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDMUI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNiLENBQUM7S0FDRCxDQUFBO0FBQ0YsQ0FBQztBQS9ERCw0REErREM7QUFFRCxTQUFnQiw4QkFBOEIsQ0FBQyxHQUFpQjtJQUUvRCxPQUFPLENBQUUsR0FBd0IsQ0FBQyxJQUFJLGlEQUFxRCxDQUFDLENBQUM7QUFDOUYsQ0FBQztBQUhELHdFQUdDO0FBRUQsU0FBZ0IsMEJBQTBCLENBQUMsR0FBb0M7SUFFOUUsSUFBSSxHQUFHLENBQUMsS0FBSyxJQUFJLGFBQWEsRUFDOUI7UUFDQyxPQUFPLElBQUksQ0FBQztLQUNaO0FBQ0YsQ0FBQztBQU5ELGdFQU1DO0FBRUQsU0FBZ0IscUJBQXFCLENBQUMsR0FBVyxFQUFFLEtBQWEsRUFBRSxjQUF1QjtJQUV4RixPQUFPLHNCQUFjLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTtRQUNqQyxxQkFBcUIsRUFBRSxJQUFJO1FBQzNCLGNBQWM7S0FDZCxDQUFDLENBQUE7QUFDSCxDQUFDO0FBTkQsc0RBTUM7QUFFRCxrQkFBZSx3QkFBd0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTkvNi8xNS5cbiAqL1xuXG5pbXBvcnQgeyBhcnJheV91bmlxdWVfb3ZlcndyaXRlIH0gZnJvbSAnYXJyYXktaHlwZXItdW5pcXVlJ1xuaW1wb3J0IFN0clV0aWwgZnJvbSAnc3RyLXV0aWwnO1xuaW1wb3J0IHsgRnVsbEhhbGZDb3JlLCB0b0Z1bGxOdW1iZXIsIHRvSGFsZk51bWJlciwgdG9GdWxsRW5nbGlzaCwgdG9IYWxmRW5nbGlzaCwgdG9GdWxsV2lkdGgsIHRvSGFsZldpZHRoIH0gZnJvbSAnc3RyLXV0aWwvbGliL2Z1bGxoYWxmJztcbmltcG9ydCB7IF9nZXQgYXMgX2dldEFycmF5VGFibGUgfSBmcm9tICdjamstY29udi9saWIvemgvdGFibGUvdGFibGUnO1xuaW1wb3J0IHsgSU9wdGlvbnNPbiwgSU9wdGlvbnNPbkNvcmUsIElSZWdFeHBVc2VySW5wdXQgfSBmcm9tICdyZWdleHAtY2prL2xpYi9jb3JlJztcbmltcG9ydCBVU3RyaW5nIGZyb20gJ3VuaS1zdHJpbmcvc3JjL2NvcmUnO1xuaW1wb3J0IGdldFZvaWNlQWxsIGZyb20gJ2Nqay1jb252L2xpYi9qcC90YWJsZV92b2ljZSc7XG5pbXBvcnQgUGFyc2VyRXZlbnRFbWl0dGVyLCB7IElOb2RlSW5wdXQsIFBhcnNlckV2ZW50RW1pdHRlckV2ZW50IH0gZnJvbSAncmVnZXhwLXBhcnNlci1ldmVudCc7XG5pbXBvcnQgcmV3cml0ZVBhdHRlcm4gZnJvbSAncmVnZXhwdS1jb3JlJztcbmltcG9ydCB7IEFTVCwgRW51bUtpbmRDaGFyYWN0ZXJTZXQgfSBmcm9tIFwicmVnZXhwcDJcIjtcbmltcG9ydCB7IE5vZGVCYXNlIH0gZnJvbSAncmVnZXhwcDIvc3JjL2FzdCc7XG5pbXBvcnQgeyBJR2V0U2V0dGluZ09wdGlvbnMgfSBmcm9tICdyZWdleHAtY2prL2xpYi9tZXJnZU9wdGlvbnMnO1xuaW1wb3J0IHsgYXN0Tm90Q2hhbmdlZCB9IGZyb20gJ3JlZ2V4cC1jamsvbGliL3BsdWdpbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVpoUmVnRXhwQ29yZVBsdWdpbk9wdGlvbnNcbntcblx0LyoqXG5cdCAqIGp1c3QgZG8gaXRcblx0ICovXG5cdGVzY2FwZUFsbD86IGJvb2xlYW4sXG5cdC8qKlxuXHQgKiBhdXRvIGRldGVjdCBkbyBvciBub3Rcblx0ICogQGRlZmF1bHQgdHJ1ZVxuXHQgKi9cblx0ZXNjYXBlQXV0bz86IGJvb2xlYW4sXG59XG5cbi8qKlxuICogdXNlIHJlZ2V4cHUgZm9yIGVzY2FwZSB1bmljb2RlIHByb3BlcnR5XG4gKiBhdm9pZCBzb21lIHN5c3RlbSBvciBicm93c2VyIG5vdCBmdWxseSBzdXBwb3J0IHVuaWNvZGUgcHJvcGVydHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVpoUmVnRXhwQ29yZVBsdWdpbihvcHRpb25zOiBJWmhSZWdFeHBDb3JlUGx1Z2luT3B0aW9ucyA9IHt9KTogSU9wdGlvbnNPbkNvcmVcbntcblx0Y29uc3QgeyBlc2NhcGVBdXRvID0gdHJ1ZSwgZXNjYXBlQWxsIH0gPSBvcHRpb25zO1xuXG5cdHJldHVybiB7XG5cdFx0YWZ0ZXJTdGFydChvcHRzKVxuXHRcdHtcblx0XHRcdGlmIChlc2NhcGVBdXRvIHx8IGVzY2FwZUFsbClcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgeyBzdHIsIGZsYWdzIH0gPSBvcHRzO1xuXG5cdFx0XHRcdGNvbnN0IF9mbGFncyA9IGZsYWdzIHx8ICcnO1xuXHRcdFx0XHRjb25zdCB1c2VVbmljb2RlRmxhZyA9IF9mbGFncy5pbmNsdWRlcygndScpO1xuXG5cdFx0XHRcdGxldCBldiA9IFBhcnNlckV2ZW50RW1pdHRlci5jcmVhdGUoc3RyLCBmbGFncyB8fCAnJyk7XG5cblx0XHRcdFx0bGV0IF9kbyA9IGVzY2FwZUFsbCB8fCBlc2NhcGVBdXRvICYmIC9cXFxccFxce1tee31dK1xcfS9pLnRlc3Qoc3RyKTtcblxuXHRcdFx0XHRpZiAoX2RvKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXYub24oUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQudW5pc2V0LCBmdW5jdGlvbiAoYXN0LCBldmVudE5hbWUsIGV2KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmIChhc3ROb3RDaGFuZ2VkKGFzdCkgJiYgYXN0VW5pY29kZVByb3BlcnR5Q2hhcmFjdGVyU2V0KGFzdCkpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGxldCByYXcgPSB1bmljb2RlUHJvcGVydHlFc2NhcGUoYXN0LnJhdywgX2ZsYWdzLCB1c2VVbmljb2RlRmxhZyk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKHJhdyAhPT0gYXN0LnJhdylcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGFzdC5yYXcgPSByYXc7XG5cblx0XHRcdFx0XHRcdFx0XHRldi5lbWl0Q2hhbmdlKGFzdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGV2Lm9uKFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNsYXNzLCBmdW5jdGlvbiAoYXN0LCBldmVudE5hbWUsIGV2KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmIChhc3ROb3RDaGFuZ2VkKGFzdCkgJiYgL1xcXFxwey8udGVzdChhc3QucmF3KSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bGV0IHJhdyA9IHVuaWNvZGVQcm9wZXJ0eUVzY2FwZShhc3QucmF3LCBfZmxhZ3MsIHVzZVVuaWNvZGVGbGFnKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAocmF3ICE9PSBhc3QucmF3KVxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0YXN0LnJhdyA9IHJhdztcblxuXHRcdFx0XHRcdFx0XHRcdGRlbGV0ZSBhc3QuZWxlbWVudHM7XG5cblx0XHRcdFx0XHRcdFx0XHRldi5lbWl0Q2hhbmdlKGFzdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRldi5yZXN1bWUoKTtcblxuXHRcdFx0XHRvcHRzLnN0ciA9IGV2LmdldFNvdXJjZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb3B0cztcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzdFVuaWNvZGVQcm9wZXJ0eUNoYXJhY3RlclNldChhc3Q6IEFTVC5Ob2RlQmFzZSk6IGFzdCBpcyBBU1QuVW5pY29kZVByb3BlcnR5Q2hhcmFjdGVyU2V0XG57XG5cdHJldHVybiAoKGFzdCBhcyBBU1QuQ2hhcmFjdGVyU2V0KS5raW5kID09PSBFbnVtS2luZENoYXJhY3RlclNldC5Vbmljb2RlUHJvcGVydHlDaGFyYWN0ZXJTZXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tVbmljb2RlUHJvcGVydHlFc2NhcGUoYXN0OiBBU1QuVW5pY29kZVByb3BlcnR5Q2hhcmFjdGVyU2V0KVxue1xuXHRpZiAoYXN0LnZhbHVlID09ICdQdW5jdHVhdGlvbicpXG5cdHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pY29kZVByb3BlcnR5RXNjYXBlKHJhdzogc3RyaW5nLCBmbGFnczogc3RyaW5nLCB1c2VVbmljb2RlRmxhZzogYm9vbGVhbilcbntcblx0cmV0dXJuIHJld3JpdGVQYXR0ZXJuKHJhdywgZmxhZ3MsIHtcblx0XHR1bmljb2RlUHJvcGVydHlFc2NhcGU6IHRydWUsXG5cdFx0dXNlVW5pY29kZUZsYWcsXG5cdH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVpoUmVnRXhwQ29yZVBsdWdpblxuIl19