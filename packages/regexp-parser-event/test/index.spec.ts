import { ParserEventEmitterEventList, ParserEventEmitterEvent, ParserEventEmitter } from '../index';

test(`ParserEventEmitterEventList`, () =>
{

	let actual = ParserEventEmitterEventList;
	// @ts-ignore
	let expected = Object.keys(ParserEventEmitterEvent);

	expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();

});

test('(^|[^\\w\'’])(\\d+(?:,\\d+)*)(?![\\w\'’])', () =>
{

	const str: string = '(^|[^\\w\'’])(\\d+(?:,\\d+)*)(?![\\w\'’])';

	let ev = ParserEventEmitter.create(str, 'u');
	ev.resume();

	let actual = ev.getSource(true);
	let expected = str;

	expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();

});

test(`麻#_@_#痹`, () =>
{

	const str: string = `麻#_@_#痹`;

	let ev = ParserEventEmitter.create(str, 'u');
	ev.resume();

	let actual = ev.getSource(true);
	let expected = str;

	expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();

});
