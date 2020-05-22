"use strict";
/**
 * Created by user on 2018/1/31/031.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = exports.parseRegularExpressionString = exports.isRegExp = exports.create = exports.zhRegExp = exports.defaultOptions = exports.ParserEventEmitter = exports.ParserEventEmitterEvent = void 0;
const regexp_parser_event_1 = require("regexp-parser-event");
Object.defineProperty(exports, "ParserEventEmitter", { enumerable: true, get: function () { return regexp_parser_event_1.ParserEventEmitter; } });
const core_1 = require("./lib/core");
const regexp_helper_1 = require("regexp-helper");
Object.defineProperty(exports, "isRegExp", { enumerable: true, get: function () { return regexp_helper_1.isRegExp; } });
const RegexpHelper = __importStar(require("regexp-helper"));
const mergeOptions_1 = __importStar(require("./lib/mergeOptions"));
const getSource_1 = require("./lib/getSource");
Object.defineProperty(exports, "parseRegularExpressionString", { enumerable: true, get: function () { return getSource_1.parseRegularExpressionString; } });
/**
 * @deprecated
 */
exports.defaultOptions = {};
class zhRegExp extends RegExp {
    constructor(str, ...argv) {
        let { source, flags } = core_1.coreHandler(str, ...argv);
        super(source, flags);
    }
    /**
     * create a new zhRegExp class with default value
     * @example `zhRegExp.use(defaultOptions)`
     */
    static use(defaultOptions) {
        defaultOptions = mergeOptions_1.mergeOptions2({}, this[core_1.SymDefaults], defaultOptions);
        const zhRegExpNew = new Proxy(zhRegExp, {
            // @ts-ignore
            construct(target, argArray, newTarget) {
                let { str, flags, options, argv } = mergeOptions_1.getSettingOptions(...argArray);
                options = mergeOptions_1.default({}, defaultOptions, options);
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
        return getSource_1.parseRegularExpressionString(str);
    }
    static get support() {
        return require('regexp-support').default;
    }
    static get version() {
        return require('./package.json').version;
    }
}
exports.zhRegExp = zhRegExp;
(function (zhRegExp) {
    zhRegExp.isRegExp = RegexpHelper.isRegExp;
})(zhRegExp = exports.zhRegExp || (exports.zhRegExp = {}));
exports.create = zhRegExp.create.bind(zhRegExp);
Object.defineProperty(exports, "version", {
    get() {
        return require('./package.json').version;
    }
});
exports.default = zhRegExp;
//# sourceMappingURL=index.js.map