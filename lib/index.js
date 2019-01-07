"use strict";
/**
 * Created by user on 2018/5/3/003.
 *
 * 已廢棄 僅用於舊版相容
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const cjk_conv_1 = require("cjk-conv");
const __1 = require("..");
__export(require("./v1"));
function _word_zh(search, ret, flags = 'ig', skip) {
    let s;
    if (search instanceof RegExp) {
        s = new __1.zhRegExp(search, {
            skip,
        });
        flags = s.flags;
    }
    else {
        s = new __1.zhRegExp(search, flags, {
            skip,
        }).source;
    }
    return [s, ret, flags];
}
exports._word_zh = _word_zh;
function _word_zh_core(search, skip) {
    return search.replace(/[\u4E00-\u9FFF\u{20000}-\u{2FA1F}のと]/ug, function (char) {
        if (skip && skip.indexOf(char) != -1) {
            return char;
        }
        let a = cjk_conv_1.default.zhTable.auto(char);
        return a.length > 1 ? '[' + a.join('') + ']' : a[0];
    });
}
exports._word_zh_core = _word_zh_core;
//export type valueof<T> = T[keyof T];
const self = require("./index");
exports.default = self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7Ozs7QUFFSCx1Q0FBK0I7QUFDL0IsMEJBQThCO0FBQzlCLDBCQUFxQjtBQUlyQixTQUFnQixRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLElBQWE7SUFFaEUsSUFBSSxDQUFrQixDQUFDO0lBRXZCLElBQUksTUFBTSxZQUFZLE1BQU0sRUFDNUI7UUFDQyxDQUFDLEdBQUcsSUFBSSxZQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3hCLElBQUk7U0FDSixDQUFDLENBQUM7UUFFSCxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUNoQjtTQUVEO1FBQ0MsQ0FBQyxHQUFHLElBQUksWUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7WUFDL0IsSUFBSTtTQUNKLENBQUMsQ0FBQyxNQUFNLENBQUM7S0FDVjtJQUVELE9BQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFwQkQsNEJBb0JDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLE1BQWMsRUFBRSxJQUFhO0lBRTFELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyx3Q0FBd0MsRUFBRSxVQUFVLElBQUk7UUFFN0UsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDcEM7WUFDQyxPQUFPLElBQUksQ0FBQztTQUNaO1FBRUQsSUFBSSxDQUFDLEdBQUcsa0JBQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5DLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQWJELHNDQWFDO0FBRUQsc0NBQXNDO0FBRXRDLGdDQUFnQztBQUNoQyxrQkFBZSxJQUFJLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE4LzUvMy8wMDMuXG4gKlxuICog5bey5bui5qOEIOWDheeUqOaWvOiIiueJiOebuOWuuVxuICovXG5cbmltcG9ydCBjamtDb252IGZyb20gJ2Nqay1jb252JztcbmltcG9ydCB7IHpoUmVnRXhwIH0gZnJvbSAnLi4nO1xuZXhwb3J0ICogZnJvbSAnLi92MSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBfd29yZF96aChzZWFyY2g6IHN0cmluZywgcmV0LCBmbGFncz8sIHNraXA/OiBzdHJpbmcpXG5leHBvcnQgZnVuY3Rpb24gX3dvcmRfemgoc2VhcmNoOiBSZWdFeHAsIHJldCwgZmxhZ3M/LCBza2lwPzogc3RyaW5nKVxuZXhwb3J0IGZ1bmN0aW9uIF93b3JkX3poKHNlYXJjaCwgcmV0LCBmbGFncyA9ICdpZycsIHNraXA/OiBzdHJpbmcpXG57XG5cdGxldCBzOiBSZWdFeHAgfCBzdHJpbmc7XG5cblx0aWYgKHNlYXJjaCBpbnN0YW5jZW9mIFJlZ0V4cClcblx0e1xuXHRcdHMgPSBuZXcgemhSZWdFeHAoc2VhcmNoLCB7XG5cdFx0XHRza2lwLFxuXHRcdH0pO1xuXG5cdFx0ZmxhZ3MgPSBzLmZsYWdzO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdHMgPSBuZXcgemhSZWdFeHAoc2VhcmNoLCBmbGFncywge1xuXHRcdFx0c2tpcCxcblx0XHR9KS5zb3VyY2U7XG5cdH1cblxuXHRyZXR1cm4gW3MsIHJldCwgZmxhZ3NdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX3dvcmRfemhfY29yZShzZWFyY2g6IHN0cmluZywgc2tpcD86IHN0cmluZylcbntcblx0cmV0dXJuIHNlYXJjaC5yZXBsYWNlKC9bXFx1NEUwMC1cXHU5RkZGXFx1ezIwMDAwfS1cXHV7MkZBMUZ944Gu44GoXS91ZywgZnVuY3Rpb24gKGNoYXIpXG5cdHtcblx0XHRpZiAoc2tpcCAmJiBza2lwLmluZGV4T2YoY2hhcikgIT0gLTEpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIGNoYXI7XG5cdFx0fVxuXG5cdFx0bGV0IGEgPSBjamtDb252LnpoVGFibGUuYXV0byhjaGFyKTtcblxuXHRcdHJldHVybiBhLmxlbmd0aCA+IDEgPyAnWycgKyBhLmpvaW4oJycpICsgJ10nIDogYVswXTtcblx0fSk7XG59XG5cbi8vZXhwb3J0IHR5cGUgdmFsdWVvZjxUPiA9IFRba2V5b2YgVF07XG5cbmltcG9ydCAqIGFzIHNlbGYgZnJvbSAnLi9pbmRleCc7XG5leHBvcnQgZGVmYXVsdCBzZWxmO1xuXG4iXX0=