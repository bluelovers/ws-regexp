import { IOptionsSlugify } from '../types';
import { char2pinyin_01 } from '@lazy-cjk/cns-11643/lib/uni2pinyin_01';
import { char2pinyin_02 } from '@lazy-cjk/cns-11643/lib/uni2pinyin_02';
import { EnumPinyinType } from '@lazy-cjk/cns-11643/lib/types';
import { slugify as _slugify } from 'transliteration';

export function newZhPinyinFn(options?: IOptionsSlugify): (s: string) => string
{
	let chineseOptions = options?.chineseOptions ?? {};

	let { useTransliteration, pinyinMode, pinyinType } = chineseOptions;

	if (typeof useTransliteration === 'undefined' && typeof pinyinMode === 'undefined' && typeof pinyinType === 'undefined')
	{
		useTransliteration = true;
	}

	const char2pinyinMode = pinyinMode ? char2pinyin_01 : char2pinyin_02;

	if (typeof pinyinType !== 'number' || !(pinyinType in EnumPinyinType))
	{
		pinyinType = EnumPinyinType.han
	}

	const char2pinyin = (s: string): string => char2pinyinMode(s)[pinyinType];

	if (useTransliteration)
	{
		return (s: string) => {
			if (s?.length)
			{
				let n = _slugify(s);

				if (n === '')
				{
					n = char2pinyin(s)
				}

				if (n?.length)
				{
					return n
				}

				return
			}

			return s
		}
	}

	return (s: string) => {
		if (s?.length)
		{
			let n = char2pinyin(s)

			if (n?.length)
			{
				return n
			}

			return
		}

		return s
	}
}
