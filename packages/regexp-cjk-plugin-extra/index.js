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
                case '－':
                case '＼':
                case '／':
                case '［':
                case '］':
                    arr = _coreFn(raw2, {
                        autoDeburr,
                        autoFullHaif,
                        autoLocale,
                        autoVoice,
                        cacheMap,
                        callback,
                    })
                        .map(v => {
                        switch (v) {
                            case '-':
                            case '\\':
                            case '/':
                            case '\/':
                            case '[':
                            case ']':
                                return '\\' + v;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7O0FBRUgsMkRBQTJEO0FBRTNELG9EQVErQjtBQUcvQiwrREFBMEM7QUFDMUMsOEVBQXNEO0FBRXRELHdDQUF5QztBQUN6QyxrREFBc0Q7QUErQ3REOztHQUVHO0FBQ0gsU0FBZ0Isb0JBQW9CLENBQUMsVUFBa0MsRUFBRTtJQUV4RSxJQUFJLFFBQW1CLENBQUM7SUFFeEIsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUNwQjtRQUNDLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFDekM7WUFDQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7U0FDdkM7YUFFRDtZQUNDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1NBQzVCO0tBQ0Q7SUFFRCxJQUFJLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRWxFLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFFaEMsSUFBSSxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUM5QztRQUNDLE1BQU0sSUFBSSxTQUFTLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtLQUNoRDtJQUVELE9BQW1CO1FBRWxCLEdBQUcsT0FBTyxDQUFDLEVBQUU7UUFFYixPQUFPLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFO1lBRXpCOztlQUVHO1lBQ0gsSUFBSSxDQUFDLHNCQUFhLENBQUMsR0FBRyxDQUFDLEVBQ3ZCO2dCQUNDLE9BQU87YUFDUDtZQUVELE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDcEIsSUFBSSxHQUFhLENBQUM7WUFFbEIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFD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QUcsMkNBQXNCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFNUUsSUFBSSxRQUFRLEVBQ1o7WUFDQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN2QjtLQUNEO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDWixDQUFDO0FBcEZELDBCQW9GQztBQUVELGtCQUFlLG9CQUFvQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOS81LzI3LlxuICovXG5cbmltcG9ydCB7IGFycmF5X3VuaXF1ZV9vdmVyd3JpdGUgfSBmcm9tICdhcnJheS1oeXBlci11bmlxdWUnXG5pbXBvcnQgU3RyVXRpbCBmcm9tICdzdHItdXRpbCc7XG5pbXBvcnQge1xuXHRGdWxsSGFsZkNvcmUsXG5cdHRvRnVsbE51bWJlcixcblx0dG9IYWxmTnVtYmVyLFxuXHR0b0Z1bGxFbmdsaXNoLFxuXHR0b0hhbGZFbmdsaXNoLFxuXHR0b0Z1bGxXaWR0aCxcblx0dG9IYWxmV2lkdGgsXG59IGZyb20gJ3N0ci11dGlsL2xpYi9mdWxsaGFsZic7XG5pbXBvcnQgeyBfZ2V0IGFzIF9nZXRBcnJheVRhYmxlIH0gZnJvbSAnY2prLWNvbnYvbGliL3poL3RhYmxlL3RhYmxlJztcbmltcG9ydCB7IElPcHRpb25zT24gfSBmcm9tICdyZWdleHAtY2prL2xpYi9jb3JlJztcbmltcG9ydCBVU3RyaW5nIGZyb20gJ3VuaS1zdHJpbmcvc3JjL2NvcmUnO1xuaW1wb3J0IGdldFZvaWNlQWxsIGZyb20gJ2Nqay1jb252L2xpYi9qcC90YWJsZV92b2ljZSc7XG5pbXBvcnQgeyBJTm9kZUlucHV0LCBQYXJzZXJFdmVudEVtaXR0ZXJFdmVudCB9IGZyb20gJ3JlZ2V4cC1wYXJzZXItZXZlbnQnO1xuaW1wb3J0IGRlYnVyciA9IHJlcXVpcmUoJ2xvZGFzaC5kZWJ1cnInKTtcbmltcG9ydCB7IGFzdE5vdENoYW5nZWQgfSBmcm9tICdyZWdleHAtY2prL2xpYi9wbHVnaW4nO1xuXG5leHBvcnQgdHlwZSBJQ2FjaGVNYXAgPSBNYXA8c3RyaW5nLCBzdHJpbmdbXT5cblxuZXhwb3J0IGludGVyZmFjZSBJWmhSZWdFeHBQbHVnaW5PcHRpb25zQ29yZVxue1xuXHQvKipcblx0ICog5bmz5YGH5ZCN54mH5YGH5ZCN55qEIOa4hea/gemfs1xuXHQgKi9cblx0YXV0b1ZvaWNlPzogYm9vbGVhbixcblx0LyoqXG5cdCAqIOiHquWLlemFjeWwjSDljYrlvaIg5YWo5b2iXG5cdCAqL1xuXHRhdXRvRnVsbEhhaWY/OiBib29sZWFuLFxuXHQvKipcblx0ICog6YWN5bCN5pys5Zyw5YyW5a2X5YWDXG5cdCAqL1xuXHRhdXRvTG9jYWxlPzogYm9vbGVhbixcblx0LyoqXG5cdCAqIGRlYnVycignZMOpasOgIHZ1JykgLy8gPT4gJ2RlamEgdnUnXG5cdCAqXG5cdCAqIERlYnVycnMgc3RyaW5nIGJ5IGNvbnZlcnRpbmcgTGF0aW4tMSBTdXBwbGVtZW50IGFuZCBMYXRpbiBFeHRlbmRlZC1BIGxldHRlcnMgdG8gYmFzaWMgTGF0aW4gbGV0dGVycyBhbmQgcmVtb3ZpbmcgY29tYmluaW5nIGRpYWNyaXRpY2FsIG1hcmtzLlxuXHQgKi9cblx0YXV0b0RlYnVycj86IGJvb2xlYW4sXG5cblx0LyoqXG5cdCAqIGlmIHJldHVybiBudWxsIHwgdW5kZWZpbmVkIHRoZW4gd2lsbCBza2lwIGN1cnJlbnQgbm9kZVxuXHQgKi9cblx0Y2FsbGJhY2s/KHJhdzogc3RyaW5nKTogc3RyaW5nIHwgc3RyaW5nW10sXG5cblx0b24/OiBJT3B0aW9uc09uPElOb2RlSW5wdXQ+LFxufVxuXG5leHBvcnQgdHlwZSBJWmhSZWdFeHBQbHVnaW5PcHRpb25zID0gSVpoUmVnRXhwUGx1Z2luT3B0aW9uc0NvcmUgJiB7XG5cdC8qKlxuXHQgKiDnt6nlrZhcblx0ICovXG5cdGNhY2hlTWFwPzogYm9vbGVhbiB8IElDYWNoZU1hcCxcbn1cblxuZXhwb3J0IHR5cGUgSVpoUmVnRXhwUGx1Z2luT3B0aW9uc1J1bnRpbWUgPSBJWmhSZWdFeHBQbHVnaW5PcHRpb25zQ29yZSAmIHtcblx0LyoqXG5cdCAqIOe3qeWtmFxuXHQgKi9cblx0Y2FjaGVNYXA/OiBJQ2FjaGVNYXAsXG59XG5cbi8qKlxuICog5bu656uLIOaTtOWFheS6i+S7tuWHveaVuOeJqeS7tlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlWmhSZWdFeHBQbHVnaW4ob3B0aW9uczogSVpoUmVnRXhwUGx1Z2luT3B0aW9ucyA9IHt9KTogSU9wdGlvbnNPblxue1xuXHRsZXQgY2FjaGVNYXA6IElDYWNoZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jYWNoZU1hcClcblx0e1xuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5jYWNoZU1hcCA9PT0gJ2Jvb2xlYW4nKVxuXHRcdHtcblx0XHRcdGNhY2hlTWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0Y2FjaGVNYXAgPSBvcHRpb25zLmNhY2hlTWFwO1xuXHRcdH1cblx0fVxuXG5cdGxldCB7IGF1dG9EZWJ1cnIsIGF1dG9GdWxsSGFpZiwgYXV0b0xvY2FsZSwgYXV0b1ZvaWNlIH0gPSBvcHRpb25zO1xuXG5cdGxldCBjYWxsYmFjayA9IG9wdGlvbnMuY2FsbGJhY2s7XG5cblx0aWYgKGNhbGxiYWNrICYmIHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJylcblx0e1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYGNhbGxiYWNrIG11c3QgaXMgZnVuY3Rpb25gKVxuXHR9XG5cblx0cmV0dXJuIDxJT3B0aW9uc09uPntcblxuXHRcdC4uLm9wdGlvbnMub24sXG5cblx0XHRkZWZhdWx0KGFzdCwgZXZlbnROYW1lLCBldilcblx0XHR7XG5cdFx0XHQvKipcblx0XHRcdCAqIOeiuuS/nSDmraTnr4Dpu57mspLmnInooqvlhbbku5bkv67mlLnpgY5cblx0XHRcdCAqL1xuXHRcdFx0aWYgKCFhc3ROb3RDaGFuZ2VkKGFzdCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgcmF3ID0gYXN0LnJhdztcblx0XHRcdGxldCBhcnI6IHN0cmluZ1tdO1xuXG5cdFx0XHRsZXQgcmF3MiA9IHJhdy5yZXBsYWNlKC9eXFxcXC8sICcnKTtcblx0XHRcdGxldCByYXczOiBzdHJpbmcgPSByYXc7XG5cblx0XHRcdHN3aXRjaCAocmF3KVxuXHRcdFx0e1xuXHRcdFx0XHRjYXNlICdcXFxcLic6XG5cdFx0XHRcdGNhc2UgJ1xcXFwoJzpcblx0XHRcdFx0Y2FzZSAnXFxcXCknOlxuXHRcdFx0XHRjYXNlICdcXFxcKic6XG5cdFx0XHRcdGNhc2UgJ1xcXFw/Jzpcblx0XHRcdFx0Y2FzZSAnXFxcXCsnOlxuXG5cdFx0XHRcdFx0cmF3MyA9IHJhdzI7XG5cblx0XHRcdFx0Y2FzZSAnXFxcXFsnOlxuXHRcdFx0XHRjYXNlICdcXFxcXSc6XG5cdFx0XHRcdGNhc2UgJ1xcXFwvJzpcblx0XHRcdFx0Y2FzZSAnXFxcXC0nOlxuXHRcdFx0XHRjYXNlICctJzpcblx0XHRcdFx0Y2FzZSAnXFxcXFxcXFwnOlxuXHRcdFx0XHRjYXNlICfvvI0nOlxuXHRcdFx0XHRjYXNlICfvvLwnOlxuXHRcdFx0XHRjYXNlICfvvI8nOlxuXHRcdFx0XHRjYXNlICfvvLsnOlxuXHRcdFx0XHRjYXNlICfvvL0nOlxuXG5cdFx0XHRcdFx0YXJyID0gX2NvcmVGbihyYXcyLCB7XG5cdFx0XHRcdFx0XHRhdXRvRGVidXJyLFxuXHRcdFx0XHRcdFx0YXV0b0Z1bGxIYWlmLFxuXHRcdFx0XHRcdFx0YXV0b0xvY2FsZSxcblx0XHRcdFx0XHRcdGF1dG9Wb2ljZSxcblx0XHRcdFx0XHRcdGNhY2hlTWFwLFxuXHRcdFx0XHRcdFx0Y2FsbGJhY2ssXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5tYXAodiA9PlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRzd2l0Y2ggKHYpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRjYXNlICctJzpcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdcXFxcJzpcblx0XHRcdFx0XHRcdFx0XHRjYXNlICcvJzpcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdcXC8nOlxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ1snOlxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ10nOlxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICdcXFxcJyArIHY7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdiA9PT0gcmF3MiA/IHJhdzMgOiB2XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdFx0aWYgKFVTdHJpbmcuc2l6ZShyYXcpID09IDEpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0YXJyID0gX2NvcmVGbihyYXcsIHtcblx0XHRcdFx0XHRcdFx0YXV0b0RlYnVycixcblx0XHRcdFx0XHRcdFx0YXV0b0Z1bGxIYWlmLFxuXHRcdFx0XHRcdFx0XHRhdXRvTG9jYWxlLFxuXHRcdFx0XHRcdFx0XHRhdXRvVm9pY2UsXG5cdFx0XHRcdFx0XHRcdGNhY2hlTWFwLFxuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayxcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Ly9jb25zb2xlLmRpcihhc3QpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXJyICYmIGFyci5sZW5ndGggPiAxKVxuXHRcdFx0e1xuXHRcdFx0XHRhc3QucmF3ID0gJ1snICsgYXJyLmpvaW4oJycpICsgJ10nO1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiB0cmlnZ2VyIGNoYW5nZSBpZiBub3Qgd2lsbCBub3QgdXBkYXRlIG5vZGVcblx0XHRcdFx0ICpcblx0XHRcdFx0ICogZXYuZW1pdENoYW5nZShhc3QpO1xuXHRcdFx0XHQgKiBvclxuXHRcdFx0XHQgKiBldi5lbWl0KFBhcnNlckV2ZW50RW1pdHRlckV2ZW50LmNoYW5nZSwgLCBhc3QpO1xuXHRcdFx0XHQgKi9cblx0XHRcdFx0ZXYuZW1pdENoYW5nZShhc3QpO1xuXHRcdFx0XHQvL2V2LmVtaXQoUGFyc2VyRXZlbnRFbWl0dGVyRXZlbnQuY2hhbmdlLCAsIGFzdCk7XG5cdFx0XHR9XG5cdFx0fSxcblx0fVxufVxuXG4vKipcbiAqIOWIhuS6q+WFp+mDqOiZleeQhuWHveaVuCDmlrnkvr/mi7/ljrvkvb/nlKjmiJbogIXmk7TlhYVcbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NvcmVGbihyYXc6IHN0cmluZywge1xuXHRhdXRvRGVidXJyLFxuXHRhdXRvRnVsbEhhaWYsXG5cdGF1dG9Mb2NhbGUsXG5cdGF1dG9Wb2ljZSxcblx0Y2FjaGVNYXAsXG5cdGNhbGxiYWNrLFxufTogSVpoUmVnRXhwUGx1Z2luT3B0aW9uc1J1bnRpbWUpXG57XG5cdGxldCBhcnI6IHN0cmluZ1tdID0gW107XG5cblx0aWYgKGNhY2hlTWFwICYmIGNhY2hlTWFwLmhhcyhyYXcpKVxuXHR7XG5cdFx0YXJyID0gY2FjaGVNYXAuZ2V0KHJhdyk7XG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0aWYgKGF1dG9Wb2ljZSlcblx0XHR7XG5cdFx0XHRsZXQgcmV0ID0gZ2V0Vm9pY2VBbGwocmF3KTtcblxuXHRcdFx0cmV0ICYmIGFyci5wdXNoKC4uLnJldClcblx0XHR9XG5cblx0XHRpZiAoYXV0b0Z1bGxIYWlmKVxuXHRcdHtcblx0XHRcdGxldCBjZiA9IHRvRnVsbFdpZHRoKHJhdyk7XG5cdFx0XHRsZXQgY2ggPSB0b0hhbGZXaWR0aChyYXcpO1xuXG5cdFx0XHRhcnIucHVzaChjZiwgY2gpO1xuXG5cdFx0XHRpZiAoYXV0b0xvY2FsZSlcblx0XHRcdHtcblx0XHRcdFx0YXJyLnB1c2goY2YudG9Mb2NhbGVMb3dlckNhc2UoKSwgY2gudG9Mb2NhbGVMb3dlckNhc2UoKSwgcmF3LnRvTG9jYWxlTG93ZXJDYXNlKCkpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXV0b0RlYnVycilcblx0XHRcdHtcblx0XHRcdFx0YXJyLnB1c2goZGVidXJyKGNmKSwgZGVidXJyKGNoKSwgZGVidXJyKHJhdykpO1xuXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRpZiAoYXV0b0xvY2FsZSlcblx0XHRcdHtcblx0XHRcdFx0YXJyLnB1c2gocmF3LnRvTG9jYWxlTG93ZXJDYXNlKCkpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXV0b0RlYnVycilcblx0XHRcdHtcblx0XHRcdFx0YXJyLnB1c2goZGVidXJyKHJhdykpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChjYWxsYmFjaylcblx0XHR7XG5cdFx0XHRsZXQgcmV0ID0gY2FsbGJhY2socmF3KTtcblxuXHRcdFx0aWYgKHJldCA9PSBudWxsKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgcmV0ID09PSAnc3RyaW5nJylcblx0XHRcdHtcblx0XHRcdFx0YXJyLnB1c2gocmV0KTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmV0KSlcblx0XHRcdHtcblx0XHRcdFx0YXJyLnB1c2goLi4ucmV0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRhcnIucHVzaChyYXcpO1xuXG5cdFx0YXJyID0gYXJyYXlfdW5pcXVlX292ZXJ3cml0ZShhcnIuZmlsdGVyKHYgPT4gdHlwZW9mIHYgPT09ICdzdHJpbmcnKS5zb3J0KCkpO1xuXG5cdFx0aWYgKGNhY2hlTWFwKVxuXHRcdHtcblx0XHRcdGNhY2hlTWFwLnNldChyYXcsIGFycik7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlWmhSZWdFeHBQbHVnaW5cbiJdfQ==