/**
 * Created by User on 2019/6/15.
 */

// @ts-ignore
/// <reference types="mocha" />
// @ts-ignore
/// <reference types="benchmark" />
// @ts-ignore
/// <reference types="chai" />
// @ts-ignore
/// <reference types="node" />

import { chai, relative, expect, path, assert, util, mochaAsync, SymbolLogOutput } from './_local-dev';
import _zhRegExp from 'regexp-cjk';
import createZhRegExpCorePlugin from '../index';

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest: Mocha.Test;
	let zhRegExp: typeof _zhRegExp = _zhRegExp.use({
		flags: 'u',
		onCore: [
			createZhRegExpCorePlugin({
				/**
				 * just do it
				 */
				//escapeAll: true,
				/**
				 * auto detect do or not
				 * @default true
				 */
				escapeAuto: true,
			}),
		],
	});

	beforeEach(function ()
	{
		currentTest = this.currentTest;

		delete currentTest[SymbolLogOutput];

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	afterEach(function ()
	{
		let out = currentTest[SymbolLogOutput];
		let t = typeof out;

		if (t === 'string')
		{
			console.log(`----------`);
			console.log(out);
			console.log(`----------`);
		}
		else if (t === 'function')
		{
			out(currentTest)
		}
		else if (out != null)
		{
			console.dir(out);
		}

	});

	// @ts-ignore
	describe(`suite`, () =>
	{
		// @ts-ignore
		it(`[中文\\p{Punctuation}]`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let actual = new zhRegExp(`[中文\\p{Punctuation}]`);

			currentTest[SymbolLogOutput] = actual;

			expect('中').match(actual);
			expect('文').match(actual);
			expect(',').match(actual);
			expect('，').match(actual);
			expect('p').not.match(actual);

		});
	});
});
