/**
 * Created by user on 2020/6/1.
 */

import { outputFile } from 'fs-extra';
import { join } from 'path';
import emitTsFiles from 'build-ts-file';
import { array_unique_overwrite, array_unique } from 'array-hyper-unique';

import list_names from '../../lib/table/raw/json/names.json';
import { printArray } from '../../../../../script/lib/print';

const __root = join(__dirname, '..', '..');

const __raw = join(__root, 'lib/table');

(async () =>
{

	const lines = [] as string[];

	lines.push(``);

	lines.push(`export const last_name = [\n${printArray(list_names.last_name.map(v => v[0])).sort().join(`\n`)}\n];`);

	lines.push(`export default last_name`);

	let file = join(__raw, 'last_name.ts');

	await outputFile(file, lines.join('\n\n'))

	await emitTsFiles(file)

})();

(async () =>
{

	const lines = [] as string[];

	lines.push(``);

	lines.push(`export const first_name_male = [\n${printArray(list_names.first_name.male.map(v => v[0])).sort().join(`\n`)}\n];`);

	lines.push(`export const first_name_female = [\n${printArray(list_names.first_name.female.map(v => v[0])).sort().join(`\n`)}\n];`);

	let file = join(__raw, 'first_name.ts');

	await outputFile(file, lines.join('\n\n'))

	await emitTsFiles(file)

})();
