# regexp-cjk

> Generate JavaScript-compatible regular expressions with chinese/jp/zh/cn

`npm install regexp-cjk`

## api

version 2.x

* [index.d.ts](index.d.ts)
* [event.d.ts](https://github.com/bluelovers/regexp-parser-event)

* allow use regexp event do something u need.
* remove useless double pattern
* sort pattern class
* auto match cjk hanzi/chinese
* human pattern class char range `[一-十]` => `[一二三四五六七八九十]`

## demo

```ts
import zhRegExp from 'regexp-cjk';
import { zhRegExp, create, isRegExp } from 'regexp-cjk';
```

```ts
new zhRegExp(string);
new zhRegExp(RegExp);
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
	/[一-十]/,
	/[壹-拾]/,
	`[壹-什]`,
	`[洞-勾]`,
	///[〇-𠃩]/,
	///[𠃩]/,
	`[四-七]罗`,
	/([《（「『【])([^《（「『【』」》）】\n]{1,5})([』」》）】])/g,
].forEach(function (value, index, array)
{
	let r = create(value as any, null, {
		//disableZh: true,
	});

	console.log(r);
});
```

### output

```js
/EARTH|[亞亚]斯\(アース\)/gi
/(波[庫库]斯|沃[尔爾]克斯)[亞亚][龙龍]草原/
/[鳞|鱗]王(巢穴|之巢)/
/(魔[像象]|哥雷姆|哥雷[魯鲁]|GOLEM)(?!\(?(?:魔[像象]|哥雷姆|GOLEM))/
/(【[^【】\n<>\[\]\{\}]+】[^\n【】<>\[\]\{\}]*)[<\[\{]([ ]*[…？－—\w０-９ａ-ｚＡ-Ｚ\u4E00-\u9FFF][^\n【】<>\[\]\{\}]*)[\]\}>]/gm
/嫉妒吉[尔爾]|[懒嬾]惰吉[尔爾]|怠惰吉[尔爾]/
/米[娅婭]・艾璐[罗羅儸]德/
/神[学學]+(?:院|校|[园園])/
/[一二三四五六七八九十]/
/[壹貳參肆伍陸柒捌玖拾]/
/[壹貳參肆伍陸柒捌玖什]/
/[洞幺两三刀五六拐八勾]/
/[四五六七][罗羅儸]/
/([《（「『【])([^《（「『【』」》）】\n]{1,5})([』」》）】])/g
```

### api

```ts
export interface IApi
{
	(str: string, flags?: string, skip?: string): zhRegExp
	(str: RegExp, flags?: string, skip?: string): zhRegExp
}
```

#### support check

```ts
console.log(zhRegExp.support);
```

```ts
export declare const support: {
    readonly leftContext: boolean;
    readonly rightContext: boolean;
    readonly lastParen: boolean;
    readonly lastMatch: boolean;
    readonly input: boolean;
};
```
