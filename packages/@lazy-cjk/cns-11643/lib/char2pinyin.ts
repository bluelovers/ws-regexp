import uni2pinyin_01, { char2pinyin_01, zhuyin2pinyin_01, zhuyin2pinyin_01_table } from './uni2pinyin_01';
import uni2pinyin_02, { char2pinyin_02, zhuyin2pinyin_02_table, zhuyin2pinyin_02 } from './uni2pinyin_02';
import { EnumPinyinMode, IZhuyin2PinyinTableRow, IZhuyin2PinyinTable, EnumPinyinType } from './types';
import { handlePinyinType } from './util/uni2zhuyin';

export function zhuyin2pinyin_table(pinyinMode?: EnumPinyinMode)
{
	const zhuyin2pinyinMode = pinyinMode ? zhuyin2pinyin_01_table : zhuyin2pinyin_02_table;

	return zhuyin2pinyinMode()
}

export function zhuyin2pinyin(zhuyin: string, pinyinMode?: EnumPinyinMode)
{
	const zhuyin2pinyinMode = pinyinMode ? zhuyin2pinyin_01 : zhuyin2pinyin_02;

	return zhuyin2pinyinMode(zhuyin)
}

export function uni2pinyin(uni: string | number, pinyinMode?: EnumPinyinMode)
{
	const uni2pinyinMode = pinyinMode ? uni2pinyin_01 : uni2pinyin_02;

	return uni2pinyinMode(uni)
}

export function uni2pinyinTypeValue(uni: string | number, pinyinMode?: EnumPinyinMode, pinyinType?: EnumPinyinType)
{
	pinyinType = handlePinyinType(pinyinType)

	return uni2pinyin(uni, pinyinMode)[pinyinType]
}

export function char2pinyin(char: string, pinyinMode?: EnumPinyinMode)
{
	const char2pinyinMode = pinyinMode ? char2pinyin_01 : char2pinyin_02;

	return char2pinyinMode(char)
}

export function char2pinyinTypeValue(char: string, pinyinMode?: EnumPinyinMode, pinyinType?: EnumPinyinType)
{
	pinyinType = handlePinyinType(pinyinType)

	return char2pinyin(char, pinyinMode)[pinyinType]
}

export default char2pinyin
