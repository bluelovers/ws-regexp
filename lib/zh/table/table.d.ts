/**
 * Created by user on 2018/2/17/017.
 */
import { IOptions } from '../convert/core';
export declare let _table_tw: {
    readonly 罗: "羅";
    readonly 恶: "惡";
    readonly 苏: "蘇";
    readonly 馆: "館";
};
/**
 * 此表內符合以下任意值時會觸發
 */
export declare const table_plus: Record<"絲" | "丝" | "氷" | "館" | "馆" | "鶏" | "雞" | "鸡" | "殻" | "壳" | "槍" | "枪" | "髪" | "髮" | "罵" | "骂" | "駄" | "馱" | "驮" | "歴" | "歷" | "暦" | "曆" | "錬" | "鍊" | "炼" | "蓋" | "盖" | "晩" | "晚" | "恒" | "恆" | "準" | "傑" | "杰" | "圏" | "圈" | "煙" | "烟" | "苏" | "並" | "并" | "鹹" | "咸" | "踪" | "蹤" | "秘" | "祕" | "黙" | "默" | "圧" | "壓" | "压" | "凄" | "淒" | "悽" | "穀" | "鶫" | "鶇" | "鸫" | "効" | "效" | "揷" | "插" | "賎" | "箋" | "笺" | "絶" | "絕" | "绝" | "蘇" | "卷" | "弐" | "貳" | "贰" | "隷" | "隸" | "隶" | "挿" | "凶" | "兇" | "糸" | "余" | "餘" | "尨" | "券" | "為" | "为" | "偽" | "鳥" | "鸟" | "尋" | "寻" | "復" | "复" | "殼" | "視" | "视" | "証" | "證" | "证" | "閑" | "閒" | "闲" | "塗" | "涂" | "痴" | "話" | "话" | "裏" | "裡" | "里" | "禍" | "祸" | "網" | "网" | "阁" | "憂" | "盤" | "盘" | "範" | "范" | "線" | "线" | "衛" | "卫" | "衝" | "冲" | "複" | "諸" | "诸" | "樸" | "朴" | "諮" | "谘" | "獲" | "获" | "鍾" | "钟" | "鍛" | "锻" | "穫" | "鑑" | "鉴" | "両" | "兩" | "两" | "亀" | "龜" | "龟" | "亜" | "会" | "會" | "倶" | "俱" | "内" | "內" | "処" | "處" | "处" | "剣" | "劍" | "剑" | "労" | "勞" | "劳" | "勲" | "勳" | "勋" | "単" | "單" | "单" | "参" | "參" | "収" | "收" | "啓" | "啟" | "启" | "営" | "団" | "團" | "团" | "国" | "國" | "壊" | "壞" | "坏" | "姉" | "姐" | "姫" | "姬" | "娯" | "嬢" | "孃" | "実" | "實" | "实" | "対" | "對" | "对" | "尽" | "盡" | "帯" | "廃" | "廢" | "废" | "徴" | "徵" | "悪" | "懐" | "戦" | "戰" | "战" | "拠" | "據" | "据" | "拡" | "撃" | "擊" | "击" | "暁" | "曉" | "晓" | "査" | "桜" | "櫻" | "樱" | "楽" | "樂" | "乐" | "権" | "權" | "权" | "歓" | "歡" | "欢" | "歳" | "歲" | "岁" | "気" | "氣" | "气" | "浜" | "濱" | "滨" | "涙" | "淚" | "泪" | "済" | "濟" | "济" | "渓" | "溪" | "焔" | "焰" | "焼" | "犠" | "犧" | "牺" | "産" | "穂" | "穗" | "経" | "經" | "经" | "絵" | "継" | "繼" | "继" | "緑" | "綠" | "绿" | "繊" | "纖" | "纤" | "聴" | "舗" | "舖" | "铺" | "蔵" | "薬" | "藥" | "药" | "覇" | "霸" | "覧" | "観" | "觀" | "观" | "賛" | "贊" | "赞" | "辺" | "邊" | "边" | "郷" | "鄉" | "乡" | "釈" | "鉄" | "鐵" | "铁" | "銭" | "鋭" | "锐" | "録" | "錄" | "录" | "閲" | "闘" | "鬥" | "険" | "險" | "险" | "雑" | "霊" | "靈" | "灵" | "顔" | "顏" | "颜" | "験" | "驗" | "验" | "鬪" | "鷄" | "黒" | "黑" | "餵" | "布" | "佈" | "繫" | "梁" | "樑" | "沖" | "茲" | "凈" | "剗" | "勛" | "廄" | "敘" | "噸" | "吒" | "啞" | "嚙" | "壺" | "爾" | "嘗" | "嶮" | "輓" | "棲" | "慄" | "竈" | "煉" | "鹼" | "蕩" | "薩" | "託" | "跡" | "鑒" | "鏟" | "鋪" | "麼" | "亘" | "伙" | "馀" | "家" | "净" | "刬" | "咤" | "哑" | "尝" | "吨" | "啮" | "向" | "墙" | "壶" | "崄" | "厩" | "栗" | "折" | "叙" | "栖" | "污" | "沉" | "凌" | "卤" | "沈" | "尔" | "杯" | "硷" | "御" | "灶" | "绷" | "缰" | "兹" | "荡" | "姜" | "萨" | "讬" | "赝" | "迹" | "挽" | "周" | "游" | "锈" | "铲" | "暗" | "郁" | "鳄" | "霉" | "像" | "象" | "剷" | "鐘" | "麵" | "齧" | "痲" | "牆" | "藉" | "砲" | "鱷" | "滷" | "锺" | "凃" | "艸" | "咨" | "昵" | "痳" | "喂" | "氹" | "凼" | "狵" | "𫗭" | "缐" | "汙" | "遊" | "夥" | "淩" | "扎" | "紮" | "癡" | "薑" | "捻" | "撚" | "黴" | "欲" | "慾" | "讚" | "菸" | "燻" | "熏" | "籲" | "龥" | "蹠" | "跖" | "劈" | "擗" | "核" | "覈" | "脣" | "唇" | "升" | "昇" | "磐" | "谿" | "嵠" | "祐" | "佑" | "瓮" | "罋" | "甕" | "闇" | "痺" | "痹" | "雇" | "僱" | "週" | "簷" | "檐" | "涌" | "湧" | "傢" | "亙" | "洩" | "泄" | "剿" | "勦" | "搾" | "榨" | "獃" | "盃" | "牋" | "儘" | "讃" | "麪" | "麺" | "劵" | "炮" | "劎" | "劒" | "剱" | "劔" | "僞" | "鬭" | "兎" | "兔" | "坯" | "囌" | "館" | "舘" | "𫠓" | "視" | "眎" | "鐡" | "諸" | "𡬶" | "㑹" | "䛡" | "閤" | "蔘" | "囯" | "駡" | "鏽" | "銹" | "䭾" | "蕯" | "騐" | "麽" | "庅" | "鄕" | "鄊" | "勉" | "勉" | "䋄" | "䋞" | "托" | "縴" | "𫔀" | "寔" | "於" | "扵" | "䖏" | "瞪" | "瞠" | "眙" | "肢" | "胑" | "肉" | "宍" | "𠕎" | "𢝊" | "𢚧" | "𢟜" | "懮" | "𨗫" | "繋" | "廻" | "迴" | "鎗" | "悠" | "滺" | "壷" | "玆" | "葢" | "蹟" | "癒" | "瘉" | "邉" | "凖" | "衞" | "裸" | "躶" | "𪚧" | "𪚿" | "𠃾" | "草" | "箚" | "剳" | "汚" | "禦" | "鬱" | "犇" | "奔" | "葁" | "餧" | "淨" | "綫" | "併" | "覌" | "啔" | "廐" | "廏" | "煅" | "𫔮" | "葯" | "𣛙" | "貮" | "𢎐" | "二" | "𪘂" | "囓" | "噛" | "碱" | "摺" | "踨" | "暱" | "爲" | "綳" | "繃" | "敍" | "盪" | "墻" | "尓" | "廸" | "迪" | "耤" | "粽" | "糉" | "糭" | "曏" | "嚮" | "鰐" | "鹵" | "砂" | "沙" | "炭" | "碳" | "糓" | "妳" | "你" | "她" | "他" | "藤" | "籐" | "籘" | "嬉" | "嘻" | "姊" | "剁" | "刴" | "喻" | "喩" | "銳" | "唖" | "𠞰" | "禍" | "侮" | "侮" | "嚐" | "繮" | "韁" | "贋" | "贗" | "呆" | "呪" | "咒" | "詋" | "䇳", string[]>;
/**
 * 此表內只有符合 KEY 值時才會觸發
 */
export declare const table_jp: Record<"絲" | "丝" | "氷" | "館" | "馆" | "画" | "鶏" | "雞" | "鸡" | "殻" | "壳" | "槍" | "枪" | "髪" | "髮" | "罵" | "骂" | "駄" | "馱" | "驮" | "歴" | "歷" | "历" | "暦" | "曆" | "錬" | "鍊" | "炼" | "蓋" | "盖" | "晩" | "晚" | "恒" | "恆" | "准" | "準" | "傑" | "杰" | "圏" | "圈" | "煙" | "烟" | "甦" | "苏" | "並" | "并" | "鹹" | "咸" | "踪" | "蹤" | "秘" | "祕" | "黙" | "默" | "圧" | "壓" | "压" | "凄" | "淒" | "悽" | "穀" | "鶫" | "鶇" | "鸫" | "効" | "效" | "揷" | "插" | "賎" | "箋" | "笺" | "絶" | "絕" | "绝" | "蘇" | "巻" | "卷" | "弐" | "貳" | "贰" | "隷" | "隸" | "隶" | "挿" | "凶" | "兇" | "台" | "糸" | "余" | "餘" | "尨" | "券" | "為" | "为" | "乾" | "干" | "偽" | "鳥" | "鸟" | "尋" | "寻" | "復" | "复" | "殼" | "視" | "视" | "証" | "證" | "证" | "閑" | "閒" | "闲" | "塗" | "涂" | "幹" | "痴" | "話" | "话" | "裏" | "裡" | "里" | "禍" | "祸" | "網" | "网" | "阁" | "憂" | "忧" | "盤" | "盘" | "範" | "范" | "練" | "练" | "線" | "线" | "衛" | "卫" | "衝" | "冲" | "複" | "諸" | "诸" | "樸" | "朴" | "諮" | "谘" | "獲" | "获" | "鍾" | "钟" | "鍛" | "锻" | "穫" | "罗" | "鑑" | "鉴" | "両" | "兩" | "两" | "亀" | "龜" | "龟" | "亜" | "会" | "會" | "倶" | "俱" | "内" | "內" | "処" | "處" | "处" | "剣" | "劍" | "剑" | "労" | "勞" | "劳" | "勲" | "勳" | "勋" | "単" | "單" | "单" | "参" | "參" | "収" | "收" | "啓" | "啟" | "启" | "営" | "団" | "團" | "团" | "図" | "国" | "國" | "壊" | "壞" | "坏" | "姉" | "姐" | "姫" | "姬" | "娯" | "嬢" | "孃" | "実" | "實" | "实" | "対" | "對" | "对" | "尽" | "盡" | "帯" | "廃" | "廢" | "废" | "当" | "徴" | "徵" | "悪" | "恶" | "懐" | "戦" | "戰" | "战" | "拠" | "據" | "据" | "拡" | "撃" | "擊" | "击" | "暁" | "曉" | "晓" | "査" | "桜" | "櫻" | "樱" | "楽" | "樂" | "乐" | "権" | "權" | "权" | "歓" | "歡" | "欢" | "歳" | "歲" | "岁" | "気" | "氣" | "气" | "浜" | "濱" | "滨" | "涙" | "淚" | "泪" | "済" | "濟" | "济" | "渓" | "溪" | "焔" | "焰" | "焼" | "犠" | "犧" | "牺" | "産" | "发" | "穂" | "穗" | "経" | "經" | "经" | "絵" | "継" | "繼" | "继" | "緑" | "綠" | "绿" | "繊" | "纖" | "纤" | "聴" | "脏" | "舗" | "舖" | "铺" | "蔵" | "薬" | "藥" | "药" | "覇" | "霸" | "覧" | "観" | "觀" | "观" | "賛" | "贊" | "赞" | "辺" | "邊" | "边" | "郷" | "鄉" | "乡" | "釈" | "鉄" | "鐵" | "铁" | "銭" | "鋭" | "锐" | "録" | "錄" | "录" | "閲" | "闘" | "鬥" | "険" | "險" | "险" | "雑" | "霊" | "靈" | "灵" | "顔" | "顏" | "颜" | "験" | "驗" | "验" | "鬪" | "鷄" | "黒" | "黑" | "餵" | "布" | "佈" | "繫" | "梁" | "樑" | "沖" | "茲" | "凈" | "剗" | "勛" | "廄" | "敘" | "噸" | "吒" | "啞" | "嚙" | "壺" | "爾" | "嘗" | "嶮" | "輓" | "棲" | "慄" | "瀏" | "竈" | "煉" | "鹼" | "蕩" | "薩" | "託" | "跡" | "鑒" | "鏟" | "鋪" | "麼" | "亘" | "伙" | "馀" | "家" | "净" | "刬" | "汇" | "吁" | "咤" | "哑" | "尝" | "吨" | "啮" | "向" | "采" | "墙" | "壶" | "崄" | "厩" | "栗" | "折" | "叙" | "栖" | "污" | "沉" | "凌" | "卤" | "沈" | "浏" | "尔" | "杯" | "硷" | "御" | "灶" | "绷" | "缰" | "修" | "兹" | "荡" | "姜" | "萨" | "讬" | "赝" | "迹" | "挽" | "周" | "游" | "锈" | "铲" | "暗" | "辟" | "郁" | "鳄" | "面" | "霉" | "像" | "象" | "剷" | "鐘" | "囉" | "麵" | "齧" | "痲" | "牆" | "藉" | "砲" | "鱷" | "滷" | "锺" | "凃" | "啰" | "艸" | "咨" | "昵" | "痳" | "喂" | "氹" | "凼" | "狵" | "𫗭" | "缐" | "汙" | "遊" | "夥" | "淩" | "扎" | "紮" | "癡" | "薑" | "捻" | "撚" | "黴" | "欲" | "慾" | "讚" | "菸" | "捲" | "燻" | "熏" | "籲" | "龥" | "蹠" | "跖" | "犟" | "劈" | "擗" | "核" | "覈" | "唿" | "嗬" | "脣" | "唇" | "升" | "昇" | "磐" | "谿" | "嵠" | "祐" | "佑" | "媮" | "瓮" | "罋" | "甕" | "闇" | "痺" | "痹" | "雇" | "僱" | "週" | "闢" | "簷" | "檐" | "涌" | "湧" | "傢" | "亙" | "洩" | "泄" | "剿" | "勦" | "搾" | "榨" | "獃" | "盃" | "牋" | "の" | "と" | "亁" | "乹" | "呻" | "覆" | "袮" | "儘" | "侭" | "讃" | "麪" | "麺" | "鬚" | "揹" | "劵" | "彩" | "𠩺" | "炰" | "炮" | "避" | "儓" | "檯" | "劎" | "劒" | "剱" | "劔" | "僞" | "鬭" | "兎" | "兔" | "坯" | "囌" | "館" | "舘" | "𫠓" | "視" | "眎" | "鐡" | "諸" | "𡬶" | "㑹" | "䛡" | "閤" | "蔘" | "囯" | "駡" | "鏽" | "銹" | "䭾" | "蕯" | "騐" | "麽" | "庅" | "鄕" | "鄊" | "勉" | "勉" | "䋄" | "䋞" | "托" | "縴" | "𫔀" | "寔" | "於" | "扵" | "䖏" | "瞪" | "瞠" | "眙" | "肢" | "胑" | "肉" | "宍" | "𠕎" | "𢝊" | "𢚧" | "𢟜" | "懮" | "𨗫" | "繋" | "廻" | "迴" | "鎗" | "悠" | "滺" | "壷" | "玆" | "葢" | "蹟" | "癒" | "瘉" | "邉" | "凖" | "衞" | "裸" | "躶" | "𪚧" | "𪚿" | "𠃾" | "草" | "箚" | "剳" | "汚" | "禦" | "鬱" | "犇" | "奔" | "葁" | "餧" | "淨" | "綫" | "併" | "覌" | "啔" | "廐" | "廏" | "煅" | "𫔮" | "葯" | "𣛙" | "貮" | "𢎐" | "二" | "𪘂" | "囓" | "噛" | "碱" | "摺" | "踨" | "暱" | "爲" | "綳" | "繃" | "敍" | "盪" | "墻" | "尓" | "廸" | "迪" | "耤" | "粽" | "糉" | "糭" | "曏" | "嚮" | "鰐" | "鹵" | "砂" | "沙" | "炭" | "碳" | "糓" | "妳" | "你" | "她" | "他" | "藤" | "籐" | "籘" | "嬉" | "嘻" | "姊" | "剁" | "刴" | "喻" | "喩" | "銳" | "唖" | "𠞰" | "禍" | "侮" | "侮" | "嚐" | "繮" | "韁" | "贋" | "贗" | "呆" | "呪" | "咒" | "詋" | "䇳" | "版", string[]>;
declare type IArrayOrReadonly<U> = U[] | readonly U[];
export declare function _uniqueTable<T extends Record<string, IArrayOrReadonly<string>>>(table_jp: T): T;
export declare function _buildTablePlus<T extends string, U extends string>(table_plus: Record<T, IArrayOrReadonly<U>>): Record<U | T, string[]>;
export declare function _mergeTable<T extends string, U extends string>(table_jp: Record<T, IArrayOrReadonly<string>>, table_plus: Record<U, IArrayOrReadonly<string>>): Record<U | T, string[]>;
export interface ISimpleTable {
    [key: string]: string;
}
export declare let _table_cn: ISimpleTable;
export declare function _update(target: ISimpleTable, source: ISimpleTable): ISimpleTable;
export declare function _get(arr: string[], value: string | string[], ...values: Array<string | string[]>): string[];
export declare function jp(char: string, options?: IOptions): string[];
export declare function tw(char: string, options?: IOptions): string[];
export declare function cn(char: string, options?: IOptions): string[];
declare const _default: typeof import("./table");
export default _default;
