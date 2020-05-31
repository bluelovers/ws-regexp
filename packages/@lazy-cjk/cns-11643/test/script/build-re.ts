/**
 * Created by user on 2020/5/31.
 */

import { uni2zhuyin_table } from '../../lib/uni2zhuyin';
import { uni2hex } from '../..';
import { outputFile } from 'fs-extra';
import { join } from "path";

const table = uni2zhuyin_table();
const keys = Object.keys(table);
const __root = join(__dirname, '../..');

let uni_start: number;
let uni_last = 0;
let ls = [] as number[][];

for (let i = 0; i < keys.length; i++)
{
	let uni_current = parseInt(keys[i])

	if (uni_last)
	{

		if ((uni_last + 1) != uni_current)
		{

			if (typeof uni_start === 'undefined' || uni_start === uni_last)
			{
				ls.push([uni_last])
			}
			else
			{
				ls.push([uni_start, uni_last])
			}

			uni_start = uni_current;

		}

	}

	uni_last = uni_current;
}

if ((keys[keys.length - 2] as any + 1) == uni_last)
{
	ls.push([uni_start, uni_last])
}
else
{
	ls.push([uni_last])
}

console.dir(ls)

let s = ls.map(a => {

	if (a.length === 1)
	{
		return `\\u{${uni2hex(a[0])}}`
	}
	else
	{
		return `\\u{${uni2hex(a[0])}}-\\u{${uni2hex(a[1])}}`
	}

}).join('');

let re = new RegExp(`[${s}]`, `u`);

console.dir(re)

let sl = [] as string[];

sl.push('');
sl.push(`export const uniCharMatchSource = ${JSON.stringify(re.source)};`);
sl.push(`export default uniCharMatchSource;`);
sl.push('');

outputFile(join(__root, 'lib', 'const', 'uniCharMatchSource.ts'), sl.join(`\n\n`))
