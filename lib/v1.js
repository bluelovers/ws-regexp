"use strict";
/**
 * Created by user on 2018/1/31/031.
 *
 * 已廢棄
 */
Object.defineProperty(exports, "__esModule", { value: true });
const regexp_range_1 = require("regexp-range");
const index_1 = require("cjk-conv/lib/zh/table/index");
const util_1 = require("./util");
exports.array_unique = util_1.array_unique;
const regexp2_1 = require("regexp2");
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
        let a = index_1.default.auto(char);
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
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidjEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2MS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7QUFHSCwrQ0FBdUM7QUFDdkMsdURBQWdFO0FBQ2hFLGlDQUFzQztBQUk3Qix1QkFKQSxtQkFBWSxDQUlBO0FBRnJCLHFDQUFzRDtBQU10RCxTQUFnQixlQUFlLENBQUMsQ0FBQyxFQUFFLEVBQTRCO0lBRTlELElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxZQUFZLE1BQU0sQ0FBQyxDQUFDO0lBRWpDLElBQUksRUFBRSxHQUFHLGVBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRTNCLElBQUksSUFBSSxFQUNSO1FBQ0MsT0FBTyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBVyxDQUFDO0tBQzFDO0lBRUQsT0FBTyxHQUFhLENBQUM7QUFDdEIsQ0FBQztBQWJELDBDQWFDO0FBRUQsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFFeEIsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUNaO1FBQ0MsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxlQUFLLENBQUMsU0FBUyxFQUNwQztZQUNDLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDeEU7YUFDSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksZUFBSyxDQUFDLEtBQUssRUFDaEM7WUFDQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBRXBDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FB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QUFPLElBQUksQ0FBQztTQUNaO1FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBMEJFO1FBQ0YsSUFBSSxDQUFDLEdBQUcsZUFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQixPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUF4Q0Qsc0NBd0NDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUErRUU7QUFFRixrQkFBZSxPQUFnQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC8xLzMxLzAzMS5cbiAqXG4gKiDlt7Llu6Lmo4RcbiAqL1xuXG5pbXBvcnQgY2prQ29udiBmcm9tICdjamstY29udic7XG5pbXBvcnQgcmVnZXhwUmFuZ2UgZnJvbSAncmVnZXhwLXJhbmdlJztcbmltcG9ydCB6aFRhYmxlLCB7IElPcHRpb25zIH0gZnJvbSAnY2prLWNvbnYvbGliL3poL3RhYmxlL2luZGV4JztcbmltcG9ydCB7IGFycmF5X3VuaXF1ZSB9IGZyb20gJy4vdXRpbCc7XG5cbmltcG9ydCB7IHBhcnNlIGFzIHJlZ2V4cFBhcnNlLCB0eXBlcyB9IGZyb20gJ3JlZ2V4cDInO1xuXG5leHBvcnQgeyBhcnJheV91bmlxdWUgfVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZV9saXRlcmFsKHI6IHN0cmluZywgY2I6ICh0ZXh0OiBzdHJpbmcpID0+IHN0cmluZyk6IHN0cmluZ1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VfbGl0ZXJhbChyOiBSZWdFeHAsIGNiOiAodGV4dDogc3RyaW5nKSA9PiBzdHJpbmcpOiBSZWdFeHBcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlX2xpdGVyYWwociwgY2I6ICh0ZXh0OiBzdHJpbmcpID0+IHN0cmluZylcbntcblx0bGV0IGJvb2wgPSAociBpbnN0YW5jZW9mIFJlZ0V4cCk7XG5cblx0bGV0IHJiID0gcmVnZXhwUGFyc2Uocik7XG5cdGxldCBzdHIgPSB0b1JlZ2V4cChyYiwgY2IpO1xuXG5cdGlmIChib29sKVxuXHR7XG5cdFx0cmV0dXJuIG5ldyBSZWdFeHAoc3RyLCByLmZsYWdzKSBhcyBSZWdFeHA7XG5cdH1cblxuXHRyZXR1cm4gc3RyIGFzIHN0cmluZztcbn1cblxuZnVuY3Rpb24gdG9SZWdleHAocmVzLCBjYik6IHN0cmluZ1xue1xuXHRpZiAocmVzLmJvZHkpXG5cdHtcblx0XHRpZiAocmVzLmJvZHkudHlwZSA9PSB0eXBlcy5BTFRFUk5BVEUpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRvUmVnZXhwKHJlcy5ib2R5LmxlZnQsIGNiKSArICd8JyArIHRvUmVnZXhwKHJlcy5ib2R5LnJpZ2h0LCBjYik7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHJlcy50eXBlID09IHR5cGVzLk1BVENIKVxuXHRcdHtcblx0XHRcdHJldHVybiByZXMuYm9keS5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpXG5cdFx0XHR7XG5cdFx0XHRcdGEucHVzaChfKGIsIGNiKSk7XG5cblx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHR9LCBbXSkuam9pbignJyk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHJlcy50eXBlID09IHR5cGVzLlFVQU5USUZJRUQpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIF8ocmVzLmJvZHksIGNiKSArIHRvUmVnZXhwKHJlcy5xdWFudGlmaWVyLCBjYik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIF8ocmVzLmJvZHksIGNiKTtcblx0fVxuXHRpZiAocmVzLnR5cGUgPT0gdHlwZXMuQUxURVJOQVRFKVxuXHR7XG5cdFx0cmV0dXJuIHRvUmVnZXhwKHJlcy5sZWZ0LCBjYikgKyAnfCcgKyB0b1JlZ2V4cChyZXMucmlnaHQsIGNiKTtcblx0fVxuXHRlbHNlXG5cdHtcblx0XHQvL2NvbnNvbGUubG9nKHJlcywgcmVzLnR5cGUpO1xuXHR9XG5cblx0cmV0dXJuIHJlcy50ZXh0O1xufVxuXG4vL2NvbnNvbGUubG9nKGxvY2FsX3JhbmdlKTtcblxuZnVuY3Rpb24gXyhiLCBjYilcbntcblx0c3dpdGNoIChiLnR5cGUpXG5cdHtcblx0XHRjYXNlIHR5cGVzLkNIQVJTRVQ6XG5cdFx0e1xuXHRcdFx0bGV0IHRleHQgPSAnJztcblxuXHRcdFx0aWYgKGIuaW52ZXJ0KVxuXHRcdFx0e1xuXHRcdFx0XHR0ZXh0ICs9ICdeJztcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChsZXQgYSBvZiBiLmJvZHkpXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChhLnR5cGUgPT0gdHlwZXMuUkFOR0UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgcyA9IGEuc3RhcnQudGV4dDtcblx0XHRcdFx0XHRsZXQgZSA9IGEuZW5kLnRleHQ7XG5cblx0XHRcdFx0XHRsZXQgdCA9IHJlZ2V4cFJhbmdlKHMsIGUsIHtcblx0XHRcdFx0XHRcdGNyZWF0ZVJlZ0V4cFN0cmluZzogdHJ1ZSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHRleHQgKz0gdCB8fCBhLnRleHQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGV4dCArPSBhLnRleHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly9jb25zb2xlLmRpcihiKTtcblxuXHRcdFx0cmV0dXJuIGBbJHt0ZXh0fV1gO1xuXHRcdFx0Ly9yZXR1cm4gYi50ZXh0O1xuXHRcdH1cblx0XHRjYXNlIHR5cGVzLlBPU0lUSVZFX0xPT0tBSEVBRDpcblx0XHRcdHJldHVybiAnKD89JyArIHRvUmVnZXhwKGIsIGNiKSArICcpJztcblx0XHRjYXNlIHR5cGVzLk5FR0FUSVZFX0xPT0tBSEVBRDpcblx0XHRcdHJldHVybiAnKD8hJyArIHRvUmVnZXhwKGIsIGNiKSArICcpJztcblx0XHRjYXNlIHR5cGVzLkNBUFRVUkVfR1JPVVA6XG5cdFx0XHQvL2NvbnNvbGUubG9nKGIuYm9keSwgYi50eXBlLCBiLmJvZHkudHlwZSk7XG5cdFx0XHRyZXR1cm4gJygnICsgdG9SZWdleHAoYiwgY2IpICsgJyknO1xuXHRcdGNhc2UgdHlwZXMuTk9OX0NBUFRVUkVfR1JPVVA6XG5cdFx0XHRyZXR1cm4gJyg/OicgKyB0b1JlZ2V4cChiLCBjYikgKyAnKSc7XG5cdFx0Y2FzZSB0eXBlcy5NQVRDSDpcblx0XHRcdHJldHVybiB0b1JlZ2V4cChiLCBjYik7XG5cdFx0Y2FzZSB0eXBlcy5RVUFOVElGSUVEOlxuXHRcdFx0Ly9jb25zb2xlLmxvZyg4ODgsIGIsIGIudHlwZSk7XG5cdFx0XHRyZXR1cm4gXyhiLmJvZHksIGNiKSArIHRvUmVnZXhwKGIucXVhbnRpZmllciwgY2IpO1xuXHRcdGNhc2UgdHlwZXMuTElURVJBTDpcblxuXHRcdFx0bGV0IHRleHQgPSBiLnRleHQ7XG5cblx0XHRcdHRleHQgPSBjYih0ZXh0KTtcblxuXHRcdFx0cmV0dXJuIHRleHQ7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGJyZWFrO1xuXHR9XG5cblx0cmV0dXJuIGIudG9TdHJpbmcoKTtcbn1cblxuZXhwb3J0IGNvbnN0IG1hdGNoT3BlcmF0b3JzUmUgPSAvW3xcXFxce30oKVtcXF1eJCsqPy5dL2c7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdleF9zdHIoc3RyOiBzdHJpbmcpXG57XG5cdHJldHVybiBzdHJcblx0XHQucmVwbGFjZSgvKFxcVykvZywgJ1xcXFwkMScpXG5cdFx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX3dvcmRfemgoc2VhcmNoOiBzdHJpbmcsIHJldCwgZmxhZ3M/LCBza2lwPzogc3RyaW5nKVxuZXhwb3J0IGZ1bmN0aW9uIF93b3JkX3poKHNlYXJjaDogUmVnRXhwLCByZXQsIGZsYWdzPywgc2tpcD86IHN0cmluZylcbmV4cG9ydCBmdW5jdGlvbiBfd29yZF96aChzZWFyY2gsIHJldCwgZmxhZ3MgPSAnaWcnLCBza2lwPzogc3RyaW5nKVxue1xuXHRsZXQgcyA9IHJlcGxhY2VfbGl0ZXJhbChzZWFyY2gsIGZ1bmN0aW9uICh0ZXh0KVxuXHR7XG5cdFx0cmV0dXJuIF93b3JkX3poX2NvcmUodGV4dCwgc2tpcCk7XG5cdH0pO1xuXG5cdC8vIEB0cy1pZ25vcmVcblx0ZmxhZ3MgPSAocyBpbnN0YW5jZW9mIFJlZ0V4cCkgPyBzLmZsYWdzIDogZmxhZ3M7XG5cblx0cmV0dXJuIFtzLCByZXQsIGZsYWdzXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF93b3JkX3poX2NvcmUoc2VhcmNoOiBzdHJpbmcsIHNraXA/OiBzdHJpbmcpXG57XG5cdHJldHVybiBzZWFyY2gucmVwbGFjZSgvW1xcdTRFMDAtXFx1OUZGRlxcdXsyMDAwMH0tXFx1ezJGQTFGfeOBruOBqF0vdWcsIGZ1bmN0aW9uIChjaGFyKVxuXHR7XG5cdFx0aWYgKHNraXAgJiYgc2tpcC5pbmRleE9mKGNoYXIpICE9IC0xKVxuXHRcdHtcblx0XHRcdHJldHVybiBjaGFyO1xuXHRcdH1cblxuXHRcdC8qXG5cdFx0bGV0IGp0ID0gU3RyVXRpbC5qcDJ6aHQoY2hhcik7XG5cdFx0bGV0IGpzID0gU3RyVXRpbC5qcDJ6aHMoY2hhcik7XG5cblx0XHRsZXQgYSA9IFtcblx0XHRcdGNoYXIsXG5cdFx0XHQuLi56aHR3X2NvbnZlcnQudHcoY2hhciksXG5cdFx0XHQuLi56aHR3X2NvbnZlcnQuY24oY2hhciksXG5cdFx0XTtcblxuXHRcdGlmICghc2tpcCB8fCBza2lwLmluZGV4T2YoanQpID09IC0xKVxuXHRcdHtcblx0XHRcdGEgPSBhLmNvbmNhdCguLi56aHR3X2NvbnZlcnQuY24oanQpKTtcblx0XHR9XG5cdFx0aWYgKCFza2lwIHx8IHNraXAuaW5kZXhPZihqcykgPT0gLTEpXG5cdFx0e1xuXHRcdFx0YSA9IGEuY29uY2F0KC4uLnpodHdfY29udmVydC50dyhqcykpO1xuXHRcdH1cblxuXHRcdGlmICh6aHR3X2NvbnZlcnQudGFibGVfanBbY2hhcl0pXG5cdFx0e1xuXHRcdFx0YSA9IGEuY29uY2F0KHpodHdfY29udmVydC50YWJsZV9qcFtjaGFyXSk7XG5cdFx0fVxuXG5cdFx0YSA9IGFycmF5X3VuaXF1ZShhKTtcblx0XHRhLnNvcnQoKTtcblx0XHQqL1xuXHRcdGxldCBhID0gemhUYWJsZS5hdXRvKGNoYXIpO1xuXG5cdFx0cmV0dXJuIGEubGVuZ3RoID4gMSA/ICdbJyArIGEuam9pbignJykgKyAnXScgOiBhWzBdO1xuXHR9KTtcbn1cblxuLypcbmV4cG9ydCBuYW1lc3BhY2Ugemh0d19jb252ZXJ0XG57XG5cdGxldCBfdGFibGUgPSB7XG5cdFx0J+e9lyc6ICfnvoUnLFxuXHR9O1xuXG5cdGV4cG9ydCBjb25zdCB0YWJsZV9qcCA9IHtcblx0XHQn44GuJzogW1xuXHRcdFx0J+S5iycsXG5cdFx0XHQn55qEJyxcblx0XHRdLFxuXHRcdCflio0nOiBbXG5cdFx0XHQn5YqNJyxcblx0XHRcdCfliZEnLFxuXHRcdFx0J+WJoycsXG5cdFx0XSxcblx0XHQn5YmjJzogW1xuXHRcdFx0J+WKjScsXG5cdFx0XHQn5YmRJyxcblx0XHRcdCfliaMnLFxuXHRcdF0sXG5cdFx0J+eUuyc6IFtcblx0XHRcdCfliJInLFxuXHRcdFx0J+eUuycsXG5cdFx0XHQn5YqDJyxcblx0XHRcdCfnlasnLFxuXHRcdF0sXG5cdFx0J+egsic6IFtcblx0XHRcdCfnoLInLFxuXHRcdFx0J+eCricsXG5cdFx0XSxcblx0XHQn54KuJzogW1xuXHRcdFx0J+egsicsXG5cdFx0XHQn54KuJyxcblx0XHRdLFxuXHR9O1xuXG5cdGxldCBfdGFibGVfY24gPSBPYmplY3Qua2V5cyhfdGFibGUpXG5cdFx0LnJlZHVjZShmdW5jdGlvbiAoYSwgYilcblx0XHR7XG5cdFx0XHRhW190YWJsZVtiXV0gPSBiO1xuXG5cdFx0XHRyZXR1cm4gYTtcblx0XHR9LCB7fSlcblx0O1xuXG5cdGV4cG9ydCBmdW5jdGlvbiB0dyhjaGFyKTogc3RyaW5nW11cblx0e1xuXHRcdGxldCBhID0gW107XG5cblx0XHRpZiAoX3RhYmxlW2NoYXJdKVxuXHRcdHtcblx0XHRcdGEucHVzaChfdGFibGVbY2hhcl0pXG5cdFx0fVxuXG5cdFx0YS5wdXNoKGNuMnR3KGNoYXIpKTtcblxuXHRcdC8vY29uc29sZS5sb2coJ2NuMnR3JywgY2hhciwgYSk7XG5cblx0XHRyZXR1cm4gYTtcblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBjbihjaGFyKTogc3RyaW5nW11cblx0e1xuXHRcdGxldCBhID0gW107XG5cblx0XHRpZiAoX3RhYmxlX2NuW2NoYXJdKVxuXHRcdHtcblx0XHRcdGEucHVzaChfdGFibGVfY25bY2hhcl0pXG5cdFx0fVxuXG5cdFx0YS5wdXNoKHR3MmNuKGNoYXIpKTtcblxuXHRcdC8vY29uc29sZS5sb2coJ3R3MmNuJywgY2hhciwgYSk7XG5cblx0XHRyZXR1cm4gYTtcblx0fVxufVxuKi9cblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0cyBhcyB0eXBlb2YgaW1wb3J0KCcuL3YxJyk7XG4iXX0=