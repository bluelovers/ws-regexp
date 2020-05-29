/**
 * Created by user on 2020/5/30.
 */
import uni2zhuyin from './uni2zhuyin';
import { ICNSPinyinTable, ICNSPinyinTableRow } from './types';
import { char2uni } from './char2uni';

export function uni2pinyin_01(uni: string | number): ICNSPinyinTableRow
{
	let zhuyin = uni2zhuyin(uni)

	return (require('./cns/pinyin/pinyin_01.json') as any as ICNSPinyinTable)[zhuyin]
}

export function char2pinyin_01(char: string)
{
	return uni2pinyin_01(char2uni(char))
}

export default uni2pinyin_01
