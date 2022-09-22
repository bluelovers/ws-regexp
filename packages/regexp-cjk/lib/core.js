"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupParserEventEmitter = exports.coreHandler = exports.SymDefaults = exports.ParserEventEmitter = exports.ParserEventEmitterEvent = void 0;
const conv_1 = require("./conv");
const regexp_parser_event_1 = require("regexp-parser-event");
Object.defineProperty(exports, "ParserEventEmitter", { enumerable: true, get: function () { return regexp_parser_event_1.ParserEventEmitter; } });
Object.defineProperty(exports, "ParserEventEmitterEvent", { enumerable: true, get: function () { return regexp_parser_event_1.ParserEventEmitterEvent; } });
const regexp_range_1 = require("regexp-range");
const mergeOptions_1 = require("./mergeOptions");
const getSource_1 = require("./getSource");
const zh_table_list_1 = require("@lazy-cjk/zh-table-list");
const plugin_1 = require("./plugin");
exports.SymDefaults = Symbol.for('zhRegExp.defaults');
function coreHandler(str, flags = null, options = {}, ...argv) {
    const opts = (0, mergeOptions_1.getSettingOptions)(str, flags, options, ...argv);
    let source;
    let hasFlags;
    ({ options, argv } = opts);
    options = (0, mergeOptions_1.fixOptions)(options);
    ({ source, hasFlags, flags } = (0, getSource_1.getRegExpSourcePattern)(opts));
    str = source;
    if (options.onCore) {
        let optsNew = options.onCore.reduce((a, setting) => {
            if (!setting.beforeStart) {
                return a;
            }
            return setting.beforeStart(a);
        }, {
            str,
            flags,
            options,
            argv,
            hasFlags,
        });
        ({ str, options, flags, argv, hasFlags } = optsNew);
    }
    if ((!options.disableZh || !options.disableLocalRange || options.on)) {
        let ev = regexp_parser_event_1.ParserEventEmitter.create(str, flags || '');
        const zhTableFn = options.zhTable || (options.greedyTable ? conv_1.zhTableAutoGreedyTable : zh_table_list_1.auto);
        if (!options.disableZh) {
            ev.on("default" /* ParserEventEmitterEvent.default */, function (ast) {
                (0, plugin_1.astOldRaw)(ast);
                let raw = (0, conv_1._word_zh_core)(ast.raw, options.skip, zhTableFn, options);
                if (ast.raw !== raw) {
                    ast.raw = raw;
                    ev.emit("change" /* ParserEventEmitterEvent.change */, ast);
                }
            });
        }
        if (!options.disableLocalRange) {
            ev.on("class_range" /* ParserEventEmitterEvent.class_range */, function (ast, ...argv) {
                let s = ast.min.raw;
                let e = ast.max.raw;
                let ret = (0, regexp_range_1.matchRange)(s, e, {
                    createRegExpString: true,
                });
                if (ret) {
                    if (options.allowLocalRangeAutoZh) {
                        ret = (0, conv_1._word_zh_core2)(ret, options.skip, zhTableFn, options);
                    }
                    (0, plugin_1.astOldRaw)(ast);
                    if (ast.raw !== ret) {
                        ast.raw = ret;
                        ev.emit("change" /* ParserEventEmitterEvent.change */, ast);
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
    if (options.onCore) {
        let optsNew = options.onCore.reduce((a, setting) => {
            if (!setting.afterStart) {
                return a;
            }
            return setting.afterStart(a);
        }, {
            str,
            flags,
            options,
            argv,
            hasFlags,
        });
        ({ str, options, flags, argv, hasFlags } = optsNew);
    }
    return {
        source: str,
        flags: flags || '',
        options: options,
    };
}
exports.coreHandler = coreHandler;
function setupParserEventEmitter(ev, options) {
    const onList = (0, mergeOptions_1.fixOptions)(options).on;
    if (onList) {
        onList
            .forEach((conf) => {
            Object
                .keys(conf)
                // @ts-ignore
                .forEach(function (event) {
                ev.on(event, conf[event]);
            });
        });
    }
    return ev;
}
exports.setupParserEventEmitter = setupParserEventEmitter;
exports.default = coreHandler;
//# sourceMappingURL=core.js.map