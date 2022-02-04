"use strict";
/**
 * Created by user on 2018/4/24/024.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInstalled = exports.install = exports.addSupportToXRegExp = exports.X_REGEX_DATA = exports.isXRegExp = exports.createXRegExp = void 0;
const tslib_1 = require("tslib");
const xregexp_1 = tslib_1.__importDefault(require("xregexp"));
const zh_table_list_1 = require("@lazy-cjk/zh-table-list");
const cjk_conv_1 = require("regexp-helper/lib/cjk-conv");
const create_xregexp_1 = tslib_1.__importDefault(require("@regexp-cjk/create-xregexp"));
exports.createXRegExp = create_xregexp_1.default;
const is_xregexp_1 = require("@regexp-cjk/is-xregexp");
Object.defineProperty(exports, "isXRegExp", { enumerable: true, get: function () { return is_xregexp_1.isXRegExp; } });
Object.defineProperty(exports, "X_REGEX_DATA", { enumerable: true, get: function () { return is_xregexp_1.X_REGEX_DATA; } });
const _CACHE = new WeakSet();
const REGEXP_TEST = (0, cjk_conv_1._re_cjk_conv)('u', 'のと㊥㊦㊤');
function addSupportToXRegExp(xr, options = {}) {
    var _a, _b;
    // @ts-ignore
    xr = xr !== null && xr !== void 0 ? xr : xregexp_1.default;
    if (isInstalled(xr)) {
        console.warn(`this plugin already installed.`);
    }
    else {
        xr.addToken(REGEXP_TEST, (match, scope, flags) => {
            let s = match[0];
            let a = (0, zh_table_list_1.auto)(s);
            if (a.length > 1 || a[0] !== s) {
                return scope === 'class' ? a.join('') : '[' + a.join('') + ']';
            }
            else if (1) {
                return s;
            }
            throw new SyntaxError(`Invalid escape ${s}`);
        }, {
            ...options,
            scope: (_a = options.scope) !== null && _a !== void 0 ? _a : 'default',
            //leadChar: '\\',
            //reparse: true,
            flag: (_b = options.flags) !== null && _b !== void 0 ? _b : options.flag,
        });
        _CACHE.add(xr);
    }
    return xr;
}
exports.addSupportToXRegExp = addSupportToXRegExp;
exports.install = addSupportToXRegExp;
function isInstalled(xr) {
    return _CACHE.has(xr !== null && xr !== void 0 ? xr : xregexp_1.default);
}
exports.isInstalled = isInstalled;
exports.default = addSupportToXRegExp;
//# sourceMappingURL=index.js.map