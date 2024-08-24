import { ListJamoRoman } from './jamo';
import {
	EnumOptionsRomanizeMethod,
	IJamoRomanEntryCompat,
	IOptionsRomanize,
	ISearchJamoNode,
	ISearchJamoParams,
} from './types';
import { romanizeWord } from './romanize';

export function getJamoDictionary(jamo: string | number, idx: number)
{
	if (typeof jamo === 'number')
	{
		jamo = String.fromCodePoint(jamo)
	}

	return ListJamoRoman[idx].find(o => o.jamo === jamo) ||
		ListJamoRoman[idx].find(o => o.compatJamo === jamo);
}

export function searchJamo(node: ISearchJamoNode, params: ISearchJamoParams, prevNode?: ISearchJamoNode): string
{
	const { method, vowelNext, consonantNext, consonantPrev } = params || {
		method: EnumOptionsRomanizeMethod.RR,
	};

	if (typeof node === "string")
	{
		return node;
	}

	if (!node)
	{
		if (prevNode)
		{
			console.warn(prevNode);
		}
		throw new Error("No node found after" + JSON.stringify(prevNode));
	}

	// treat empty string (initial silent ieung/ㅇ as truthy)
	if (node.roman || typeof node.roman === "string")
	{
		return next(node.roman);
	}

	if (method && (node[method] || typeof node[method] === "string"))
	{
		return next(node[method]);
	}

	// @ts-ignore
	if (vowelNext && (node.vowelNext || typeof node.vowelNext === "string"))
	{
		// @ts-ignore
		return next(node.vowelNext);
	}

	if (consonantNext || consonantPrev)
	{
		const assimilation = String.fromCodePoint(consonantNext || consonantPrev);
		if (typeof node[assimilation] === "string")
		{
			return node[assimilation];
		}
		else if (node[assimilation])
		{
			return node[assimilation];
		}
	}

	// @ts-ignore
	if (node.default || typeof node.default === "string")
	{
		// @ts-ignore
		return next(node.default);
	}

	throw new Error("Unimplemented: " + JSON.stringify(node, null, 2));

	function next(nextNode: ISearchJamoNode): string
	{
		return searchJamo(nextNode, params, node);
	}
}

export function handleRomanizeOptions(options?: string | IOptionsRomanize)
{
	const { method = EnumOptionsRomanizeMethod.RR, hyphenate = method === EnumOptionsRomanizeMethod.RRT || undefined } =
		typeof options === "object" ? options : {};

	return {
		method,
		hyphenate,
	}
}

