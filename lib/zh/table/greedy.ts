/**
 * Created by user on 2019/5/9.
 */

import UString from 'uni-string';
import { array_unique } from 'array-hyper-unique';
import { IOptions } from './list';

export const { _greedyTableCacheRegexp, _greedyTableCacheMap, _greedyTableCacheTest } = _greedyTableBuild([
	[/[噁悪惡]/g, '恶'],
	[/[繋繫係]/g, '系'],
	[/[糊鬍葫衚楜]/g, '胡'],
	[/[儅噹當]/g, '当'],
	[/[復複覆]/g, '复'],
	[/[囌蘇甦]/g, '苏'],
	[/[採彩睬踩埰綵䌽]/g, '采'],
	[/[囉啰羅㑩儸]/g, '罗'],
	[/[浏瀏劉]/g, '刘'],
	[/[劵卷巻捲]/g, '券'],
	[/[划劃畫]/g, '画'],
	[/[鬥闘鬭鬪]/g, '斗'],
	[/[乾亁乹幹]/g, '干'],
	[/[図图]/g, '圖'],
	[/[暦曆歴歷]/g, '历'],
	[/[麪麵麺]/g, '面'],
	[/[讃讚賛贊赞]/g, '赞'],
	[/[發髪髮]/g, '发'],
	[/[侭儘盡]/g, '尽'],
	[/[優忧憂]/g, '忧'],
	[/[俱倶]/g, '具'],
	[/[之的得]/g, 'の'],
	[/[與与]/g, 'と'],
	[/[她他牠祂佗]/g, '它'],
	[/[支隻枝]/g, '只'],
	[/[炮砲炰]/g, '泡'],
	[/[仲㊥]/g, '中'],
	[/[原]/g, '元'],
	[/[迴廻]/g, '回'],
	[/[乾亁乹幹]/g, '干'],
	[/[避闢]/g, '辟'],
	[/[滷鹵卤鲁]/g, '魯'],
	[/[檯臺颱儓]/g, '台'],
	[/[宻祕秘]/g, '密'],
	[/[謎谜]/g, '迷'],
	[/[砂莎紗纱]/g, '沙'],
	[/[編篇编]/g, '篇'],
	[/[冶]/g, '治'],
	[/[炼煉錬鍊𫔀練练]/ug, '練'],
	[/[亞亚婭娅椏桠亜]/ug, '亚'],
	[/[塞賽]/ug, '赛'],
	[/[腾騰籐籘]/ug, '藤'],
	[/[妳祢禰]/ug, '你'],
	[/[喰飠⻞飧]/ug, '食'],
	[/[瑪馬玛马]/ug, '马'],
	[/[餸餚]/ug, '餚'],
	[/[裸]/ug, '果'],
	[/[凱凯鎧铠]/ug, '凱'],
	[/[帖贴]/ug, '貼'],
	[/[甚]/ug, '什'],
	[/[聯联連连]/ug, '連'],
	[/[像]/ug, '象'],
	[/[藉]/ug, '借'],
	[/[蕾]/ug, '雷'],
	[/[訂订釘钉]/ug, '定'],
	[/[嚮]/ug, '向'],
	[/[糸糹丝]/ug, '絲'],
	[/[筒]/ug, '桶'],
	[/[兹玆滋]/ug, '茲'],
	[/[呐訥讷]/ug, '吶'],
	[/[穀糓]/ug, '谷'],
	[/[两兩倆俩]/ug, '両'],
	[/[帳賬账]/ug, '帐'],
	[/[版闆]/ug, '板'],
	[/[待]/ug, '呆'],
	[/[熔鎔镕融螎]/ug, '溶'],
	[/[匯汇]/ug, '彙'],
	[/[彿仏]/ug, '佛'],
	[/[阿]/ug, '啊'],
	[/[家]/ug, '傢'],
	[/[爆]/ug, '暴'],
	[/[網䋄䋞綱纲]/ug, '网'],
	[/[註]/ug, '注'],
	[/[灌贯潅]/ug, '貫'],
	[/[倒]/ug, '到'],
	[/[秤]/ug, '平'],
	[/[勛勲勳]/ug, '勋'],
	[/[麗丽莉]/ug, '利'],
	[/[已巳]/ug, '己'],
	[/[嗬]/ug, '呵'],
	[/[哊哟唷唹喲]/ug, '呦'],
	[/[婕杰洁潔絜]/ug, '傑'],
	[/[嘻]/ug, '嬉'],
	[/[痲痳麻]/ug, '嘛'],
	[/[狗]/ug, '犬'],
	[/[彿拂]/ug, '佛'],
	[/[亙恆恒]/ug, '亘'],
	[/[附副]/ug, '付'],
	[/[伽枷珈迦]/ug, '加'],
	[/[褔]/ug, '福'],
	[/[捱]/ug, '挨'],
	[/[拼]/ug, '拚'],
	[/[飄飘飃]/ug, '漂'],
	[/[佔沾]/ug, '占'],
	[/[気氣汽滊炁]/ug, '气'],
	[/[撩遼]/ug, '辽'],
	[/[做]/ug, '作'],
	[/[搜捜]/ug, '蒐'],
	[/[叟傁]/ug, '叟'],
	[/[謝谢]/ug, '榭'],
	[/[形]/ug, '型'],
	[/[雇頋顧顾]/ug, '僱'],
	[/[廬芦蘆]/ug, '庐'],
	[/[耽躭]/ug, '眈'],
	[/[傹竟競竸誩𥪰𧡟𧫘𧫙𧮣𨐼]/ug, '竞'],
	[/[殖]/ug, '植'],
	[/[佬姥]/ug, '老'],
	[/[倖]/ug, '幸'],
	[/[㠪炬矩鉅]/ug, '巨'],
	[/[鏈链炼錬鍊𫔀䃛𧹯練练連连]/ug, '煉'],
	[/[刴剁剐剮劏]/ug, '㓥'],
	[/[枏楠]/ug, '南'],
	[/[璐𡽘𨱴]/ug, '路'],
	[/[侂拓杔託讬拖拕]/ug, '托'],
	[/[悕睎稀]/ug, '希'],
	[/[帼幗国國]/ug, '囯'],
	[/[返]/ug, '反'],
	[/[陽阳]/ug, '佯'],
	[/[来莱萊]/ug, '來'],
	[/[葆堡褓緥]/ug, '保'],
	[/[渡]/ug, '度'],
	[/[剳札箚紮]/ug, '扎'],
	[/[湜提隄]/ug, '堤'],
	[/[臘蜡蠟]/ug, '腊'],
	[/[鬱𨚼𨟝]/ug, '郁'],
	[/[擀杆桿]/ug, '扞'],
	[/[脼郞𥇑]/ug, '郎'],
	[/[芭]/ug, '巴'],
	[/[涅湼]/ug, '捏'],
	[/[择擇沢泽澤]/ug, '択'],
	[/[幵開]/ug, '开'],
	[/[珮]/ug, '佩'],
	[/[喩籲龥]/ug, '喻'],
	[/[值]/ug, '値'],
	[/[臓臟贓赃髒]/ug, '脏'],
	[/[㊤]/ug, '上'],
	[/[㊦]/ug, '下'],
	[/[唿]/ug, '呼'],
	[/[詳详]/ug, '祥'],
	[/[妮泥]/ug, '尼'],
]);

//console.log(_greedyTableCacheTest);

export function _greedyTableBuild(data: [RegExp, string][]): {
	_greedyTableCacheRegexp: readonly (readonly [RegExp, string])[];
	_greedyTableCacheMap: Map<string, readonly string[]>;
	_greedyTableCacheTest: RegExp;
}
{
	const _greedyTableCacheRegexp: [RegExp, string][] = data;

	let _greedyTableCacheMap: Map<string, string[]>;
	let _greedyTableCacheTest: RegExp;

	_greedyTableCacheMap = new Map<string, string[]>();

	let arr = _greedyTableCacheRegexp
		.reduce(function (arr, r)
		{
			let s = r[0].source
				.replace(/^.*\[|\].*$/ug, '')
			;

			let a = UString.split(s, '').concat(r[1]);

			a.forEach(c =>
			{
				_greedyTableCacheMap.set(c, a)
			});

			arr.push(...a);

			return arr;
		}, [] as string[])
	;

	_greedyTableCacheTest = new RegExp(`[${array_unique(arr).join('')}]`, 'u');

	return {
		_greedyTableCacheRegexp,
		_greedyTableCacheMap,
		_greedyTableCacheTest,
	};
}

export function greedyTableTest(input: string)
{
	return _greedyTableCacheTest.test(input)
}

export function greedyTableCharArray(char: string)
{
	return _greedyTableCacheMap.get(char)
}

export function greedyTableReplace(input: string): string
{
	if (greedyTableTest(input))
	{
		return _greedyTableCacheRegexp
			.reduce(function (input, r)
			{
				return input.replace(r[0], r[1])
			}, input)
			;
	}

	return input
}

export default exports as typeof import('./greedy');