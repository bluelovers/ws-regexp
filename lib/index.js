"use strict";
/**
 * Created by user on 2018/5/3/003.
 *
 * 已廢棄 僅用於舊版相容
 */
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const conv_1 = require("./conv");
exports._word_zh_core = conv_1._word_zh_core;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7QUFJSCwwQkFBOEI7QUFDOUIsaUNBQXVDO0FBMkI5Qix3QkEzQkEsb0JBQWEsQ0EyQkE7QUF0QnRCLFNBQWdCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsSUFBYTtJQUVoRSxJQUFJLENBQWtCLENBQUM7SUFFdkIsSUFBSSxNQUFNLFlBQVksTUFBTSxFQUM1QjtRQUNDLENBQUMsR0FBRyxJQUFJLFlBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDeEIsSUFBSTtTQUNKLENBQUMsQ0FBQztRQUVILEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0tBQ2hCO1NBRUQ7UUFDQyxDQUFDLEdBQUcsSUFBSSxZQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtZQUMvQixJQUFJO1NBQ0osQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUNWO0lBRUQsT0FBTyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDeEIsQ0FBQztBQXBCRCw0QkFvQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE4LzUvMy8wMDMuXG4gKlxuICog5bey5bui5qOEIOWDheeUqOaWvOiIiueJiOebuOWuuVxuICovXG5cbmltcG9ydCBjamtDb252IGZyb20gJ2Nqay1jb252JztcbmltcG9ydCB6aFRhYmxlLCB7IElPcHRpb25zIH0gZnJvbSAnY2prLWNvbnYvbGliL3poL3RhYmxlL2luZGV4JztcbmltcG9ydCB7IHpoUmVnRXhwIH0gZnJvbSAnLi4nO1xuaW1wb3J0IHsgX3dvcmRfemhfY29yZSB9IGZyb20gJy4vY29udic7XG4vL2V4cG9ydCAqIGZyb20gJy4vdjEnO1xuXG5leHBvcnQgZnVuY3Rpb24gX3dvcmRfemgoc2VhcmNoOiBzdHJpbmcsIHJldCwgZmxhZ3M/LCBza2lwPzogc3RyaW5nKVxuZXhwb3J0IGZ1bmN0aW9uIF93b3JkX3poKHNlYXJjaDogUmVnRXhwLCByZXQsIGZsYWdzPywgc2tpcD86IHN0cmluZylcbmV4cG9ydCBmdW5jdGlvbiBfd29yZF96aChzZWFyY2gsIHJldCwgZmxhZ3MgPSAnaWcnLCBza2lwPzogc3RyaW5nKVxue1xuXHRsZXQgczogUmVnRXhwIHwgc3RyaW5nO1xuXG5cdGlmIChzZWFyY2ggaW5zdGFuY2VvZiBSZWdFeHApXG5cdHtcblx0XHRzID0gbmV3IHpoUmVnRXhwKHNlYXJjaCwge1xuXHRcdFx0c2tpcCxcblx0XHR9KTtcblxuXHRcdGZsYWdzID0gcy5mbGFncztcblx0fVxuXHRlbHNlXG5cdHtcblx0XHRzID0gbmV3IHpoUmVnRXhwKHNlYXJjaCwgZmxhZ3MsIHtcblx0XHRcdHNraXAsXG5cdFx0fSkuc291cmNlO1xuXHR9XG5cblx0cmV0dXJuIFtzLCByZXQsIGZsYWdzXTtcbn1cblxuZXhwb3J0IHsgX3dvcmRfemhfY29yZSB9XG4iXX0=