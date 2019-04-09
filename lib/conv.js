"use strict";
/**
 * Created by user on 2018/5/5/005.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const zhTable = require("cjk-conv/lib/zh/table/index");
const util_1 = require("./util");
//console.log(cjkConv.zhTable.auto('魯'));
function zhTableAutoGreedyTable(s, options = {}) {
    // @ts-ignore
    options.greedyTable = true;
    return zhTable.auto(s, options);
}
exports.zhTableAutoGreedyTable = zhTableAutoGreedyTable;
function _word_zh_core(search, skip, zhTableFn = zhTable.auto) {
    return search.replace(util_1._re_cjk_conv('ug'), function (char) {
        if (skip && skip.indexOf(char) != -1) {
            return char;
        }
        let a = zhTableFn(char);
        return a.length > 1 ? '[' + a.join('') + ']' : a[0];
    });
}
exports._word_zh_core = _word_zh_core;
function _word_zh_core2(search, skip, zhTableFn = zhTable.auto) {
    return search.replace(util_1._re_cjk_conv('ug'), function (char) {
        if (skip && skip.indexOf(char) != -1) {
            return char;
        }
        let a = zhTableFn(char);
        return a.join('');
    });
}
exports._word_zh_core2 = _word_zh_core2;
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUdILHVEQUF3RDtBQUN4RCxpQ0FBc0M7QUFFdEMseUNBQXlDO0FBRXpDLFNBQWdCLHNCQUFzQixDQUFDLENBQVMsRUFBRSxVQUFvQixFQUFFO0lBRXZFLGFBQWE7SUFDYixPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUMzQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ2hDLENBQUM7QUFMRCx3REFLQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxNQUFjLEVBQUUsSUFBYSxFQUFFLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSTtJQUVwRixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLElBQUk7UUFFdkQsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDcEM7WUFDQyxPQUFPLElBQUksQ0FBQztTQUNaO1FBRUQsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQWJELHNDQWFDO0FBRUQsU0FBZ0IsY0FBYyxDQUFDLE1BQWMsRUFBRSxJQUFhLEVBQUUsU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJO0lBRXJGLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxtQkFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsSUFBSTtRQUV2RCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNwQztZQUNDLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFFRCxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQWJELHdDQWFDO0FBRUQsa0JBQWUsT0FBa0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTgvNS81LzAwNS5cbiAqL1xuXG5pbXBvcnQgeyBJT3B0aW9ucyB9IGZyb20gJ2Nqay1jb252L2xpYi96aC90YWJsZS9pbmRleCc7XG5pbXBvcnQgemhUYWJsZSA9IHJlcXVpcmUoJ2Nqay1jb252L2xpYi96aC90YWJsZS9pbmRleCcpO1xuaW1wb3J0IHsgX3JlX2Nqa19jb252IH0gZnJvbSAnLi91dGlsJztcblxuLy9jb25zb2xlLmxvZyhjamtDb252LnpoVGFibGUuYXV0bygn6a2vJykpO1xuXG5leHBvcnQgZnVuY3Rpb24gemhUYWJsZUF1dG9HcmVlZHlUYWJsZShzOiBzdHJpbmcsIG9wdGlvbnM6IElPcHRpb25zID0ge30pXG57XG5cdC8vIEB0cy1pZ25vcmVcblx0b3B0aW9ucy5ncmVlZHlUYWJsZSA9IHRydWU7XG5cdHJldHVybiB6aFRhYmxlLmF1dG8ocywgb3B0aW9ucylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF93b3JkX3poX2NvcmUoc2VhcmNoOiBzdHJpbmcsIHNraXA/OiBzdHJpbmcsIHpoVGFibGVGbiA9IHpoVGFibGUuYXV0bylcbntcblx0cmV0dXJuIHNlYXJjaC5yZXBsYWNlKF9yZV9jamtfY29udigndWcnKSwgZnVuY3Rpb24gKGNoYXIpXG5cdHtcblx0XHRpZiAoc2tpcCAmJiBza2lwLmluZGV4T2YoY2hhcikgIT0gLTEpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIGNoYXI7XG5cdFx0fVxuXG5cdFx0bGV0IGEgPSB6aFRhYmxlRm4oY2hhcik7XG5cblx0XHRyZXR1cm4gYS5sZW5ndGggPiAxID8gJ1snICsgYS5qb2luKCcnKSArICddJyA6IGFbMF07XG5cdH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX3dvcmRfemhfY29yZTIoc2VhcmNoOiBzdHJpbmcsIHNraXA/OiBzdHJpbmcsIHpoVGFibGVGbiA9IHpoVGFibGUuYXV0bylcbntcblx0cmV0dXJuIHNlYXJjaC5yZXBsYWNlKF9yZV9jamtfY29udigndWcnKSwgZnVuY3Rpb24gKGNoYXIpXG5cdHtcblx0XHRpZiAoc2tpcCAmJiBza2lwLmluZGV4T2YoY2hhcikgIT0gLTEpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIGNoYXI7XG5cdFx0fVxuXG5cdFx0bGV0IGEgPSB6aFRhYmxlRm4oY2hhcik7XG5cblx0XHRyZXR1cm4gYS5qb2luKCcnKTtcblx0fSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHMgYXMgdHlwZW9mIGltcG9ydCgnLi9jb252Jyk7XG4iXX0=