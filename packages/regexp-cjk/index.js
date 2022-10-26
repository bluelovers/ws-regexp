"use strict";
/**
 * Created by user on 2018/1/31/031.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRegularExpressionString = exports.create = exports.zhRegExp = exports.defaultOptions = exports.ParserEventEmitter = exports.ParserEventEmitterEvent = void 0;
const tslib_1 = require("tslib");
const regexp_parser_event_1 = require("regexp-parser-event");
Object.defineProperty(exports, "ParserEventEmitter", { enumerable: true, get: function () { return regexp_parser_event_1.ParserEventEmitter; } });
Object.defineProperty(exports, "ParserEventEmitterEvent", { enumerable: true, get: function () { return regexp_parser_event_1.ParserEventEmitterEvent; } });
const core_1 = require("./lib/core");
const mergeOptions_1 = require("./lib/mergeOptions");
const getSource_1 = require("./lib/getSource");
Object.defineProperty(exports, "parseRegularExpressionString", { enumerable: true, get: function () { return getSource_1.parseRegularExpressionString; } });
tslib_1.__exportStar(require("./version"), exports);
/**
 * @deprecated
 */
exports.defaultOptions = {};
class zhRegExp extends RegExp {
    /**
     * create a new zhRegExp class with default value
     * @example `zhRegExp.use(defaultOptions)`
     */
    static use(defaultOptions) {
        defaultOptions = (0, mergeOptions_1.mergeOptions2)({}, this[core_1.SymDefaults], defaultOptions);
        const zhRegExpNew = new Proxy(zhRegExp, {
            // @ts-ignore
            construct(target, argArray, newTarget) {
                let { str, flags, options, argv } = (0, mergeOptions_1.getSettingOptions)(...argArray);
                options = (0, mergeOptions_1.mergeOptions)({}, defaultOptions, options);
                return new zhRegExp(str, flags, options, ...argv);
            },
            // @ts-ignore
            get(target, key) {
                if (key === core_1.SymDefaults) {
                    return defaultOptions;
                }
                return target[key];
            },
        });
        return zhRegExpNew;
    }
    constructor(str, ...argv) {
        let { source, flags } = (0, core_1.coreHandler)(str, ...argv);
        super(source, flags);
    }
    static create(str, flags = null, skip, ...argv) {
        return new this(str, flags, skip, ...argv);
    }
    getStatic() {
        return Object.getPrototypeOf(this);
    }
    /**
     * @todo
     */
    toRegularExpressionString() {
        return this.toString();
        //return `/${this.source}/${this.flags}`;
    }
    static parseRegularExpressionString(str) {
        return (0, getSource_1.parseRegularExpressionString)(str);
    }
    static get version() {
        return require('./package.json').version;
    }
}
exports.zhRegExp = zhRegExp;
exports.create = zhRegExp.create.bind(zhRegExp);
exports.default = zhRegExp;
//# sourceMappingURL=index.js.map