import { SAFE_MODE_CHAR_MIN } from '../lib/min/const';
import { tw2cn_min, cn2tw_min } from '../min';
import { SAFE_MODE_CHAR } from '../lib/const';
import { tw2cn, cn2tw } from '../index';

describe(`SAFE_MODE_CHAR_MIN`, () =>
{

	SAFE_MODE_CHAR_MIN
		.sort()
		.forEach(char => {

			test(char, () =>
			{
				expect(tw2cn_min(char)).toStrictEqual(char);
				expect(cn2tw_min(char)).toStrictEqual(char);
			});

		})
	;

})

describe(`SAFE_MODE_CHAR`, () =>
{

	SAFE_MODE_CHAR
		.sort()
		.forEach(char => {

			test(char, () =>
			{
				expect(tw2cn(char)).toStrictEqual(char);
				expect(cn2tw(char)).toStrictEqual(char);
			});

		})
	;

})
