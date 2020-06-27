import { EnumPinyinMode, IZhuyin2PinyinTableRow, IZhuyin2PinyinTable, EnumPinyinType } from './types';
export declare function zhuyin2pinyin_table(pinyinMode?: EnumPinyinMode): IZhuyin2PinyinTable;
export declare function zhuyin2pinyin(zhuyin: string, pinyinMode?: EnumPinyinMode): IZhuyin2PinyinTableRow;
export declare function uni2pinyin(uni: string | number, pinyinMode?: EnumPinyinMode): IZhuyin2PinyinTableRow;
export declare function uni2pinyinTypeValue(uni: string | number, pinyinMode?: EnumPinyinMode, pinyinType?: EnumPinyinType): string;
export declare function char2pinyin(char: string, pinyinMode?: EnumPinyinMode): IZhuyin2PinyinTableRow;
export declare function char2pinyinTypeValue(char: string, pinyinMode?: EnumPinyinMode, pinyinType?: EnumPinyinType): string;
export default char2pinyin;
