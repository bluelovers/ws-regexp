import slugify, { transliterate } from '../index';

let word = `不支援 𠮷𠬠𡬶𫗭𣛙𢎐 ...這類字`;

test(`slugify`, () =>
{

	let actual = slugify(word);

	console.log(actual)

	expect(actual).not.toStrictEqual(word);

});

test(`transliterate`, () =>
{

	let actual = transliterate(word);

	console.log(actual)

	expect(actual).not.toStrictEqual(word);

});

