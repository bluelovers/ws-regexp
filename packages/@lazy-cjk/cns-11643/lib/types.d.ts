/**
 * Created by user on 2020/5/30.
 */
/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_1」以調值(數字)呈現
 * 「CNS_pinyin_2」以聲調符號呈現
 *
 * 第一個欄位：注音
 * 第二個欄位：漢語(han)
 * 第三個欄位：注音第二式(zuin2)
 * 第四個欄位：耶魯(yale)
 * 第五個欄位：韋式(wei)
 */
export interface IZhuyin2PinyinTable {
    /**
     * 注音
     */
    [pinyin: string]: IZhuyin2PinyinTableRow;
}
export interface IZhuyin2PinyinTableRow extends Array<string> {
    /**
     * 漢語(han)
     */
    0: string;
    /**
     * 注音第二式(zuin2)
     */
    1: string;
    /**
     * 耶魯(yale)
     */
    2: string;
    /**
     * 韋式(wei)
     */
    3: string;
}
export interface IZhuyin2cns extends Record<string, string[]> {
}
export interface IZhuyin2uni extends Record<string, number[]> {
}
export interface IKeyToZhuyinTable extends Record<string, string[]> {
}
export declare enum EnumPinyinMode {
    /**
     * 「CNS_pinyin_1」以調值(數字)呈現
     */
    num = 0,
    /**
     * 「CNS_pinyin_2」以聲調符號呈現
     * @type {EnumPinyinMode.tone}
     */
    tone = 1
}
export declare enum EnumPinyinType {
    /**
     * 漢語(han)
     */
    han = 0,
    /**
     * 注音第二式(zuin2)
     */
    zuin2 = 1,
    /**
     * 耶魯(yale)
     */
    yale = 2,
    /**
     * 韋式(wei)
     */
    wei = 3
}
