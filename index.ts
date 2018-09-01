/**
 * Created by user on 2018/9/1/001.
 */

import { zhRegExp } from 'regexp-cjk';
import { parseRegExp, astToString } from 'regexp-parser-literal';
import { Disjunction, RegExpLiteral, Group } from 'regexpp2/src/ast';
import { array_unique, lazy_unique } from 'array-hyper-unique';

export interface INovelPatternSplitOptions
{
	useRawString?: boolean,
	allowCapturingGroup?: boolean,
}

export function novelPatternSplit(input: string | RegExp, options: INovelPatternSplitOptions = {})
{
	let r = new zhRegExp(input, {
		// 禁用自動生成漢字數列 [一-十] 之類
		allowLocalRangeAutoZh: false,
		// 禁用自動配對異體字
		disableZh: true,
		on: {
			// 雖然是空設定 但可以用來觸發優化 regexp
		},
	});

	options = options || {};

	let p = parseRegExp(r.toString());
	let d: Disjunction;

	if (p.pattern.elements.length == 1)
	{
		let p2 = p.pattern.elements[0];

		if (p2.type === 'Disjunction')
		{
			d = p2;
		}
		else if (p2.type == 'Group'
			&& p2.elements.length == 1
			&& p2.elements[0].type === 'Disjunction')
		{
			d = p2.elements[0] as Disjunction;
		}
		else if (
			options.allowCapturingGroup
			&& p2.type == 'CapturingGroup'
			&& p2.elements.length == 1
			&& p2.elements[0].type === 'Disjunction')
		{
			d = p2.elements[0] as Disjunction;
		}
		else if (0)
		{
			console.log({
				p2,
				d,
			});
		}
	}

	let patterns: string[] = [];

	if (
		d
		&& d.type === 'Disjunction'
	)
	{
		if (d.alternatives)
		{
			let c = d.alternatives.reduce(function (a, b)
			{
				let c = b.reduce(function (a, b)
				{
					a.push(astToString(b));
					return a;
				}, []);

				a.push(c.join(''));

				return a;
			}, [] as string[]);

			if (c.length)
			{
				patterns = array_unique(c);
			}
		}
	}

	if (!patterns.length)
	{
		if (options.useRawString)
		{
			let raw = getRawString(input);

			patterns.push(typeof raw !== 'undefined' ? raw : r.source);
		}
		else
		{
			patterns.push(r.source);
		}
	}

	return patterns;
}

export function getRawString(raw: string | TemplateStringsArray | any)
{
	try
	{
		return String.raw(raw as any as TemplateStringsArray);
	}
	catch (e)
	{

	}
}

export default novelPatternSplit;
// @ts-ignore
Object.assign(novelPatternSplit, exports);
// @ts-ignore
export = novelPatternSplit;
