/**
 * Created by User on 2019/7/18.
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
import zhRegExp from '../index';
import { SymDefaults } from '../lib/core';

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest: Mocha.Test;

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
		it(`defaultFlags`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const flags = 'u';

			let ro = zhRegExp.use({
				flags,
			});

			let actual = new ro(/k/).flags;
			let expected = flags;

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));
		});

		it(`當 flags != '' 時 使用 flags`, async function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const flags = 'u';

			let ro = zhRegExp.use({
				flags,
			});

			let actual = new ro(/k/, 'g').flags;
			let expected = 'g';

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));
		});

		it(`當 flags = '' 時 使用 defaultFlags`, async function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const flags = 'u';

			let ro = zhRegExp.use({
				flags,
			});

			let actual = new ro(/k/, '').flags;
			let expected = flags;

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));
		});

		it(`當使用於 zhRegExp.use 內時 自動將 flags 轉換為 defaultFlags`, async function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const flags = 'u';

			let ro = zhRegExp.use({
				flags,
			});

			let actual = ro[SymDefaults];
			let expected = flags;

			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			expect(actual.defaultFlags).to.be.deep.equal(flags);
			expect(actual.flags == null).to.be.ok;
			//assert.isOk(actual.value, util.inspect(actual));
		});

	});
});
