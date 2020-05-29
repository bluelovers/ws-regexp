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
export interface ICNSPinyinTable
{
	/**
	 * 注音
	 */
	[pinyin: string]: ICNSPinyinTableRow
}

export interface ICNSPinyinTableRow extends Array<string>
{
	/**
	 * 漢語(han)
	 */
	0: string,
	/**
	 * 注音第二式(zuin2)
	 */
	1: string,
	/**
	 * 耶魯(yale)
	 */
	2: string,
	/**
	 * 韋式(wei)
	 */
	3: string,
}
