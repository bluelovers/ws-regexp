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
function _word_zh_core2(search, skip, zhTableFn = zhTable.auto, options = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUdILHVEQUF3RDtBQUN4RCxpQ0FBc0M7QUFJdEMseUNBQXlDO0FBRXpDLFNBQWdCLHNCQUFzQixDQUFDLENBQVMsRUFBRSxVQUEyQixFQUFFO0lBRzlFLElBQUksSUFBSSxJQUFLLE9BQU8sQ0FBQyxXQUF1QixHQUFHLENBQUMsRUFDaEQ7UUFDQyxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztLQUNyQjtJQUVELE9BQU8sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUM7SUFFbEQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUNoQyxDQUFDO0FBWEQsd0RBV0M7QUFFRCxTQUFnQixhQUFhLENBQUMsTUFBYyxFQUFFLElBQWEsRUFBRSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxVQUEwQixFQUFFO0lBRWxILElBQUksSUFBcUIsQ0FBQztJQUUxQixJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxFQUMxQjtRQUNDLElBQUksR0FBRztZQUNOLGFBQWE7WUFDYixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDaEMsSUFBSSxFQUFFLEtBQUs7U0FDWCxDQUFBO0tBQ0Q7SUFFRCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLElBQUk7UUFFdkQsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDcEM7WUFDQyxPQUFPLElBQUksQ0FBQztTQUNaO1FBRUQsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU5QixPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUF4QkQsc0NBd0JDO0FBRUQsU0FBZ0IsY0FBYyxDQUFDLE1BQWMsRUFBRSxJQUFhLEVBQUUsU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBMEIsRUFBRTtJQUVuSCxJQUFJLElBQXFCLENBQUM7SUFFMUIsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLElBQUksRUFDMUI7UUFDQyxJQUFJLEdBQUc7WUFDTixhQUFhO1lBQ2IsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ2hDLElBQUksRUFBRSxLQUFLO1NBQ1gsQ0FBQTtLQUNEO0lBRUQsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxJQUFJO1FBRXZELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ3BDO1lBQ0MsT0FBTyxJQUFJLENBQUM7U0FDWjtRQUVELElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFOUIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQXhCRCx3Q0F3QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE4LzUvNS8wMDUuXG4gKi9cblxuaW1wb3J0IHsgSU9wdGlvbnMgfSBmcm9tICdjamstY29udi9saWIvemgvdGFibGUvaW5kZXgnO1xuaW1wb3J0IHpoVGFibGUgPSByZXF1aXJlKCdjamstY29udi9saWIvemgvdGFibGUvaW5kZXgnKTtcbmltcG9ydCB7IF9yZV9jamtfY29udiB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBJT3B0aW9ucyBhcyBJT3B0aW9uc1JlZ0V4cCB9IGZyb20gJy4vY29yZSc7XG5pbXBvcnQgeyBJT3B0aW9ucyBhcyBJT3B0aW9uc1poVGFibGUgfSBmcm9tICdjamstY29udi9saWIvemgvdGFibGUvaW5kZXgnO1xuXG4vL2NvbnNvbGUubG9nKGNqa0NvbnYuemhUYWJsZS5hdXRvKCfpra8nKSk7XG5cbmV4cG9ydCBmdW5jdGlvbiB6aFRhYmxlQXV0b0dyZWVkeVRhYmxlKHM6IHN0cmluZywgb3B0aW9uczogSU9wdGlvbnNaaFRhYmxlID0ge30pXG57XG5cblx0aWYgKHRydWUgfHwgKG9wdGlvbnMuZ3JlZWR5VGFibGUgYXMgYW55IHwgMCkgPiAxKVxuXHR7XG5cdFx0b3B0aW9ucy5zYWZlID0gZmFsc2U7XG5cdH1cblxuXHRvcHRpb25zLmdyZWVkeVRhYmxlID0gb3B0aW9ucy5ncmVlZHlUYWJsZSB8fCB0cnVlO1xuXG5cdHJldHVybiB6aFRhYmxlLmF1dG8ocywgb3B0aW9ucylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF93b3JkX3poX2NvcmUoc2VhcmNoOiBzdHJpbmcsIHNraXA/OiBzdHJpbmcsIHpoVGFibGVGbiA9IHpoVGFibGUuYXV0bywgb3B0aW9uczogSU9wdGlvbnNSZWdFeHAgPSB7fSlcbntcblx0bGV0IG9wdHM6IElPcHRpb25zWmhUYWJsZTtcblxuXHRpZiAob3B0aW9ucy51bnNhZmUgfHwgdHJ1ZSlcblx0e1xuXHRcdG9wdHMgPSB7XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRncmVlZHlUYWJsZTogb3B0aW9ucy5ncmVlZHlUYWJsZSxcblx0XHRcdHNhZmU6IGZhbHNlLFxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBzZWFyY2gucmVwbGFjZShfcmVfY2prX2NvbnYoJ3VnJyksIGZ1bmN0aW9uIChjaGFyKVxuXHR7XG5cdFx0aWYgKHNraXAgJiYgc2tpcC5pbmRleE9mKGNoYXIpICE9IC0xKVxuXHRcdHtcblx0XHRcdHJldHVybiBjaGFyO1xuXHRcdH1cblxuXHRcdGxldCBhID0gemhUYWJsZUZuKGNoYXIsIG9wdHMpO1xuXG5cdFx0cmV0dXJuIGEubGVuZ3RoID4gMSA/ICdbJyArIGEuam9pbignJykgKyAnXScgOiBhWzBdO1xuXHR9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF93b3JkX3poX2NvcmUyKHNlYXJjaDogc3RyaW5nLCBza2lwPzogc3RyaW5nLCB6aFRhYmxlRm4gPSB6aFRhYmxlLmF1dG8sIG9wdGlvbnM6IElPcHRpb25zUmVnRXhwID0ge30pXG57XG5cdGxldCBvcHRzOiBJT3B0aW9uc1poVGFibGU7XG5cblx0aWYgKG9wdGlvbnMudW5zYWZlIHx8IHRydWUpXG5cdHtcblx0XHRvcHRzID0ge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0Z3JlZWR5VGFibGU6IG9wdGlvbnMuZ3JlZWR5VGFibGUsXG5cdFx0XHRzYWZlOiBmYWxzZSxcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gc2VhcmNoLnJlcGxhY2UoX3JlX2Nqa19jb252KCd1ZycpLCBmdW5jdGlvbiAoY2hhcilcblx0e1xuXHRcdGlmIChza2lwICYmIHNraXAuaW5kZXhPZihjaGFyKSAhPSAtMSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gY2hhcjtcblx0XHR9XG5cblx0XHRsZXQgYSA9IHpoVGFibGVGbihjaGFyLCBvcHRzKTtcblxuXHRcdHJldHVybiBhLmpvaW4oJycpO1xuXHR9KTtcbn1cbiJdfQ==