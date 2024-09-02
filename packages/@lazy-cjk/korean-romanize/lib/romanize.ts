import { decomposeHangul } from './hangul/unicode/decompose';

import { hangulReplace } from './hangul/hangulReplace';
import { EnumOptionsRomanizeMethod, IOptionsRomanize } from './types';
import { getJamoDictionary, handleRomanizeOptions, searchJamo } from './utils';

export function syllableParser(opts: IOptionsRomanize)
{
	return function (syllable: number[] | string[], idx: number, word: (number[] | string[])[])
	{
		// next subsequent initial consonant (choseong)
		const next = idx + 1 < word.length ? word[idx + 1][0] as number : undefined;
		// @ts-ignore
		const vowelNext = next === 0x110b || next === "ᄋ";

		// only exists this isn't first syllable in word
		const prev = idx > 0 ? word[idx - 1] : null;

		// previous adjacent trailing consonant (jongseong)
		const consonantPrev = prev && prev[2] ? prev[2] as number : undefined;

		return syllable.map((jamo, jamoIdx) =>
		{
			if (typeof jamo === 'string')
			{
				return jamo
			}
			else if (jamo === null)
			{
				return ''
			}

			const dict = getJamoDictionary(jamo, jamoIdx);

			if (!dict)
			{
				throw new RangeError("missing dict " + jamo);
			}

			const roman = searchJamo(dict, {
				method: opts.method,
				vowelNext: jamoIdx === 2 ? vowelNext : undefined,
				consonantPrev: jamoIdx === 0 ? consonantPrev : undefined,
				consonantNext: jamoIdx === 2 ? next : undefined,
			});

			return roman;
		});
	};
}

/**
 * only allow input korean text
 *
 * @example romanizeWord(`안녕하십니까`)
 */
export function romanizeWord(word: string, options?: EnumOptionsRomanizeMethod | IOptionsRomanize)
{
	const opts = handleRomanizeOptions(options)

	const mappedToRoman = decomposeHangul(word, opts)
		.map(syllableParser(opts))
		.reduce(
			(prevSyllables, currentSyllable) =>
				prevSyllables.concat(
					opts.hyphenate ? [...currentSyllable, "-"] : currentSyllable,
				),
			[],
		)
		.join("")
		.replace("--", "-");

	return opts.hyphenate === false
		? mappedToRoman.replace("-", "")
		: mappedToRoman.replace(/-$/, "");
}

/**
 * only handle korean text
 *
 * @example romanize(`안녕하십니까 a b c 中文`)
 */
export function romanize(text: string, options?: IOptionsRomanize)
{
	return hangulReplace(text, word => romanizeWord(word, options));
}

export default romanize
