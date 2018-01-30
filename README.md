# regexp-cjk

> Generate JavaScript-compatible regular expressions with chinese/jp/zh/cn

`npm install regexp-cjk`

## demo

```ts
import zhRegExp from 'regexp-cjk';
import { zhRegExp, create } from 'regexp-cjk';
```

```ts
[
	/EARTH|亞斯\(アース\)/ig,
	'(波庫斯|沃[尔爾]克斯)[亞亚][龙龍]草原',
	'[鳞|鱗]王(巢穴|之巢)',
	'(魔[像象]|哥雷姆|哥雷魯|GOLEM)(?!\\(?(?:魔[像象]|哥雷姆|GOLEM))',
	/(【[^【】\n<>\[\]\{\}]+】[^\n【】<>\[\]\{\}]*)[<\[\{]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n【】<>\[\]\{\}]*)[\]\}>]/gm,
	'嫉妒吉尔|懒惰吉尔|怠惰吉尔',
	'米娅・艾璐罗德',
	`神学+(?:院|校|园)`,
].forEach(function (value, index, array)
{
	let r = create(value as any);

	console.log(r);
});
```

### output

```js
/EARTH|[亞亚]斯\(アース\)/
/(波[庫库]斯|沃[尔爾]克斯)[亞亚][龙龍]草原/
/[鳞|鱗]王(巢穴|之巢)/
/(魔[像象]|哥雷姆|哥雷[魯鲁]|GOLEM)(?!\(?(?:魔[像象]|哥雷姆|GOLEM))/
/(【[^【】\n<>\[\]\{\}]+】[^\n【】<>\[\]\{\}]*)[<\[\{]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n【】<>\[\]\{\}]*)[\]\}>]/
/嫉妒吉[尔爾]|[懒嬾]惰吉[尔爾]|怠惰吉[尔爾]/
/米[娅婭]・艾璐[罗羅儸]德/
/神[学學]+(?:院|校|[园園])/
```
