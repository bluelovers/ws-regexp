"use strict";
/**
 * Created by user on 2019/6/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.customizer = customizer;
exports.getSettingOptions = getSettingOptions;
exports.mergeOptions2 = mergeOptions2;
exports.mergeOptions = mergeOptions;
exports.fixOptions = fixOptions;
const lodash_1 = require("lodash");
const array_hyper_unique_1 = require("array-hyper-unique");
function customizer(objValue, srcValue) {
    if ((0, lodash_1.isArray)(objValue)) {
        return objValue.concat(srcValue);
    }
}
function getSettingOptions(str, flags = null, options = {}, ...argv) {
    if (flags !== null && typeof flags == 'object') {
        options = Object.assign({}, flags);
        flags = (options.flags || null);
    }
    if (typeof options == 'string') {
        options = {
            skip: options,
        };
    }
    if (typeof options.flags == 'string') {
        flags = options.flags;
    }
    return {
        str,
        flags: flags,
        options,
        argv,
    };
}
/**
 * for `zhRegExp.use` only
 */
function mergeOptions2(base = {}, ...opts) {
    let ret = mergeOptions(base, ...opts);
    if (typeof ret.flags === 'string') {
        ret.defaultFlags = ret.flags;
        delete ret.flags;
    }
    return ret;
}
function mergeOptions(base = {}, ...opts) {
    let arr = [base || {}]
        .concat(opts)
        .filter(o => o);
    if (arr.length > 1) {
        // @ts-ignore
        base = (0, lodash_1.mergeWith)(...(arr.map(o => {
            return fixOptions(o);
            // @ts-ignore
        })), customizer);
    }
    return fixOptions(base);
}
/*
export function MergeDefaultOptions(target: typeof zhRegExp): typeof zhRegExp
{
    const zhRegExpNew = class zhRegExp extends target
    {
        constructor(...args: [any, ...any[]])
        {
            let { str, flags, options, argv } = getSettingOptions(...args);

            options = mergeOptions({}, zhRegExpNew[SymDefaults], options);

            super(str, flags, options, ...argv)
        }
    };

    return zhRegExpNew
}
 */
function fixOptions(options, removeEmptyOn) {
    if (options.on) {
        if (Array.isArray(options.on)) {
            (0, array_hyper_unique_1.array_unique_overwrite)(options.on);
        }
        else {
            options.on = [options.on];
        }
        options.on = options.on.filter(v => v);
        if (removeEmptyOn && !options.on.length) {
            delete options.on;
        }
    }
    if (removeEmptyOn && options.onCore) {
        if (!options.onCore.length) {
            delete options.onCore;
        }
    }
    // @ts-ignore
    return options;
}
exports.default = mergeOptions;
//# sourceMappingURL=mergeOptions.js.map