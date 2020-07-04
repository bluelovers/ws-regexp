"use strict";
/**
 * Created by user on 2018/4/24/024.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const XRegExp = require("xregexp");
const cjk_conv_1 = require("cjk-conv");
exports._CACHE = new Set();
exports.X_REGEX_DATA = 'xregexp';
function addSupportToXRegExp(xr = XRegExp, options = {}) {
    if (xr === null) {
        xr = XRegExp;
    }
    if (isInstalled(xr)) {
        console.warn(`this plugin already installed.`);
    }
    else {
        xr.addToken(/[\u4E00-\u9FFFの]/, (match, scope) => {
            //console.log(match, scope);
            let a = cjk_conv_1.default.zhTable.auto(match[0]);
            //				console.log(match, scope, a);
            if (a.length) {
                return scope == 'class' ? a.join('') : '[' + a.join('') + ']';
            }
            else if (1) {
                return match[0];
            }
            throw new SyntaxError(`Invalid escape ${match[0]}`);
        }, {
            scope: options.scope || 'default',
            //leadChar: '\\',
            //reparse: true,
            // @ts-ignore
            flag: options.flags || undefined,
        });
        exports._CACHE.add(xr);
    }
    return xr;
}
exports.addSupportToXRegExp = addSupportToXRegExp;
function isXRegExp(xr) {
    return xr[exports.X_REGEX_DATA] ? true : false;
}
exports.isXRegExp = isXRegExp;
function createXRegExp(pattern, flags, xr = XRegExp) {
    if (typeof pattern == 'string') {
        return xr(pattern, flags);
    }
    else if (isXRegExp(pattern)) {
        return xr(pattern);
    }
    return xr(pattern.source, typeof flags == 'string' ? flags : pattern.flags);
}
exports.createXRegExp = createXRegExp;
exports.install = addSupportToXRegExp;
function isInstalled(xr = XRegExp) {
    if (xr === null) {
        xr = XRegExp;
    }
    return exports._CACHE.has(xr);
}
exports.isInstalled = isInstalled;
exports.default = addSupportToXRegExp;
