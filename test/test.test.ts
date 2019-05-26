/**
 * Created by user on 2019/5/26.
 */

/// <reference types="mocha" />
/// <reference types="chai" />
/// <reference types="node" />

import { chai, relative, expect, path, assert, util, mochaAsync } from './_local-dev';
import zhRegExp, { ParserEventEmitterEvent } from '..';
import { EventEmitter } from 'events';

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

		// @ts-ignore
		it(`event.on`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let bool: boolean;

			let actual = new zhRegExp(`^(?:戰記)$`, '', {
				greedyTable: true,
				on: {
					[ParserEventEmitterEvent.change](ast, event)
					{
						console.dir({
							ast,
							event,
						});

						bool = true;
					}
				}
			});
			let expected = /^\^\(\?:\[[^\[\]]{2,}\]\[[^\[\]]{2,}\]\)\$$/;

			expect(actual.source)
				.match(expected)
				.not
				.equal(`^(?:戰記)$`)
			;

			expect(bool).is.ok;
		});

		// @ts-ignore
		it(`not change`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let bool: boolean;

			let actual = new zhRegExp(`111`, '', {
				greedyTable: true,
				on: {
					[ParserEventEmitterEvent.change](ast, event)
					{
						bool = true;
					}
				}
			});

			expect(bool).not.ok;
		});

	});
});
