"use strict";
/**
 * Created by user on 2018/5/5/005.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("cjk-conv/lib/zh/table/index");
//console.log(cjkConv.zhTable.auto('魯'));
function zhTableAutoGreedyTable(s, options = {}) {
    // @ts-ignore
    options.greedyTable = true;
    return index_1.default.auto(s, options);
}
exports.zhTableAutoGreedyTable = zhTableAutoGreedyTable;
function _word_zh_core(search, skip, zhTableFn = index_1.default.auto) {
    return search.replace(/[\u4E00-\u9FFF\u{20000}-\u{2FA1F}のと]/ug, function (char) {
        if (skip && skip.indexOf(char) != -1) {
            return char;
        }
        let a = zhTableFn(char);
        return a.length > 1 ? '[' + a.join('') + ']' : a[0];
    });
}
exports._word_zh_core = _word_zh_core;
function _word_zh_core2(search, skip, zhTableFn = index_1.default.auto) {
    return search.replace(/[\u4E00-\u9FFF\u{20000}-\u{2FA1F}のと]/ug, function (char) {
        if (skip && skip.indexOf(char) != -1) {
            return char;
        }
        let a = zhTableFn(char);
        return a.join('');
    });
}
exports._word_zh_core2 = _word_zh_core2;
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUVILHVEQUFnRTtBQUVoRSx5Q0FBeUM7QUFFekMsU0FBZ0Isc0JBQXNCLENBQUMsQ0FBUyxFQUFFLFVBQW9CLEVBQUU7SUFFdkUsYUFBYTtJQUNiLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzNCLE9BQU8sZUFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDaEMsQ0FBQztBQUxELHdEQUtDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLE1BQWMsRUFBRSxJQUFhLEVBQUUsU0FBUyxHQUFHLGVBQU8sQ0FBQyxJQUFJO0lBRXBGLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyx3Q0FBd0MsRUFBRSxVQUFVLElBQUk7UUFFN0UsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDcEM7WUFDQyxPQUFPLElBQUksQ0FBQztTQUNaO1FBRUQsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQWJELHNDQWFDO0FBRUQsU0FBZ0IsY0FBYyxDQUFDLE1BQWMsRUFBRSxJQUFhLEVBQUUsU0FBUyxHQUFHLGVBQU8sQ0FBQyxJQUFJO0lBRXJGLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyx3Q0FBd0MsRUFBRSxVQUFVLElBQUk7UUFFN0UsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDcEM7WUFDQyxPQUFPLElBQUksQ0FBQztTQUNaO1FBRUQsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFiRCx3Q0FhQztBQUVELGtCQUFlLE9BQWtDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE4LzUvNS8wMDUuXG4gKi9cblxuaW1wb3J0IHpoVGFibGUsIHsgSU9wdGlvbnMgfSBmcm9tICdjamstY29udi9saWIvemgvdGFibGUvaW5kZXgnO1xuXG4vL2NvbnNvbGUubG9nKGNqa0NvbnYuemhUYWJsZS5hdXRvKCfpra8nKSk7XG5cbmV4cG9ydCBmdW5jdGlvbiB6aFRhYmxlQXV0b0dyZWVkeVRhYmxlKHM6IHN0cmluZywgb3B0aW9uczogSU9wdGlvbnMgPSB7fSlcbntcblx0Ly8gQHRzLWlnbm9yZVxuXHRvcHRpb25zLmdyZWVkeVRhYmxlID0gdHJ1ZTtcblx0cmV0dXJuIHpoVGFibGUuYXV0byhzLCBvcHRpb25zKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX3dvcmRfemhfY29yZShzZWFyY2g6IHN0cmluZywgc2tpcD86IHN0cmluZywgemhUYWJsZUZuID0gemhUYWJsZS5hdXRvKVxue1xuXHRyZXR1cm4gc2VhcmNoLnJlcGxhY2UoL1tcXHU0RTAwLVxcdTlGRkZcXHV7MjAwMDB9LVxcdXsyRkExRn3jga7jgahdL3VnLCBmdW5jdGlvbiAoY2hhcilcblx0e1xuXHRcdGlmIChza2lwICYmIHNraXAuaW5kZXhPZihjaGFyKSAhPSAtMSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gY2hhcjtcblx0XHR9XG5cblx0XHRsZXQgYSA9IHpoVGFibGVGbihjaGFyKTtcblxuXHRcdHJldHVybiBhLmxlbmd0aCA+IDEgPyAnWycgKyBhLmpvaW4oJycpICsgJ10nIDogYVswXTtcblx0fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfd29yZF96aF9jb3JlMihzZWFyY2g6IHN0cmluZywgc2tpcD86IHN0cmluZywgemhUYWJsZUZuID0gemhUYWJsZS5hdXRvKVxue1xuXHRyZXR1cm4gc2VhcmNoLnJlcGxhY2UoL1tcXHU0RTAwLVxcdTlGRkZcXHV7MjAwMDB9LVxcdXsyRkExRn3jga7jgahdL3VnLCBmdW5jdGlvbiAoY2hhcilcblx0e1xuXHRcdGlmIChza2lwICYmIHNraXAuaW5kZXhPZihjaGFyKSAhPSAtMSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gY2hhcjtcblx0XHR9XG5cblx0XHRsZXQgYSA9IHpoVGFibGVGbihjaGFyKTtcblxuXHRcdHJldHVybiBhLmpvaW4oJycpO1xuXHR9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0cyBhcyB0eXBlb2YgaW1wb3J0KCcuL2NvbnYnKTtcbiJdfQ==