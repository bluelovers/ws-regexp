import { IZhuyin2PinyinTable, IZhuyin2PinyinTableRow, EnumPinyinType } from './types';
/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_1」以調值(數字)呈現
 *
 * 第一個欄位：注音
 * 第二個欄位：漢語(han)
 * 第三個欄位：注音第二式(zuin2)
 * 第四個欄位：耶魯(yale)
 * 第五個欄位：韋式(wei)
 */
export declare function zhuyin2pinyin_01_table(): IZhuyin2PinyinTable;
export declare function zhuyin2pinyin_01(zhuyin: string): IZhuyin2PinyinTableRow;
/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_1」以調值(數字)呈現
 */
export declare function uni2pinyin_01(uni: string | number): IZhuyin2PinyinTableRow;
export declare function uni2pinyinTypeValue_01(uni: string | number, pinyinType?: EnumPinyinType): string;
/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_1」以調值(數字)呈現
 */
export declare function char2pinyin_01(char: string): IZhuyin2PinyinTableRow;
export declare function char2pinyinTypeValue_01(char: string, pinyinType?: EnumPinyinType): string;
export default uni2pinyin_01;
