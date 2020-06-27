import { EnumPinyinType } from '../types';

export function handlePinyinType(pinyinType?: EnumPinyinType)
{
	if (typeof pinyinType !== 'number' || !(pinyinType in EnumPinyinType))
	{
		pinyinType = EnumPinyinType.han
	}

	return pinyinType
}
