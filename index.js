"use strict";
/**
 * Created by user on 2019/5/27.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const array_hyper_unique_1 = require("array-hyper-unique");
const fullhalf_1 = require("str-util/lib/fullhalf");
const core_1 = __importDefault(require("uni-string/src/core"));
const table_voice_1 = __importDefault(require("cjk-conv/lib/jp/table_voice"));
const deburr = require("lodash.deburr");
const plugin_1 = require("regexp-cjk/lib/plugin");
/**
 * 建立 擴充事件函數物件
 */
function createZhRegExpPlugin(options = {}) {
    let cacheMap;
    if (options.cacheMap) {
        if (typeof options.cacheMap === 'boolean') {
            cacheMap = new Map();
        }
        else {
            cacheMap = options.cacheMap;
        }
    }
    let { autoDeburr, autoFullHaif, autoLocale, autoVoice } = options;
    let callback = options.callback;
    if (callback && typeof callback !== 'function') {
        throw new TypeError(`callback must is function`);
    }
    return {
        ...options.on,
        default(ast, eventName, ev) {
            /**
             * 確保 此節點沒有被其他修改過
             */
            if (!plugin_1.astNotChanged(ast)) {
                return;
            }
            const raw = ast.raw;
            let arr;
            let raw2 = raw.replace(/^\\/, '');
            let raw3 = raw;
            switch (raw) {
                case '\\.':
                case '\\(':
                case '\\)':
                case '\\*':
                case '\\?':
                case '\\+':
                    raw3 = raw2;
                case '\\[':
                case '\\]':
                case '\\/':
                case '\\-':
                case '-':
                case '\\\\':
                    arr = _coreFn(raw2, {
                        autoDeburr,
                        autoFullHaif,
                        autoLocale,
                        autoVoice,
                        cacheMap,
                        callback,
                    })
                        .map(v => {
                        if (v === '-') {
                            return '\\-';
                        }
                        return v === raw2 ? raw3 : v;
                    });
                    break;
                default:
                    if (core_1.default.size(raw) == 1) {
                        arr = _coreFn(raw, {
                            autoDeburr,
                            autoFullHaif,
                            autoLocale,
                            autoVoice,
                            cacheMap,
                            callback,
                        });
                    }
                    else {
                        //console.dir(ast);
                    }
                    break;
            }
            if (arr && arr.length > 1) {
                ast.raw = '[' + arr.join('') + ']';
                /**
                 * trigger change if not will not update node
                 *
                 * ev.emitChange(ast);
                 * or
                 * ev.emit(ParserEventEmitterEvent.change, , ast);
                 */
                ev.emitChange(ast);
                //ev.emit(ParserEventEmitterEvent.change, , ast);
            }
        },
    };
}
exports.createZhRegExpPlugin = createZhRegExpPlugin;
/**
 * 分享內部處理函數 方便拿去使用或者擴充
 *
 * @private
 */
function _coreFn(raw, { autoDeburr, autoFullHaif, autoLocale, autoVoice, cacheMap, callback, }) {
    let arr = [];
    if (cacheMap && cacheMap.has(raw)) {
        arr = cacheMap.get(raw);
    }
    else {
        if (autoVoice) {
            let ret = table_voice_1.default(raw);
            ret && arr.push(...ret);
        }
        if (autoFullHaif) {
            let cf = fullhalf_1.toFullWidth(raw);
            let ch = fullhalf_1.toHalfWidth(raw);
            arr.push(cf, ch);
            if (autoLocale) {
                arr.push(cf.toLocaleLowerCase(), ch.toLocaleLowerCase(), raw.toLocaleLowerCase());
            }
            if (autoDeburr) {
                arr.push(deburr(cf), deburr(ch), deburr(raw));
            }
        }
        else {
            if (autoLocale) {
                arr.push(raw.toLocaleLowerCase());
            }
            if (autoDeburr) {
                arr.push(deburr(raw));
            }
        }
        if (callback) {
            let ret = callback(raw);
            if (ret == null) {
                return;
            }
            else if (typeof ret === 'string') {
                arr.push(ret);
            }
            else if (Array.isArray(ret)) {
                arr.push(...ret);
            }
        }
        arr.push(raw);
        arr = array_hyper_unique_1.array_unique_overwrite(arr.filter(v => typeof v === 'string').sort());
        if (cacheMap) {
            cacheMap.set(raw, arr);
        }
    }
    return arr;
}
exports._coreFn = _coreFn;
exports.default = createZhRegExpPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7O0FBRUgsMkRBQTJEO0FBRTNELG9EQVErQjtBQUcvQiwrREFBMEM7QUFDMUMsOEVBQXNEO0FBRXRELHdDQUF5QztBQUN6QyxrREFBc0Q7QUErQ3REOztHQUVHO0FBQ0gsU0FBZ0Isb0JBQW9CLENBQUMsVUFBa0MsRUFBRTtJQUV4RSxJQUFJLFFBQW1CLENBQUM7SUFFeEIsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUNwQjtRQUNDLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFDekM7WUFDQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7U0FDdkM7YUFFRDtZQUNDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1NBQzVCO0tBQ0Q7SUFFRCxJQUFJLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRWxFLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFFaEMsSUFBSSxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUM5QztRQUNDLE1BQU0sSUFBSSxTQUFTLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtLQUNoRDtJQUVELE9BQW1CO1FBRWxCLEdBQUcsT0FBTyxDQUFDLEVBQUU7UUFFYixPQUFPLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFO1lBRXpCOztlQUVHO1lBQ0gsSUFBSSxDQUFDLHNCQUFhLENBQUMsR0FBRyxDQUFDLEVBQ3ZCO2dCQUNDLE9BQU87YUFDUDtZQUVELE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDcEIsSUFBSSxHQUFhLENBQUM7WUFFbEIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbEMsSUFBSSxJQUFJLEdBQVcsR0FBRyxDQUFDO1lBRXZCLFFBQVEsR0FBRyxFQUNYO2dCQUNDLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssS0FBSztvQkFFVCxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUViLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssR0FBRyxDQUFDO2dCQUNULEtBQUssTUFBTTtvQkFFVixHQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRTt3QkFDbkIsVUFBVTt3QkFDVixZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsU0FBUzt3QkFDVCxRQUFRO3dCQUNSLFFBQVE7cUJBQ1IsQ0FBQzt5QkFDQSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBRVIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUNiOzRCQUNDLE9BQU8sS0FBSyxDQUFDO3lCQUNiO3dCQUVELE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQzdCLENBQUMsQ0FBQyxDQUNGO29CQUVELE1BQU07Z0JBQ1A7b0JBRUMsSUFBSSxjQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFDMUI7d0JBQ0MsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUU7NEJBQ2xCLFVBQVU7NEJBQ1YsWUFBWTs0QkFDWixVQUFVOzRCQUNWLFNBQVM7NEJBQ1QsUUFBUTs0QkFDUixRQUFRO3lCQUNSLENBQUMsQ0FBQztxQkFDSDt5QkFFRDt3QkFDQyxtQkFBbUI7cUJBQ25CO29CQUVELE1BQU07YUFDUDtZQUVELElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUN6QjtnQkFDQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFFbkM7Ozs7OzttQkFNRztnQkFDSCxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixpREFBaUQ7YUFDakQ7UUFDRixDQUFDO0tBQ0QsQ0FBQTtBQUNGLENBQUM7QUF4SEQsb0RBd0hDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLE9BQU8sQ0FBQyxHQUFXLEVBQUUsRUFDcEMsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsU0FBUyxFQUNULFFBQVEsRUFDUixRQUFRLEdBQ3VCO0lBRS9CLElBQUksR0FBRyxHQUFhLEVBQUUsQ0FBQztJQUV2QixJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUNqQztRQUNDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3hCO1NBRUQ7UUFDQyxJQUFJLFNBQVMsRUFDYjtZQUNDLElBQUksR0FBRyxHQUFHLHFCQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFM0IsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQTtTQUN2QjtRQUVELElBQUksWUFBWSxFQUNoQjtZQUNDLElBQUksRUFBRSxHQUFHLHNCQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsSUFBSSxFQUFFLEdBQUcsc0JBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUUxQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVqQixJQUFJLFVBQVUsRUFDZDtnQkFDQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7YUFDbEY7WUFFRCxJQUFJLFVBQVUsRUFDZDtnQkFDQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFFOUM7U0FDRDthQUVEO1lBQ0MsSUFBSSxVQUFVLEVBQ2Q7Z0JBQ0MsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2FBQ2xDO1lBRUQsSUFBSSxVQUFVLEVBQ2Q7Z0JBQ0MsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN0QjtTQUNEO1FBRUQsSUFBSSxRQUFRLEVBQ1o7WUFDQyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFeEIsSUFBSSxHQUFHLElBQUksSUFBSSxFQUNmO2dCQUNDLE9BQU87YUFDUDtpQkFDSSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFDaEM7Z0JBQ0MsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNkO2lCQUNJLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFDM0I7Z0JBQ0MsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2FBQ2pCO1NBQ0Q7UUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWQsR0FBRyxHQUFHLDJDQUFzQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTVFLElBQUksUUFBUSxFQUNaO1lBQ0MsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDdkI7S0FDRDtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ1osQ0FBQztBQXBGRCwwQkFvRkM7QUFFRCxrQkFBZSxvQkFBb0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTkvNS8yNy5cbiAqL1xuXG5pbXBvcnQgeyBhcnJheV91bmlxdWVfb3ZlcndyaXRlIH0gZnJvbSAnYXJyYXktaHlwZXItdW5pcXVlJ1xuaW1wb3J0IFN0clV0aWwgZnJvbSAnc3RyLXV0aWwnO1xuaW1wb3J0IHtcblx0RnVsbEhhbGZDb3JlLFxuXHR0b0Z1bGxOdW1iZXIsXG5cdHRvSGFsZk51bWJlcixcblx0dG9GdWxsRW5nbGlzaCxcblx0dG9IYWxmRW5nbGlzaCxcblx0dG9GdWxsV2lkdGgsXG5cdHRvSGFsZldpZHRoLFxufSBmcm9tICdzdHItdXRpbC9saWIvZnVsbGhhbGYnO1xuaW1wb3J0IHsgX2dldCBhcyBfZ2V0QXJyYXlUYWJsZSB9IGZyb20gJ2Nqay1jb252L2xpYi96aC90YWJsZS90YWJsZSc7XG5pbXBvcnQgeyBJT3B0aW9uc09uIH0gZnJvbSAncmVnZXhwLWNqay9saWIvY29yZSc7XG5pbXBvcnQgVVN0cmluZyBmcm9tICd1bmktc3RyaW5nL3NyYy9jb3JlJztcbmltcG9ydCBnZXRWb2ljZUFsbCBmcm9tICdjamstY29udi9saWIvanAvdGFibGVfdm9pY2UnO1xuaW1wb3J0IHsgSU5vZGVJbnB1dCwgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQgfSBmcm9tICdyZWdleHAtcGFyc2VyLWV2ZW50JztcbmltcG9ydCBkZWJ1cnIgPSByZXF1aXJlKCdsb2Rhc2guZGVidXJyJyk7XG5pbXBvcnQgeyBhc3ROb3RDaGFuZ2VkIH0gZnJvbSAncmVnZXhwLWNqay9saWIvcGx1Z2luJztcblxuZXhwb3J0IHR5cGUgSUNhY2hlTWFwID0gTWFwPHN0cmluZywgc3RyaW5nW10+XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVpoUmVnRXhwUGx1Z2luT3B0aW9uc0NvcmVcbntcblx0LyoqXG5cdCAqIOW5s+WBh+WQjeeJh+WBh+WQjeeahCDmuIXmv4Hpn7Ncblx0ICovXG5cdGF1dG9Wb2ljZT86IGJvb2xlYW4sXG5cdC8qKlxuXHQgKiDoh6rli5XphY3lsI0g5Y2K5b2iIOWFqOW9olxuXHQgKi9cblx0YXV0b0Z1bGxIYWlmPzogYm9vbGVhbixcblx0LyoqXG5cdCAqIOmFjeWwjeacrOWcsOWMluWtl+WFg1xuXHQgKi9cblx0YXV0b0xvY2FsZT86IGJvb2xlYW4sXG5cdC8qKlxuXHQgKiBkZWJ1cnIoJ2TDqWrDoCB2dScpIC8vID0+ICdkZWphIHZ1J1xuXHQgKlxuXHQgKiBEZWJ1cnJzIHN0cmluZyBieSBjb252ZXJ0aW5nIExhdGluLTEgU3VwcGxlbWVudCBhbmQgTGF0aW4gRXh0ZW5kZWQtQSBsZXR0ZXJzIHRvIGJhc2ljIExhdGluIGxldHRlcnMgYW5kIHJlbW92aW5nIGNvbWJpbmluZyBkaWFjcml0aWNhbCBtYXJrcy5cblx0ICovXG5cdGF1dG9EZWJ1cnI/OiBib29sZWFuLFxuXG5cdC8qKlxuXHQgKiBpZiByZXR1cm4gbnVsbCB8IHVuZGVmaW5lZCB0aGVuIHdpbGwgc2tpcCBjdXJyZW50IG5vZGVcblx0ICovXG5cdGNhbGxiYWNrPyhyYXc6IHN0cmluZyk6IHN0cmluZyB8IHN0cmluZ1tdLFxuXG5cdG9uPzogSU9wdGlvbnNPbjxJTm9kZUlucHV0Pixcbn1cblxuZXhwb3J0IHR5cGUgSVpoUmVnRXhwUGx1Z2luT3B0aW9ucyA9IElaaFJlZ0V4cFBsdWdpbk9wdGlvbnNDb3JlICYge1xuXHQvKipcblx0ICog57ep5a2YXG5cdCAqL1xuXHRjYWNoZU1hcD86IGJvb2xlYW4gfCBJQ2FjaGVNYXAsXG59XG5cbmV4cG9ydCB0eXBlIElaaFJlZ0V4cFBsdWdpbk9wdGlvbnNSdW50aW1lID0gSVpoUmVnRXhwUGx1Z2luT3B0aW9uc0NvcmUgJiB7XG5cdC8qKlxuXHQgKiDnt6nlrZhcblx0ICovXG5cdGNhY2hlTWFwPzogSUNhY2hlTWFwLFxufVxuXG4vKipcbiAqIOW7uueriyDmk7TlhYXkuovku7blh73mlbjnianku7ZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVpoUmVnRXhwUGx1Z2luKG9wdGlvbnM6IElaaFJlZ0V4cFBsdWdpbk9wdGlvbnMgPSB7fSk6IElPcHRpb25zT25cbntcblx0bGV0IGNhY2hlTWFwOiBJQ2FjaGVNYXA7XG5cblx0aWYgKG9wdGlvbnMuY2FjaGVNYXApXG5cdHtcblx0XHRpZiAodHlwZW9mIG9wdGlvbnMuY2FjaGVNYXAgPT09ICdib29sZWFuJylcblx0XHR7XG5cdFx0XHRjYWNoZU1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmdbXT4oKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGNhY2hlTWFwID0gb3B0aW9ucy5jYWNoZU1hcDtcblx0XHR9XG5cdH1cblxuXHRsZXQgeyBhdXRvRGVidXJyLCBhdXRvRnVsbEhhaWYsIGF1dG9Mb2NhbGUsIGF1dG9Wb2ljZSB9ID0gb3B0aW9ucztcblxuXHRsZXQgY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrO1xuXG5cdGlmIChjYWxsYmFjayAmJiB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpXG5cdHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBjYWxsYmFjayBtdXN0IGlzIGZ1bmN0aW9uYClcblx0fVxuXG5cdHJldHVybiA8SU9wdGlvbnNPbj57XG5cblx0XHQuLi5vcHRpb25zLm9uLFxuXG5cdFx0ZGVmYXVsdChhc3QsIGV2ZW50TmFtZSwgZXYpXG5cdFx0e1xuXHRcdFx0LyoqXG5cdFx0XHQgKiDnorrkv50g5q2k56+A6bue5rKS5pyJ6KKr5YW25LuW5L+u5pS56YGOXG5cdFx0XHQgKi9cblx0XHRcdGlmICghYXN0Tm90Q2hhbmdlZChhc3QpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHJhdyA9IGFzdC5yYXc7XG5cdFx0XHRsZXQgYXJyOiBzdHJpbmdbXTtcblxuXHRcdFx0bGV0IHJhdzIgPSByYXcucmVwbGFjZSgvXlxcXFwvLCAnJyk7XG5cdFx0XHRsZXQgcmF3Mzogc3RyaW5nID0gcmF3O1xuXG5cdFx0XHRzd2l0Y2ggKHJhdylcblx0XHRcdHtcblx0XHRcdFx0Y2FzZSAnXFxcXC4nOlxuXHRcdFx0XHRjYXNlICdcXFxcKCc6XG5cdFx0XHRcdGNhc2UgJ1xcXFwpJzpcblx0XHRcdFx0Y2FzZSAnXFxcXConOlxuXHRcdFx0XHRjYXNlICdcXFxcPyc6XG5cdFx0XHRcdGNhc2UgJ1xcXFwrJzpcblxuXHRcdFx0XHRcdHJhdzMgPSByYXcyO1xuXG5cdFx0XHRcdGNhc2UgJ1xcXFxbJzpcblx0XHRcdFx0Y2FzZSAnXFxcXF0nOlxuXHRcdFx0XHRjYXNlICdcXFxcLyc6XG5cdFx0XHRcdGNhc2UgJ1xcXFwtJzpcblx0XHRcdFx0Y2FzZSAnLSc6XG5cdFx0XHRcdGNhc2UgJ1xcXFxcXFxcJzpcblxuXHRcdFx0XHRcdGFyciA9IF9jb3JlRm4ocmF3Miwge1xuXHRcdFx0XHRcdFx0YXV0b0RlYnVycixcblx0XHRcdFx0XHRcdGF1dG9GdWxsSGFpZixcblx0XHRcdFx0XHRcdGF1dG9Mb2NhbGUsXG5cdFx0XHRcdFx0XHRhdXRvVm9pY2UsXG5cdFx0XHRcdFx0XHRjYWNoZU1hcCxcblx0XHRcdFx0XHRcdGNhbGxiYWNrLFxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQubWFwKHYgPT5cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aWYgKHYgPT09ICctJylcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAnXFxcXC0nO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHYgPT09IHJhdzIgPyByYXczIDogdlxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRcdGlmIChVU3RyaW5nLnNpemUocmF3KSA9PSAxKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGFyciA9IF9jb3JlRm4ocmF3LCB7XG5cdFx0XHRcdFx0XHRcdGF1dG9EZWJ1cnIsXG5cdFx0XHRcdFx0XHRcdGF1dG9GdWxsSGFpZixcblx0XHRcdFx0XHRcdFx0YXV0b0xvY2FsZSxcblx0XHRcdFx0XHRcdFx0YXV0b1ZvaWNlLFxuXHRcdFx0XHRcdFx0XHRjYWNoZU1hcCxcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2ssXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8vY29uc29sZS5kaXIoYXN0KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0aWYgKGFyciAmJiBhcnIubGVuZ3RoID4gMSlcblx0XHRcdHtcblx0XHRcdFx0YXN0LnJhdyA9ICdbJyArIGFyci5qb2luKCcnKSArICddJztcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogdHJpZ2dlciBjaGFuZ2UgaWYgbm90IHdpbGwgbm90IHVwZGF0ZSBub2RlXG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqIGV2LmVtaXRDaGFuZ2UoYXN0KTtcblx0XHRcdFx0ICogb3Jcblx0XHRcdFx0ICogZXYuZW1pdChQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jaGFuZ2UsICwgYXN0KTtcblx0XHRcdFx0ICovXG5cdFx0XHRcdGV2LmVtaXRDaGFuZ2UoYXN0KTtcblx0XHRcdFx0Ly9ldi5lbWl0KFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNoYW5nZSwgLCBhc3QpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdH1cbn1cblxuLyoqXG4gKiDliIbkuqvlhafpg6jomZXnkIblh73mlbgg5pa55L6/5ou/5Y675L2/55So5oiW6ICF5pO05YWFXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb3JlRm4ocmF3OiBzdHJpbmcsIHtcblx0YXV0b0RlYnVycixcblx0YXV0b0Z1bGxIYWlmLFxuXHRhdXRvTG9jYWxlLFxuXHRhdXRvVm9pY2UsXG5cdGNhY2hlTWFwLFxuXHRjYWxsYmFjayxcbn06IElaaFJlZ0V4cFBsdWdpbk9wdGlvbnNSdW50aW1lKVxue1xuXHRsZXQgYXJyOiBzdHJpbmdbXSA9IFtdO1xuXG5cdGlmIChjYWNoZU1hcCAmJiBjYWNoZU1hcC5oYXMocmF3KSlcblx0e1xuXHRcdGFyciA9IGNhY2hlTWFwLmdldChyYXcpO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdGlmIChhdXRvVm9pY2UpXG5cdFx0e1xuXHRcdFx0bGV0IHJldCA9IGdldFZvaWNlQWxsKHJhdyk7XG5cblx0XHRcdHJldCAmJiBhcnIucHVzaCguLi5yZXQpXG5cdFx0fVxuXG5cdFx0aWYgKGF1dG9GdWxsSGFpZilcblx0XHR7XG5cdFx0XHRsZXQgY2YgPSB0b0Z1bGxXaWR0aChyYXcpO1xuXHRcdFx0bGV0IGNoID0gdG9IYWxmV2lkdGgocmF3KTtcblxuXHRcdFx0YXJyLnB1c2goY2YsIGNoKTtcblxuXHRcdFx0aWYgKGF1dG9Mb2NhbGUpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKGNmLnRvTG9jYWxlTG93ZXJDYXNlKCksIGNoLnRvTG9jYWxlTG93ZXJDYXNlKCksIHJhdy50b0xvY2FsZUxvd2VyQ2FzZSgpKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGF1dG9EZWJ1cnIpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKGRlYnVycihjZiksIGRlYnVycihjaCksIGRlYnVycihyYXcpKTtcblxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0aWYgKGF1dG9Mb2NhbGUpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKHJhdy50b0xvY2FsZUxvd2VyQ2FzZSgpKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGF1dG9EZWJ1cnIpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKGRlYnVycihyYXcpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoY2FsbGJhY2spXG5cdFx0e1xuXHRcdFx0bGV0IHJldCA9IGNhbGxiYWNrKHJhdyk7XG5cblx0XHRcdGlmIChyZXQgPT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIHJldCA9PT0gJ3N0cmluZycpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKHJldCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChBcnJheS5pc0FycmF5KHJldCkpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKC4uLnJldCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0YXJyLnB1c2gocmF3KTtcblxuXHRcdGFyciA9IGFycmF5X3VuaXF1ZV9vdmVyd3JpdGUoYXJyLmZpbHRlcih2ID0+IHR5cGVvZiB2ID09PSAnc3RyaW5nJykuc29ydCgpKTtcblxuXHRcdGlmIChjYWNoZU1hcClcblx0XHR7XG5cdFx0XHRjYWNoZU1hcC5zZXQocmF3LCBhcnIpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBhcnI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVpoUmVnRXhwUGx1Z2luXG4iXX0=