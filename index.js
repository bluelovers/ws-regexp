"use strict";
/**
 * Created by user on 2019/5/27.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const array_hyper_unique_1 = require("array-hyper-unique");
const fullhalf_1 = require("str-util/lib/fullhalf");
const core_1 = require("uni-string/src/core");
const table_voice_1 = require("cjk-conv/lib/jp/table_voice");
const deburr = require("lodash.deburr");
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
            ast.old_raw = ast.old_raw || ast.raw;
            const raw = ast.raw;
            /**
             * 確保 此節點沒有被其他修改過
             */
            if (!ast.changed && ast.old_raw === raw && core_1.default.size(raw) == 1) {
                let arr = _coreFn(raw, {
                    autoDeburr,
                    autoFullHaif,
                    autoLocale,
                    autoVoice,
                    cacheMap,
                    callback,
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsMkRBQTJEO0FBRTNELG9EQUF5STtBQUd6SSw4Q0FBMEM7QUFDMUMsNkRBQXNEO0FBRXRELHdDQUF5QztBQStDekM7O0dBRUc7QUFDSCxTQUFnQixvQkFBb0IsQ0FBQyxVQUFrQyxFQUFFO0lBRXhFLElBQUksUUFBbUIsQ0FBQztJQUV4QixJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQ3BCO1FBQ0MsSUFBSSxPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUN6QztZQUNDLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztTQUN2QzthQUVEO1lBQ0MsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7U0FDNUI7S0FDRDtJQUVELElBQUksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFFbEUsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUVoQyxJQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQzlDO1FBQ0MsTUFBTSxJQUFJLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO0tBQ2hEO0lBRUQsT0FBbUI7UUFFbEIsR0FBRyxPQUFPLENBQUMsRUFBRTtRQUViLE9BQU8sQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQUU7WUFFekIsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFFckMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUVwQjs7ZUFFRztZQUNILElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEtBQUssR0FBRyxJQUFJLGNBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUNqRTtnQkFDQyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFO29CQUN0QixVQUFVO29CQUNWLFlBQVk7b0JBQ1osVUFBVTtvQkFDVixTQUFTO29CQUNULFFBQVE7b0JBQ1IsUUFBUTtpQkFDUixDQUFDLENBQUM7Z0JBRUgsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ3pCO29CQUNDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO29CQUVuQzs7Ozs7O3VCQU1HO29CQUNILEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ25CLGlEQUFpRDtpQkFDakQ7YUFDRDtRQUNGLENBQUM7S0FDRCxDQUFBO0FBQ0YsQ0FBQztBQWxFRCxvREFrRUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsT0FBTyxDQUFDLEdBQVcsRUFBRSxFQUNwQyxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1QsUUFBUSxFQUNSLFFBQVEsR0FDdUI7SUFFL0IsSUFBSSxHQUFHLEdBQWEsRUFBRSxDQUFDO0lBRXZCLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pDO1FBQ0MsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDeEI7U0FFRDtRQUNDLElBQUksU0FBUyxFQUNiO1lBQ0MsSUFBSSxHQUFHLEdBQUcscUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUUzQixHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFBO1NBQ3ZCO1FBRUQsSUFBSSxZQUFZLEVBQ2hCO1lBQ0MsSUFBSSxFQUFFLEdBQUcsc0JBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixJQUFJLEVBQUUsR0FBRyxzQkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRWpCLElBQUksVUFBVSxFQUNkO2dCQUNDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQzthQUNsRjtZQUVELElBQUksVUFBVSxFQUNkO2dCQUNDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUU5QztTQUNEO2FBRUQ7WUFDQyxJQUFJLFVBQVUsRUFDZDtnQkFDQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7YUFDbEM7WUFFRCxJQUFJLFVBQVUsRUFDZDtnQkFDQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3RCO1NBQ0Q7UUFFRCxJQUFJLFFBQVEsRUFDWjtZQUNDLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV4QixJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQ2Y7Z0JBQ0MsT0FBTzthQUNQO2lCQUNJLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUNoQztnQkFDQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2Q7aUJBQ0ksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUMzQjtnQkFDQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDakI7U0FDRDtRQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFZCxHQUFHLEdBQUcsMkNBQXNCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFNUUsSUFBSSxRQUFRLEVBQ1o7WUFDQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN2QjtLQUNEO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDWixDQUFDO0FBcEZELDBCQW9GQztBQUVELGtCQUFlLG9CQUFvQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOS81LzI3LlxuICovXG5cbmltcG9ydCB7IGFycmF5X3VuaXF1ZV9vdmVyd3JpdGUgfSBmcm9tICdhcnJheS1oeXBlci11bmlxdWUnXG5pbXBvcnQgU3RyVXRpbCBmcm9tICdzdHItdXRpbCc7XG5pbXBvcnQgeyBGdWxsSGFsZkNvcmUsIHRvRnVsbE51bWJlciwgdG9IYWxmTnVtYmVyLCB0b0Z1bGxFbmdsaXNoLCB0b0hhbGZFbmdsaXNoLCB0b0Z1bGxXaWR0aCwgdG9IYWxmV2lkdGggfSBmcm9tICdzdHItdXRpbC9saWIvZnVsbGhhbGYnO1xuaW1wb3J0IHsgX2dldCBhcyBfZ2V0QXJyYXlUYWJsZSB9IGZyb20gJ2Nqay1jb252L2xpYi96aC90YWJsZS90YWJsZSc7XG5pbXBvcnQgeyBJT3B0aW9uc09uIH0gZnJvbSAncmVnZXhwLWNqay9saWIvY29yZSc7XG5pbXBvcnQgVVN0cmluZyBmcm9tICd1bmktc3RyaW5nL3NyYy9jb3JlJztcbmltcG9ydCBnZXRWb2ljZUFsbCBmcm9tICdjamstY29udi9saWIvanAvdGFibGVfdm9pY2UnO1xuaW1wb3J0IHsgSU5vZGVJbnB1dCwgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQgfSBmcm9tICdyZWdleHAtcGFyc2VyLWV2ZW50JztcbmltcG9ydCBkZWJ1cnIgPSByZXF1aXJlKCdsb2Rhc2guZGVidXJyJyk7XG5cbmV4cG9ydCB0eXBlIElDYWNoZU1hcCA9IE1hcDxzdHJpbmcsIHN0cmluZ1tdPlxuXG5leHBvcnQgaW50ZXJmYWNlIElaaFJlZ0V4cFBsdWdpbk9wdGlvbnNDb3JlXG57XG5cdC8qKlxuXHQgKiDlubPlgYflkI3niYflgYflkI3nmoQg5riF5r+B6Z+zXG5cdCAqL1xuXHRhdXRvVm9pY2U/OiBib29sZWFuLFxuXHQvKipcblx0ICog6Ieq5YuV6YWN5bCNIOWNiuW9oiDlhajlvaJcblx0ICovXG5cdGF1dG9GdWxsSGFpZj86IGJvb2xlYW4sXG5cdC8qKlxuXHQgKiDphY3lsI3mnKzlnLDljJblrZflhYNcblx0ICovXG5cdGF1dG9Mb2NhbGU/OiBib29sZWFuLFxuXHQvKipcblx0ICogZGVidXJyKCdkw6lqw6AgdnUnKSAvLyA9PiAnZGVqYSB2dSdcblx0ICpcblx0ICogRGVidXJycyBzdHJpbmcgYnkgY29udmVydGluZyBMYXRpbi0xIFN1cHBsZW1lbnQgYW5kIExhdGluIEV4dGVuZGVkLUEgbGV0dGVycyB0byBiYXNpYyBMYXRpbiBsZXR0ZXJzIGFuZCByZW1vdmluZyBjb21iaW5pbmcgZGlhY3JpdGljYWwgbWFya3MuXG5cdCAqL1xuXHRhdXRvRGVidXJyPzogYm9vbGVhbixcblxuXHQvKipcblx0ICogaWYgcmV0dXJuIG51bGwgfCB1bmRlZmluZWQgdGhlbiB3aWxsIHNraXAgY3VycmVudCBub2RlXG5cdCAqL1xuXHRjYWxsYmFjaz8ocmF3OiBzdHJpbmcpOiBzdHJpbmcgfCBzdHJpbmdbXSxcblxuXHRvbj86IElPcHRpb25zT248SU5vZGVJbnB1dD4sXG59XG5cbmV4cG9ydCB0eXBlIElaaFJlZ0V4cFBsdWdpbk9wdGlvbnMgPSBJWmhSZWdFeHBQbHVnaW5PcHRpb25zQ29yZSAmIHtcblx0LyoqXG5cdCAqIOe3qeWtmFxuXHQgKi9cblx0Y2FjaGVNYXA/OiBib29sZWFuIHwgSUNhY2hlTWFwLFxufVxuXG5leHBvcnQgdHlwZSBJWmhSZWdFeHBQbHVnaW5PcHRpb25zUnVudGltZSA9IElaaFJlZ0V4cFBsdWdpbk9wdGlvbnNDb3JlICYge1xuXHQvKipcblx0ICog57ep5a2YXG5cdCAqL1xuXHRjYWNoZU1hcD86IElDYWNoZU1hcCxcbn1cblxuLyoqXG4gKiDlu7rnq4sg5pO05YWF5LqL5Lu25Ye95pW454mp5Lu2XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVaaFJlZ0V4cFBsdWdpbihvcHRpb25zOiBJWmhSZWdFeHBQbHVnaW5PcHRpb25zID0ge30pOiBJT3B0aW9uc09uXG57XG5cdGxldCBjYWNoZU1hcDogSUNhY2hlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNhY2hlTWFwKVxuXHR7XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLmNhY2hlTWFwID09PSAnYm9vbGVhbicpXG5cdFx0e1xuXHRcdFx0Y2FjaGVNYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nW10+KCk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRjYWNoZU1hcCA9IG9wdGlvbnMuY2FjaGVNYXA7XG5cdFx0fVxuXHR9XG5cblx0bGV0IHsgYXV0b0RlYnVyciwgYXV0b0Z1bGxIYWlmLCBhdXRvTG9jYWxlLCBhdXRvVm9pY2UgfSA9IG9wdGlvbnM7XG5cblx0bGV0IGNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjaztcblxuXHRpZiAoY2FsbGJhY2sgJiYgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKVxuXHR7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgY2FsbGJhY2sgbXVzdCBpcyBmdW5jdGlvbmApXG5cdH1cblxuXHRyZXR1cm4gPElPcHRpb25zT24+e1xuXG5cdFx0Li4ub3B0aW9ucy5vbixcblxuXHRcdGRlZmF1bHQoYXN0LCBldmVudE5hbWUsIGV2KVxuXHRcdHtcblx0XHRcdGFzdC5vbGRfcmF3ID0gYXN0Lm9sZF9yYXcgfHwgYXN0LnJhdztcblxuXHRcdFx0Y29uc3QgcmF3ID0gYXN0LnJhdztcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiDnorrkv50g5q2k56+A6bue5rKS5pyJ6KKr5YW25LuW5L+u5pS56YGOXG5cdFx0XHQgKi9cblx0XHRcdGlmICghYXN0LmNoYW5nZWQgJiYgYXN0Lm9sZF9yYXcgPT09IHJhdyAmJiBVU3RyaW5nLnNpemUocmF3KSA9PSAxKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgYXJyID0gX2NvcmVGbihyYXcsIHtcblx0XHRcdFx0XHRhdXRvRGVidXJyLFxuXHRcdFx0XHRcdGF1dG9GdWxsSGFpZixcblx0XHRcdFx0XHRhdXRvTG9jYWxlLFxuXHRcdFx0XHRcdGF1dG9Wb2ljZSxcblx0XHRcdFx0XHRjYWNoZU1hcCxcblx0XHRcdFx0XHRjYWxsYmFjayxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKGFyciAmJiBhcnIubGVuZ3RoID4gMSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFzdC5yYXcgPSAnWycgKyBhcnIuam9pbignJykgKyAnXSc7XG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiB0cmlnZ2VyIGNoYW5nZSBpZiBub3Qgd2lsbCBub3QgdXBkYXRlIG5vZGVcblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIGV2LmVtaXRDaGFuZ2UoYXN0KTtcblx0XHRcdFx0XHQgKiBvclxuXHRcdFx0XHRcdCAqIGV2LmVtaXQoUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2hhbmdlLCAsIGFzdCk7XG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0ZXYuZW1pdENoYW5nZShhc3QpO1xuXHRcdFx0XHRcdC8vZXYuZW1pdChQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jaGFuZ2UsICwgYXN0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdH1cbn1cblxuLyoqXG4gKiDliIbkuqvlhafpg6jomZXnkIblh73mlbgg5pa55L6/5ou/5Y675L2/55So5oiW6ICF5pO05YWFXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb3JlRm4ocmF3OiBzdHJpbmcsIHtcblx0YXV0b0RlYnVycixcblx0YXV0b0Z1bGxIYWlmLFxuXHRhdXRvTG9jYWxlLFxuXHRhdXRvVm9pY2UsXG5cdGNhY2hlTWFwLFxuXHRjYWxsYmFjayxcbn06IElaaFJlZ0V4cFBsdWdpbk9wdGlvbnNSdW50aW1lKVxue1xuXHRsZXQgYXJyOiBzdHJpbmdbXSA9IFtdO1xuXG5cdGlmIChjYWNoZU1hcCAmJiBjYWNoZU1hcC5oYXMocmF3KSlcblx0e1xuXHRcdGFyciA9IGNhY2hlTWFwLmdldChyYXcpO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdGlmIChhdXRvVm9pY2UpXG5cdFx0e1xuXHRcdFx0bGV0IHJldCA9IGdldFZvaWNlQWxsKHJhdyk7XG5cblx0XHRcdHJldCAmJiBhcnIucHVzaCguLi5yZXQpXG5cdFx0fVxuXG5cdFx0aWYgKGF1dG9GdWxsSGFpZilcblx0XHR7XG5cdFx0XHRsZXQgY2YgPSB0b0Z1bGxXaWR0aChyYXcpO1xuXHRcdFx0bGV0IGNoID0gdG9IYWxmV2lkdGgocmF3KTtcblxuXHRcdFx0YXJyLnB1c2goY2YsIGNoKTtcblxuXHRcdFx0aWYgKGF1dG9Mb2NhbGUpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKGNmLnRvTG9jYWxlTG93ZXJDYXNlKCksIGNoLnRvTG9jYWxlTG93ZXJDYXNlKCksIHJhdy50b0xvY2FsZUxvd2VyQ2FzZSgpKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGF1dG9EZWJ1cnIpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKGRlYnVycihjZiksIGRlYnVycihjaCksIGRlYnVycihyYXcpKTtcblxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0aWYgKGF1dG9Mb2NhbGUpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKHJhdy50b0xvY2FsZUxvd2VyQ2FzZSgpKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGF1dG9EZWJ1cnIpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKGRlYnVycihyYXcpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoY2FsbGJhY2spXG5cdFx0e1xuXHRcdFx0bGV0IHJldCA9IGNhbGxiYWNrKHJhdyk7XG5cblx0XHRcdGlmIChyZXQgPT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIHJldCA9PT0gJ3N0cmluZycpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKHJldCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChBcnJheS5pc0FycmF5KHJldCkpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKC4uLnJldCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0YXJyLnB1c2gocmF3KTtcblxuXHRcdGFyciA9IGFycmF5X3VuaXF1ZV9vdmVyd3JpdGUoYXJyLmZpbHRlcih2ID0+IHR5cGVvZiB2ID09PSAnc3RyaW5nJykuc29ydCgpKTtcblxuXHRcdGlmIChjYWNoZU1hcClcblx0XHR7XG5cdFx0XHRjYWNoZU1hcC5zZXQocmF3LCBhcnIpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBhcnI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVpoUmVnRXhwUGx1Z2luXG4iXX0=