import zhRegExp, { ParserEventEmitterEvent } from '../index';
import ParserEventEmitter from 'regexp-parser-event';

describe(`^(?:戰記)$`, () =>
{
	const source = `^(?:戰記)$`;
	const expected = /^\^\(\?:\[[^\[\]]{2,}\]\[[^\[\]]{2,}\]\)\$$/;

	test(`base`, () =>
	{

		let actual = new zhRegExp(source, '', {
			greedyTable: true,
		});

		expect(actual.source).toMatch(expected);
		expect(actual.source).not.toStrictEqual(source);

		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`event.on`, () =>
	{

		let bool: boolean;

		let actual = new zhRegExp(source, '', {
			greedyTable: true,
			on: {
				[ParserEventEmitterEvent.change](ast, event)
				{
					/*
					console.dir({
						ast,
						event,
					});
					 */

					expect({
						event,
						ast,
					}).toMatchSnapshot();

					bool = true;
				},
			},
		});

		expect(actual.source).toMatch(expected);
		expect(actual.source).not.toStrictEqual(source);

		expect(bool).toBeTruthy();

		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

})

describe(`check Punctuation`, () =>
{

	const actual = new zhRegExp(/([\p{Punctuation}])/u);
	const expected = /([\p{Punctuation}])/u;

	test(`base`, function ()
	{
		expect(actual.source).toStrictEqual(expected.source)
		;
		expect(actual).toMatchSnapshot();
	});

	test(`，`, function ()
	{
		let str = `，`;

		expect(actual.test(`，`)).toStrictEqual(expected.test(str));
		expect(actual.test(`，`)).toMatchSnapshot();
	});

})

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

			expect(actual).toStrictEqual(expected);

			let r1 = new zhRegExp(expected, 'u');
			let r2 = new zhRegExp(actual, 'u');

			/*
			console.dir({
				actual,
				r1,
				r2,
			});
			 */

			expect(r1.source)
				.toStrictEqual(r2.source)
			;

			expect(actual).toMatchSnapshot();
			expect(ev).toMatchSnapshot();

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
			expect(expected).toMatch(r1);
			expect(expected).toMatch(r2);
			expect(r1.source).not.toEqual(expected);
			expect(r2.source).not.toEqual(expected);

			expect(actual).toMatchSnapshot();
		});
	}

});

test(`not change`, function ()
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

	expect(bool).toBeFalsy();
	expect(actual).toMatchSnapshot();
});
