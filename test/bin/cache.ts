import { require_default } from '../../lib/util/index';

/**
 * Created by user on 2018/5/6/006.
 */

import * as path from 'path';
import * as globby from 'globby';
import * as fs from 'fs-extra';

export const REGEXPP_PATH = path.dirname(require.resolve('regexpp2/package.json')) as string;

export const REGEXPP_PATH_DATA = path.join(REGEXPP_PATH, 'src/unicode/property-data') as string;

export const XREGEXP_PATH = path.dirname(require.resolve('xregexp/package.json')) as string;

export const XREGEXP_PATH_DATA = path.join(XREGEXP_PATH, 'tools/output') as string;

const PropertyData = require_default(REGEXPP_PATH_DATA).PropertyData;

(async () =>
{

	let output = [];
	let def = [
		'$LONE',
		'General_Category',
		'Script',
	];

	def.forEach(function (key)
	{

		//console.log(PropertyData[key]);

		let d = [...PropertyData[key]]
			.reduce(function (a, b: string)
			{
				a[b] = false;

				return a;
			}, {})
		;

		let s = JSON.stringify(d, null, "\t");

		output.push(`export const ${key} = ${s};`);

	});

	output.push(`export default { ${def.join(', ')} }`);

	let name = 'property-data';

	let file = path.join(__dirname, '../../', 'lib/pattern/cache', name + '.ts');

	fs.outputFile(file, output.join('\n\n'));

})();

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
