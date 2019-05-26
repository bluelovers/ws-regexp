/**
 * Created by user on 2019/5/26.
 */

/// <reference types="mocha" />
/// <reference types="chai" />
/// <reference types="node" />

import { chai, relative, expect, path, assert, util, mochaAsync } from './_local-dev';
import zhRegExp from '..';

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest: Mocha.Test;

	beforeEach(function ()
	{
		currentTest = this.currentTest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
	describe(`suite`, () =>
	{
		// @ts-ignore
		it(`^(?:戰記)$`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let actual = new zhRegExp(`^(?:戰記)$`, '', {
				greedyTable: true,
			});
			let expected = /^\^\(\?:\[[^\[\]]{2,}\]\[[^\[\]]{2,}\]\)\$$/;

			expect(actual.source)
				.match(expected)
				.not
				.equal(`^(?:戰記)$`)
			;
		});

	});
});
