/**
 * Created by user on 2019/5/26.
 */

/// <reference types="mocha" />
/// <reference types="chai" />
/// <reference types="node" />

import { chai, relative, expect, path, assert, util, mochaAsync } from './_local-dev';
import zhRegExp, { ParserEventEmitterEvent } from '..';
import { EventEmitter } from 'events';
import ParserEventEmitter from 'regexp-parser-event';

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

		// @ts-ignore
		it(`check \\p{Punctuation}`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let actual = new zhRegExp(/([\p{Punctuation}])/u);
			let expected = /([\p{Punctuation}])/u;

			expect(actual.source)
				.equal(expected.source)
			;

			let str = `，`;

			expect(actual.test(`，`)).is.eq(expected.test(str));
		});

	})

	// @ts-ignore
	describe(`simple test regex is not break`, () =>
	{

		[
			`麻#_@_#痹`,
			`国國`,
		].forEach(v => _simpleTest002(v));

		[
			'(^|[^\\w\'’])(\\d+(?:,\\d+)*)(?![\\w\'’])',
			/国|國/.source,
		].forEach(v => _simpleTest001(v));

		function _simpleTest001(expected: string, cb?: (data: {
			expected: string,
			actual,
			r1,
			r2,
			ev,
		}) => any)
		{
			it(expected, async function ()
			{
				let ev = ParserEventEmitter.create(expected, 'u');
				ev.resume();

				let actual = ev.getSource(true);

				expect(actual).deep.equal(expected);

				let r1 = new zhRegExp(expected, 'u');
				let r2 = new zhRegExp(actual, 'u');

				console.dir({
					actual,
					r1,
					r2,
				});

				expect(r1.source)
					.deep.equal(r2.source)
				;

				if (cb)
				{
					await cb({
						expected,
						actual,
						r1,
						r2,
						ev,
					})
				}

			});

		}

		function _simpleTest002(expected: string)
		{
			_simpleTest001(expected, ({
				expected,
				actual,
				r1,
				r2,
				ev,
			}) => {
				expect(expected).match(r1);
				expect(expected).match(r2);
				expect(r1.source).not.equal(expected);
				expect(r2.source).not.equal(expected);
			});
		}

	});
});
