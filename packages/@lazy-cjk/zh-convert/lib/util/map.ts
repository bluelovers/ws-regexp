import UString from 'uni-string';
import { ITable } from '../types';
import { REGEXP_TEST } from '../const';

export function charMap(s: string, table: ITable): string
{
	let t = table[s];
	return (typeof t === 'string') ? t : s
}

export function textMap1(text: string, table: ITable): string
{
	let toText = [];
	let len = text.length;

	for (let i = 0; i < len; i++)
	{
		toText[i] = charMap(text[i], table);
	}

	//console.log(toText.length, toText);
	return toText.join('')
}

export function textMap2(text: string, table: ITable): string
{
	let toText = UString.split(text, '');
	let len = toText.length;

	for (let i = 0; i < len; i++)
	{
		toText[i] = charMap(toText[i], table);
	}

	//console.log(toText.length, toText);
	return toText.join('');
}

export function textMap3(text: string, table: ITable): string
{
	let toText = text.split(/(?:)/u);
	let len = toText.length;

	for (let i = 0; i < len; i++)
	{
		toText[i] = charMap(toText[i], table);
	}

	//console.log(toText.length, toText);
	return toText.join('');
}

export function textMap4(text: string, table: ITable): string
{
	return text.replace(REGEXP_TEST, function (s)
	{
		return charMap(s, table);
	});
}

