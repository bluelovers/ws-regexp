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
            const raw = ast.raw;
            /**
             * 確保 此節點沒有被其他修改過
             */
            if (plugin_1.astNotChanged(ast) && core_1.default.size(raw) == 1) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7O0FBRUgsMkRBQTJEO0FBRTNELG9EQUF5STtBQUd6SSwrREFBMEM7QUFDMUMsOEVBQXNEO0FBRXRELHdDQUF5QztBQUN6QyxrREFBc0Q7QUErQ3REOztHQUVHO0FBQ0gsU0FBZ0Isb0JBQW9CLENBQUMsVUFBa0MsRUFBRTtJQUV4RSxJQUFJLFFBQW1CLENBQUM7SUFFeEIsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUNwQjtRQUNDLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFDekM7WUFDQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7U0FDdkM7YUFFRDtZQUNDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1NBQzVCO0tBQ0Q7SUFFRCxJQUFJLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRWxFLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFFaEMsSUFBSSxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUM5QztRQUNDLE1BQU0sSUFBSSxTQUFTLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtLQUNoRDtJQUVELE9BQW1CO1FBRWxCLEdBQUcsT0FBTyxDQUFDLEVBQUU7UUFFYixPQUFPLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFO1lBRXpCLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFFcEI7O2VBRUc7WUFDSCxJQUFJLHNCQUFhLENBQUMsR0FBRyxDQUFDLElBQUksY0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQ2hEO2dCQUNDLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUU7b0JBQ3RCLFVBQVU7b0JB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LFFBQVEsRUFDWjtZQUNDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO0tBQ0Q7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNaLENBQUM7QUFwRkQsMEJBb0ZDO0FBRUQsa0JBQWUsb0JBQW9CLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE5LzUvMjcuXG4gKi9cblxuaW1wb3J0IHsgYXJyYXlfdW5pcXVlX292ZXJ3cml0ZSB9IGZyb20gJ2FycmF5LWh5cGVyLXVuaXF1ZSdcbmltcG9ydCBTdHJVdGlsIGZyb20gJ3N0ci11dGlsJztcbmltcG9ydCB7IEZ1bGxIYWxmQ29yZSwgdG9GdWxsTnVtYmVyLCB0b0hhbGZOdW1iZXIsIHRvRnVsbEVuZ2xpc2gsIHRvSGFsZkVuZ2xpc2gsIHRvRnVsbFdpZHRoLCB0b0hhbGZXaWR0aCB9IGZyb20gJ3N0ci11dGlsL2xpYi9mdWxsaGFsZic7XG5pbXBvcnQgeyBfZ2V0IGFzIF9nZXRBcnJheVRhYmxlIH0gZnJvbSAnY2prLWNvbnYvbGliL3poL3RhYmxlL3RhYmxlJztcbmltcG9ydCB7IElPcHRpb25zT24gfSBmcm9tICdyZWdleHAtY2prL2xpYi9jb3JlJztcbmltcG9ydCBVU3RyaW5nIGZyb20gJ3VuaS1zdHJpbmcvc3JjL2NvcmUnO1xuaW1wb3J0IGdldFZvaWNlQWxsIGZyb20gJ2Nqay1jb252L2xpYi9qcC90YWJsZV92b2ljZSc7XG5pbXBvcnQgeyBJTm9kZUlucHV0LCBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudCB9IGZyb20gJ3JlZ2V4cC1wYXJzZXItZXZlbnQnO1xuaW1wb3J0IGRlYnVyciA9IHJlcXVpcmUoJ2xvZGFzaC5kZWJ1cnInKTtcbmltcG9ydCB7IGFzdE5vdENoYW5nZWQgfSBmcm9tICdyZWdleHAtY2prL2xpYi9wbHVnaW4nO1xuXG5leHBvcnQgdHlwZSBJQ2FjaGVNYXAgPSBNYXA8c3RyaW5nLCBzdHJpbmdbXT5cblxuZXhwb3J0IGludGVyZmFjZSBJWmhSZWdFeHBQbHVnaW5PcHRpb25zQ29yZVxue1xuXHQvKipcblx0ICog5bmz5YGH5ZCN54mH5YGH5ZCN55qEIOa4hea/gemfs1xuXHQgKi9cblx0YXV0b1ZvaWNlPzogYm9vbGVhbixcblx0LyoqXG5cdCAqIOiHquWLlemFjeWwjSDljYrlvaIg5YWo5b2iXG5cdCAqL1xuXHRhdXRvRnVsbEhhaWY/OiBib29sZWFuLFxuXHQvKipcblx0ICog6YWN5bCN5pys5Zyw5YyW5a2X5YWDXG5cdCAqL1xuXHRhdXRvTG9jYWxlPzogYm9vbGVhbixcblx0LyoqXG5cdCAqIGRlYnVycignZMOpasOgIHZ1JykgLy8gPT4gJ2RlamEgdnUnXG5cdCAqXG5cdCAqIERlYnVycnMgc3RyaW5nIGJ5IGNvbnZlcnRpbmcgTGF0aW4tMSBTdXBwbGVtZW50IGFuZCBMYXRpbiBFeHRlbmRlZC1BIGxldHRlcnMgdG8gYmFzaWMgTGF0aW4gbGV0dGVycyBhbmQgcmVtb3ZpbmcgY29tYmluaW5nIGRpYWNyaXRpY2FsIG1hcmtzLlxuXHQgKi9cblx0YXV0b0RlYnVycj86IGJvb2xlYW4sXG5cblx0LyoqXG5cdCAqIGlmIHJldHVybiBudWxsIHwgdW5kZWZpbmVkIHRoZW4gd2lsbCBza2lwIGN1cnJlbnQgbm9kZVxuXHQgKi9cblx0Y2FsbGJhY2s/KHJhdzogc3RyaW5nKTogc3RyaW5nIHwgc3RyaW5nW10sXG5cblx0b24/OiBJT3B0aW9uc09uPElOb2RlSW5wdXQ+LFxufVxuXG5leHBvcnQgdHlwZSBJWmhSZWdFeHBQbHVnaW5PcHRpb25zID0gSVpoUmVnRXhwUGx1Z2luT3B0aW9uc0NvcmUgJiB7XG5cdC8qKlxuXHQgKiDnt6nlrZhcblx0ICovXG5cdGNhY2hlTWFwPzogYm9vbGVhbiB8IElDYWNoZU1hcCxcbn1cblxuZXhwb3J0IHR5cGUgSVpoUmVnRXhwUGx1Z2luT3B0aW9uc1J1bnRpbWUgPSBJWmhSZWdFeHBQbHVnaW5PcHRpb25zQ29yZSAmIHtcblx0LyoqXG5cdCAqIOe3qeWtmFxuXHQgKi9cblx0Y2FjaGVNYXA/OiBJQ2FjaGVNYXAsXG59XG5cbi8qKlxuICog5bu656uLIOaTtOWFheS6i+S7tuWHveaVuOeJqeS7tlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlWmhSZWdFeHBQbHVnaW4ob3B0aW9uczogSVpoUmVnRXhwUGx1Z2luT3B0aW9ucyA9IHt9KTogSU9wdGlvbnNPblxue1xuXHRsZXQgY2FjaGVNYXA6IElDYWNoZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jYWNoZU1hcClcblx0e1xuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5jYWNoZU1hcCA9PT0gJ2Jvb2xlYW4nKVxuXHRcdHtcblx0XHRcdGNhY2hlTWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0Y2FjaGVNYXAgPSBvcHRpb25zLmNhY2hlTWFwO1xuXHRcdH1cblx0fVxuXG5cdGxldCB7IGF1dG9EZWJ1cnIsIGF1dG9GdWxsSGFpZiwgYXV0b0xvY2FsZSwgYXV0b1ZvaWNlIH0gPSBvcHRpb25zO1xuXG5cdGxldCBjYWxsYmFjayA9IG9wdGlvbnMuY2FsbGJhY2s7XG5cblx0aWYgKGNhbGxiYWNrICYmIHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJylcblx0e1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYGNhbGxiYWNrIG11c3QgaXMgZnVuY3Rpb25gKVxuXHR9XG5cblx0cmV0dXJuIDxJT3B0aW9uc09uPntcblxuXHRcdC4uLm9wdGlvbnMub24sXG5cblx0XHRkZWZhdWx0KGFzdCwgZXZlbnROYW1lLCBldilcblx0XHR7XG5cdFx0XHRjb25zdCByYXcgPSBhc3QucmF3O1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIOeiuuS/nSDmraTnr4Dpu57mspLmnInooqvlhbbku5bkv67mlLnpgY5cblx0XHRcdCAqL1xuXHRcdFx0aWYgKGFzdE5vdENoYW5nZWQoYXN0KSAmJiBVU3RyaW5nLnNpemUocmF3KSA9PSAxKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgYXJyID0gX2NvcmVGbihyYXcsIHtcblx0XHRcdFx0XHRhdXRvRGVidXJyLFxuXHRcdFx0XHRcdGF1dG9GdWxsSGFpZixcblx0XHRcdFx0XHRhdXRvTG9jYWxlLFxuXHRcdFx0XHRcdGF1dG9Wb2ljZSxcblx0XHRcdFx0XHRjYWNoZU1hcCxcblx0XHRcdFx0XHRjYWxsYmFjayxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKGFyciAmJiBhcnIubGVuZ3RoID4gMSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFzdC5yYXcgPSAnWycgKyBhcnIuam9pbignJykgKyAnXSc7XG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiB0cmlnZ2VyIGNoYW5nZSBpZiBub3Qgd2lsbCBub3QgdXBkYXRlIG5vZGVcblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIGV2LmVtaXRDaGFuZ2UoYXN0KTtcblx0XHRcdFx0XHQgKiBvclxuXHRcdFx0XHRcdCAqIGV2LmVtaXQoUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2hhbmdlLCAsIGFzdCk7XG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0ZXYuZW1pdENoYW5nZShhc3QpO1xuXHRcdFx0XHRcdC8vZXYuZW1pdChQYXJzZXJFdmVudEVtaXR0ZXJFdmVudC5jaGFuZ2UsICwgYXN0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdH1cbn1cblxuLyoqXG4gKiDliIbkuqvlhafpg6jomZXnkIblh73mlbgg5pa55L6/5ou/5Y675L2/55So5oiW6ICF5pO05YWFXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb3JlRm4ocmF3OiBzdHJpbmcsIHtcblx0YXV0b0RlYnVycixcblx0YXV0b0Z1bGxIYWlmLFxuXHRhdXRvTG9jYWxlLFxuXHRhdXRvVm9pY2UsXG5cdGNhY2hlTWFwLFxuXHRjYWxsYmFjayxcbn06IElaaFJlZ0V4cFBsdWdpbk9wdGlvbnNSdW50aW1lKVxue1xuXHRsZXQgYXJyOiBzdHJpbmdbXSA9IFtdO1xuXG5cdGlmIChjYWNoZU1hcCAmJiBjYWNoZU1hcC5oYXMocmF3KSlcblx0e1xuXHRcdGFyciA9IGNhY2hlTWFwLmdldChyYXcpO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdGlmIChhdXRvVm9pY2UpXG5cdFx0e1xuXHRcdFx0bGV0IHJldCA9IGdldFZvaWNlQWxsKHJhdyk7XG5cblx0XHRcdHJldCAmJiBhcnIucHVzaCguLi5yZXQpXG5cdFx0fVxuXG5cdFx0aWYgKGF1dG9GdWxsSGFpZilcblx0XHR7XG5cdFx0XHRsZXQgY2YgPSB0b0Z1bGxXaWR0aChyYXcpO1xuXHRcdFx0bGV0IGNoID0gdG9IYWxmV2lkdGgocmF3KTtcblxuXHRcdFx0YXJyLnB1c2goY2YsIGNoKTtcblxuXHRcdFx0aWYgKGF1dG9Mb2NhbGUpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKGNmLnRvTG9jYWxlTG93ZXJDYXNlKCksIGNoLnRvTG9jYWxlTG93ZXJDYXNlKCksIHJhdy50b0xvY2FsZUxvd2VyQ2FzZSgpKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGF1dG9EZWJ1cnIpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKGRlYnVycihjZiksIGRlYnVycihjaCksIGRlYnVycihyYXcpKTtcblxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0aWYgKGF1dG9Mb2NhbGUpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKHJhdy50b0xvY2FsZUxvd2VyQ2FzZSgpKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGF1dG9EZWJ1cnIpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKGRlYnVycihyYXcpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoY2FsbGJhY2spXG5cdFx0e1xuXHRcdFx0bGV0IHJldCA9IGNhbGxiYWNrKHJhdyk7XG5cblx0XHRcdGlmIChyZXQgPT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIHJldCA9PT0gJ3N0cmluZycpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKHJldCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChBcnJheS5pc0FycmF5KHJldCkpXG5cdFx0XHR7XG5cdFx0XHRcdGFyci5wdXNoKC4uLnJldCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0YXJyLnB1c2gocmF3KTtcblxuXHRcdGFyciA9IGFycmF5X3VuaXF1ZV9vdmVyd3JpdGUoYXJyLmZpbHRlcih2ID0+IHR5cGVvZiB2ID09PSAnc3RyaW5nJykuc29ydCgpKTtcblxuXHRcdGlmIChjYWNoZU1hcClcblx0XHR7XG5cdFx0XHRjYWNoZU1hcC5zZXQocmF3LCBhcnIpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBhcnI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVpoUmVnRXhwUGx1Z2luXG4iXX0=