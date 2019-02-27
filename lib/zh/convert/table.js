"use strict";
/**
 * Created by user on 2018/8/30/030.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _table_cn2tw = require("chinese_convert/cn2tw");
const _table_tw2cn = require("chinese_convert/tw2cn");
const wikipedia_1 = require("./wikipedia");
exports.table_cn2tw = Object.assign(_table_cn2tw, wikipedia_1.wiki_s2t_v2);
exports.table_tw2cn = Object.assign(_table_tw2cn, wikipedia_1.wiki_t2s_v2);
if (1) {
    /**
     * 以下用來 reset 排序用
     */
    [
        // 從轉換表中刪除的字
        '像',
        '象',
        '剷',
        '鏟',
        '铲',
        '刬',
        '剗',
    ].forEach(function (v) {
        delete exports.table_tw2cn[v];
        delete exports.table_cn2tw[v];
    });
    [
    // 從 簡體轉換表內刪除的字
    ].forEach(function (v) {
        delete exports.table_cn2tw[v];
    });
    [
    // 從繁體轉換表內刪除的字
    ].forEach(function (v) {
        delete exports.table_tw2cn[v];
    });
}
exports.table_cn2tw = Object.assign(exports.table_cn2tw, {
    '恶': '惡',
    '苏': '蘇',
    '壳': '殻',
    '馆': '館',
    '里': '裡',
    '后': '後',
    '当': '當',
    '锺': '鍾',
    '钟': '鐘',
    '凃': '塗',
    '涂': '涂',
    '㑩': '儸',
    '罗': '羅',
    '啰': '囉',
    '国': '國',
    '验': '驗',
    '准': '準',
    //'历': '曆',
    '历': '歷',
    '刹': '剎',
    '讬': '託',
    '纤': '纖',
    '𫔀': '鍊',
    '炼': '煉',
    '恒': '恆',
    '畲': '畲',
    '复': '復',
    '钜': '鉅',
    '谑': '謔',
    '谘': '諮',
    '干': '幹',
    '线': '線',
    '缐': '線',
    '尽': '盡',
    '处': '處',
    '面': '麵',
    '舍': '捨',
    '松': '鬆',
    '𫔮': '閒',
    //'象': '象',
    '啮': '齧',
    '赃': '贓',
    '咤': '吒',
    '痳': '痲',
    //'荡': '盪',
    '荡': '蕩',
    '墙': '牆',
    '占': '佔',
});
exports.table_tw2cn = Object.assign(exports.table_tw2cn, {
    '殻': '壳',
    '殼': '壳',
    '館': '馆',
    '後': '后',
    '儅': '儅',
    '噹': '当',
    '鍾': '锺',
    '鐘': '钟',
    '㑹': '会',
    '塗': '凃',
    '涂': '涂',
    '儸': '㑩',
    '羅': '罗',
    '囉': '啰',
    '國': '国',
    '剎': '刹',
    '託': '讬',
    '鍊': '炼',
    '錬': '炼',
    '煉': '炼',
    '壞': '坏',
    '壊': '坏',
    '佘': '佘',
    '畲': '畲',
    '丑': '丑',
    '么': '么',
    '几': '几',
    '后': '后',
    '斗': '斗',
    '艸': '艸',
    '干': '干',
    '虫': '虫',
    '岳': '岳',
    '卜': '卜',
    '于': '于',
    '里': '里',
    '鉅': '钜',
    '禦': '御',
    '謔': '谑',
    '餘': '馀',
    '范': '范',
    '朴': '朴',
    '咨': '咨',
    '諮': '谘',
    '齣': '齣',
    '線': '线',
    '綫': '线',
    '儘': '尽',
    '盡': '尽',
    '划': '划',
    '凈': '净',
    '杰': '杰',
    '余': '余',
    '面': '面',
    '舍': '舍',
    '松': '松',
    //'像': '象',
    //'象': '象',
    '云': '云',
    '嚙': '啮',
    '齧': '啮',
    '咸': '咸',
    '吒': '吒',
    '折': '折',
    '同': '同',
    '胡': '胡',
    '症': '症',
    '郁': '郁',
    '采': '采',
    '栖': '栖',
    '踪': '踪',
    '昵': '昵',
    '厘': '厘',
    '痲': '痳',
    '痳': '痳',
    '怜': '怜',
    '蕩': '荡',
    '盪': '荡',
    '悽': '悽',
    '牆': '墙',
    '墻': '墙',
    '佔': '占',
    '占': '占',
});
[
    // 從轉換表中刪除的字
    //'処',
    //'佘',
    '畲',
    '氹',
    '凼',
    '靣',
    '彪',
    '尨',
    '狵',
].forEach(function (v) {
    delete exports.table_tw2cn[v];
    delete exports.table_cn2tw[v];
});
[
    // 從 簡體轉換表內刪除的字
    '鉅',
].forEach(function (v) {
    delete exports.table_cn2tw[v];
});
[
    // 從繁體轉換表內刪除的字
    '钜',
    // 加入 wikipedia.ts 後 產生的冷門字
    '党',
    '万',
    '与',
].forEach(function (v) {
    delete exports.table_tw2cn[v];
});
Object
    .entries({
    '餵': '𫗭',
    '餧': '𫗪',
    '淨': '净',
    '處': '处',
    '憂': '忧',
    '優': '优',
    '煙': '烟',
    '綫': '线',
    '線': '缐',
    '貳': '贰',
    // 以防萬一 因為 opencc 選用的字是 新字體 的 気
    '氣': '气',
    '咸': '鹹',
    '剗': '刬',
    '鏟': '铲',
    '盤': '盘',
    '採': '采',
    '棲': '栖',
    '暱': '昵',
    '繨': '𫄤',
})
    .forEach(function (v) {
    let [t, s] = v;
    exports.table_tw2cn[t] = s;
    exports.table_cn2tw[s] = t;
});
[
    // 不轉換的共用字
    '札',
    '谷',
    '污',
    '汙',
    '游',
    '遊',
    '伙',
    '夥',
    '御',
    '郁',
    '咔',
    '哢',
    '凌',
    '淩',
    '扎',
    '紮',
    '痴',
    '癡',
    //'咸',
    //'准',
    //'棲',
    //'栖',
    '嚯',
    //'余',
    '薑',
    '姜',
    '扡',
    '扦',
    '捻',
    '撚',
    '遝',
    '沓',
    //'淨',
    '栗',
    '挽',
    '灶',
    '竈',
    '霉',
    '黴',
    '欲',
    '慾',
    '征',
    '讚',
    '菸',
    '拾',
    '十',
    '証',
    '捲',
    '卷',
    '燻',
    '熏',
    '吁',
    '籲',
    '龥',
    '蹠',
    '跖',
    '矽',
    '硅',
    '脩',
    '修',
    '犟',
    '剷',
    '噼',
    '劈',
    '擗',
    '核',
    '覈',
    '憷',
    '呼',
    '唿',
    '嗬',
    '呵',
    '脣',
    '唇',
    '唇',
    '升',
    '昇',
    '磐',
    '溪',
    '渓',
    '谿',
    '嵠',
    '祐',
    '佑',
    '媮',
    '偷',
    '瓮',
    '罋',
    '甕',
    '闇',
    '暗',
    '佈',
    '布',
    '痺',
    '痹',
    '雇',
    '僱',
    '秘',
    '祕',
].forEach(function (v) {
    exports.table_tw2cn[v] = v;
    exports.table_cn2tw[v] = v;
});
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsc0RBQXNEO0FBQ3RELHNEQUFzRDtBQUd0RCwyQ0FBdUQ7QUFFNUMsUUFBQSxXQUFXLEdBQVcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsdUJBQVcsQ0FBQyxDQUFDO0FBRS9ELFFBQUEsV0FBVyxHQUFXLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLHVCQUFXLENBQUMsQ0FBQztBQUUxRSxJQUFJLENBQUMsRUFDTDtJQUNDOztPQUVHO0lBRUg7UUFDQyxZQUFZO1FBQ1osR0FBRztRQUNILEdBQUc7UUFFSCxHQUFHO1FBQ0gsR0FBRztRQUNILEdBQUc7UUFDSCxHQUFHO1FBQ0gsR0FBRztLQUNILENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUVwQixPQUFPLG1CQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsT0FBTyxtQkFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBRUg7SUFDQyxlQUFlO0tBQ2YsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBRXBCLE9BQU8sbUJBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztJQUVIO0lBQ0MsY0FBYztLQUNkLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUVwQixPQUFPLG1CQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7Q0FDSDtBQUVELG1CQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxtQkFBVyxFQUFFO0lBQ3hDLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFFUixXQUFXO0lBQ1gsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFFUixJQUFJLEVBQUUsR0FBRztJQUNULEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUVSLElBQUksRUFBRSxHQUFHO0lBRVQsV0FBVztJQUVYLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBRVIsV0FBVztJQUNYLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztDQUVSLENBQUMsQ0FBQztBQUVILG1CQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxtQkFBVyxFQUFFO0lBQ3hDLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUlSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFFUixXQUFXO0lBQ1gsV0FBVztJQUVYLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0NBRVIsQ0FBQyxDQUFDO0FBRUg7SUFDQyxZQUFZO0lBQ1osTUFBTTtJQUNOLE1BQU07SUFDTixHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBRUgsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0NBQ0gsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBRXBCLE9BQU8sbUJBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QixPQUFPLG1CQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFFSDtJQUNDLGVBQWU7SUFDZixHQUFHO0NBQ0gsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBRXBCLE9BQU8sbUJBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQztBQUVIO0lBQ0MsY0FBYztJQUNkLEdBQUc7SUFDSCwyQkFBMkI7SUFDM0IsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0NBQ0gsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBRXBCLE9BQU8sbUJBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU07S0FDSixPQUFPLENBQUM7SUFDUixHQUFHLEVBQUUsSUFBSTtJQUNULEdBQUcsRUFBRSxJQUFJO0lBRVQsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUVSLCtCQUErQjtJQUMvQixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLEdBQUc7SUFFUixHQUFHLEVBQUUsR0FBRztJQUVSLEdBQUcsRUFBRSxHQUFHO0lBRVIsR0FBRyxFQUFFLElBQUk7Q0FDVCxDQUFDO0tBQ0QsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUVuQixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLG1CQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLG1CQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUNGO0FBRUQ7SUFDQyxVQUFVO0lBQ1YsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLEdBQUc7SUFDSCxNQUFNO0lBQ04sR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxNQUFNO0lBQ04sR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFFSCxHQUFHO0lBQ0gsR0FBRztJQUVILEdBQUc7SUFDSCxHQUFHO0NBRUgsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBRXBCLG1CQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLG1CQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsT0FBbUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTgvOC8zMC8wMzAuXG4gKi9cblxuaW1wb3J0ICogYXMgX3RhYmxlX2NuMnR3IGZyb20gJ2NoaW5lc2VfY29udmVydC9jbjJ0dyc7XG5pbXBvcnQgKiBhcyBfdGFibGVfdHcyY24gZnJvbSAnY2hpbmVzZV9jb252ZXJ0L3R3MmNuJztcblxuaW1wb3J0IHsgSVRhYmxlIH0gZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7IHdpa2lfczJ0X3YyLCB3aWtpX3Qyc192MiB9IGZyb20gJy4vd2lraXBlZGlhJztcblxuZXhwb3J0IGxldCB0YWJsZV9jbjJ0dzogSVRhYmxlID0gT2JqZWN0LmFzc2lnbihfdGFibGVfY24ydHcsIHdpa2lfczJ0X3YyKTtcblxuZXhwb3J0IGxldCB0YWJsZV90dzJjbjogSVRhYmxlID0gT2JqZWN0LmFzc2lnbihfdGFibGVfdHcyY24sIHdpa2lfdDJzX3YyKTtcblxuaWYgKDEpXG57XG5cdC8qKlxuXHQgKiDku6XkuIvnlKjkvoYgcmVzZXQg5o6S5bqP55SoXG5cdCAqL1xuXG5cdFtcblx0XHQvLyDlvp7ovYnmj5vooajkuK3liKrpmaTnmoTlrZdcblx0XHQn5YOPJyxcblx0XHQn6LGhJyxcblxuXHRcdCflibcnLFxuXHRcdCfpj58nLFxuXHRcdCfpk7InLFxuXHRcdCfliKwnLFxuXHRcdCfliZcnLFxuXHRdLmZvckVhY2goZnVuY3Rpb24gKHYpXG5cdHtcblx0XHRkZWxldGUgdGFibGVfdHcyY25bdl07XG5cdFx0ZGVsZXRlIHRhYmxlX2NuMnR3W3ZdO1xuXHR9KTtcblxuXHRbXG5cdFx0Ly8g5b6eIOewoemrlOi9ieaPm+ihqOWFp+WIqumZpOeahOWtl1xuXHRdLmZvckVhY2goZnVuY3Rpb24gKHYpXG5cdHtcblx0XHRkZWxldGUgdGFibGVfY24ydHdbdl07XG5cdH0pO1xuXG5cdFtcblx0XHQvLyDlvp7nuYHpq5TovYnmj5vooajlhafliKrpmaTnmoTlrZdcblx0XS5mb3JFYWNoKGZ1bmN0aW9uICh2KVxuXHR7XG5cdFx0ZGVsZXRlIHRhYmxlX3R3MmNuW3ZdO1xuXHR9KTtcbn1cblxudGFibGVfY24ydHcgPSBPYmplY3QuYXNzaWduKHRhYmxlX2NuMnR3LCB7XG5cdCfmgbYnOiAn5oOhJyxcblx0J+iLjyc6ICfomIcnLFxuXHQn5aOzJzogJ+auuycsXG5cdCfppoYnOiAn6aSoJyxcblx0J+mHjCc6ICfoo6EnLFxuXHQn5ZCOJzogJ+W+jCcsXG5cdCflvZMnOiAn55W2Jyxcblx0J+mUuic6ICfpjb4nLFxuXHQn6ZKfJzogJ+mQmCcsXG5cdCflh4MnOiAn5aGXJyxcblx0J+a2gic6ICfmtoInLFxuXHQn45GpJzogJ+WEuCcsXG5cdCfnvZcnOiAn576FJyxcblx0J+WVsCc6ICflm4knLFxuXHQn5Zu9JzogJ+WciycsXG5cdCfpqownOiAn6amXJyxcblx0J+WHhic6ICfmupYnLFxuXG5cdC8vJ+WOhic6ICfmm4YnLFxuXHQn5Y6GJzogJ+attycsXG5cblx0J+WIuSc6ICfliY4nLFxuXHQn6K6sJzogJ+iolycsXG5cblx0J+e6pCc6ICfnupYnLFxuXG5cdCfwq5SAJzogJ+mNiicsXG5cdCfngrwnOiAn54WJJyxcblxuXHQn5oGSJzogJ+aBhicsXG5cblx0J+eVsic6ICfnlbInLFxuXG5cdCflpI0nOiAn5b6pJyxcblxuXHQn6ZKcJzogJ+mJhScsXG5cblx0J+iwkSc6ICforJQnLFxuXHQn6LCYJzogJ+irricsXG5cblx0J+W5sic6ICflubknLFxuXG5cdCfnur8nOiAn57eaJyxcblx0J+e8kCc6ICfnt5onLFxuXG5cdCflsL0nOiAn55uhJyxcblxuXHQn5aSEJzogJ+iZlScsXG5cblx0J+mdoic6ICfpurUnLFxuXG5cdCfoiI0nOiAn5o2oJyxcblxuXHQn5p2+JzogJ+mshicsXG5cblx0J/CrlK4nOiAn6ZaSJyxcblxuXHQvLyfosaEnOiAn6LGhJyxcblxuXHQn5ZWuJzogJ+m9pycsXG5cblx0J+i1gyc6ICfotJMnLFxuXG5cdCflkqQnOiAn5ZCSJyxcblxuXHQn55ezJzogJ+eXsicsXG5cblx0Ly8n6I2hJzogJ+ebqicsXG5cdCfojaEnOiAn6JWpJyxcblxuXHQn5aKZJzogJ+eJhicsXG5cblx0J+WNoCc6ICfkvZQnLFxuXG59KTtcblxudGFibGVfdHcyY24gPSBPYmplY3QuYXNzaWduKHRhYmxlX3R3MmNuLCB7XG5cdCfmrrsnOiAn5aOzJyxcblx0J+auvCc6ICflo7MnLFxuXHQn6aSoJzogJ+mmhicsXG5cdCflvownOiAn5ZCOJyxcblx0J+WEhSc6ICflhIUnLFxuXHQn5Zm5JzogJ+W9kycsXG5cdCfpjb4nOiAn6ZS6Jyxcblx0J+mQmCc6ICfpkp8nLFxuXHQn45G5JzogJ+S8micsXG5cdCfloZcnOiAn5YeDJyxcblx0J+a2gic6ICfmtoInLFxuXHQn5YS4JzogJ+ORqScsXG5cdCfnvoUnOiAn572XJyxcblx0J+WbiSc6ICfllbAnLFxuXHQn5ZyLJzogJ+WbvScsXG5cblx0J+WJjic6ICfliLknLFxuXHQn6KiXJzogJ+iurCcsXG5cblx0J+mNiic6ICfngrwnLFxuXHQn6YysJzogJ+eCvCcsXG5cdCfnhYknOiAn54K8JyxcblxuXHQn5aOeJzogJ+WdjycsXG5cdCflo4onOiAn5Z2PJyxcblxuXHQn5L2YJzogJ+S9mCcsXG5cdCfnlbInOiAn55WyJyxcblxuXG5cblx0J+S4kSc6ICfkuJEnLFxuXHQn5LmIJzogJ+S5iCcsXG5cdCflh6AnOiAn5YegJyxcblx0J+WQjic6ICflkI4nLFxuXHQn5paXJzogJ+aWlycsXG5cdCfoibgnOiAn6Im4Jyxcblx0J+W5sic6ICflubInLFxuXHQn6JmrJzogJ+iZqycsXG5cdCflsrMnOiAn5bKzJyxcblx0J+WNnCc6ICfljZwnLFxuXHQn5LqOJzogJ+S6jicsXG5cdCfph4wnOiAn6YeMJyxcblxuXHQn6YmFJzogJ+mSnCcsXG5cblx0J+empic6ICflvqEnLFxuXG5cdCforJQnOiAn6LCRJyxcblxuXHQn6aSYJzogJ+mmgCcsXG5cblx0J+iMgyc6ICfojIMnLFxuXHQn5py0JzogJ+actCcsXG5cdCflkqgnOiAn5ZKoJyxcblx0J+irric6ICfosJgnLFxuXG5cdCfpvaMnOiAn6b2jJyxcblxuXHQn57eaJzogJ+e6vycsXG5cdCfntqsnOiAn57q/JyxcblxuXHQn5YSYJzogJ+WwvScsXG5cdCfnm6EnOiAn5bC9JyxcblxuXHQn5YiSJzogJ+WIkicsXG5cblx0J+WHiCc6ICflh4AnLFxuXG5cdCfmnbAnOiAn5p2wJyxcblxuXHQn5L2ZJzogJ+S9mScsXG5cdCfpnaInOiAn6Z2iJyxcblxuXHQn6IiNJzogJ+iIjScsXG5cblx0J+advic6ICfmnb4nLFxuXG5cdC8vJ+WDjyc6ICfosaEnLFxuXHQvLyfosaEnOiAn6LGhJyxcblxuXHQn5LqRJzogJ+S6kScsXG5cblx0J+WamSc6ICflla4nLFxuXHQn6b2nJzogJ+WVricsXG5cblx0J+WSuCc6ICflkrgnLFxuXG5cdCflkJInOiAn5ZCSJyxcblxuXHQn5oqYJzogJ+aKmCcsXG5cblx0J+WQjCc6ICflkIwnLFxuXHQn6IOhJzogJ+iDoScsXG5cblx0J+eXhyc6ICfnl4cnLFxuXG5cdCfpg4EnOiAn6YOBJyxcblxuXHQn6YeHJzogJ+mHhycsXG5cdCfmoJYnOiAn5qCWJyxcblxuXHQn6LiqJzogJ+i4qicsXG5cblx0J+aYtSc6ICfmmLUnLFxuXG5cdCfljpgnOiAn5Y6YJyxcblxuXHQn55eyJzogJ+eXsycsXG5cdCfnl7MnOiAn55ezJyxcblxuXHQn5oCcJzogJ+aAnCcsXG5cblx0J+iVqSc6ICfojaEnLFxuXHQn55uqJzogJ+iNoScsXG5cblx0J+aCvSc6ICfmgr0nLFxuXG5cdCfniYYnOiAn5aKZJyxcblx0J+Wiuyc6ICflopknLFxuXG5cdCfkvZQnOiAn5Y2gJyxcblx0J+WNoCc6ICfljaAnLFxuXG59KTtcblxuW1xuXHQvLyDlvp7ovYnmj5vooajkuK3liKrpmaTnmoTlrZdcblx0Ly8n5YemJyxcblx0Ly8n5L2YJyxcblx0J+eVsicsXG5cdCfmsLknLFxuXHQn5Ye8Jyxcblx0J+mdoycsXG5cblx0J+W9qicsXG5cdCflsKgnLFxuXHQn54u1Jyxcbl0uZm9yRWFjaChmdW5jdGlvbiAodilcbntcblx0ZGVsZXRlIHRhYmxlX3R3MmNuW3ZdO1xuXHRkZWxldGUgdGFibGVfY24ydHdbdl07XG59KTtcblxuW1xuXHQvLyDlvp4g57Ch6auU6L2J5o+b6KGo5YWn5Yiq6Zmk55qE5a2XXG5cdCfpiYUnLFxuXS5mb3JFYWNoKGZ1bmN0aW9uICh2KVxue1xuXHRkZWxldGUgdGFibGVfY24ydHdbdl07XG59KTtcblxuW1xuXHQvLyDlvp7nuYHpq5TovYnmj5vooajlhafliKrpmaTnmoTlrZdcblx0J+mSnCcsXG5cdC8vIOWKoOWFpSB3aWtpcGVkaWEudHMg5b6MIOeUoueUn+eahOWGt+mWgOWtl1xuXHQn5YWaJyxcblx0J+S4hycsXG5cdCfkuI4nLFxuXS5mb3JFYWNoKGZ1bmN0aW9uICh2KVxue1xuXHRkZWxldGUgdGFibGVfdHcyY25bdl07XG59KTtcblxuT2JqZWN0XG5cdC5lbnRyaWVzKHtcblx0XHQn6aS1JzogJ/Crl60nLFxuXHRcdCfppKcnOiAn8KuXqicsXG5cblx0XHQn5reoJzogJ+WHgCcsXG5cblx0XHQn6JmVJzogJ+WkhCcsXG5cblx0XHQn5oaCJzogJ+W/pycsXG5cdFx0J+WEqic6ICfkvJgnLFxuXG5cdFx0J+eFmSc6ICfng58nLFxuXG5cdFx0J+e2qyc6ICfnur8nLFxuXHRcdCfnt5onOiAn57yQJyxcblxuXHRcdCfosrMnOiAn6LSwJyxcblxuXHRcdC8vIOS7pemYsuiQrOS4gCDlm6Dngrogb3BlbmNjIOmBuOeUqOeahOWtl+aYryDmlrDlrZfpq5Qg55qEIOawl1xuXHRcdCfmsKMnOiAn5rCUJyxcblxuXHRcdCflkrgnOiAn6bm5JyxcblxuXHRcdCfliZcnOiAn5YisJyxcblx0XHQn6Y+fJzogJ+mTsicsXG5cblx0XHQn55ukJzogJ+ebmCcsXG5cblx0XHQn5o6hJzogJ+mHhycsXG5cblx0XHQn5qOyJzogJ+aglicsXG5cblx0XHQn5pqxJzogJ+aYtScsXG5cblx0XHQn57moJzogJ/CrhKQnLFxuXHR9KVxuXHQuZm9yRWFjaChmdW5jdGlvbiAodilcblx0e1xuXHRcdGxldCBbdCwgc10gPSB2O1xuXG5cdFx0dGFibGVfdHcyY25bdF0gPSBzO1xuXHRcdHRhYmxlX2NuMnR3W3NdID0gdDtcblx0fSlcbjtcblxuW1xuXHQvLyDkuI3ovYnmj5vnmoTlhbHnlKjlrZdcblx0J+acrScsXG5cdCfosLcnLFxuXHQn5rGhJyxcblx0J+axmScsXG5cdCfmuLgnLFxuXHQn6YGKJyxcblx0J+S8mScsXG5cdCflpKUnLFxuXHQn5b6hJyxcblx0J+mDgScsXG5cdCflkpQnLFxuXHQn5ZOiJyxcblx0J+WHjCcsXG5cdCfmt6knLFxuXHQn5omOJyxcblx0J+e0ricsXG5cdCfnl7QnLFxuXHQn55mhJyxcblx0Ly8n5ZK4Jyxcblx0Ly8n5YeGJyxcblx0Ly8n5qOyJyxcblx0Ly8n5qCWJyxcblx0J+WarycsXG5cdC8vJ+S9mScsXG5cdCfolpEnLFxuXHQn5aecJyxcblx0J+aJoScsXG5cdCfmiaYnLFxuXHQn5o27Jyxcblx0J+aSmicsXG5cdCfpgZ0nLFxuXHQn5rKTJyxcblx0Ly8n5reoJyxcblx0J+aglycsXG5cdCfmjL0nLFxuXHQn54G2Jyxcblx0J+eriCcsXG5cdCfpnIknLFxuXHQn6bu0Jyxcblx0J+assicsXG5cdCfmhb4nLFxuXHQn5b6BJyxcblx0J+iumicsXG5cdCfoj7gnLFxuXHQn5ou+Jyxcblx0J+WNgScsXG5cdCfoqLwnLFxuXHQn5o2yJyxcblx0J+WNtycsXG5cdCfnh7snLFxuXHQn54aPJyxcblx0J+WQgScsXG5cdCfnsbInLFxuXHQn6b6lJyxcblx0J+i5oCcsXG5cdCfot5YnLFxuXHQn55+9Jyxcblx0J+ehhScsXG5cdCfohKknLFxuXHQn5L+uJyxcblx0J+eKnycsXG5cdCflibcnLFxuXHQn5Zm8Jyxcblx0J+WKiCcsXG5cdCfmk5cnLFxuXHQn5qC4Jyxcblx0J+imiCcsXG5cdCfmhrcnLFxuXHQn5ZG8Jyxcblx0J+WUvycsXG5cdCfll6wnLFxuXHQn5ZG1Jyxcblx0J+iEoycsXG5cdCfllIcnLFxuXHQn5ZSHJyxcblx0J+WNhycsXG5cdCfmmIcnLFxuXHQn56OQJyxcblx0J+a6qicsXG5cdCfmuJMnLFxuXHQn6LC/Jyxcblx0J+W1oCcsXG5cdCfnpZAnLFxuXHQn5L2RJyxcblx0J+WqricsXG5cdCflgbcnLFxuXHQn55OuJyxcblx0J+e9iycsXG5cdCfnlJUnLFxuXHQn6ZeHJyxcblx0J+aalycsXG5cdCfkvYgnLFxuXHQn5biDJyxcblx0J+eXuicsXG5cdCfnl7knLFxuXG5cdCfpm4cnLFxuXHQn5YOxJyxcblxuXHQn56eYJyxcblx0J+ellScsXG5cbl0uZm9yRWFjaChmdW5jdGlvbiAodilcbntcblx0dGFibGVfdHcyY25bdl0gPSB2O1xuXHR0YWJsZV9jbjJ0d1t2XSA9IHY7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0cyBhcyB0eXBlb2YgaW1wb3J0KCcuL3RhYmxlJyk7XG4iXX0=