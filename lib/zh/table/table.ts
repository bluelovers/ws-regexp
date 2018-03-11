/**
 * Created by user on 2018/2/17/017.
 */

import { tw2cn, cn2tw } from '../convert/index';
import { array_unique } from '../../util';
import * as deepmerge from 'deepmerge-plus';

export let _table_tw = {
	'罗': '羅',
	'恶': '惡',
	'苏': '蘇',
	'馆': '館',
};

export let table_jp = {
	'の': [
		'之',
		'的',
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
	'闇': [
		'暗',
	],
	'図': [
		'図',
		'圖',
		'图',
	],
};

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

export function jp(char: string): string[]
{
	let a: string[] = [];
	a = _get(a, table_jp[char]);

	return a;
}

export function tw(char: string): string[]
{
	let a: string[] = [];

	a = _get(a, _table_tw[char], cn2tw(char));

	//console.log('cn2tw', char, a);

	return a;
}

export function cn(char: string): string[]
{
	let a: string[] = [];

	a = _get(a, _table_cn[char], tw2cn(char));

	//console.log('tw2cn', char, a);

	return a;
}

import * as self from './table';
export default self;
