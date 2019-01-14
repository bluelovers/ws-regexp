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
const index_1 = require("cjk-conv/lib/zh/table/index");
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
        let a = index_1.default.auto(char);
        return a.length > 1 ? '[' + a.join('') + ']' : a[0];
    });
}
exports._word_zh_core = _word_zh_core;
//export type valueof<T> = T[keyof T];
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7Ozs7QUFHSCx1REFBZ0U7QUFDaEUsMEJBQThCO0FBQzlCLDBCQUFxQjtBQUlyQixTQUFnQixRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLElBQWE7SUFFaEUsSUFBSSxDQUFrQixDQUFDO0lBRXZCLElBQUksTUFBTSxZQUFZLE1BQU0sRUFDNUI7UUFDQyxDQUFDLEdBQUcsSUFBSSxZQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3hCLElBQUk7U0FDSixDQUFDLENBQUM7UUFFSCxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUNoQjtTQUVEO1FBQ0MsQ0FBQyxHQUFHLElBQUksWUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7WUFDL0IsSUFBSTtTQUNKLENBQUMsQ0FBQyxNQUFNLENBQUM7S0FDVjtJQUVELE9BQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFwQkQsNEJBb0JDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLE1BQWMsRUFBRSxJQUFhO0lBRTFELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyx3Q0FBd0MsRUFBRSxVQUFVLElBQUk7UUFFN0UsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDcEM7WUFDQyxPQUFPLElBQUksQ0FBQztTQUNaO1FBRUQsSUFBSSxDQUFDLEdBQUcsZUFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQixPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFiRCxzQ0FhQztBQUVELHNDQUFzQztBQUV0QyxrQkFBZSxPQUFtQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC81LzMvMDAzLlxuICpcbiAqIOW3suW7ouajhCDlg4XnlKjmlrzoiIrniYjnm7jlrrlcbiAqL1xuXG5pbXBvcnQgY2prQ29udiBmcm9tICdjamstY29udic7XG5pbXBvcnQgemhUYWJsZSwgeyBJT3B0aW9ucyB9IGZyb20gJ2Nqay1jb252L2xpYi96aC90YWJsZS9pbmRleCc7XG5pbXBvcnQgeyB6aFJlZ0V4cCB9IGZyb20gJy4uJztcbmV4cG9ydCAqIGZyb20gJy4vdjEnO1xuXG5leHBvcnQgZnVuY3Rpb24gX3dvcmRfemgoc2VhcmNoOiBzdHJpbmcsIHJldCwgZmxhZ3M/LCBza2lwPzogc3RyaW5nKVxuZXhwb3J0IGZ1bmN0aW9uIF93b3JkX3poKHNlYXJjaDogUmVnRXhwLCByZXQsIGZsYWdzPywgc2tpcD86IHN0cmluZylcbmV4cG9ydCBmdW5jdGlvbiBfd29yZF96aChzZWFyY2gsIHJldCwgZmxhZ3MgPSAnaWcnLCBza2lwPzogc3RyaW5nKVxue1xuXHRsZXQgczogUmVnRXhwIHwgc3RyaW5nO1xuXG5cdGlmIChzZWFyY2ggaW5zdGFuY2VvZiBSZWdFeHApXG5cdHtcblx0XHRzID0gbmV3IHpoUmVnRXhwKHNlYXJjaCwge1xuXHRcdFx0c2tpcCxcblx0XHR9KTtcblxuXHRcdGZsYWdzID0gcy5mbGFncztcblx0fVxuXHRlbHNlXG5cdHtcblx0XHRzID0gbmV3IHpoUmVnRXhwKHNlYXJjaCwgZmxhZ3MsIHtcblx0XHRcdHNraXAsXG5cdFx0fSkuc291cmNlO1xuXHR9XG5cblx0cmV0dXJuIFtzLCByZXQsIGZsYWdzXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF93b3JkX3poX2NvcmUoc2VhcmNoOiBzdHJpbmcsIHNraXA/OiBzdHJpbmcpXG57XG5cdHJldHVybiBzZWFyY2gucmVwbGFjZSgvW1xcdTRFMDAtXFx1OUZGRlxcdXsyMDAwMH0tXFx1ezJGQTFGfeOBruOBqF0vdWcsIGZ1bmN0aW9uIChjaGFyKVxuXHR7XG5cdFx0aWYgKHNraXAgJiYgc2tpcC5pbmRleE9mKGNoYXIpICE9IC0xKVxuXHRcdHtcblx0XHRcdHJldHVybiBjaGFyO1xuXHRcdH1cblxuXHRcdGxldCBhID0gemhUYWJsZS5hdXRvKGNoYXIpO1xuXG5cdFx0cmV0dXJuIGEubGVuZ3RoID4gMSA/ICdbJyArIGEuam9pbignJykgKyAnXScgOiBhWzBdO1xuXHR9KTtcbn1cblxuLy9leHBvcnQgdHlwZSB2YWx1ZW9mPFQ+ID0gVFtrZXlvZiBUXTtcblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0cyBhcyB0eXBlb2YgaW1wb3J0KCcuL2luZGV4Jyk7XG5cbiJdfQ==