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
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUdILHVEQUF3RDtBQUN4RCxpQ0FBc0M7QUFHdEMseUNBQXlDO0FBRXpDLFNBQWdCLHNCQUFzQixDQUFDLENBQVMsRUFBRSxVQUFvQixFQUFFO0lBR3ZFLElBQUksSUFBSSxJQUFLLE9BQU8sQ0FBQyxXQUF1QixHQUFHLENBQUMsRUFDaEQ7UUFDQyxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztLQUNyQjtJQUVELE9BQU8sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUM7SUFFbEQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUNoQyxDQUFDO0FBWEQsd0RBV0M7QUFFRCxTQUFnQixhQUFhLENBQUMsTUFBYyxFQUFFLElBQWEsRUFBRSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxVQUEwQixFQUFFO0lBRWxILElBQUksSUFBYyxDQUFDO0lBRW5CLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQzFCO1FBQ0MsSUFBSSxHQUFHO1lBQ04sYUFBYTtZQUNiLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNoQyxJQUFJLEVBQUUsS0FBSztTQUNYLENBQUE7S0FDRDtJQUVELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxtQkFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsSUFBSTtRQUV2RCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNwQztZQUNDLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFFRCxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTlCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQXhCRCxzQ0F3QkM7QUFFRCxTQUFnQixjQUFjLENBQUMsTUFBYyxFQUFFLElBQWEsRUFBRSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxVQUEwQixFQUFFO0lBRW5ILElBQUksSUFBYyxDQUFDO0lBRW5CLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQzFCO1FBQ0MsSUFBSSxHQUFHO1lBQ04sYUFBYTtZQUNiLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNoQyxJQUFJLEVBQUUsS0FBSztTQUNYLENBQUE7S0FDRDtJQUVELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxtQkFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsSUFBSTtRQUV2RCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNwQztZQUNDLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFFRCxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTlCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUF4QkQsd0NBd0JDO0FBRUQsa0JBQWUsT0FBa0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTgvNS81LzAwNS5cbiAqL1xuXG5pbXBvcnQgeyBJT3B0aW9ucyB9IGZyb20gJ2Nqay1jb252L2xpYi96aC90YWJsZS9pbmRleCc7XG5pbXBvcnQgemhUYWJsZSA9IHJlcXVpcmUoJ2Nqay1jb252L2xpYi96aC90YWJsZS9pbmRleCcpO1xuaW1wb3J0IHsgX3JlX2Nqa19jb252IH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IElPcHRpb25zIGFzIElPcHRpb25zUmVnRXhwIH0gZnJvbSAnLi4nO1xuXG4vL2NvbnNvbGUubG9nKGNqa0NvbnYuemhUYWJsZS5hdXRvKCfpra8nKSk7XG5cbmV4cG9ydCBmdW5jdGlvbiB6aFRhYmxlQXV0b0dyZWVkeVRhYmxlKHM6IHN0cmluZywgb3B0aW9uczogSU9wdGlvbnMgPSB7fSlcbntcblxuXHRpZiAodHJ1ZSB8fCAob3B0aW9ucy5ncmVlZHlUYWJsZSBhcyBhbnkgfCAwKSA+IDEpXG5cdHtcblx0XHRvcHRpb25zLnNhZmUgPSBmYWxzZTtcblx0fVxuXG5cdG9wdGlvbnMuZ3JlZWR5VGFibGUgPSBvcHRpb25zLmdyZWVkeVRhYmxlIHx8IHRydWU7XG5cblx0cmV0dXJuIHpoVGFibGUuYXV0byhzLCBvcHRpb25zKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX3dvcmRfemhfY29yZShzZWFyY2g6IHN0cmluZywgc2tpcD86IHN0cmluZywgemhUYWJsZUZuID0gemhUYWJsZS5hdXRvLCBvcHRpb25zOiBJT3B0aW9uc1JlZ0V4cCA9IHt9KVxue1xuXHRsZXQgb3B0czogSU9wdGlvbnM7XG5cblx0aWYgKG9wdGlvbnMudW5zYWZlIHx8IHRydWUpXG5cdHtcblx0XHRvcHRzID0ge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0Z3JlZWR5VGFibGU6IG9wdGlvbnMuZ3JlZWR5VGFibGUsXG5cdFx0XHRzYWZlOiBmYWxzZSxcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gc2VhcmNoLnJlcGxhY2UoX3JlX2Nqa19jb252KCd1ZycpLCBmdW5jdGlvbiAoY2hhcilcblx0e1xuXHRcdGlmIChza2lwICYmIHNraXAuaW5kZXhPZihjaGFyKSAhPSAtMSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gY2hhcjtcblx0XHR9XG5cblx0XHRsZXQgYSA9IHpoVGFibGVGbihjaGFyLCBvcHRzKTtcblxuXHRcdHJldHVybiBhLmxlbmd0aCA+IDEgPyAnWycgKyBhLmpvaW4oJycpICsgJ10nIDogYVswXTtcblx0fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfd29yZF96aF9jb3JlMihzZWFyY2g6IHN0cmluZywgc2tpcD86IHN0cmluZywgemhUYWJsZUZuID0gemhUYWJsZS5hdXRvLCBvcHRpb25zOiBJT3B0aW9uc1JlZ0V4cCA9IHt9KVxue1xuXHRsZXQgb3B0czogSU9wdGlvbnM7XG5cblx0aWYgKG9wdGlvbnMudW5zYWZlIHx8IHRydWUpXG5cdHtcblx0XHRvcHRzID0ge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0Z3JlZWR5VGFibGU6IG9wdGlvbnMuZ3JlZWR5VGFibGUsXG5cdFx0XHRzYWZlOiBmYWxzZSxcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gc2VhcmNoLnJlcGxhY2UoX3JlX2Nqa19jb252KCd1ZycpLCBmdW5jdGlvbiAoY2hhcilcblx0e1xuXHRcdGlmIChza2lwICYmIHNraXAuaW5kZXhPZihjaGFyKSAhPSAtMSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gY2hhcjtcblx0XHR9XG5cblx0XHRsZXQgYSA9IHpoVGFibGVGbihjaGFyLCBvcHRzKTtcblxuXHRcdHJldHVybiBhLmpvaW4oJycpO1xuXHR9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0cyBhcyB0eXBlb2YgaW1wb3J0KCcuL2NvbnYnKTtcbiJdfQ==