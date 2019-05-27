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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsMkRBQTJEO0FBRTNELG9EQUF5STtBQUd6SSw4Q0FBMEM7QUFDMUMsNkRBQXNEO0FBRXRELHdDQUF5QztBQTZDekM7O0dBRUc7QUFDSCxTQUFnQixvQkFBb0IsQ0FBQyxVQUFrQyxFQUFFO0lBRXhFLElBQUksUUFBbUIsQ0FBQztJQUV4QixJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQ3BCO1FBQ0MsSUFBSSxPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUN6QztZQUNDLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztTQUN2QzthQUVEO1lBQ0MsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7U0FDNUI7S0FDRDtJQUVELElBQUksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFFbEUsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUVoQyxJQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQzlDO1FBQ0MsTUFBTSxJQUFJLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO0tBQ2hEO0lBRUQsT0FBbUI7UUFDbEIsT0FBTyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRTtZQUV6QixHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUVyQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBRXBCOztlQUVHO1lBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxHQUFHLElBQUksY0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQ2pFO2dC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QUFDLEtBQUssUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUU1RSxJQUFJLFFBQVEsRUFDWjtZQUNDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO0tBQ0Q7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNaLENBQUM7QUFwRkQsMEJBb0ZDO0FBRUQsa0JBQWUsb0JBQW9CLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE5LzUvMjcuXG4gKi9cblxuaW1wb3J0IHsgYXJyYXlfdW5pcXVlX292ZXJ3cml0ZSB9IGZyb20gJ2FycmF5LWh5cGVyLXVuaXF1ZSdcbmltcG9ydCBTdHJVdGlsIGZyb20gJ3N0ci11dGlsJztcbmltcG9ydCB7IEZ1bGxIYWxmQ29yZSwgdG9GdWxsTnVtYmVyLCB0b0hhbGZOdW1iZXIsIHRvRnVsbEVuZ2xpc2gsIHRvSGFsZkVuZ2xpc2gsIHRvRnVsbFdpZHRoLCB0b0hhbGZXaWR0aCB9IGZyb20gJ3N0ci11dGlsL2xpYi9mdWxsaGFsZic7XG5pbXBvcnQgeyBfZ2V0IGFzIF9nZXRBcnJheVRhYmxlIH0gZnJvbSAnY2prLWNvbnYvbGliL3poL3RhYmxlL3RhYmxlJztcbmltcG9ydCB7IElPcHRpb25zT24gfSBmcm9tICdyZWdleHAtY2prL2xpYi9jb3JlJztcbmltcG9ydCBVU3RyaW5nIGZyb20gJ3VuaS1zdHJpbmcvc3JjL2NvcmUnO1xuaW1wb3J0IGdldFZvaWNlQWxsIGZyb20gJ2Nqay1jb252L2xpYi9qcC90YWJsZV92b2ljZSc7XG5pbXBvcnQgeyBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudCB9IGZyb20gJ3JlZ2V4cC1wYXJzZXItZXZlbnQnO1xuaW1wb3J0IGRlYnVyciA9IHJlcXVpcmUoJ2xvZGFzaC5kZWJ1cnInKTtcblxuZXhwb3J0IHR5cGUgSUNhY2hlTWFwID0gTWFwPHN0cmluZywgc3RyaW5nW10+XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVpoUmVnRXhwUGx1Z2luT3B0aW9uc0NvcmVcbntcblx0LyoqXG5cdCAqIOW5s+WBh+WQjeeJh+WBh+WQjeeahCDmuIXmv4Hpn7Ncblx0ICovXG5cdGF1dG9Wb2ljZT86IGJvb2xlYW4sXG5cdC8qKlxuXHQgKiDoh6rli5XphY3lsI0g5Y2K5b2iIOWFqOW9olxuXHQgKi9cblx0YXV0b0Z1bGxIYWlmPzogYm9vbGVhbixcblx0LyoqXG5cdCAqIOmFjeWwjeacrOWcsOWMluWtl+WFg1xuXHQgKi9cblx0YXV0b0xvY2FsZT86IGJvb2xlYW4sXG5cdC8qKlxuXHQgKiBkZWJ1cnIoJ2TDqWrDoCB2dScpIC8vID0+ICdkZWphIHZ1J1xuXHQgKlxuXHQgKiBEZWJ1cnJzIHN0cmluZyBieSBjb252ZXJ0aW5nIExhdGluLTEgU3VwcGxlbWVudCBhbmQgTGF0aW4gRXh0ZW5kZWQtQSBsZXR0ZXJzIHRvIGJhc2ljIExhdGluIGxldHRlcnMgYW5kIHJlbW92aW5nIGNvbWJpbmluZyBkaWFjcml0aWNhbCBtYXJrcy5cblx0ICovXG5cdGF1dG9EZWJ1cnI/OiBib29sZWFuLFxuXG5cdC8qKlxuXHQgKiBpZiByZXR1cm4gbnVsbCB8IHVuZGVmaW5lZCB0aGVuIHdpbGwgc2tpcCBjdXJyZW50IG5vZGVcblx0ICovXG5cdGNhbGxiYWNrPyhyYXc6IHN0cmluZyk6IHN0cmluZyB8IHN0cmluZ1tdXG59XG5cbmV4cG9ydCB0eXBlIElaaFJlZ0V4cFBsdWdpbk9wdGlvbnMgPSBJWmhSZWdFeHBQbHVnaW5PcHRpb25zQ29yZSAmIHtcblx0LyoqXG5cdCAqIOe3qeWtmFxuXHQgKi9cblx0Y2FjaGVNYXA/OiBib29sZWFuIHwgSUNhY2hlTWFwLFxufVxuXG5leHBvcnQgdHlwZSBJWmhSZWdFeHBQbHVnaW5PcHRpb25zUnVudGltZSA9IElaaFJlZ0V4cFBsdWdpbk9wdGlvbnNDb3JlICYge1xuXHQvKipcblx0ICog57ep5a2YXG5cdCAqL1xuXHRjYWNoZU1hcD86IElDYWNoZU1hcCxcbn1cblxuLyoqXG4gKiDlu7rnq4sg5pO05YWF5LqL5Lu25Ye95pW454mp5Lu2XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVaaFJlZ0V4cFBsdWdpbihvcHRpb25zOiBJWmhSZWdFeHBQbHVnaW5PcHRpb25zID0ge30pOiBJT3B0aW9uc09uXG57XG5cdGxldCBjYWNoZU1hcDogSUNhY2hlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNhY2hlTWFwKVxuXHR7XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLmNhY2hlTWFwID09PSAnYm9vbGVhbicpXG5cdFx0e1xuXHRcdFx0Y2FjaGVNYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nW10+KCk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRjYWNoZU1hcCA9IG9wdGlvbnMuY2FjaGVNYXA7XG5cdFx0fVxuXHR9XG5cblx0bGV0IHsgYXV0b0RlYnVyciwgYXV0b0Z1bGxIYWlmLCBhdXRvTG9jYWxlLCBhdXRvVm9pY2UgfSA9IG9wdGlvbnM7XG5cblx0bGV0IGNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjaztcblxuXHRpZiAoY2FsbGJhY2sgJiYgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKVxuXHR7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgY2FsbGJhY2sgbXVzdCBpcyBmdW5jdGlvbmApXG5cdH1cblxuXHRyZXR1cm4gPElPcHRpb25zT24+e1xuXHRcdGRlZmF1bHQoYXN0LCBldmVudE5hbWUsIGV2KVxuXHRcdHtcblx0XHRcdGFzdC5vbGRfcmF3ID0gYXN0Lm9sZF9yYXcgfHwgYXN0LnJhdztcblxuXHRcdFx0Y29uc3QgcmF3ID0gYXN0LnJhdztcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiDnorrkv50g5q2k56+A6bue5rKS5pyJ6KKr5YW25LuW5L+u5pS56YGOXG5cdFx0XHQgKi9cblx0XHRcdGlmICghYXN0LmNoYW5nZWQgJiYgYXN0Lm9sZF9yYXcgPT09IHJhdyAmJiBVU3RyaW5nLnNpemUocmF3KSA9PSAxKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgYXJyID0gX2NvcmVGbihyYXcsIHtcblx0XHRcdFx0XHRhdXRvRGVidXJyLFxuXHRcdFx0XHRcdGF1dG9GdWxsSGFpZixcblx0XHRcdFx0XHRhdXRvTG9jYWxlLFxuXHRcdFx0XHRcdGF1dG9Wb2ljZSxcblx0XHRcdFx0XHRjYWNoZU1hcCxcblx0XHRcdFx0XHRjYWxsYmFjayxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKGFyciAmJiBhcnIubGVuZ3RoID4gMSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFzdC5yYXcgPSAnWycgKyBhcnIuam9pbignJykgKyAnXSc7XG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiB0cmlnZ2VyIGNoYW5nZSBpZiBub3Qgd2lsbCBub3QgdXBkYXRlIG5vZGVcblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIGV2LmVtaXRDaGFuZ2UoYXN0KTtcblx0XHRcdFx0XHQgKiBvclxuXHRcdFx0XHRcdCAqIGV2LmVtaXQoUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2hhbmdlLCAsIGFzdCk7XG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0ZXYuZW1pdENoYW5nZShhc3QpO1xuXHRcdFx0XHRcdC8vZXYuZW1pdChQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jaGFuZ2UsICwgYXN0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdH1cbn1cblxuLyoqXG4gKiDliIbkuqvlhafpg6jomZXnkIblh73mlbgg5pa55L6/5ou/5Y675L2/55So5oiW6ICF5pO05YWFXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb3JlRm4ocmF3OiBzdHJpbmcsIHtcblx0YXV0b0RlYnVycixcblx0YXV0b0Z1bGxIYWlmLFxuXHRhdXRvTG9jYWxlLFxuXHRhdXRvVm9pY2UsXG5cdGNhY2hlTWFwLFxuXHRjYWxsYmFjayxcbn06IElaaFJlZ0V4cFBsdWdpbk9wdGlvbnNSdW50aW1lKVxue1xuXHRsZXQgYXJyOiBzdHJpbmdbXSA9IFtdO1xuXG5cdGlmIChjYWNoZU1hcCAmJiBjYWNoZU1hcC5oYXMocmF3KSlcblx0e1xuXHRcdGFyciA9IGNhY2hlTWFwLmdldChyYXcpO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdGlmIChhdXRvVm9pY2UpXG5cdFx0e1xuXHRcdFx0bGV0IHJldCA9IGdldFZvaWNlQWxsKHJhdyk7XG5cblx0XHRcdHJldCAmJiBhcnIucHVzaCguLi5yZXQpXG5cdFx0fVxuXG5cdFx0aWYgKGF1dG9GdWxsSGFpZilcblx0XHR7XG5cdFx0XHRsZXQgY2YgPSB0b0Z1bGxXaWR0aChyYXcpO1xuXHRcdFx0bGV0IGNoID0gdG9IYWxmV2lkdGgocmF3KTtcblxuXHRcdFx0YXJyLnB1c2goY2YsIGNoKTtcblxuXHRcdFx0aWYgKGF1dG9Mb2NhbGUpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKGNmLnRvTG9jYWxlTG93ZXJDYXNlKCksIGNoLnRvTG9jYWxlTG93ZXJDYXNlKCksIHJhdy50b0xvY2FsZUxvd2VyQ2FzZSgpKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGF1dG9EZWJ1cnIpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKGRlYnVycihjZiksIGRlYnVycihjaCksIGRlYnVycihyYXcpKTtcblxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0aWYgKGF1dG9Mb2NhbGUpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKHJhdy50b0xvY2FsZUxvd2VyQ2FzZSgpKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGF1dG9EZWJ1cnIpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKGRlYnVycihyYXcpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoY2FsbGJhY2spXG5cdFx0e1xuXHRcdFx0bGV0IHJldCA9IGNhbGxiYWNrKHJhdyk7XG5cblx0XHRcdGlmIChyZXQgPT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIHJldCA9PT0gJ3N0cmluZycpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKHJldCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChBcnJheS5pc0FycmF5KHJldCkpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKC4uLnJldCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0YXJyLnB1c2gocmF3KTtcblxuXHRcdGFyciA9IGFycmF5X3VuaXF1ZV9vdmVyd3JpdGUoYXJyLmZpbHRlcih2ID0+IHR5cGVvZiB2ID09PSAnc3RyaW5nJykuc29ydCgpKTtcblxuXHRcdGlmIChjYWNoZU1hcClcblx0XHR7XG5cdFx0XHRjYWNoZU1hcC5zZXQocmF3LCBhcnIpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBhcnI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVpoUmVnRXhwUGx1Z2luXG4iXX0=