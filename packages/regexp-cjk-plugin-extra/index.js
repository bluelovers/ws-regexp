"use strict";
/**
 * Created by user on 2019/5/27.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._coreFn = exports.createZhRegExpPlugin = void 0;
const tslib_1 = require("tslib");
const array_hyper_unique_1 = require("array-hyper-unique");
const fullhalf_1 = require("str-util/lib/fullhalf");
const core_1 = tslib_1.__importDefault(require("uni-string/src/core"));
const jp_table_voice_1 = tslib_1.__importDefault(require("@lazy-cjk/jp-table-voice"));
const deburr_1 = tslib_1.__importDefault(require("lodash/deburr"));
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
    let { autoDeburr, autoFullHalf, autoLocale, autoVoice, callback } = options;
    // @ts-ignore 相容於舊版的錯字
    autoFullHalf !== null && autoFullHalf !== void 0 ? autoFullHalf : (autoFullHalf = options.autoFullHaif);
    if (callback && typeof callback !== 'function') {
        throw new TypeError(`callback must is function`);
    }
    return {
        ...options.on,
        default(ast, eventName, ev) {
            /**
             * 確保 此節點沒有被其他修改過
             */
            if (!(0, plugin_1.astNotChanged)(ast)) {
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
                        autoFullHalf,
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
                            autoFullHalf,
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
function _coreFn(raw, { autoDeburr, autoFullHalf, autoLocale, autoVoice, cacheMap, callback, }) {
    let arr = [];
    if (cacheMap && cacheMap.has(raw)) {
        arr = cacheMap.get(raw);
    }
    else {
        if (autoVoice) {
            let ret = (0, jp_table_voice_1.default)(raw);
            ret && arr.push(...ret);
        }
        if (autoFullHalf) {
            let cf = (0, fullhalf_1.toFullWidth)(raw);
            let ch = (0, fullhalf_1.toHalfWidth)(raw);
            arr.push(cf, ch);
            if (autoLocale) {
                arr.push(cf.toLocaleLowerCase(), ch.toLocaleLowerCase(), raw.toLocaleLowerCase());
            }
            if (autoDeburr) {
                arr.push((0, deburr_1.default)(cf), (0, deburr_1.default)(ch), (0, deburr_1.default)(raw));
            }
        }
        else {
            if (autoLocale) {
                arr.push(raw.toLocaleLowerCase());
            }
            if (autoDeburr) {
                arr.push((0, deburr_1.default)(raw));
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
        arr = (0, array_hyper_unique_1.array_unique_overwrite)(arr.filter(v => typeof v === 'string').sort());
        if (cacheMap) {
            cacheMap.set(raw, arr);
        }
    }
    return arr;
}
exports._coreFn = _coreFn;
exports.default = createZhRegExpPlugin;
//# sourceMappingURL=index.js.map