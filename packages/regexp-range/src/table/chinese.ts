/**
 * Created by user on 2018/5/7/007.
 */

import { predefineedTranscriptionConfigs } from '@lazy-cjk/japanese/lib/data/numbers';

export const list_range = [
	'〇一二三四五六七八九十'.split(''),
	'零一二三四五六七八九十'.split(''),
];

[
	['common', '十'],
	['formal', '十'],

	['traditional', '拾'],
	['traditionalOld', '拾'],
	['simplified', '拾'],

	['traditional', '什'],
	['traditionalOld', '什'],
	['simplified', '什'],

].forEach(function (key)
{
	let ls = predefineedTranscriptionConfigs.digits[key[0]];
	if (ls)
	{
		ls = Object.values(ls);
		if (key[1])
		{
			ls.push(key[1]);
		}

		list_range.push(ls);
	}
});

export const list_range2: string[][] = [];

[
	/**
	 * [ '洞', '幺', '两', '三', '刀', '五', '六', '拐', '八', '勾' ]
	 */
	['chineseMilitary'],
	//['vietnam'],

].forEach(function (key)
{
	let ls = predefineedTranscriptionConfigs.digits[key[0]];
	if (ls)
	{
		ls = Object.values(ls);
		if (key[1])
		{
			ls.push(key[1]);
		}

		list_range2.push(ls);
	}
});

export default list_range;
