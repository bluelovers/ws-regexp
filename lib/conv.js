"use strict";
/**
 * Created by user on 2018/5/5/005.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._word_zh_core2 = exports._word_zh_core = exports.zhTableAutoGreedyTable = void 0;
const index_1 = require("cjk-conv/lib/zh/table/index");
const util_1 = require("./util");
//console.log(cjkConv.zhTable.auto('魯'));
function zhTableAutoGreedyTable(s, options = {}) {
    if (true || options.greedyTable > 1) {
        options.safe = false;
    }
    options.greedyTable = options.greedyTable || true;
    return index_1.auto(s, options);
}
exports.zhTableAutoGreedyTable = zhTableAutoGreedyTable;
function _word_zh_core(search, skip, zhTableFn = index_1.auto, options = {}) {
    let opts;
    if (options.unsafe || true) {
        opts = {
            // @ts-ignore
            greedyTable: options.greedyTable,
            safe: false,
        };
    }
    return search.replace(util_1._re_cjk_conv('ug'), function (char) {
        if (skip && skip.indexOf(char) != -1) {
            return char;
        }
        let a = zhTableFn(char, opts);
        return a.length > 1 ? '[' + a.join('') + ']' : a[0];
    });
}
exports._word_zh_core = _word_zh_core;
function _word_zh_core2(search, skip, zhTableFn = index_1.auto, options = {}) {
    let opts;
    if (options.unsafe || true) {
        opts = {
            // @ts-ignore
            greedyTable: options.greedyTable,
            safe: false,
        };
    }
    return search.replace(util_1._re_cjk_conv('ug'), function (char) {
        if (skip && skip.indexOf(char) != -1) {
            return char;
        }
        let a = zhTableFn(char, opts);
        return a.join('');
    });
}
exports._word_zh_core2 = _word_zh_core2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7QUFHSCx1REFBa0U7QUFDbEUsaUNBQXNDO0FBSXRDLHlDQUF5QztBQUV6QyxTQUFnQixzQkFBc0IsQ0FBQyxDQUFTLEVBQUUsVUFBMkIsRUFBRTtJQUc5RSxJQUFJLElBQUksSUFBSyxPQUFPLENBQUMsV0FBdUIsR0FBRyxDQUFDLEVBQ2hEO1FBQ0MsT0FBTyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7S0FDckI7SUFFRCxPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDO0lBRWxELE9BQU8sWUFBVyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUMvQixDQUFDO0FBWEQsd0RBV0M7QUFFRCxTQUFnQixhQUFhLENBQUMsTUFBYyxFQUFFLElBQWEsRUFBRSxTQUFTLEdBQUcsWUFBVyxFQUFFLFVBQTBCLEVBQUU7SUFFakgsSUFBSSxJQUFxQixDQUFDO0lBRTFCLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQzFCO1FBQ0MsSUFBSSxHQUFHO1lBQ04sYUFBYTtZQUNiLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNoQyxJQUFJLEVBQUUsS0FBSztTQUNYLENBQUE7S0FDRDtJQUVELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxtQkFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsSUFBSTtRQUV2RCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNwQztZQUNDLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFFRCxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTlCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQXhCRCxzQ0F3QkM7QUFFRCxTQUFnQixjQUFjLENBQUMsTUFBYyxFQUFFLElBQWEsRUFBRSxTQUFTLEdBQUcsWUFBVyxFQUFFLFVBQTBCLEVBQUU7SUFFbEgsSUFBSSxJQUFxQixDQUFDO0lBRTFCLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQzFCO1FBQ0MsSUFBSSxHQUFHO1lBQ04sYUFBYTtZQUNiLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNoQyxJQUFJLEVBQUUsS0FBSztTQUNYLENBQUE7S0FDRDtJQUVELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxtQkFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsSUFBSTtRQUV2RCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNwQztZQUNDLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFFRCxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTlCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUF4QkQsd0NBd0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC81LzUvMDA1LlxuICovXG5cbmltcG9ydCB7IElPcHRpb25zIH0gZnJvbSAnY2prLWNvbnYvbGliL3poL3RhYmxlL2luZGV4JztcbmltcG9ydCB7IGF1dG8gYXMgemhUYWJsZUF1dG8gfSBmcm9tICdjamstY29udi9saWIvemgvdGFibGUvaW5kZXgnO1xuaW1wb3J0IHsgX3JlX2Nqa19jb252IH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IElPcHRpb25zIGFzIElPcHRpb25zUmVnRXhwIH0gZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7IElPcHRpb25zIGFzIElPcHRpb25zWmhUYWJsZSB9IGZyb20gJ2Nqay1jb252L2xpYi96aC90YWJsZS9pbmRleCc7XG5cbi8vY29uc29sZS5sb2coY2prQ29udi56aFRhYmxlLmF1dG8oJ+mtrycpKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHpoVGFibGVBdXRvR3JlZWR5VGFibGUoczogc3RyaW5nLCBvcHRpb25zOiBJT3B0aW9uc1poVGFibGUgPSB7fSlcbntcblxuXHRpZiAodHJ1ZSB8fCAob3B0aW9ucy5ncmVlZHlUYWJsZSBhcyBhbnkgfCAwKSA+IDEpXG5cdHtcblx0XHRvcHRpb25zLnNhZmUgPSBmYWxzZTtcblx0fVxuXG5cdG9wdGlvbnMuZ3JlZWR5VGFibGUgPSBvcHRpb25zLmdyZWVkeVRhYmxlIHx8IHRydWU7XG5cblx0cmV0dXJuIHpoVGFibGVBdXRvKHMsIG9wdGlvbnMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfd29yZF96aF9jb3JlKHNlYXJjaDogc3RyaW5nLCBza2lwPzogc3RyaW5nLCB6aFRhYmxlRm4gPSB6aFRhYmxlQXV0bywgb3B0aW9uczogSU9wdGlvbnNSZWdFeHAgPSB7fSlcbntcblx0bGV0IG9wdHM6IElPcHRpb25zWmhUYWJsZTtcblxuXHRpZiAob3B0aW9ucy51bnNhZmUgfHwgdHJ1ZSlcblx0e1xuXHRcdG9wdHMgPSB7XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRncmVlZHlUYWJsZTogb3B0aW9ucy5ncmVlZHlUYWJsZSxcblx0XHRcdHNhZmU6IGZhbHNlLFxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBzZWFyY2gucmVwbGFjZShfcmVfY2prX2NvbnYoJ3VnJyksIGZ1bmN0aW9uIChjaGFyKVxuXHR7XG5cdFx0aWYgKHNraXAgJiYgc2tpcC5pbmRleE9mKGNoYXIpICE9IC0xKVxuXHRcdHtcblx0XHRcdHJldHVybiBjaGFyO1xuXHRcdH1cblxuXHRcdGxldCBhID0gemhUYWJsZUZuKGNoYXIsIG9wdHMpO1xuXG5cdFx0cmV0dXJuIGEubGVuZ3RoID4gMSA/ICdbJyArIGEuam9pbignJykgKyAnXScgOiBhWzBdO1xuXHR9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF93b3JkX3poX2NvcmUyKHNlYXJjaDogc3RyaW5nLCBza2lwPzogc3RyaW5nLCB6aFRhYmxlRm4gPSB6aFRhYmxlQXV0bywgb3B0aW9uczogSU9wdGlvbnNSZWdFeHAgPSB7fSlcbntcblx0bGV0IG9wdHM6IElPcHRpb25zWmhUYWJsZTtcblxuXHRpZiAob3B0aW9ucy51bnNhZmUgfHwgdHJ1ZSlcblx0e1xuXHRcdG9wdHMgPSB7XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRncmVlZHlUYWJsZTogb3B0aW9ucy5ncmVlZHlUYWJsZSxcblx0XHRcdHNhZmU6IGZhbHNlLFxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBzZWFyY2gucmVwbGFjZShfcmVfY2prX2NvbnYoJ3VnJyksIGZ1bmN0aW9uIChjaGFyKVxuXHR7XG5cdFx0aWYgKHNraXAgJiYgc2tpcC5pbmRleE9mKGNoYXIpICE9IC0xKVxuXHRcdHtcblx0XHRcdHJldHVybiBjaGFyO1xuXHRcdH1cblxuXHRcdGxldCBhID0gemhUYWJsZUZuKGNoYXIsIG9wdHMpO1xuXG5cdFx0cmV0dXJuIGEuam9pbignJyk7XG5cdH0pO1xufVxuIl19