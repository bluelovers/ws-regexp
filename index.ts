/**
 * Created by user on 2019/3/2.
 */
import { cn2tw_min, tw2cn_min } from 'cjk-conv/lib/zh/convert/min';
import { cn2tw, tw2cn, IOptions as IOptionsCore } from 'cjk-conv/lib/zh/convert';

import FastGlob = require('fast-glob');
import fs = require('fs-extra');
import Bluebird = require('bluebird');
import JsDiff = require('diff');
import { console } from 'debug-color2';
import { crlf } from 'crlf-normalize';

export const FnList = {
	cn2tw_min, tw2cn_min,
	cn2tw, tw2cn,
};

export type IOptionsConv = {
	cwd?: string,

	tw2cn?: boolean,
	notMin?: boolean,
	unSafe?: boolean,

	createBackup?: boolean,
	createPatch?: boolean,
}

export type IOptions = FastGlob.Options<string> & IOptionsConv & {
	deep?: boolean | number,
}

export function handldTarget(search: string | string[], options?: IOptions)
{
	return Bluebird.resolve().then(() => {
		if (typeof search === 'string')
		{
			search = [search];
		}

		let _is_arr = Array.isArray(search);

		if (_is_arr)
		{
			search = search.filter(v => typeof v === 'string' && v.length)
		}

		if (!_is_arr || !search.length)
		{
			throw new Error(`search is empty or not allow`);
		}

		options = handleOptions(options);

		let idx = 0;

		return Bluebird.resolve(FastGlob.async<string>(search, {
				cwd: options.cwd,
				absolute: true,
			}))
			.tap(function (ls)
			{
				console.debug(`[info] found ${ls.length} files`);
			})
			.map(async function (file, index, arrayLength)
				{
					let label = `${idx+1}/${index+1}/${arrayLength}`;

					console.debug(`[start] (${label}) ${file}`);
					let txt_old = String(await fs.readFile(file));

					let txt_new = handleContext(txt_old, options);

					if (options.createPatch)
					{
						let data = JsDiff.createPatch(crlf(txt_old), crlf(txt_new), {
							newlineIsToken: true,
						});

						await fs.outputFile(file + '.patch', data)
					}

					if (txt_old != txt_new)
					{
						if (options.createBackup)
						{
							await fs.move(file, file + '.old', {
								// @ts-ignore
								preserveTimestamps: true,
								overwrite: false,
							})
						}

						await fs.writeFile(file, txt_new);
					}

					console.debug(`[done] (${label}) ${file}`);

					return file;
				}
			)
			.tap(function (ls)
			{
				if (ls.length)
				{
					console.success(`[end] done ${ls.length} files`);
				}
				else
				{
					console.fail(`[end] done ${ls.length} files`);
				}
			})
			;
	})
}

export function handleOptions(options: IOptions)
{
	options = options || {};

	options.tw2cn = !!options.tw2cn;
	options.notMin = !!options.notMin;
	options.unSafe = !!options.unSafe;
	options.createBackup = !!options.createBackup;
	options.createPatch = !!options.createPatch;

	options.cwd = options.cwd || process.cwd();

	return options;
}

export function handleContext(text: string, options: IOptionsConv)
{
	let fn = (options.tw2cn ? 'tw2cn' : 'cn2tw')
	+ (options.notMin ? '' : '_min')
	;

	let opts: IOptionsCore = {};

	if (options.unSafe)
	{
		opts.safe = false;
	}

	return FnList[fn](text, opts)
}

export default exports as typeof import('./index');
