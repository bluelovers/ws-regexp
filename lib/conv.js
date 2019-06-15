"use strict";
/**
 * Created by user on 2018/5/5/005.
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUdILHVEQUFrRTtBQUNsRSxpQ0FBc0M7QUFJdEMseUNBQXlDO0FBRXpDLFNBQWdCLHNCQUFzQixDQUFDLENBQVMsRUFBRSxVQUEyQixFQUFFO0lBRzlFLElBQUksSUFBSSxJQUFLLE9BQU8sQ0FBQyxXQUF1QixHQUFHLENBQUMsRUFDaEQ7UUFDQyxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztLQUNyQjtJQUVELE9BQU8sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUM7SUFFbEQsT0FBTyxZQUFXLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQy9CLENBQUM7QUFYRCx3REFXQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxNQUFjLEVBQUUsSUFBYSxFQUFFLFNBQVMsR0FBRyxZQUFXLEVBQUUsVUFBMEIsRUFBRTtJQUVqSCxJQUFJLElBQXFCLENBQUM7SUFFMUIsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLElBQUksRUFDMUI7UUFDQyxJQUFJLEdBQUc7WUFDTixhQUFhO1lBQ2IsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ2hDLElBQUksRUFBRSxLQUFLO1NBQ1gsQ0FBQTtLQUNEO0lBRUQsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxJQUFJO1FBRXZELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ3BDO1lBQ0MsT0FBTyxJQUFJLENBQUM7U0FDWjtRQUVELElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFOUIsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBeEJELHNDQXdCQztBQUVELFNBQWdCLGNBQWMsQ0FBQyxNQUFjLEVBQUUsSUFBYSxFQUFFLFNBQVMsR0FBRyxZQUFXLEVBQUUsVUFBMEIsRUFBRTtJQUVsSCxJQUFJLElBQXFCLENBQUM7SUFFMUIsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLElBQUksRUFDMUI7UUFDQyxJQUFJLEdBQUc7WUFDTixhQUFhO1lBQ2IsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ2hDLElBQUksRUFBRSxLQUFLO1NBQ1gsQ0FBQTtLQUNEO0lBRUQsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxJQUFJO1FBRXZELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ3BDO1lBQ0MsT0FBTyxJQUFJLENBQUM7U0FDWjtRQUVELElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFOUIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQXhCRCx3Q0F3QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE4LzUvNS8wMDUuXG4gKi9cblxuaW1wb3J0IHsgSU9wdGlvbnMgfSBmcm9tICdjamstY29udi9saWIvemgvdGFibGUvaW5kZXgnO1xuaW1wb3J0IHsgYXV0byBhcyB6aFRhYmxlQXV0byB9IGZyb20gJ2Nqay1jb252L2xpYi96aC90YWJsZS9pbmRleCc7XG5pbXBvcnQgeyBfcmVfY2prX2NvbnYgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgSU9wdGlvbnMgYXMgSU9wdGlvbnNSZWdFeHAgfSBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHsgSU9wdGlvbnMgYXMgSU9wdGlvbnNaaFRhYmxlIH0gZnJvbSAnY2prLWNvbnYvbGliL3poL3RhYmxlL2luZGV4JztcblxuLy9jb25zb2xlLmxvZyhjamtDb252LnpoVGFibGUuYXV0bygn6a2vJykpO1xuXG5leHBvcnQgZnVuY3Rpb24gemhUYWJsZUF1dG9HcmVlZHlUYWJsZShzOiBzdHJpbmcsIG9wdGlvbnM6IElPcHRpb25zWmhUYWJsZSA9IHt9KVxue1xuXG5cdGlmICh0cnVlIHx8IChvcHRpb25zLmdyZWVkeVRhYmxlIGFzIGFueSB8IDApID4gMSlcblx0e1xuXHRcdG9wdGlvbnMuc2FmZSA9IGZhbHNlO1xuXHR9XG5cblx0b3B0aW9ucy5ncmVlZHlUYWJsZSA9IG9wdGlvbnMuZ3JlZWR5VGFibGUgfHwgdHJ1ZTtcblxuXHRyZXR1cm4gemhUYWJsZUF1dG8ocywgb3B0aW9ucylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF93b3JkX3poX2NvcmUoc2VhcmNoOiBzdHJpbmcsIHNraXA/OiBzdHJpbmcsIHpoVGFibGVGbiA9IHpoVGFibGVBdXRvLCBvcHRpb25zOiBJT3B0aW9uc1JlZ0V4cCA9IHt9KVxue1xuXHRsZXQgb3B0czogSU9wdGlvbnNaaFRhYmxlO1xuXG5cdGlmIChvcHRpb25zLnVuc2FmZSB8fCB0cnVlKVxuXHR7XG5cdFx0b3B0cyA9IHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGdyZWVkeVRhYmxlOiBvcHRpb25zLmdyZWVkeVRhYmxlLFxuXHRcdFx0c2FmZTogZmFsc2UsXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHNlYXJjaC5yZXBsYWNlKF9yZV9jamtfY29udigndWcnKSwgZnVuY3Rpb24gKGNoYXIpXG5cdHtcblx0XHRpZiAoc2tpcCAmJiBza2lwLmluZGV4T2YoY2hhcikgIT0gLTEpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIGNoYXI7XG5cdFx0fVxuXG5cdFx0bGV0IGEgPSB6aFRhYmxlRm4oY2hhciwgb3B0cyk7XG5cblx0XHRyZXR1cm4gYS5sZW5ndGggPiAxID8gJ1snICsgYS5qb2luKCcnKSArICddJyA6IGFbMF07XG5cdH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX3dvcmRfemhfY29yZTIoc2VhcmNoOiBzdHJpbmcsIHNraXA/OiBzdHJpbmcsIHpoVGFibGVGbiA9IHpoVGFibGVBdXRvLCBvcHRpb25zOiBJT3B0aW9uc1JlZ0V4cCA9IHt9KVxue1xuXHRsZXQgb3B0czogSU9wdGlvbnNaaFRhYmxlO1xuXG5cdGlmIChvcHRpb25zLnVuc2FmZSB8fCB0cnVlKVxuXHR7XG5cdFx0b3B0cyA9IHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGdyZWVkeVRhYmxlOiBvcHRpb25zLmdyZWVkeVRhYmxlLFxuXHRcdFx0c2FmZTogZmFsc2UsXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHNlYXJjaC5yZXBsYWNlKF9yZV9jamtfY29udigndWcnKSwgZnVuY3Rpb24gKGNoYXIpXG5cdHtcblx0XHRpZiAoc2tpcCAmJiBza2lwLmluZGV4T2YoY2hhcikgIT0gLTEpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIGNoYXI7XG5cdFx0fVxuXG5cdFx0bGV0IGEgPSB6aFRhYmxlRm4oY2hhciwgb3B0cyk7XG5cblx0XHRyZXR1cm4gYS5qb2luKCcnKTtcblx0fSk7XG59XG4iXX0=