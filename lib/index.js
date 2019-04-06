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
//export type valueof<T> = T[keyof T];
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7QUFJSCwwQkFBOEI7QUFDOUIsaUNBQXVDO0FBMkI5Qix3QkEzQkEsb0JBQWEsQ0EyQkE7QUF0QnRCLFNBQWdCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsSUFBYTtJQUVoRSxJQUFJLENBQWtCLENBQUM7SUFFdkIsSUFBSSxNQUFNLFlBQVksTUFBTSxFQUM1QjtRQUNDLENBQUMsR0FBRyxJQUFJLFlBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDeEIsSUFBSTtTQUNKLENBQUMsQ0FBQztRQUVILEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0tBQ2hCO1NBRUQ7UUFDQyxDQUFDLEdBQUcsSUFBSSxZQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtZQUMvQixJQUFJO1NBQ0osQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUNWO0lBRUQsT0FBTyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDeEIsQ0FBQztBQXBCRCw0QkFvQkM7QUFJRCxzQ0FBc0M7QUFFdEMsa0JBQWUsT0FBbUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTgvNS8zLzAwMy5cbiAqXG4gKiDlt7Llu6Lmo4Qg5YOF55So5pa86IiK54mI55u45a65XG4gKi9cblxuaW1wb3J0IGNqa0NvbnYgZnJvbSAnY2prLWNvbnYnO1xuaW1wb3J0IHpoVGFibGUsIHsgSU9wdGlvbnMgfSBmcm9tICdjamstY29udi9saWIvemgvdGFibGUvaW5kZXgnO1xuaW1wb3J0IHsgemhSZWdFeHAgfSBmcm9tICcuLic7XG5pbXBvcnQgeyBfd29yZF96aF9jb3JlIH0gZnJvbSAnLi9jb252Jztcbi8vZXhwb3J0ICogZnJvbSAnLi92MSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBfd29yZF96aChzZWFyY2g6IHN0cmluZywgcmV0LCBmbGFncz8sIHNraXA/OiBzdHJpbmcpXG5leHBvcnQgZnVuY3Rpb24gX3dvcmRfemgoc2VhcmNoOiBSZWdFeHAsIHJldCwgZmxhZ3M/LCBza2lwPzogc3RyaW5nKVxuZXhwb3J0IGZ1bmN0aW9uIF93b3JkX3poKHNlYXJjaCwgcmV0LCBmbGFncyA9ICdpZycsIHNraXA/OiBzdHJpbmcpXG57XG5cdGxldCBzOiBSZWdFeHAgfCBzdHJpbmc7XG5cblx0aWYgKHNlYXJjaCBpbnN0YW5jZW9mIFJlZ0V4cClcblx0e1xuXHRcdHMgPSBuZXcgemhSZWdFeHAoc2VhcmNoLCB7XG5cdFx0XHRza2lwLFxuXHRcdH0pO1xuXG5cdFx0ZmxhZ3MgPSBzLmZsYWdzO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdHMgPSBuZXcgemhSZWdFeHAoc2VhcmNoLCBmbGFncywge1xuXHRcdFx0c2tpcCxcblx0XHR9KS5zb3VyY2U7XG5cdH1cblxuXHRyZXR1cm4gW3MsIHJldCwgZmxhZ3NdO1xufVxuXG5leHBvcnQgeyBfd29yZF96aF9jb3JlIH1cblxuLy9leHBvcnQgdHlwZSB2YWx1ZW9mPFQ+ID0gVFtrZXlvZiBUXTtcblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0cyBhcyB0eXBlb2YgaW1wb3J0KCcuL2luZGV4Jyk7XG5cbiJdfQ==