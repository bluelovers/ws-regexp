"use strict";
/**
 * Created by user on 2019/5/27.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._coreFn = exports.createZhRegExpPlugin = void 0;
const array_hyper_unique_1 = require("array-hyper-unique");
const fullhalf_1 = require("str-util/lib/fullhalf");
const core_1 = __importDefault(require("uni-string/src/core"));
const table_voice_1 = __importDefault(require("cjk-conv/lib/jp/table_voice"));
const deburr_1 = __importDefault(require("lodash/deburr"));
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
                arr.push(deburr_1.default(cf), deburr_1.default(ch), deburr_1.default(raw));
            }
        }
        else {
            if (autoLocale) {
                arr.push(raw.toLocaleLowerCase());
            }
            if (autoDeburr) {
                arr.push(deburr_1.default(raw));
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
//# sourceMappingURL=index.js.map