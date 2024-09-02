import slugify, { transliterate } from '../index';
import { IOptionsSlugify } from '../lib/types';

let word = `不支援 𠮷𠬠𡬶𫗭𣛙𢎐 ...這類字🍔\t🍕\t🍖\t🍗\t🍘\t🍙\t🍚\t🍛[Pixiv] Judo ユフォリア (5026941)(呉マサヒロ)] 高飛車な生徒会長をアプリで従順調教 ☆﹐﹑veevee˚ㆍ ㅔㅣ ㅑㅣㅗ므ㅛㅕㅇㅁ ㅇㅜㅇ ㅏㅏ Whiskers ˶˃ᆺ˂˶`;

_testFn(transliterate);
_testFn(slugify);

_testFn(transliterate, {
	emoji: true,
});
_testFn(slugify, {
	emoji: true,
});

_testFn(transliterate, {
	noStripOthers: true,
});
_testFn(slugify, {
	noStripOthers: true,
});

function _testFn(fn: typeof transliterate | typeof slugify, opts: IOptionsSlugify = {})
{
	test(`${fn.name}: ${JSON.stringify(opts)}`, () =>
	{
		let actual = fn(word, opts);

		console.dir({
			word,
			opts,
		});
		console.log(actual);

		expect(actual).not.toStrictEqual(word);

		expect(actual).toMatchSnapshot();
	})
}
