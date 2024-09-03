import { specialKatakanizationTable, specialHiraganizationTable, hiraganaRegex, katakanaRegex } from './data/kana';

export * from './data/kana';

const chr = String.fromCharCode;
const ord = function (char: string)
{
	return char.charCodeAt(0);
};

/**
 * Convert input katakana into hiragana.
 */
export function hiraganize(string: string)
{
	return string.replace(katakanaRegex, function (katakana)
	{
		if (katakana.match(/^[\u30a1-\u30f4\u30fd\u30fe]$/))
		{
			return chr(ord(katakana) - ord('ァ') + ord('ぁ'));
		}
		else if (specialHiraganizationTable[katakana])
		{
			return specialHiraganizationTable[katakana];
		}
	});
}

/**
 * Convert input hiragana into katakana.
 */
export function katakanize(string: string)
{
	return string.replace(hiraganaRegex, function (hiragana)
	{
		if (hiragana.match(/^[\u3041-\u3094\u309d\u309e]$/))
		{
			return chr(ord(hiragana) - ord('ぁ') + ord('ァ'));
		}
		else if (specialKatakanizationTable[hiragana])
		{
			return specialKatakanizationTable[hiragana];
		}
	});
}

