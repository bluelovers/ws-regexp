/**
 * Created by user on 2019/5/27.
 */

/// <reference types="mocha" />
/// <reference types="chai" />
/// <reference types="node" />

import { chai, relative, expect, path, assert, util, mochaAsync } from './_local-dev';
import { ParserEventEmitterEvent, ParserEventEmitterEventList, ParserEventEmitter, INodeInput, IParserEventEmitterListener } from '../index';

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
		it(`ParserEventEmitterEventList`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let actual = ParserEventEmitterEventList;
			// @ts-ignore
			let expected = Object.keys(ParserEventEmitterEvent);
			// @ts-ignore
			let expected2 = Object.values(ParserEventEmitterEvent);

			expect(actual).deep.equal(expected);
			expect(actual).deep.equal(expected2);
		});

		// @ts-ignore
		it('(^|[^\\w\'’])(\\d+(?:,\\d+)*)(?![\\w\'’])', function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const str: string = '(^|[^\\w\'’])(\\d+(?:,\\d+)*)(?![\\w\'’])';

			let ev = ParserEventEmitter.create(str, 'u');
			ev.resume();

			let actual = ev.getSource(true);
			let expected = str;

			expect(actual).deep.equal(expected);
		});

		// @ts-ignore
		it(`麻#_@_#痹`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			const str: string = `麻#_@_#痹`;

			let ev = ParserEventEmitter.create(str, 'u');
			ev.resume();

			let actual = ev.getSource(true);
			let expected = str;

			expect(actual).deep.equal(expected);
		});

	});
});
