"use strict";
/**
 * Created by user on 2018/5/3/003.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const regexp_support_1 = require("regexp-support");
function parseRegularExpressionString(str, options = {}) {
    let m = rRegularExpressionString(options).exec(str);
    if (m) {
        let [s, d, r, f] = m;
        return {
            source: typeof r !== 'undefined' ? r : '',
            flags: typeof f !== 'undefined' ? f : '',
            slash: d,
            input: str,
        };
    }
    else if (options.throwError) {
        throw new TypeError(`${str} not a regex like string`);
    }
    return null;
}
exports.parseRegularExpressionString = parseRegularExpressionString;
function rRegularExpressionString(options = {}) {
    return new RegExp(`^(${options.allowNonNativeSlash ? '[\\/#$%]' : '\\/'})(..*)\\1([${options.allowNonNativeFlags ? 'a-zA-Z' : regexp_support_1.default.nativeFlags}]*)$`);
}
exports.rRegularExpressionString = rRegularExpressionString;
exports.default = parseRegularExpressionString;
