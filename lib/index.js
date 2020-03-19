"use strict";
/**
 * Created by user on 2018/5/3/003.
 *
 * 已廢棄 僅用於舊版相容
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._word_zh_core = exports._word_zh = void 0;
const __1 = require("..");
const conv_1 = require("./conv");
Object.defineProperty(exports, "_word_zh_core", { enumerable: true, get: function () { return conv_1._word_zh_core; } });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7O0FBSUgsMEJBQThCO0FBQzlCLGlDQUF1QztBQTJCOUIsOEZBM0JBLG9CQUFhLE9BMkJBO0FBdEJ0QixTQUFnQixRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLElBQWE7SUFFaEUsSUFBSSxDQUFrQixDQUFDO0lBRXZCLElBQUksTUFBTSxZQUFZLE1BQU0sRUFDNUI7UUFDQyxDQUFDLEdBQUcsSUFBSSxZQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3hCLElBQUk7U0FDSixDQUFDLENBQUM7UUFFSCxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUNoQjtTQUVEO1FBQ0MsQ0FBQyxHQUFHLElBQUksWUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7WUFDL0IsSUFBSTtTQUNKLENBQUMsQ0FBQyxNQUFNLENBQUM7S0FDVjtJQUVELE9BQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFwQkQsNEJBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC81LzMvMDAzLlxuICpcbiAqIOW3suW7ouajhCDlg4XnlKjmlrzoiIrniYjnm7jlrrlcbiAqL1xuXG5pbXBvcnQgY2prQ29udiBmcm9tICdjamstY29udic7XG5pbXBvcnQgemhUYWJsZSwgeyBJT3B0aW9ucyB9IGZyb20gJ2Nqay1jb252L2xpYi96aC90YWJsZS9pbmRleCc7XG5pbXBvcnQgeyB6aFJlZ0V4cCB9IGZyb20gJy4uJztcbmltcG9ydCB7IF93b3JkX3poX2NvcmUgfSBmcm9tICcuL2NvbnYnO1xuLy9leHBvcnQgKiBmcm9tICcuL3YxJztcblxuZXhwb3J0IGZ1bmN0aW9uIF93b3JkX3poKHNlYXJjaDogc3RyaW5nLCByZXQsIGZsYWdzPywgc2tpcD86IHN0cmluZylcbmV4cG9ydCBmdW5jdGlvbiBfd29yZF96aChzZWFyY2g6IFJlZ0V4cCwgcmV0LCBmbGFncz8sIHNraXA/OiBzdHJpbmcpXG5leHBvcnQgZnVuY3Rpb24gX3dvcmRfemgoc2VhcmNoLCByZXQsIGZsYWdzID0gJ2lnJywgc2tpcD86IHN0cmluZylcbntcblx0bGV0IHM6IFJlZ0V4cCB8IHN0cmluZztcblxuXHRpZiAoc2VhcmNoIGluc3RhbmNlb2YgUmVnRXhwKVxuXHR7XG5cdFx0cyA9IG5ldyB6aFJlZ0V4cChzZWFyY2gsIHtcblx0XHRcdHNraXAsXG5cdFx0fSk7XG5cblx0XHRmbGFncyA9IHMuZmxhZ3M7XG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0cyA9IG5ldyB6aFJlZ0V4cChzZWFyY2gsIGZsYWdzLCB7XG5cdFx0XHRza2lwLFxuXHRcdH0pLnNvdXJjZTtcblx0fVxuXG5cdHJldHVybiBbcywgcmV0LCBmbGFnc107XG59XG5cbmV4cG9ydCB7IF93b3JkX3poX2NvcmUgfVxuIl19