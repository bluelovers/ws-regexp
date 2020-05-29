# README.md

    CNS11643中文標準交換碼全字庫(簡稱全字庫)

## install

```bash
yarn add @lazy-cjk/cns-11643
yarn-tool add @lazy-cjk/cns-11643
yt add @lazy-cjk/cns-11643
```

```typescript
import { char2hex, char2zhuyin, char2pinyin_01, char2pinyin_02, ICNSPinyinTableRow } from '@lazy-cjk/cns-11643';

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

		let p: ICNSPinyinTableRow;

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
```

```
𠮷 20bb7
注音 ㄐㄧˊ
---------------
漢語(han) ji2
注音第二式(zuin2) ji2
耶魯(yale) ji2
韋式(wei) chi2
---------------
漢語(han) jí
注音第二式(zuin2) jí
耶魯(yale) jí
韋式(wei) chi2
===============
𠬠 20b20
注音 ㄇㄡˇ
---------------
漢語(han) mou3
注音第二式(zuin2) mou3
耶魯(yale) mou3
韋式(wei) mou3
---------------
漢語(han) mǒu
注音第二式(zuin2) mǒu
耶魯(yale) mǒu
韋式(wei) mou3
===============
𡬶 21b36
注音 ㄒㄩㄣˊ
---------------
漢語(han) xun2
注音第二式(zuin2) shiun2
耶魯(yale) syun2
韋式(wei) hsun2
---------------
漢語(han) xún
注音第二式(zuin2) shiún
耶魯(yale) syún
韋式(wei) hsün2
===============
𫗭 2b5ed
注音 ㄨㄟˋ
---------------
漢語(han) wei4
注音第二式(zuin2) wei4
耶魯(yale) wei4
韋式(wei) wei4
---------------
漢語(han) wèi
注音第二式(zuin2) wèi
耶魯(yale) wèi
韋式(wei) wei4
===============
𣛙 236d9
注音 ㄧㄠˋ
---------------
漢語(han) yao4
注音第二式(zuin2) yau4
耶魯(yale) yau4
韋式(wei) yao4
---------------
漢語(han) yào
注音第二式(zuin2) yàu
耶魯(yale) yàu
韋式(wei) yao4
===============
𢎐 22390
注音 ㄦˋ
---------------
漢語(han) er4
注音第二式(zuin2) er4
耶魯(yale) er4
韋式(wei) erh4
---------------
漢語(han) èr
注音第二式(zuin2) èr
耶魯(yale) èr
韋式(wei) êrh4
===============
```
