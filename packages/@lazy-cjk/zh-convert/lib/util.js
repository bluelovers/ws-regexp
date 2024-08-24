"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptionsSkip = getOptionsSkip;
exports.getOptions = getOptions;
exports._call = _call;
const const_1 = require("./const");
function getOptionsSkip(options, skip = const_1.SAFE_MODE_CHAR) {
    if (!options.skip) {
        options.skip = skip.slice();
    }
    else if (typeof options.skip == 'string') {
        options.skip += skip.join('');
    }
    else if (Array.isArray(options.skip)) {
        options.skip = options.skip.slice().concat(skip);
    }
    else {
        options.table = skip.reduce(function (a, b) {
            a[b] = b;
            return a;
        }, Object.assign({}, options.table || {}));
    }
    return options;
}
function getOptions(options = {}, defaultOpts = const_1.defaultOptions, skip = const_1.SAFE_MODE_CHAR) {
    options = Object.assign({}, defaultOpts, options);
    if (options.safe) {
        options = getOptionsSkip(options, skip);
        //console.log(options);
    }
    return options;
}
function _call(fn, text, options = {}, ...argv) {
    options = getOptions(options);
    if (options.skip || options.table || options.tableOnly) {
        let { skip, table, tableOnly } = options;
        let not_tableOnly = !tableOnly;
        if (tableOnly && !table) {
            throw new Error(`table is ${table}`);
        }
        return text.replace(const_1.REGEXP_TEST, function (text) {
            if (skip && skip.indexOf(text) !== -1) {
                return text;
            }
            else if (table && typeof table == 'function') {
                let ret = table(fn, text, options, ...argv);
                if (ret !== null && typeof ret != 'undefined') {
                    return ret;
                }
            }
            else if (table && table[text]) {
                return table[text];
            }
            else if (not_tableOnly) {
                return fn(text);
            }
            return text;
        });
    }
    return fn(text, options, ...argv);
}
//# sourceMappingURL=util.js.map