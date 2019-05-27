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
            arr.push(...table_voice_1.default(raw));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsMkRBQTJEO0FBRTNELG9EQUF5STtBQUd6SSw4Q0FBMEM7QUFDMUMsNkRBQXNEO0FBRXRELHdDQUF5QztBQTZDekM7O0dBRUc7QUFDSCxTQUFnQixvQkFBb0IsQ0FBQyxVQUFrQyxFQUFFO0lBRXhFLElBQUksUUFBbUIsQ0FBQztJQUV4QixJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQ3BCO1FBQ0MsSUFBSSxPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUN6QztZQUNDLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztTQUN2QzthQUVEO1lBQ0MsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7U0FDNUI7S0FDRDtJQUVELElBQUksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFFbEUsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUVoQyxJQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQzlDO1FBQ0MsTUFBTSxJQUFJLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO0tBQ2hEO0lBRUQsT0FBbUI7UUFDbEIsT0FBTyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRTtZQUV6QixHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUVyQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBRXBCOztlQUVHO1lBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxHQUFHLElBQUksY0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQ2pFO2dC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QUM7UUFFNUUsSUFBSSxRQUFRLEVBQ1o7WUFDQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN2QjtLQUNEO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDWixDQUFDO0FBbEZELDBCQWtGQztBQUVELGtCQUFlLG9CQUFvQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOS81LzI3LlxuICovXG5cbmltcG9ydCB7IGFycmF5X3VuaXF1ZV9vdmVyd3JpdGUgfSBmcm9tICdhcnJheS1oeXBlci11bmlxdWUnXG5pbXBvcnQgU3RyVXRpbCBmcm9tICdzdHItdXRpbCc7XG5pbXBvcnQgeyBGdWxsSGFsZkNvcmUsIHRvRnVsbE51bWJlciwgdG9IYWxmTnVtYmVyLCB0b0Z1bGxFbmdsaXNoLCB0b0hhbGZFbmdsaXNoLCB0b0Z1bGxXaWR0aCwgdG9IYWxmV2lkdGggfSBmcm9tICdzdHItdXRpbC9saWIvZnVsbGhhbGYnO1xuaW1wb3J0IHsgX2dldCBhcyBfZ2V0QXJyYXlUYWJsZSB9IGZyb20gJ2Nqay1jb252L2xpYi96aC90YWJsZS90YWJsZSc7XG5pbXBvcnQgeyBJT3B0aW9uc09uIH0gZnJvbSAncmVnZXhwLWNqay9saWIvY29yZSc7XG5pbXBvcnQgVVN0cmluZyBmcm9tICd1bmktc3RyaW5nL3NyYy9jb3JlJztcbmltcG9ydCBnZXRWb2ljZUFsbCBmcm9tICdjamstY29udi9saWIvanAvdGFibGVfdm9pY2UnO1xuaW1wb3J0IHsgUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQgfSBmcm9tICdyZWdleHAtcGFyc2VyLWV2ZW50JztcbmltcG9ydCBkZWJ1cnIgPSByZXF1aXJlKCdsb2Rhc2guZGVidXJyJyk7XG5cbmV4cG9ydCB0eXBlIElDYWNoZU1hcCA9IE1hcDxzdHJpbmcsIHN0cmluZ1tdPlxuXG5leHBvcnQgaW50ZXJmYWNlIElaaFJlZ0V4cFBsdWdpbk9wdGlvbnNDb3JlXG57XG5cdC8qKlxuXHQgKiDlubPlgYflkI3niYflgYflkI3nmoQg5riF5r+B6Z+zXG5cdCAqL1xuXHRhdXRvVm9pY2U/OiBib29sZWFuLFxuXHQvKipcblx0ICog6Ieq5YuV6YWN5bCNIOWNiuW9oiDlhajlvaJcblx0ICovXG5cdGF1dG9GdWxsSGFpZj86IGJvb2xlYW4sXG5cdC8qKlxuXHQgKiDphY3lsI3mnKzlnLDljJblrZflhYNcblx0ICovXG5cdGF1dG9Mb2NhbGU/OiBib29sZWFuLFxuXHQvKipcblx0ICogZGVidXJyKCdkw6lqw6AgdnUnKSAvLyA9PiAnZGVqYSB2dSdcblx0ICpcblx0ICogRGVidXJycyBzdHJpbmcgYnkgY29udmVydGluZyBMYXRpbi0xIFN1cHBsZW1lbnQgYW5kIExhdGluIEV4dGVuZGVkLUEgbGV0dGVycyB0byBiYXNpYyBMYXRpbiBsZXR0ZXJzIGFuZCByZW1vdmluZyBjb21iaW5pbmcgZGlhY3JpdGljYWwgbWFya3MuXG5cdCAqL1xuXHRhdXRvRGVidXJyPzogYm9vbGVhbixcblxuXHQvKipcblx0ICogaWYgcmV0dXJuIG51bGwgfCB1bmRlZmluZWQgdGhlbiB3aWxsIHNraXAgY3VycmVudCBub2RlXG5cdCAqL1xuXHRjYWxsYmFjaz8ocmF3OiBzdHJpbmcpOiBzdHJpbmcgfCBzdHJpbmdbXVxufVxuXG5leHBvcnQgdHlwZSBJWmhSZWdFeHBQbHVnaW5PcHRpb25zID0gSVpoUmVnRXhwUGx1Z2luT3B0aW9uc0NvcmUgJiB7XG5cdC8qKlxuXHQgKiDnt6nlrZhcblx0ICovXG5cdGNhY2hlTWFwPzogYm9vbGVhbiB8IElDYWNoZU1hcCxcbn1cblxuZXhwb3J0IHR5cGUgSVpoUmVnRXhwUGx1Z2luT3B0aW9uc1J1bnRpbWUgPSBJWmhSZWdFeHBQbHVnaW5PcHRpb25zQ29yZSAmIHtcblx0LyoqXG5cdCAqIOe3qeWtmFxuXHQgKi9cblx0Y2FjaGVNYXA/OiBJQ2FjaGVNYXAsXG59XG5cbi8qKlxuICog5bu656uLIOaTtOWFheS6i+S7tuWHveaVuOeJqeS7tlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlWmhSZWdFeHBQbHVnaW4ob3B0aW9uczogSVpoUmVnRXhwUGx1Z2luT3B0aW9ucyA9IHt9KTogSU9wdGlvbnNPblxue1xuXHRsZXQgY2FjaGVNYXA6IElDYWNoZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jYWNoZU1hcClcblx0e1xuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5jYWNoZU1hcCA9PT0gJ2Jvb2xlYW4nKVxuXHRcdHtcblx0XHRcdGNhY2hlTWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0Y2FjaGVNYXAgPSBvcHRpb25zLmNhY2hlTWFwO1xuXHRcdH1cblx0fVxuXG5cdGxldCB7IGF1dG9EZWJ1cnIsIGF1dG9GdWxsSGFpZiwgYXV0b0xvY2FsZSwgYXV0b1ZvaWNlIH0gPSBvcHRpb25zO1xuXG5cdGxldCBjYWxsYmFjayA9IG9wdGlvbnMuY2FsbGJhY2s7XG5cblx0aWYgKGNhbGxiYWNrICYmIHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJylcblx0e1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYGNhbGxiYWNrIG11c3QgaXMgZnVuY3Rpb25gKVxuXHR9XG5cblx0cmV0dXJuIDxJT3B0aW9uc09uPntcblx0XHRkZWZhdWx0KGFzdCwgZXZlbnROYW1lLCBldilcblx0XHR7XG5cdFx0XHRhc3Qub2xkX3JhdyA9IGFzdC5vbGRfcmF3IHx8IGFzdC5yYXc7XG5cblx0XHRcdGNvbnN0IHJhdyA9IGFzdC5yYXc7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICog56K65L+dIOatpOevgOm7nuaykuacieiiq+WFtuS7luS/ruaUuemBjlxuXHRcdFx0ICovXG5cdFx0XHRpZiAoIWFzdC5jaGFuZ2VkICYmIGFzdC5vbGRfcmF3ID09PSByYXcgJiYgVVN0cmluZy5zaXplKHJhdykgPT0gMSlcblx0XHRcdHtcblx0XHRcdFx0bGV0IGFyciA9IF9jb3JlRm4ocmF3LCB7XG5cdFx0XHRcdFx0YXV0b0RlYnVycixcblx0XHRcdFx0XHRhdXRvRnVsbEhhaWYsXG5cdFx0XHRcdFx0YXV0b0xvY2FsZSxcblx0XHRcdFx0XHRhdXRvVm9pY2UsXG5cdFx0XHRcdFx0Y2FjaGVNYXAsXG5cdFx0XHRcdFx0Y2FsbGJhY2ssXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmIChhcnIgJiYgYXJyLmxlbmd0aCA+IDEpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhc3QucmF3ID0gJ1snICsgYXJyLmpvaW4oJycpICsgJ10nO1xuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogdHJpZ2dlciBjaGFuZ2UgaWYgbm90IHdpbGwgbm90IHVwZGF0ZSBub2RlXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBldi5lbWl0Q2hhbmdlKGFzdCk7XG5cdFx0XHRcdFx0ICogb3Jcblx0XHRcdFx0XHQgKiBldi5lbWl0KFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNoYW5nZSwgLCBhc3QpO1xuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGV2LmVtaXRDaGFuZ2UoYXN0KTtcblx0XHRcdFx0XHQvL2V2LmVtaXQoUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2hhbmdlLCAsIGFzdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHR9XG59XG5cbi8qKlxuICog5YiG5Lqr5YWn6YOo6JmV55CG5Ye95pW4IOaWueS+v+aLv+WOu+S9v+eUqOaIluiAheaTtOWFhVxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29yZUZuKHJhdzogc3RyaW5nLCB7XG5cdGF1dG9EZWJ1cnIsXG5cdGF1dG9GdWxsSGFpZixcblx0YXV0b0xvY2FsZSxcblx0YXV0b1ZvaWNlLFxuXHRjYWNoZU1hcCxcblx0Y2FsbGJhY2ssXG59OiBJWmhSZWdFeHBQbHVnaW5PcHRpb25zUnVudGltZSlcbntcblx0bGV0IGFycjogc3RyaW5nW10gPSBbXTtcblxuXHRpZiAoY2FjaGVNYXAgJiYgY2FjaGVNYXAuaGFzKHJhdykpXG5cdHtcblx0XHRhcnIgPSBjYWNoZU1hcC5nZXQocmF3KTtcblx0fVxuXHRlbHNlXG5cdHtcblx0XHRpZiAoYXV0b1ZvaWNlKVxuXHRcdHtcblx0XHRcdGFyci5wdXNoKC4uLmdldFZvaWNlQWxsKHJhdykpXG5cdFx0fVxuXG5cdFx0aWYgKGF1dG9GdWxsSGFpZilcblx0XHR7XG5cdFx0XHRsZXQgY2YgPSB0b0Z1bGxXaWR0aChyYXcpO1xuXHRcdFx0bGV0IGNoID0gdG9IYWxmV2lkdGgocmF3KTtcblxuXHRcdFx0YXJyLnB1c2goY2YsIGNoKTtcblxuXHRcdFx0aWYgKGF1dG9Mb2NhbGUpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKGNmLnRvTG9jYWxlTG93ZXJDYXNlKCksIGNoLnRvTG9jYWxlTG93ZXJDYXNlKCksIHJhdy50b0xvY2FsZUxvd2VyQ2FzZSgpKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGF1dG9EZWJ1cnIpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKGRlYnVycihjZiksIGRlYnVycihjaCksIGRlYnVycihyYXcpKTtcblxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0aWYgKGF1dG9Mb2NhbGUpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKHJhdy50b0xvY2FsZUxvd2VyQ2FzZSgpKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGF1dG9EZWJ1cnIpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKGRlYnVycihyYXcpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoY2FsbGJhY2spXG5cdFx0e1xuXHRcdFx0bGV0IHJldCA9IGNhbGxiYWNrKHJhdyk7XG5cblx0XHRcdGlmIChyZXQgPT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIHJldCA9PT0gJ3N0cmluZycpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKHJldCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChBcnJheS5pc0FycmF5KHJldCkpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKC4uLnJldCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0YXJyLnB1c2gocmF3KTtcblxuXHRcdGFyciA9IGFycmF5X3VuaXF1ZV9vdmVyd3JpdGUoYXJyLmZpbHRlcih2ID0+IHR5cGVvZiB2ID09PSAnc3RyaW5nJykuc29ydCgpKTtcblxuXHRcdGlmIChjYWNoZU1hcClcblx0XHR7XG5cdFx0XHRjYWNoZU1hcC5zZXQocmF3LCBhcnIpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBhcnI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVpoUmVnRXhwUGx1Z2luXG4iXX0=