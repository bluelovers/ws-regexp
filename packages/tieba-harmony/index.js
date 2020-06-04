"use strict";
/**
 * Created by user on 2018/1/31/031.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const regexp_cjk_1 = require("regexp-cjk");
__export(require("./table"));
const table_1 = require("./table");
exports.SP_KEY = '#_@_#';
exports.SP_REGEXP = '(?:\@|（·?）|\-|\/|\\\(\\\)|%|￥|_|\\\?|？|\\\||#|\\\$|[（\\\(](?:和谐|河蟹)[\\\)）]|（河）（蟹）|[（\\(][河蟹]{1,2}[\\)）]| |\\\.|[・·]|\\*|□|圌|[=＝]|\\\\\\\\|\\\/\\\/|｜)';
exports.SP_REGEXP_UNSAFE = '(?:' + exports.SP_REGEXP + '|、|。)';
exports.SP_ESCAPE = '（河蟹）';
exports.SP_REGEXP_STRICT = `(?:${exports.SP_ESCAPE})`;
function escape(text, options = {}) {
    let count = options.count || 1;
    const fn = options.toRegExp ? options.toRegExp : regexp_cjk_1.create;
    do {
        loopTable(function (value, index, array, options) {
            let sa = options.fnSplitChar(value);
            let a = new Array(sa.length).fill(0).map(function (value, index, array) {
                return '$' + (index + 1);
            });
            let r = a.join(exports.SP_ESCAPE);
            let s = fn('(' + sa.join(')(') + ')', options.flags);
            text = text.replace(s, r);
        }, options);
    } while (--count > 0);
    return text;
}
exports.escape = escape;
function unescape(text, options = {}) {
    let count = options.count || 1;
    const fn = options.toRegExp ? options.toRegExp : regexp_cjk_1.create;
    const SP_REGEXP_RUNTIME = options.strict ?
        exports.SP_REGEXP_STRICT :
        (options.unsafe ? exports.SP_REGEXP_UNSAFE : exports.SP_REGEXP);
    loopTable(function (value, index, array, options, cache) {
        let sa = options.fnSplitChar(value);
        let rs = fn('(' + sa.join(')' + exports.SP_KEY + '(') + ')', options.flags);
        let s = new RegExp(rs.source.split(exports.SP_KEY).join(SP_REGEXP_RUNTIME), options.flags);
        let r;
        if (typeof cache.retLast != 'undefined' && cache.retLast !== null && !(cache.retLast instanceof String)) {
            r = cache.retLast;
        }
        else if (!options.staticReturn && cache.retLast instanceof String) {
            r = cache.retLast.toString();
        }
        else if (!options.staticReturn && array.length == 1) {
            r = new Array(sa.length)
                .fill(0)
                .map(function (value, index, array) {
                return '$' + (index + 1);
            }).join('');
        }
        else {
            r = array[0];
        }
        text = text.replace(s, r);
    }, options);
    return text;
}
exports.unescape = unescape;
function getTable(options = {}) {
    return loopTable(function (value, index, array, options, cache) {
        let rs;
        let s = options.fnSplitChar(value);
        let r;
        if (typeof cache.retLast != 'undefined' && cache.retLast !== null && !(cache.retLast instanceof String)) {
            r = cache.retLast;
        }
        else if (!options.staticReturn && cache.retLast instanceof String) {
            r = cache.retLast.toString();
        }
        else if (!options.staticReturn && array.length == 1) {
            r = new Array(s.length)
                .fill(0)
                .map(function (value, index, array) {
                return '$' + (index + 1);
            }).join('');
        }
        else {
            r = array[0];
        }
        rs = [s.join(exports.SP_KEY), r, options.flags];
        return rs;
    }, options);
}
exports.getTable = getTable;
function loopTable(cb, options) {
    options.flags = typeof options.flags == 'string' ? options.flags : 'ig';
    options.fnSplitChar = options.fnSplitChar || splitChar;
    options.toRegExp = options.toRegExp || regexp_cjk_1.create;
    return (options.tables || [])
        .concat(table_1.table2)
        .concat(table_1.table3)
        .concat(table_1.table)
        .reduce(function (a, b) {
        let c;
        c = Array.isArray(b) ? b.slice() : [b];
        const cache = {};
        if (c.length > 1 && typeof c[c.length - 1] != 'string') {
            cache.retLast = c.pop();
        }
        c.forEach(function (value, index, array) {
            let rs = cb(value, index, array, options, cache);
            a.push(rs);
        });
        return a;
    }, []);
}
exports.loopTable = loopTable;
function splitChar(s) {
    return s.split('');
}
exports.splitChar = splitChar;
const self = require("./index");
exports.default = self;
