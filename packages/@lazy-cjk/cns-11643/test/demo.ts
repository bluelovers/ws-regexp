/**
 * Created by user on 2020/5/30.
 */

import { char2hex, char2zhuyin, char2pinyin_01, char2pinyin_02, IZhuyin2PinyinTableRow } from '..';

[
	`𠮷`,
	`𠬠`,
	`𡬶`,
	`𫗭`,
	`𣛙`,
	`𢎐`,
]
	.forEach(char =>
	{

		console.log(char, char2hex(char));
		console.log(`注音`, char2zhuyin(char));

		console.log(`-`.repeat(15));

		let p: IZhuyin2PinyinTableRow;

		p = char2pinyin_01(char)

		console.log(`漢語(han)`, p[0])
		console.log(`注音第二式(zuin2)`, p[1])
		console.log(`耶魯(yale)`, p[2])
		console.log(`韋式(wei)`, p[3])

		if (p.length > 4)
		{
			console.log(...p.slice(3))
		}

		console.log(`-`.repeat(15));

		p = char2pinyin_02(char)

		console.log(`漢語(han)`, p[0])
		console.log(`注音第二式(zuin2)`, p[1])
		console.log(`耶魯(yale)`, p[2])
		console.log(`韋式(wei)`, p[3])

		if (p.length > 4)
		{
			console.log(...p.slice(3))
		}

		console.log(`=`.repeat(15));

	})
;
