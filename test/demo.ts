/**
 * Created by user on 2018/1/31/031.
 */

import { zhRegExp, create } from '..';

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
	`[柒捌玖什壹-什柒捌玖]`,
	`[洞-勾]`,
	///[〇-𠃩]/,
	/[𠃩]/,
	`[四-七]罗`,
	/([《（「『【])([^《（「『【』」》）】\n]{1,5})([』」》）】])/g,
	'劍剑剣',
	'悪食',
	'魯_鲁',
	'画_划_劃_畫',
	'と',
].forEach(function (value, index, array)
{
	let source = value instanceof RegExp ? value.source : value;

	let r = create(value as any, null, {
		//disableZh: true,
	});

	console.dir(r);
});
