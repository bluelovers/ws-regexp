/**
 * Created by user on 2020/7/1.
 */

import FastGlob from '@bluelovers/fast-glob';
import { join, parse } from 'path';
import { outputFile } from 'fs-extra';
import emitTsFiles from 'build-ts-file';

const __root = join(__dirname, '../..');

FastGlob
	.async<string>([
	'!*.d.ts',
	'*.ts',
], {
	cwd: join(__root, 'lib', 'api'),
})
	.then(async (ls) => {

		let record = {
			all: [] as string[],
		}

		ls.sort();

		let lines = [] as string[];

		lines.push('');

		ls.forEach(row => {

			let name = parse(row).name;

			if (name.startsWith('_'))
			{
				return;
			}

			record.all.push(name)

			lines.push(`import ${name} from './api/${name}';`)

		});

		lines.push('');

		record.all.forEach(name => {

			lines.push(`export { ${name} }`)

		})

		lines.push('');

		let file = join(__root, 'lib', 'api.ts');

		await outputFile(file, lines.join(`\n`));

		await emitTsFiles(file, {
			verbose: true,
		});

	})
;
