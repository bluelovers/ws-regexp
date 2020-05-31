/**
 * Created by user on 2020/5/30.
 */

import uni2zhuyin from './uni2zhuyin';
import { IZhuyin2PinyinTable, IZhuyin2PinyinTableRow } from './types';
import { char2uni } from './char2uni';

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
export function zhuyin2pinyin_02_table(): IZhuyin2PinyinTable
{
	return require('./cns/pinyin/pinyin_02.json') as any
}

/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_2」以聲調符號呈現
 */
export function uni2pinyin_02(uni: string | number): IZhuyin2PinyinTableRow
{
	let zhuyin = uni2zhuyin(uni)

	return zhuyin2pinyin_02_table()[zhuyin]
}

/**
 * 全字庫的拼音資料表格
 *
 * 「CNS_pinyin_2」以聲調符號呈現
 */
export function char2pinyin_02(char: string)
{
	return uni2pinyin_02(char2uni(char))
}

export default uni2pinyin_02
