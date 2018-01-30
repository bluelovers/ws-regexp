"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regexp2_1 = require("regexp2");
const chinese_convert_1 = require("chinese_convert");
const StrUtil = require("str-util");
function replace_literal(r, cb) {
    let bool = (r instanceof RegExp);
    let rb = regexp2_1.parse(r);
    let str = toRegexp(rb, cb);
    if (bool) {
        return new RegExp(str, r.flags);
    }
    return str;
}
exports.replace_literal = replace_literal;
function toRegexp(res, cb) {
    if (res.body) {
        if (res.body.type == regexp2_1.types.ALTERNATE) {
            return toRegexp(res.body.left, cb) + '|' + toRegexp(res.body.right, cb);
        }
        else if (res.type == regexp2_1.types.MATCH) {
            return res.body.reduce(function (a, b) {
                a.push(_(b, cb));
                return a;
            }, []).join('');
        }
        else if (res.type == regexp2_1.types.QUANTIFIED) {
            return _(res.body, cb) + toRegexp(res.quantifier, cb);
        }
        return _(res.body, cb);
    }
    if (res.type == regexp2_1.types.ALTERNATE) {
        return toRegexp(res.left, cb) + '|' + toRegexp(res.right, cb);
    }
    else {
    }
    return res.text;
}
function _(b, cb) {
    switch (b.type) {
        case regexp2_1.types.CHARSET:
            return b.text;
        case regexp2_1.types.POSITIVE_LOOKAHEAD:
            return '(?=' + toRegexp(b, cb) + ')';
        case regexp2_1.types.NEGATIVE_LOOKAHEAD:
            return '(?!' + toRegexp(b, cb) + ')';
        case regexp2_1.types.CAPTURE_GROUP:
            return '(' + toRegexp(b, cb) + ')';
        case regexp2_1.types.NON_CAPTURE_GROUP:
            return '(?:' + toRegexp(b, cb) + ')';
        case regexp2_1.types.MATCH:
            return toRegexp(b, cb);
        case regexp2_1.types.QUANTIFIED:
            return _(b.body, cb) + toRegexp(b.quantifier, cb);
        case regexp2_1.types.LITERAL:
            let text = b.text;
            text = cb(text);
            return text;
        default:
            break;
    }
    return b.toString();
}
function array_unique(array) {
    return array.filter(function (el, index, arr) {
        return index == arr.indexOf(el);
    });
}
exports.array_unique = array_unique;
exports.matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
function regex_str(str) {
    return str
        .replace(/(\W)/g, '\\$1');
}
exports.regex_str = regex_str;
function _word_zh(search, ret, flags = 'ig', skip) {
    let s = replace_literal(search, function (text) {
        return _word_zh_core(text, skip);
    });
    flags = (s instanceof RegExp) ? s.flags : flags;
    return [s, ret, flags];
}
exports._word_zh = _word_zh;
function _word_zh_core(search, skip) {
    return search.replace(/[\u4E00-\u9FFFの]/g, function (char) {
        if (skip && skip.indexOf(char) != -1) {
            return char;
        }
        let jt = StrUtil.jp2zht(char);
        let js = StrUtil.jp2zhs(char);
        let a = [
            char,
            ...zhtw_convert.tw(char),
            ...zhtw_convert.cn(char),
        ];
        if (!skip || skip.indexOf(jt) == -1) {
            a = a.concat(...zhtw_convert.cn(jt));
        }
        if (!skip || skip.indexOf(js) == -1) {
            a = a.concat(...zhtw_convert.tw(js));
        }
        if (zhtw_convert.table_jp[char]) {
            a = a.concat(zhtw_convert.table_jp[char]);
        }
        a = array_unique(a);
        return a.length > 1 ? '[' + a.join('') + ']' : a[0];
    });
}
exports._word_zh_core = _word_zh_core;
var zhtw_convert;
(function (zhtw_convert) {
    let _table = {
        '罗': '羅',
    };
    zhtw_convert.table_jp = {
        'の': [
            '之',
            '的',
        ],
    };
    let _table_cn = Object.keys(_table)
        .reduce(function (a, b) {
        a[_table[b]] = b;
        return a;
    }, {});
    function tw(char) {
        let a = [];
        if (_table[char]) {
            a.push(_table[char]);
        }
        a.push(chinese_convert_1.cn2tw(char));
        return a;
    }
    zhtw_convert.tw = tw;
    function cn(char) {
        let a = [];
        if (_table_cn[char]) {
            a.push(_table_cn[char]);
        }
        a.push(chinese_convert_1.tw2cn(char));
        return a;
    }
    zhtw_convert.cn = cn;
})(zhtw_convert = exports.zhtw_convert || (exports.zhtw_convert = {}));
