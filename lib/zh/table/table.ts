/**
 * Created by user on 2018/2/17/017.
 */

import { IOptions } from '../convert/core';
import { tw2cn, cn2tw} from '../convert/index';
import { array_unique } from '../../util';
import deepmerge = require('deepmerge-plus');

export let _table_tw = {
	'罗': '羅',
	'恶': '惡',
	'苏': '蘇',
	'馆': '館',
};

/**
 * 此表內只有符合 KEY 值時才會觸發
 */
export let table_jp = {
	'の': [
		'の',
		'之',
		'的',
	],

	'と': [
		'と',
		'與',
		'与',
	],

	'画': [
		'划',
		'画',
		'劃',
		'畫',
	],
	'闘': [
		'斗',
	],
	'鬥': [
		'斗',
	],
	'鬭': [
		'斗',
	],
	'鬪': [
		'斗',
	],
	'闇': [
		'暗',
	],
	'図': [
		'図',
		'圖',
		'图',
	],
	'当': [
		'当',
		'噹',
		'當',
		'儅',
	],

	'閤': [
		'合',
	],
	'阁': [
		'合',
	],

	'罗': [
		'羅',
		'罗',
		'儸',
		'㑩',
		'囉',
		'啰',
	],

	'干': [
		'幹',
		'乾',
		'干',
	],

	'幹': [
		'幹',
		'干',
	],

	'乾': [
		'干',
		'乾',
		'亁',
		'乹',
	],
	'亁': [
		'乾',
		'亁',
		'乹',
	],
	'乹': [
		'乾',
		'亁',
		'乹',
	],

	'历': [
		'历',
		'歴',
		'歷',
		'暦',
		'曆',
	],

	'歴': [
		'历',
	],
	'歷': [
		'历',
	],
	'暦': [
		'历',
	],
	'曆': [
		'历',
	],

	'呻': [
		'呻',
		'申',
	],

	'覆': [
		'覆',
		'复',
	],

	'勉': [
		'免',
	],

	'勉': [
		'免',
	],

	'甦': [
		'甦',
		'蘇',
		'苏',
	],

	'忧': [
		'憂',
		'優',
	],

	'鹹': [
		'咸',
		'鹹',
	],

	'准': [
		'準',
		'准',
	],

	'準': [
		'準',
		'准',
	],

	'袮': [
		'袮',
		// 並非異體字 但由於過度相似 容易錯誤
		'祢',
	],

	'儘': [
		'儘',
		'侭',
	],

	'侭': [
		'儘',
		'侭',
	],

	'脏': [
		'脏',
		'髒',
		'臟',
	],

	'发': [
		'髮',
		'髪',
		'发',
	],

	'髮': [
		'發',
		'发',
	],

	'慾': [
		'慾',
		'欲',
	],

	'讚': [
		'讃',
		'讚',
		'贊',
		'赞',
		'賛',
	],

	'冲': [
		'冲',
		'沖',
		'衝',
	],

	'面': [
		'麵',
		'麪',
		'麺',
	],

	'鬚': [
		'鬚',
		'須',
		'须',
	],

	'揹': [
		'揹',
		'背',
	],

	'捲': [
		'捲',
		'卷',
		'巻',
	],

	'卷': [
		'捲',
		'卷',
		'巻',
		'劵',
		'券',
	],

	'巻': [
		'捲',
		'卷',
		'巻',
		'劵',
		'券',
	],

	'苏': [
		'苏',
		'蘇',
		'甦',
	],

	'瀏': [
		'瀏',
		'浏',
		'刘',
	],
	'浏': [
		'瀏',
		'浏',
		'刘',
	],

	'吁': [
		'籲',
		//'龥',
		'吁',
	],

	'囉': [
		'囉',
		'啰',
		'罗',
		'羅',
	],

	'啰': [
		'囉',
		'啰',
		'罗',
		'羅',
	],

	'修': [
		'修',
		'俢',
	],

	'犟': [
		'犟',
		'強',
		'强',
	],

	'嗬': [
		'嗬',
		'呵',
	],

	'唿': [
		'唿',
		'呼',
	],

	'媮': [
		'媮',
		'偷',
	],

	'采': [
		'采',
		'採',
		//'埰',
	],

	'彩': [
		'彩',
		'采',
	],

	'𠩺': [
		'𠩺',
		'釐',
	],

};

/**
 * 此表內符合以下任意值時會觸發
 */
export let table_plus = {
	'劍': [
		'劍',
		'剑',
		'剣',
		'劎',
		'劒',
		'剱',
		'劔',
	],
	'砲': [
		'砲',
		'炮',
	],
	'偽': [
		'偽',
		'僞',
	],
	'內': [
		'內',
		'内',
	],
	'鬥': [
		'鬭',
		'鬥',
		'闘',
		'鬪',
		//'斗',
	],
	'鶏': [
		'鶏',
		'鷄',
		'雞',
		'鸡',
	],
	'兎': [
		'兎',
		'兔',
	],
	'坏': [
		'坯',
		'坏',
		"壊",
		"壞",
	],
	'殻': [
		'殻',
		'殼',
		'壳',
	],
	'像': [
		'像',
		'象',
	],
	'蘇': [
		'苏',
		'蘇',
		'囌',
	],
	'館': [
		'館',
		'館',
		'舘',
		'馆',
	],
	'鳥': [
		'鳥',
		'鸟',
		'𫠓',
	],
	'視': [
		'視',
		'視',
		'视',
		'眎',
	],
	'険': [
		'険',
		'險',
		'险',
		'嶮',
		'崄',
	],
	'絶': [
		'絶',
		'絕',
		'绝',
	],
	'鉄': [
		'鉄',
		'鐵',
		'铁',
		'鐡',
	],
	'諸': [
		'諸',
		'諸',
		'诸',
	],
	'尋': [
		'尋',
		'寻',
		'𡬶',
	],
	'裡': [
		'裡',
		'裏',
		'里',
	],
	'鑑': [
		'鑑',
		'鉴',
		'鑒',
	],
	'麵': [
		'麵',
		'麪',
		'麺',
	],
	'歲': [
		'歲',
		'歳',
		'岁',
	],
	// https://zh.wikipedia.org/wiki/%E9%8D%BE%E5%A7%93
	'鐘': [
		'鐘',
		'鍾',
		'钟',
		'锺',
	],
	'會': [
		'會',
		'会',
		'㑹',
	],
	'塗': [
		'塗',
		'凃',
		'涂',
	],

	'髮': [
		'髮',
		'髪',
		//'发',
	],

	'話': [
		'話',
		'话',
		'䛡',
	],

	'閤': [
		'閤',
		'阁',
	],

	'蔘': [
		'蔘',
		'參',
		'参',
	],

	'労': [
		'労',
		'勞',
		'劳',
	],

	'国': [
		'国',
		'囯',
		'國',
	],

	'罵': [
		'罵',
		'骂',
		'駡',
	],

	'対': [
		'対',
		'對',
		'对',
	],

	'鏽': [
		'鏽',
		'銹',
		'锈',
	],

	'駄': [
		'駄',
		'䭾',
		'馱',
		'驮',
	],

	'薩': [
		'薩',
		'萨',
		'蕯',
	],

	'単': [
		'単',
		'單',
		'单',
	],

	'継': [
		'継',
		'繼',
		'继',
	],

	'驗': [
		'驗',
		'验',
		'騐',

		'験',
	],

	'歴': [
		'歴',
		'歷',
		//'暦',
		//'曆',
	],

	'暦': [
		//'歴',
		//'歷',
		'暦',
		'曆',
	],

	'団': [
		'团',
		'団',
		'團',
	],

	'麼': [
		'麼',
		'麽',
		'庅',
	],

	'戰': [
		'戦',
		'戰',
		'战',
	],

	'乡': [
		'郷',
		'鄕',
		'鄉',
		'鄊',
		'乡',
	],

	'勉': [
		'勉',
		'勉',
	],

	'餘': [
		'餘',
		'馀',
		'余',
	],

	'網': [
		'網',
		'䋄',
		'䋞',
		'网',
	],

	'託': [
		'託',
		'讬',
		'侂',
		'托',
	],

	'纖': [
		'纖',
		'纤',
		'縴',
		'繊',
	],

	'鍊': [
		'鍊',
		'錬',
		'𫔀',

		'炼',
		'煉',
	],

	'擊': [
		'撃',
		'擊',
		'击',
	],

	'實': [
		'實',
		'実',
		'实',
		'寔',
	],

	'於': [
		'於',
		'扵',
	],

	'證': [
		'證',
		'証',
		'证',
	],

	'據': [
		'據',
		'据',
		'拠',
	],

	'處': [
		'處',
		'处',
		'䖏',
		'処',
	],

	'瞪': [
		'瞪',
		'瞠',
		'眙',
	],

	'肢': [
		'肢',
		'胑',
	],

	'肉': [
		'肉',
		'宍',
		'𠕎',
	],

	'憂': [
		'憂',
		'𢝊',
		'𢚧',
		'𢟜',
		'懮',
		'𨗫',
	],

	'繫': [
		'繫',
		//'系',
		'繋',
	],

	'廻': [
		'廻',
		'迴',
	],

	'録': [
		'録',
		'錄',
		'录',
	],

	'鎗': [
		'鎗',
		'槍',
		'枪',
	],

	'悠': [
		'悠',
		'滺',
	],

	'壶': [
		'壶',
		'壺',
		'壷',
	],

	'茲': [
		'茲',
		'兹',
		'玆',
	],

	'蓋': [
		'蓋',
		'盖',
		'葢',
	],

	'蹟': [
		'蹟',
		'跡',
		'迹',
	],

	'癒': [
		'癒',
		'瘉',
	],

	'辺': [
		'辺',
		'邊',
		'边',
		'邉',
	],

	'準': [
		'準',
		'凖',
	],

	'衛': [
		'衛',
		'衞',
		'卫',
	],

	'晚': [
		'晚',
		'晩',
	],

	'裸': [
		'裸',
		'躶',
	],

	'亀': [
		'亀',
		'龜',
		'龟',
		'𪚧',
		'𪚿',
		'𠃾',
	],

	'凼': [
		'凼',
		'氹',
	],

	'艸': [
		'艸',
		'草',
	],

	'札': [
		'箚',
		'剳',
	],

	'复': [
		'复',
		'復',
		'複',
	],

	'污': [
		'污',
		'汙',
		'汚',
	],

	'伙': [
		'伙',
		'夥',
	],

	'御': [
		'御',
		'禦',
	],

	'鬱': [
		'鬱',
		'郁',
	],

	'淩': [
		'淩',
		'凌',
	],

	'紮': [
		'紮',
		'扎',
	],

	'痴': [
		'痴',
		'癡',
	],

	'栖': [
		'栖',
		'棲',
	],

	'犇': [
		'犇',
		'奔',
	],

	'範': [
		'範',
		'范',
	],

	'薑': [
		'薑',
		'姜',
		'葁',
	],

	'樸': [
		'樸',
		'朴',
	],

	'諮': [
		'諮',
		'谘',
		'咨',
	],

	'撚': [
		'撚',
		'捻',
	],

	'喂': [
		'喂',
		'餵',
		'餧',
	],

	'淨': [
		'淨',
		'凈',
		'净',
	],

	'栗': [
		'栗',
		'慄',
	],

	'挽': [
		'挽',
		'輓',
	],

	'灶': [
		'灶',
		'竈',
	],

	'線': [
		'線',
		'缐',
		'綫',
		'线',
	],

	'盡': [
		'盡',
		'尽',
		'儘',
	],

	'黴': [
		'黴',
		'霉',
	],

	'周': [
		'周',
		'週',
	],

	'並': [
		'並',
		'并',
		'併',
	],

	'讚': [
		'讚',
		'讃',
	],

	'観': [
		'観',
		'觀',
		'观',
		'覌',
	],

	'遊': [
		'遊',
		'游',
	],

	'启': [
		'启',
		'啓',
		'啟',
		'啔',
	],

	'廄': [
		'廄',
		'厩',
		'廐',
		'廏',
	],

	'氣': [
		'気',
		'氣',
		'气',
	],

	'欲': [
		'慾',
		'欲',
	],

	'傑': [
		'傑',
		'杰',
	],

	'鍛': [
		'鍛',
		'锻',
		'煅',
	],

	'徵': [
		'徵',
		'徴',
	],

	'閒': [
		'閒',
		'𫔮',
		'閑',
		'闲',
	],

	'贊': [
		'贊',
		'赞',
		'賛',
	],

	'櫻': [
		'櫻',
		'桜',
		'樱',
	],

	'尨': [
		'尨',
		'狵',
	],

	'圈': [
		'圈',
		'圏',
	],

	'凶': [
		'凶',
		'兇',
	],

	'浜': [
		'浜',
		'濱',
		'滨',
	],

	'煙': [
		'煙',
		'烟',
		'菸',
	],

	'黒': [
		'黒',
		'黑',
	],

	'樂': [
		'樂',
		'乐',
		'楽',
	],

	'薬': [
		'薬',
		'藥',
		'药',
	],

	'劵': [
		'劵',
		'券',
		'卷',
	],

	'貳': [
		'貳',
		'贰',
		'弐',
		'貮',
		'𢎐',
		'二',
	],

	'隷': [
		'隷',
		'隸',
		'隶',
	],

	'姫': [
		'姫',
		'姬',
	],

	'燻': [
		'燻',
		'熏',
	],

	'籲': [
		'籲',
		'龥',
	],

	'齧': [
		'齧',
		'啮',
		'𪘂',
		'囓',
		'噛',
		'嚙',
	],

	'鹼': [
		'鹼',
		'碱',
		'硷',
	],

	'咸': [
		'咸',
		'鹹',
	],

	'穗': [
		'穗',
		'穂',
	],

	'廢': [
		'廢',
		'廃',
		'废',
	],

	'蹠': [
		'蹠',
		'跖',
	],

	'吒': [
		'吒',
		'咤',
	],

	'剷': [
		'剷',
		'鏟',
		'铲',
		'刬',
		'剗',
	],

	'擗': [
		'擗',
		'劈',
	],

	'核': [
		'核',
		'覈',
	],

	'脣': [
		'脣',
		'唇',
		'唇',
	],

	'升': [
		'升',
		'昇',
	],

	'磐': [
		'磐',
		'盤',
		'盘',
	],

	'溪': [
		'溪',
		'渓',
	],

	'谿': [
		'谿',
		'嵠',
	],

	'折': [
		'折',
		'摺',
	],

	'祐': [
		'祐',
		'佑',
	],

	'瓮': [
		'瓮',
		'罋',
		'甕',
	],

	'蹤': [
		'蹤',
		'踪',
		'踨',
	],

	'暗': [
		'闇',
		'暗',
	],

	'昵': [
		'昵',
		'暱',
	],

	'布': [
		'布',
		'佈',
	],

	'為': [
		'為',
		'为',
		'爲',
	],

	'綳': [
		'綳',
		'繃',
		'绷',
	],

	'痺': [
		'痺',
		'痹',
	],

	'痲': [
		'痲',
		'痳',
	],

	'雇': [
		'雇',
		'僱',
	],

	'敘': [
		'敘',
		'叙',
		'敍',
	],

	'盪': [
		'盪',
		'蕩',
		'荡',
	],

	'勛': [
		'勛',
		'勳',
		'勋',
	],

	'祕': [
		'祕',
		'秘',
	],

	'牆': [
		'牆',
		'墙',
		'墻',
	],

	'爾': [
		'爾',
		'尔',
		'尓',
	],

	'焰': [
		'焰',
		'焔',
	],

	'默': [
		'默',
		'黙',
	],

	'壓': [
		'壓',
		'压',
		'圧',
	],

	'廸': [
		'廸',
		'迪',
	],

	'曉': [
		'曉',
		'晓',
		'暁',
	],

	'霸': [
		'霸',
		'覇',
	],

	'霊': [
		'霊',
		'靈',
		'灵',
	],

	'泪': [
		'泪',
		'涙',
		'淚',
	],

	'牺': [
		'牺',
		'犠',
		'犧',
	],

	'藉': [
		'藉',
		'耤',
	],

};

Object.keys(table_plus)
	.forEach(function (key)
	{
		table_plus[key] = array_unique(table_plus[key]);

		table_plus[key].forEach(function (s)
		{
			table_plus[s] = table_plus[key];
		})
	})
;

// @ts-ignore
table_jp = deepmerge(table_jp, table_plus);

Object.keys(table_jp)
	.forEach(function (key)
	{
		table_jp[key] = array_unique(table_jp[key]);
	})
;

export interface ISimpleTable
{
	[key: string]: string,
}

export let _table_cn: ISimpleTable = _update({}, _table_tw);

export function _update(target: ISimpleTable, source: ISimpleTable): ISimpleTable
{
	target = Object.keys(source)
		.reduce(function (a, b)
		{
			a[source[b]] = b;

			return a;
		}, {})
	;

	return target;
}

export function _get(arr: string[], value: string | string[], ...values: Array<string | string[]>): string[]
{
	let ret: string[] = []
		.concat(value)
		.concat(...values)
		.filter(function (v)
		{
			return v;
		})
	;

	//ret.length && ret.sort();

	return ret;
}

export function jp(char: string, options: IOptions = {}): string[]
{
	let a: string[] = [];
	a = _get(a, table_jp[char]);

	return a;
}

export function tw(char: string, options: IOptions = {}): string[]
{
	let a: string[] = [];

	a = _get(a, _table_tw[char], cn2tw(char, options));

	//console.log('cn2tw', char, a);

	return a;
}

export function cn(char: string, options: IOptions = {}): string[]
{
	let a: string[] = [];

	a = _get(a, _table_cn[char], tw2cn(char, options));

	//console.log('tw2cn', char, a);

	return a;
}

export default exports as typeof import('./table');
