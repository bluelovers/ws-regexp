/**
 * Created by user on 2020/5/29.
 */

import JSZip from 'jszip';
import { outputFile, readFile, ensureDir, existsSync, readFileSync } from 'fs-extra';
import { join } from "path";
import Bluebird from 'bluebird';
import { parse, relative } from 'path';
import ignore from 'ignore'
import console from 'debug-color2'

const src = join(__dirname, `../cache`, 'Open_Data.zip');
const __root = join(__dirname, '..', 'cache', 'unzip');

const ig = ignore()

if (existsSync(join(__root, '..', '.gitignore')))
{
	ig.add(readFileSync(join(__root, '..', '.gitignore')).toString())
}

Bluebird.resolve(readFile(src))
	.then(buf => unzip(buf, __root))
;

function unzip(buf: ArrayBuffer | Buffer, __dir: string)
{
	return Bluebird.resolve(buf)
		.then(buf => JSZip.loadAsync(buf))
		.then(zip => Object.values(zip.files))
		.each(async (fo) =>
		{
			let dp = join(__dir, fo.name);

			let rdp = relative(__root, dp);

			if (ig.ignores(rdp))
			{
				console.gray(`[skip]`, rdp)
				return;
			}
			else
			{
				console.log(rdp);
			}

			if (fo.dir)
			{
				return ensureDir(dp);
			}
			else
			{
				let buf = await fo.async('nodebuffer')

				let fp = parse(fo.name)

				if (fp.ext === '.zip')
				{
					let dp = join(__dir, fp.dir, fp.name);

					await ensureDir(dp);

					return unzip(buf, dp)
				}

				return outputFile(dp, buf);
			}
		})
		;
}
