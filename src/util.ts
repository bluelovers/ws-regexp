/**
 * Created by user on 2018/5/7/007.
 */

export function listRawToRange(list_range_raw)
{
	return list_range_raw.reduce(function (a, data)
	{

		let c = data.reduce(function (a, v)
		{
			let s: string | string[];

			if (typeof v == 'number')
			{
				s = String.fromCharCode(v);
			}
			else if (typeof v == 'string')
			{
				s = v;
			}
			else if (Array.isArray(v))
			{
				if (v.length == 2)
				{
					s = (new Array(v[1] - v[0]))
						.fill(0)
						.map(function (value, index, array)
						{
							return String.fromCharCode(v[0] + index);
						})
					;
				}
				else
				{
					throw new TypeError();
				}
			}
			else
			{
				throw new TypeError();
			}

			if (Array.isArray(s))
			{
				a = a.concat(s);
			}
			else
			{
				a.push(s);
			}

			return a;
		}, [] as string[]);

		a.push(c);

		//console.log(c.length);

		return a;
	}, [] as string[][])
}

import * as self from './util';
export default self;

