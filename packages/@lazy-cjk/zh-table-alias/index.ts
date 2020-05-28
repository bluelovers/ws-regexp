import { _get } from './lib/util/core';
import { table_jp, _table_cn } from './lib/table';
import { _table_tw } from './lib/table/raw';
import { IOptions } from '@lazy-cjk/zh-convert/lib/types';
import { cn2tw, tw2cn } from '@lazy-cjk/zh-convert';

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

export default exports as typeof import('./index');
