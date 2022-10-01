export function listRawToRange(list_range_raw: (string | number | number[])[][]): string[][]
{
	return list_range_raw.reduce(function (a, data)
	{
		let c: string[] = data.reduce(function (a2: string[], v)
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
						.map(function (value, index)
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
				a2 = a2.concat(s);
			}
			else
			{
				a2.push(s);
			}

			return a2;
		}, [] as string[]);

		a.push(c);

		return a;
	}, [] as string[][])
}
