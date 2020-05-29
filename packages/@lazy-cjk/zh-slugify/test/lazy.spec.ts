import { slugify } from '../index';

let word = `噁恶悪惡`;

test(`slugify(word)`, () =>
{

	let actual = slugify(word);
	let expected = slugify(word, true);

	console.log(actual, expected);

	expect(actual).not.toStrictEqual(word);
	expect(actual).not.toStrictEqual(expected);

});

test(`slugify(word, true)`, () =>
{

	let actual = slugify(word, true);
	let expected = slugify(word, {}, true);

	console.log(actual, expected);

	expect(actual).not.toStrictEqual(word);
	expect(actual).toStrictEqual(expected);

});
