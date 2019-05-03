"use strict";
/**
 * Created by user on 2018/5/5/005.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const zhTable = require("cjk-conv/lib/zh/table/index");
const util_1 = require("./util");
//console.log(cjkConv.zhTable.auto('魯'));
function zhTableAutoGreedyTable(s, options = {}) {
    if (true || options.greedyTable > 1) {
        options.safe = false;
    }
    options.greedyTable = options.greedyTable || true;
    return zhTable.auto(s, options);
}
exports.zhTableAutoGreedyTable = zhTableAutoGreedyTable;
function _word_zh_core(search, skip, zhTableFn = zhTable.auto, options = {}) {
    let opts;
    if (options.unsafe || true) {
        opts = {
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
function _word_zh_core2(search, skip, zhTableFn = zhTable.auto, options = {}) {
    let opts;
    if (options.unsafe || true) {
        opts = {
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
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUdILHVEQUF3RDtBQUN4RCxpQ0FBc0M7QUFHdEMseUNBQXlDO0FBRXpDLFNBQWdCLHNCQUFzQixDQUFDLENBQVMsRUFBRSxVQUFvQixFQUFFO0lBR3ZFLElBQUksSUFBSSxJQUFLLE9BQU8sQ0FBQyxXQUF1QixHQUFHLENBQUMsRUFDaEQ7UUFDQyxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztLQUNyQjtJQUVELE9BQU8sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUM7SUFFbEQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUNoQyxDQUFDO0FBWEQsd0RBV0M7QUFFRCxTQUFnQixhQUFhLENBQUMsTUFBYyxFQUFFLElBQWEsRUFBRSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxVQUEwQixFQUFFO0lBRWxILElBQUksSUFBYyxDQUFDO0lBRW5CLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQzFCO1FBQ0MsSUFBSSxHQUFHO1lBQ04sSUFBSSxFQUFFLEtBQUs7U0FDWCxDQUFBO0tBQ0Q7SUFFRCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLElBQUk7UUFFdkQsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDcEM7WUFDQyxPQUFPLElBQUksQ0FBQztTQUNaO1FBRUQsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU5QixPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUF0QkQsc0NBc0JDO0FBRUQsU0FBZ0IsY0FBYyxDQUFDLE1BQWMsRUFBRSxJQUFhLEVBQUUsU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBMEIsRUFBRTtJQUVuSCxJQUFJLElBQWMsQ0FBQztJQUVuQixJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxFQUMxQjtRQUNDLElBQUksR0FBRztZQUNOLElBQUksRUFBRSxLQUFLO1NBQ1gsQ0FBQTtLQUNEO0lBRUQsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxJQUFJO1FBRXZELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ3BDO1lBQ0MsT0FBTyxJQUFJLENBQUM7U0FDWjtRQUVELElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFOUIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQXRCRCx3Q0FzQkM7QUFFRCxrQkFBZSxPQUFrQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC81LzUvMDA1LlxuICovXG5cbmltcG9ydCB7IElPcHRpb25zIH0gZnJvbSAnY2prLWNvbnYvbGliL3poL3RhYmxlL2luZGV4JztcbmltcG9ydCB6aFRhYmxlID0gcmVxdWlyZSgnY2prLWNvbnYvbGliL3poL3RhYmxlL2luZGV4Jyk7XG5pbXBvcnQgeyBfcmVfY2prX2NvbnYgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgSU9wdGlvbnMgYXMgSU9wdGlvbnNSZWdFeHAgfSBmcm9tICcuLic7XG5cbi8vY29uc29sZS5sb2coY2prQ29udi56aFRhYmxlLmF1dG8oJ+mtrycpKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHpoVGFibGVBdXRvR3JlZWR5VGFibGUoczogc3RyaW5nLCBvcHRpb25zOiBJT3B0aW9ucyA9IHt9KVxue1xuXG5cdGlmICh0cnVlIHx8IChvcHRpb25zLmdyZWVkeVRhYmxlIGFzIGFueSB8IDApID4gMSlcblx0e1xuXHRcdG9wdGlvbnMuc2FmZSA9IGZhbHNlO1xuXHR9XG5cblx0b3B0aW9ucy5ncmVlZHlUYWJsZSA9IG9wdGlvbnMuZ3JlZWR5VGFibGUgfHwgdHJ1ZTtcblxuXHRyZXR1cm4gemhUYWJsZS5hdXRvKHMsIG9wdGlvbnMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfd29yZF96aF9jb3JlKHNlYXJjaDogc3RyaW5nLCBza2lwPzogc3RyaW5nLCB6aFRhYmxlRm4gPSB6aFRhYmxlLmF1dG8sIG9wdGlvbnM6IElPcHRpb25zUmVnRXhwID0ge30pXG57XG5cdGxldCBvcHRzOiBJT3B0aW9ucztcblxuXHRpZiAob3B0aW9ucy51bnNhZmUgfHwgdHJ1ZSlcblx0e1xuXHRcdG9wdHMgPSB7XG5cdFx0XHRzYWZlOiBmYWxzZSxcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gc2VhcmNoLnJlcGxhY2UoX3JlX2Nqa19jb252KCd1ZycpLCBmdW5jdGlvbiAoY2hhcilcblx0e1xuXHRcdGlmIChza2lwICYmIHNraXAuaW5kZXhPZihjaGFyKSAhPSAtMSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gY2hhcjtcblx0XHR9XG5cblx0XHRsZXQgYSA9IHpoVGFibGVGbihjaGFyLCBvcHRzKTtcblxuXHRcdHJldHVybiBhLmxlbmd0aCA+IDEgPyAnWycgKyBhLmpvaW4oJycpICsgJ10nIDogYVswXTtcblx0fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfd29yZF96aF9jb3JlMihzZWFyY2g6IHN0cmluZywgc2tpcD86IHN0cmluZywgemhUYWJsZUZuID0gemhUYWJsZS5hdXRvLCBvcHRpb25zOiBJT3B0aW9uc1JlZ0V4cCA9IHt9KVxue1xuXHRsZXQgb3B0czogSU9wdGlvbnM7XG5cblx0aWYgKG9wdGlvbnMudW5zYWZlIHx8IHRydWUpXG5cdHtcblx0XHRvcHRzID0ge1xuXHRcdFx0c2FmZTogZmFsc2UsXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHNlYXJjaC5yZXBsYWNlKF9yZV9jamtfY29udigndWcnKSwgZnVuY3Rpb24gKGNoYXIpXG5cdHtcblx0XHRpZiAoc2tpcCAmJiBza2lwLmluZGV4T2YoY2hhcikgIT0gLTEpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIGNoYXI7XG5cdFx0fVxuXG5cdFx0bGV0IGEgPSB6aFRhYmxlRm4oY2hhciwgb3B0cyk7XG5cblx0XHRyZXR1cm4gYS5qb2luKCcnKTtcblx0fSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHMgYXMgdHlwZW9mIGltcG9ydCgnLi9jb252Jyk7XG4iXX0=