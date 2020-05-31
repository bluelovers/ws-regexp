/**
 * Created by user on 2020/5/30.
 */

import LineByLine from '@lazy-node/readlines'
import { join, resolve } from "path";
import { outputFileSync, outputFile, outputJSON } from 'fs-extra';
import uni2cns from '../../lib/uni2cns';
import cns2uni from '../../lib/cns2uni';
import sortObjectKeys from 'sort-object-keys2';
import { IKeyToZhuyinTable, IZhuyin2uni, IZhuyin2cns, uni2char } from '../..';
import char2zhuyin_init from '../raw/uni2zhuyin';

const __root = join(__dirname, '../..');
const __unzip = join(__root, 'test', 'cache', 'unzip');

const cns2zhuyin = {} as IKeyToZhuyinTable;
const uni2zhuyin = {} as IKeyToZhuyinTable;
const zhuyin2cns = {} as IZhuyin2cns;
const zhuyin2uni = {} as IZhuyin2uni;

for (let line of LineByLine.generator(join(__unzip, `Open_Data/Properties/CNS_phonetic.txt`)))
{
	let [cns, zhuyin] = line.toString().split(`\t`);

	let uni = cns2uni(cns);

	const _cb = function (arr: IKeyToZhuyinTable): string[]
	{
		let char = uni2char(uni)
		return char2zhuyin_init[char]
	}

	_push(_init(cns2zhuyin, cns, _cb), zhuyin);
	_push(_init(uni2zhuyin, uni, _cb), zhuyin);

	_push(_init(zhuyin2cns, zhuyin), cns);
	_push(_init(zhuyin2uni, zhuyin), uni);

}

Object.values(zhuyin2cns).forEach(v => v.sort());
Object.values(zhuyin2uni).forEach(v => v.sort());

Promise.all([
	saveJSON(join(__root, 'lib', 'cns', 'zhuyin', `cns2zhuyin.json`), cns2zhuyin),
	saveJSON(join(__root, 'lib', 'cns', 'zhuyin', `uni2zhuyin.json`), uni2zhuyin),
	saveJSON(join(__root, 'lib', 'cns', 'zhuyin', `zhuyin2cns.json`), sortObjectKeys(zhuyin2cns)),
	saveJSON(join(__root, 'lib', 'cns', 'zhuyin', `zhuyin2uni.json`), sortObjectKeys(zhuyin2uni)),
])

function saveJSON(file: string, data)
{
	return outputJSON(file, data, {
		spaces: 2,
	}).then(v => console.log(`save`, file))
}

function _push<T>(arr: T[], value: T)
{
	if (!arr.includes(value))
	{
		arr.push(value);
	}
}

function _init<T extends Record<any, any[]>, K extends keyof T>(arr: T, key: K, cb?: (arr: T, key: K) => T[K])
{
	arr[key] = arr[key] ?? cb?.(arr, key) ?? [] as T[K]

	return arr[key]
}
