/**
 * Created by user on 2020/5/30.
 */
import uni2zhuyin from './uni2zhuyin';
import { IZhuyin2PinyinTable, IZhuyin2PinyinTableRow, EnumPinyinType } from './types';
import { char2uni } from './char2uni';
import { handlePinyinType } from './util/uni2zhuyin';

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
export function zhuyin2pinyin_01_table(): IZhuyin2PinyinTable
{
	return require('./cns/pinyin/pinyin_01.json') as any
}

export function zhuyin2pinyin_01(zhuyin: string): IZhuyin2PinyinTableRow
{
	return zhuyin2pinyin_01_table()[zhuyin]
}

/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_1」以調值(數字)呈現
 */
export function uni2pinyin_01(uni: string | number): IZhuyin2PinyinTableRow
{
	let zhuyin = uni2zhuyin(uni)

	return zhuyin2pinyin_01_table()[zhuyin]
}

export function uni2pinyinTypeValue_01(uni: string | number, pinyinType?: EnumPinyinType)
{
	pinyinType = handlePinyinType(pinyinType)

	return uni2pinyin_01(uni)[pinyinType]
}

/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_1」以調值(數字)呈現
 */
export function char2pinyin_01(char: string)
{
	return uni2pinyin_01(char2uni(char))
}

export function char2pinyinTypeValue_01(char: string, pinyinType?: EnumPinyinType)
{
	pinyinType = handlePinyinType(pinyinType)

	return char2pinyin_01(char)[pinyinType]
}

export default uni2pinyin_01
