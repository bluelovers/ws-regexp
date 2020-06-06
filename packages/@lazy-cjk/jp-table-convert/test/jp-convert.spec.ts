import { jp2zht, zh2jp, cjk2zht, cjk2zhs, cjk2jp, jp2zhs } from '../lib';

describe(`describe`, () =>
{
	const input = '魔物解説　ランク等話　蚀蝕蝕王で触王 冒険者ギルド解説 蚀|蝕战|戦马|馬亚|亞國預中日漢字對照表';

	[

		zh2jp,
		jp2zhs,
		jp2zht,

		cjk2jp,
		cjk2zhs,
		cjk2zht,

	].forEach(fn => {
		test(fn.name, () =>
		{

			let actual = fn(input);

			expect(actual).not.toStrictEqual(input);

			expect(actual).toMatchSnapshot();

		});
	});

})
