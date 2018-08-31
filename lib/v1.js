"use strict";
/**
 * Created by user on 2018/1/31/031.
 *
 * 已廢棄
 */
Object.defineProperty(exports, "__esModule", { value: true });
const cjk_conv_1 = require("cjk-conv");
const regexp_range_1 = require("regexp-range");
const regexp2_1 = require("regexp2");
const self = require("./v1");
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
        //console.log(res, res.type);
    }
    return res.text;
}
//console.log(local_range);
function _(b, cb) {
    switch (b.type) {
        case regexp2_1.types.CHARSET:
            {
                let text = '';
                if (b.invert) {
                    text += '^';
                }
                for (let a of b.body) {
                    if (a.type == regexp2_1.types.RANGE) {
                        let s = a.start.text;
                        let e = a.end.text;
                        let t = regexp_range_1.default(s, e, {
                            createRegExpString: true,
                        });
                        text += t || a.text;
                    }
                    else {
                        text += a.text;
                    }
                }
                //console.dir(b);
                return `[${text}]`;
                //return b.text;
            }
        case regexp2_1.types.POSITIVE_LOOKAHEAD:
            return '(?=' + toRegexp(b, cb) + ')';
        case regexp2_1.types.NEGATIVE_LOOKAHEAD:
            return '(?!' + toRegexp(b, cb) + ')';
        case regexp2_1.types.CAPTURE_GROUP:
            //console.log(b.body, b.type, b.body.type);
            return '(' + toRegexp(b, cb) + ')';
        case regexp2_1.types.NON_CAPTURE_GROUP:
            return '(?:' + toRegexp(b, cb) + ')';
        case regexp2_1.types.MATCH:
            return toRegexp(b, cb);
        case regexp2_1.types.QUANTIFIED:
            //console.log(888, b, b.type);
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
    // @ts-ignore
    flags = (s instanceof RegExp) ? s.flags : flags;
    return [s, ret, flags];
}
exports._word_zh = _word_zh;
function _word_zh_core(search, skip) {
    return search.replace(/[\u4E00-\u9FFF\u{20000}-\u{2FA1F}のと]/ug, function (char) {
        if (skip && skip.indexOf(char) != -1) {
            return char;
        }
        /*
        let jt = StrUtil.jp2zht(char);
        let js = StrUtil.jp2zhs(char);

        let a = [
            char,
            ...zhtw_convert.tw(char),
            ...zhtw_convert.cn(char),
        ];

        if (!skip || skip.indexOf(jt) == -1)
        {
            a = a.concat(...zhtw_convert.cn(jt));
        }
        if (!skip || skip.indexOf(js) == -1)
        {
            a = a.concat(...zhtw_convert.tw(js));
        }

        if (zhtw_convert.table_jp[char])
        {
            a = a.concat(zhtw_convert.table_jp[char]);
        }

        a = array_unique(a);
        a.sort();
        */
        let a = cjk_conv_1.default.zhTable.auto(char);
        return a.length > 1 ? '[' + a.join('') + ']' : a[0];
    });
}
exports._word_zh_core = _word_zh_core;
/*
export namespace zhtw_convert
{
    let _table = {
        '罗': '羅',
    };

    export const table_jp = {
        'の': [
            '之',
            '的',
        ],
        '劍': [
            '劍',
            '剑',
            '剣',
        ],
        '剣': [
            '劍',
            '剑',
            '剣',
        ],
        '画': [
            '划',
            '画',
            '劃',
            '畫',
        ],
        '砲': [
            '砲',
            '炮',
        ],
        '炮': [
            '砲',
            '炮',
        ],
    };

    let _table_cn = Object.keys(_table)
        .reduce(function (a, b)
        {
            a[_table[b]] = b;

            return a;
        }, {})
    ;

    export function tw(char): string[]
    {
        let a = [];

        if (_table[char])
        {
            a.push(_table[char])
        }

        a.push(cn2tw(char));

        //console.log('cn2tw', char, a);

        return a;
    }

    export function cn(char): string[]
    {
        let a = [];

        if (_table_cn[char])
        {
            a.push(_table_cn[char])
        }

        a.push(tw2cn(char));

        //console.log('tw2cn', char, a);

        return a;
    }
}
*/
exports.default = self;
