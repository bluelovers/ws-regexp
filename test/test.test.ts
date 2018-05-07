/**
 * Created by user on 2018/5/7/007.
 */

import core, { surrogatePair, toHex, toUnicode } from '../index';
import { chai, relative, expect, path, assert, util, mochaAsync } from './_local-dev';

// @ts-ignore
import { ITest } from 'mocha';
//import { describe, before, beforeEach, it, ITest } from 'mocha';

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest: ITest;

	beforeEach(function ()
	{
		currentTest = this.currentTest as ITest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
	describe(`𠮷`, () =>
	{
		const c = '𠮷';

		[
			c,
			core.toUnicode(c),
			core.toUnicode(c, true),
		].forEach(function (s)
		{
			const r = new RegExp(`^[${s}]$`, 'u');

			it(r.toString(), function ()
			{
				expect(r.test(c)).to.be.ok;
			});
		});

		it(`codePointAt`, async function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let actual;
			let expected;

			let r = c.codePointAt(0);

			expect(r).to.be.deep.equal(0x20bb7);
			expect(toUnicode(r)).to.be.deep.equal('\\u{20bb7}');

			//expect(actual).to.be.ok;
			//expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

			//done();
		});

		it(`surrogatePair`, async function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let actual;
			let expected;

			let r = surrogatePair(c.codePointAt(0));

			let c0 = c.charCodeAt(0);
			let c1 = c.charCodeAt(1);

			expect(r[0]).to.be.deep.equal(c0);
			expect(r[1]).to.be.deep.equal(c1);

			expect(r.h).to.be.deep.equal(c0);
			expect(r.l).to.be.deep.equal(c1);

			let [m0, m1] = r;

			expect([m0, m1]).to.be.deep.equal([c0, c1]);

			expect(toHex(r[0])).to.be.deep.equal('d842');
			expect(toHex(r[1])).to.be.deep.equal('dfb7');

			//expect(actual).to.be.ok;
			//expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

			//done();
		});
	});
});
