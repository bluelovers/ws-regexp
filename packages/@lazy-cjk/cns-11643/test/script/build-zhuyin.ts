/**
 * Created by user on 2020/5/30.
 */

import LineByLine from '@lazy-node/readlines'
import { join, resolve } from "path";
import { outputFileSync, outputFile, outputJSON } from 'fs-extra';
import uni2cns from '../../lib/uni2cns';
import cns2uni from '../../lib/cns2uni';
import sortObjectKeys from 'sort-object-keys2';

const __root = join(__dirname, '../..');
const __unzip = join(__root, 'test', 'cache', 'unzip');

let cns2zhuyin = {};
let uni2zhuyin = {};
let zhuyin2cns = {};
let zhuyin2uni = {};

for (let line of LineByLine.generator(join(__unzip, `Open_Data/Properties/CNS_phonetic.txt`)))
{
	let [cns, zhuyin] = line.toString().split(`\t`);

	let uni = cns2uni(cns);

	cns2zhuyin[cns] = zhuyin;
	uni2zhuyin[uni] = zhuyin;

	zhuyin2cns[zhuyin] = zhuyin2cns[zhuyin] || [];
	zhuyin2uni[zhuyin] = zhuyin2uni[zhuyin] || [];

	zhuyin2cns[zhuyin].push(cns);
	zhuyin2uni[zhuyin].push(uni);

}

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
