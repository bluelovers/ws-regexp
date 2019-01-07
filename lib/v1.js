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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidjEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2MS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7QUFFSCx1Q0FBK0I7QUFDL0IsK0NBQXVDO0FBRXZDLHFDQUFzRDtBQUV0RCw2QkFBNkI7QUFJN0IsU0FBZ0IsZUFBZSxDQUFDLENBQUMsRUFBRSxFQUE0QjtJQUU5RCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsWUFBWSxNQUFNLENBQUMsQ0FBQztJQUVqQyxJQUFJLEVBQUUsR0FBRyxlQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUUzQixJQUFJLElBQUksRUFDUjtRQUNDLE9BQU8sSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQVcsQ0FBQztLQUMxQztJQUVELE9BQU8sR0FBYSxDQUFDO0FBQ3RCLENBQUM7QUFiRCwwQ0FhQztBQUVELFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBRXhCLElBQUksR0FBRyxDQUFDLElBQUksRUFDWjtRQUNDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksZUFBSyxDQUFDLFNBQVMsRUFDcEM7WUFDQyxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3hFO2FBQ0ksSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLGVBQUssQ0FBQyxLQUFLLEVBQ2hDO1lBQ0MsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUVwQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxD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U0FBZ0IsYUFBYSxDQUFDLE1BQWMsRUFBRSxJQUFhO0lBRTFELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyx3Q0FBd0MsRUFBRSxVQUFVLElBQUk7UUFFN0UsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDcEM7WUFDQyxPQUFPLElBQUksQ0FBQztTQUNaO1FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBMEJFO1FBQ0YsSUFBSSxDQUFDLEdBQUcsa0JBQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5DLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQXhDRCxzQ0F3Q0M7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQStFRTtBQUNGLGtCQUFlLElBQUksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTgvMS8zMS8wMzEuXG4gKlxuICog5bey5bui5qOEXG4gKi9cblxuaW1wb3J0IGNqa0NvbnYgZnJvbSAnY2prLWNvbnYnO1xuaW1wb3J0IHJlZ2V4cFJhbmdlIGZyb20gJ3JlZ2V4cC1yYW5nZSc7XG5cbmltcG9ydCB7IHBhcnNlIGFzIHJlZ2V4cFBhcnNlLCB0eXBlcyB9IGZyb20gJ3JlZ2V4cDInO1xuXG5pbXBvcnQgKiBhcyBzZWxmIGZyb20gJy4vdjEnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZV9saXRlcmFsKHI6IHN0cmluZywgY2I6ICh0ZXh0OiBzdHJpbmcpID0+IHN0cmluZyk6IHN0cmluZ1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VfbGl0ZXJhbChyOiBSZWdFeHAsIGNiOiAodGV4dDogc3RyaW5nKSA9PiBzdHJpbmcpOiBSZWdFeHBcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlX2xpdGVyYWwociwgY2I6ICh0ZXh0OiBzdHJpbmcpID0+IHN0cmluZylcbntcblx0bGV0IGJvb2wgPSAociBpbnN0YW5jZW9mIFJlZ0V4cCk7XG5cblx0bGV0IHJiID0gcmVnZXhwUGFyc2Uocik7XG5cdGxldCBzdHIgPSB0b1JlZ2V4cChyYiwgY2IpO1xuXG5cdGlmIChib29sKVxuXHR7XG5cdFx0cmV0dXJuIG5ldyBSZWdFeHAoc3RyLCByLmZsYWdzKSBhcyBSZWdFeHA7XG5cdH1cblxuXHRyZXR1cm4gc3RyIGFzIHN0cmluZztcbn1cblxuZnVuY3Rpb24gdG9SZWdleHAocmVzLCBjYik6IHN0cmluZ1xue1xuXHRpZiAocmVzLmJvZHkpXG5cdHtcblx0XHRpZiAocmVzLmJvZHkudHlwZSA9PSB0eXBlcy5BTFRFUk5BVEUpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRvUmVnZXhwKHJlcy5ib2R5LmxlZnQsIGNiKSArICd8JyArIHRvUmVnZXhwKHJlcy5ib2R5LnJpZ2h0LCBjYik7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHJlcy50eXBlID09IHR5cGVzLk1BVENIKVxuXHRcdHtcblx0XHRcdHJldHVybiByZXMuYm9keS5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpXG5cdFx0XHR7XG5cdFx0XHRcdGEucHVzaChfKGIsIGNiKSk7XG5cblx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHR9LCBbXSkuam9pbignJyk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHJlcy50eXBlID09IHR5cGVzLlFVQU5USUZJRUQpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIF8ocmVzLmJvZHksIGNiKSArIHRvUmVnZXhwKHJlcy5xdWFudGlmaWVyLCBjYik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIF8ocmVzLmJvZHksIGNiKTtcblx0fVxuXHRpZiAocmVzLnR5cGUgPT0gdHlwZXMuQUxURVJOQVRFKVxuXHR7XG5cdFx0cmV0dXJuIHRvUmVnZXhwKHJlcy5sZWZ0LCBjYikgKyAnfCcgKyB0b1JlZ2V4cChyZXMucmlnaHQsIGNiKTtcblx0fVxuXHRlbHNlXG5cdHtcblx0XHQvL2NvbnNvbGUubG9nKHJlcywgcmVzLnR5cGUpO1xuXHR9XG5cblx0cmV0dXJuIHJlcy50ZXh0O1xufVxuXG4vL2NvbnNvbGUubG9nKGxvY2FsX3JhbmdlKTtcblxuZnVuY3Rpb24gXyhiLCBjYilcbntcblx0c3dpdGNoIChiLnR5cGUpXG5cdHtcblx0XHRjYXNlIHR5cGVzLkNIQVJTRVQ6XG5cdFx0e1xuXHRcdFx0bGV0IHRleHQgPSAnJztcblxuXHRcdFx0aWYgKGIuaW52ZXJ0KVxuXHRcdFx0e1xuXHRcdFx0XHR0ZXh0ICs9ICdeJztcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChsZXQgYSBvZiBiLmJvZHkpXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChhLnR5cGUgPT0gdHlwZXMuUkFOR0UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgcyA9IGEuc3RhcnQudGV4dDtcblx0XHRcdFx0XHRsZXQgZSA9IGEuZW5kLnRleHQ7XG5cblx0XHRcdFx0XHRsZXQgdCA9IHJlZ2V4cFJhbmdlKHMsIGUsIHtcblx0XHRcdFx0XHRcdGNyZWF0ZVJlZ0V4cFN0cmluZzogdHJ1ZSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHRleHQgKz0gdCB8fCBhLnRleHQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGV4dCArPSBhLnRleHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly9jb25zb2xlLmRpcihiKTtcblxuXHRcdFx0cmV0dXJuIGBbJHt0ZXh0fV1gO1xuXHRcdFx0Ly9yZXR1cm4gYi50ZXh0O1xuXHRcdH1cblx0XHRjYXNlIHR5cGVzLlBPU0lUSVZFX0xPT0tBSEVBRDpcblx0XHRcdHJldHVybiAnKD89JyArIHRvUmVnZXhwKGIsIGNiKSArICcpJztcblx0XHRjYXNlIHR5cGVzLk5FR0FUSVZFX0xPT0tBSEVBRDpcblx0XHRcdHJldHVybiAnKD8hJyArIHRvUmVnZXhwKGIsIGNiKSArICcpJztcblx0XHRjYXNlIHR5cGVzLkNBUFRVUkVfR1JPVVA6XG5cdFx0XHQvL2NvbnNvbGUubG9nKGIuYm9keSwgYi50eXBlLCBiLmJvZHkudHlwZSk7XG5cdFx0XHRyZXR1cm4gJygnICsgdG9SZWdleHAoYiwgY2IpICsgJyknO1xuXHRcdGNhc2UgdHlwZXMuTk9OX0NBUFRVUkVfR1JPVVA6XG5cdFx0XHRyZXR1cm4gJyg/OicgKyB0b1JlZ2V4cChiLCBjYikgKyAnKSc7XG5cdFx0Y2FzZSB0eXBlcy5NQVRDSDpcblx0XHRcdHJldHVybiB0b1JlZ2V4cChiLCBjYik7XG5cdFx0Y2FzZSB0eXBlcy5RVUFOVElGSUVEOlxuXHRcdFx0Ly9jb25zb2xlLmxvZyg4ODgsIGIsIGIudHlwZSk7XG5cdFx0XHRyZXR1cm4gXyhiLmJvZHksIGNiKSArIHRvUmVnZXhwKGIucXVhbnRpZmllciwgY2IpO1xuXHRcdGNhc2UgdHlwZXMuTElURVJBTDpcblxuXHRcdFx0bGV0IHRleHQgPSBiLnRleHQ7XG5cblx0XHRcdHRleHQgPSBjYih0ZXh0KTtcblxuXHRcdFx0cmV0dXJuIHRleHQ7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGJyZWFrO1xuXHR9XG5cblx0cmV0dXJuIGIudG9TdHJpbmcoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5X3VuaXF1ZShhcnJheTogYW55W10pXG57XG5cdHJldHVybiBhcnJheS5maWx0ZXIoZnVuY3Rpb24gKGVsLCBpbmRleCwgYXJyKVxuXHR7XG5cdFx0cmV0dXJuIGluZGV4ID09IGFyci5pbmRleE9mKGVsKTtcblx0fSk7XG59XG5cbmV4cG9ydCBjb25zdCBtYXRjaE9wZXJhdG9yc1JlID0gL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnZXhfc3RyKHN0cjogc3RyaW5nKVxue1xuXHRyZXR1cm4gc3RyXG5cdFx0LnJlcGxhY2UoLyhcXFcpL2csICdcXFxcJDEnKVxuXHRcdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF93b3JkX3poKHNlYXJjaDogc3RyaW5nLCByZXQsIGZsYWdzPywgc2tpcD86IHN0cmluZylcbmV4cG9ydCBmdW5jdGlvbiBfd29yZF96aChzZWFyY2g6IFJlZ0V4cCwgcmV0LCBmbGFncz8sIHNraXA/OiBzdHJpbmcpXG5leHBvcnQgZnVuY3Rpb24gX3dvcmRfemgoc2VhcmNoLCByZXQsIGZsYWdzID0gJ2lnJywgc2tpcD86IHN0cmluZylcbntcblx0bGV0IHMgPSByZXBsYWNlX2xpdGVyYWwoc2VhcmNoLCBmdW5jdGlvbiAodGV4dClcblx0e1xuXHRcdHJldHVybiBfd29yZF96aF9jb3JlKHRleHQsIHNraXApO1xuXHR9KTtcblxuXHQvLyBAdHMtaWdub3JlXG5cdGZsYWdzID0gKHMgaW5zdGFuY2VvZiBSZWdFeHApID8gcy5mbGFncyA6IGZsYWdzO1xuXG5cdHJldHVybiBbcywgcmV0LCBmbGFnc107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfd29yZF96aF9jb3JlKHNlYXJjaDogc3RyaW5nLCBza2lwPzogc3RyaW5nKVxue1xuXHRyZXR1cm4gc2VhcmNoLnJlcGxhY2UoL1tcXHU0RTAwLVxcdTlGRkZcXHV7MjAwMDB9LVxcdXsyRkExRn3jga7jgahdL3VnLCBmdW5jdGlvbiAoY2hhcilcblx0e1xuXHRcdGlmIChza2lwICYmIHNraXAuaW5kZXhPZihjaGFyKSAhPSAtMSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gY2hhcjtcblx0XHR9XG5cblx0XHQvKlxuXHRcdGxldCBqdCA9IFN0clV0aWwuanAyemh0KGNoYXIpO1xuXHRcdGxldCBqcyA9IFN0clV0aWwuanAyemhzKGNoYXIpO1xuXG5cdFx0bGV0IGEgPSBbXG5cdFx0XHRjaGFyLFxuXHRcdFx0Li4uemh0d19jb252ZXJ0LnR3KGNoYXIpLFxuXHRcdFx0Li4uemh0d19jb252ZXJ0LmNuKGNoYXIpLFxuXHRcdF07XG5cblx0XHRpZiAoIXNraXAgfHwgc2tpcC5pbmRleE9mKGp0KSA9PSAtMSlcblx0XHR7XG5cdFx0XHRhID0gYS5jb25jYXQoLi4uemh0d19jb252ZXJ0LmNuKGp0KSk7XG5cdFx0fVxuXHRcdGlmICghc2tpcCB8fCBza2lwLmluZGV4T2YoanMpID09IC0xKVxuXHRcdHtcblx0XHRcdGEgPSBhLmNvbmNhdCguLi56aHR3X2NvbnZlcnQudHcoanMpKTtcblx0XHR9XG5cblx0XHRpZiAoemh0d19jb252ZXJ0LnRhYmxlX2pwW2NoYXJdKVxuXHRcdHtcblx0XHRcdGEgPSBhLmNvbmNhdCh6aHR3X2NvbnZlcnQudGFibGVfanBbY2hhcl0pO1xuXHRcdH1cblxuXHRcdGEgPSBhcnJheV91bmlxdWUoYSk7XG5cdFx0YS5zb3J0KCk7XG5cdFx0Ki9cblx0XHRsZXQgYSA9IGNqa0NvbnYuemhUYWJsZS5hdXRvKGNoYXIpO1xuXG5cdFx0cmV0dXJuIGEubGVuZ3RoID4gMSA/ICdbJyArIGEuam9pbignJykgKyAnXScgOiBhWzBdO1xuXHR9KTtcbn1cblxuLypcbmV4cG9ydCBuYW1lc3BhY2Ugemh0d19jb252ZXJ0XG57XG5cdGxldCBfdGFibGUgPSB7XG5cdFx0J+e9lyc6ICfnvoUnLFxuXHR9O1xuXG5cdGV4cG9ydCBjb25zdCB0YWJsZV9qcCA9IHtcblx0XHQn44GuJzogW1xuXHRcdFx0J+S5iycsXG5cdFx0XHQn55qEJyxcblx0XHRdLFxuXHRcdCflio0nOiBbXG5cdFx0XHQn5YqNJyxcblx0XHRcdCfliZEnLFxuXHRcdFx0J+WJoycsXG5cdFx0XSxcblx0XHQn5YmjJzogW1xuXHRcdFx0J+WKjScsXG5cdFx0XHQn5YmRJyxcblx0XHRcdCfliaMnLFxuXHRcdF0sXG5cdFx0J+eUuyc6IFtcblx0XHRcdCfliJInLFxuXHRcdFx0J+eUuycsXG5cdFx0XHQn5YqDJyxcblx0XHRcdCfnlasnLFxuXHRcdF0sXG5cdFx0J+egsic6IFtcblx0XHRcdCfnoLInLFxuXHRcdFx0J+eCricsXG5cdFx0XSxcblx0XHQn54KuJzogW1xuXHRcdFx0J+egsicsXG5cdFx0XHQn54KuJyxcblx0XHRdLFxuXHR9O1xuXG5cdGxldCBfdGFibGVfY24gPSBPYmplY3Qua2V5cyhfdGFibGUpXG5cdFx0LnJlZHVjZShmdW5jdGlvbiAoYSwgYilcblx0XHR7XG5cdFx0XHRhW190YWJsZVtiXV0gPSBiO1xuXG5cdFx0XHRyZXR1cm4gYTtcblx0XHR9LCB7fSlcblx0O1xuXG5cdGV4cG9ydCBmdW5jdGlvbiB0dyhjaGFyKTogc3RyaW5nW11cblx0e1xuXHRcdGxldCBhID0gW107XG5cblx0XHRpZiAoX3RhYmxlW2NoYXJdKVxuXHRcdHtcblx0XHRcdGEucHVzaChfdGFibGVbY2hhcl0pXG5cdFx0fVxuXG5cdFx0YS5wdXNoKGNuMnR3KGNoYXIpKTtcblxuXHRcdC8vY29uc29sZS5sb2coJ2NuMnR3JywgY2hhciwgYSk7XG5cblx0XHRyZXR1cm4gYTtcblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBjbihjaGFyKTogc3RyaW5nW11cblx0e1xuXHRcdGxldCBhID0gW107XG5cblx0XHRpZiAoX3RhYmxlX2NuW2NoYXJdKVxuXHRcdHtcblx0XHRcdGEucHVzaChfdGFibGVfY25bY2hhcl0pXG5cdFx0fVxuXG5cdFx0YS5wdXNoKHR3MmNuKGNoYXIpKTtcblxuXHRcdC8vY29uc29sZS5sb2coJ3R3MmNuJywgY2hhciwgYSk7XG5cblx0XHRyZXR1cm4gYTtcblx0fVxufVxuKi9cbmV4cG9ydCBkZWZhdWx0IHNlbGY7XG4iXX0=