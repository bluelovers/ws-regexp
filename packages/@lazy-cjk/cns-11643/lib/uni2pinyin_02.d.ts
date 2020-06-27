/**
 * Created by user on 2020/5/30.
 */
import { IZhuyin2PinyinTable, IZhuyin2PinyinTableRow, EnumPinyinType } from './types';
/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_2」以聲調符號呈現
 *
 * 第一個欄位：注音
 * 第二個欄位：漢語(han)
 * 第三個欄位：注音第二式(zuin2)
 * 第四個欄位：耶魯(yale)
 * 第五個欄位：韋式(wei)
 */
export declare function zhuyin2pinyin_02_table(): IZhuyin2PinyinTable;
export declare function zhuyin2pinyin_02(zhuyin: string): IZhuyin2PinyinTableRow;
/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_2」以聲調符號呈現
 */
export declare function uni2pinyin_02(uni: string | number): IZhuyin2PinyinTableRow;
export declare function uni2pinyinTypeValue_02(uni: string | number, pinyinType?: EnumPinyinType): string;
/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_2」以聲調符號呈現
 */
export declare function char2pinyin_02(char: string): IZhuyin2PinyinTableRow;
export declare function char2pinyinTypeValue_02(char: string, pinyinType?: EnumPinyinType): string;
export default uni2pinyin_02;
