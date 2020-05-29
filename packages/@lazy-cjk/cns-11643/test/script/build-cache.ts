/**
 * Created by user on 2020/5/29.
 */

import LineByLine from '@lazy-node/readlines'
import { join, resolve } from "path";
import { outputFileSync, outputFile, outputJSON } from 'fs-extra';

const __root = join(__dirname, '../..');
const __unzip = join(__root, 'test', 'cache', 'unzip');

buildPinyin({
	file: join(`Open_Data/Properties`, `CNS_pinyin_1.txt`),
	name: `pinyin_01.json`,
	dir: join(__root, 'lib', 'cns', 'pinyin'),
})

buildPinyin({
	file: join(`Open_Data/Properties`, `CNS_pinyin_2.txt`),
	name: `pinyin_02.json`,
	dir: join(__root, 'lib', 'cns', 'pinyin'),
})

buildCNS2UNICODE({
	file: join(`Open_Data/MapingTables/Unicode`, `CNS2UNICODE_Unicode BMP.txt`),
	name: `bmp`,
	dir: join(__root, 'lib', 'cns', 'unicode'),
})

buildCNS2UNICODE({
	file: join(`Open_Data/MapingTables/Unicode`, `CNS2UNICODE_Unicode 2.txt`),
	name: `2`,
	dir: join(__root, 'lib', 'cns', 'unicode'),
})

buildCNS2UNICODE({
	file: join(`Open_Data/MapingTables/Unicode`, `CNS2UNICODE_Unicode 15.txt`),
	name: `15`,
	dir: join(__root, 'lib', 'cns', 'unicode'),
})

function buildPinyin(options: {
	file: string,
	name: string,
	dir: string,
})
{
	let data = {};

	let src = resolve(__unzip, options.file);
	let target = resolve(options.dir, options.name);

	console.log(`load`, src)

	for (let line of LineByLine.generator(src))
	{
		let [key, ...ls] = line.toString().split(`\t`);

		data[key] = ls;
	}

	return outputJSON(target, data, {
		spaces: 2,
	})
		.then(v => console.log(`save`, target))
}

function buildCNS2UNICODE(options: {
	file: string,
	name: string,
	dir: string,
})
{
	let src = resolve(__unzip, options.file);

	console.log(`load`, src)

	let cns2unicode = {};
	let unicode2cns = {};

	for (let line of LineByLine.generator(src))
	{
		let [cns, hex] = line.toString().split(`\t`);

		let uni = Number.parseInt(hex, 16)

		cns2unicode[cns] = uni;
		unicode2cns[uni] = cns;
	}

	let target_cns2unicode = resolve(options.dir, `cns2uni.${options.name}.json`);
	let target_unicode2cns = resolve(options.dir, `uni2cns.${options.name}.json`);

	return Promise.all([
		outputJSON(target_cns2unicode, cns2unicode, {
			spaces: 2,
		}).then(v => console.log(`save`, target_cns2unicode)),
		outputJSON(target_unicode2cns, unicode2cns, {
			spaces: 2,
		}).then(v => console.log(`save`, target_unicode2cns)),
	])
}
