/**
 * Created by user on 2018/5/7/007.
 */

import * as japanese from 'japanese';

export let list_range = [
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

	['chineseMilitary'],
	//['vietnam'],

].forEach(function (key)
{
	let ls = japanese.predefineedTranscriptionConfigs.digits[key[0]];
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

export default list_range;
