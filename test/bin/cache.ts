import { require_default } from '../../lib/util/index';

/**
 * Created by user on 2018/5/6/006.
 */

import * as path from 'path';
import * as globby from 'globby';
import * as fs from 'fs-extra';

export const XREGEXP_PATH = path.dirname(require.resolve('xregexp/package.json')) as string;

export const XREGEXP_PATH_DATA = path.join(XREGEXP_PATH, 'tools/output') as string;

globby([
	'*.js',
], {
	cwd: XREGEXP_PATH_DATA,
})
	.then((ls: string[]) => {

		ls.forEach(async function (value)
		{
			let name = path.parse(value).name;

			let data = getData(name);

			let aa = {};

			let d = Object
				.values(data)
				.reduce(function (a, b: {
					name: string,
					alias?: string,
				})
				{
					a[b.name] = false;

					if (b.alias)
					{
						a[b.alias] = a[b.name];

						aa[b.name] = b.alias;
						aa[b.alias] = b.name;
					}

					return a;
				}, {})
			;

			let s = JSON.stringify(d, null, "\t");

			fs.outputFile(path.join(__dirname, '../../', 'lib/pattern/cache', name + '.ts'), `export default ${s};\n\nexport const NAME_ALIAS = ${JSON.stringify(aa, null, "\t")};`);
		})
	})
;

export function getData(name: string)
{
	let file = path.join(XREGEXP_PATH_DATA, name);

	return require_default(file);
}
