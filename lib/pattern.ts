/**
 * Created by user on 2018/4/26/026.
 */

export const PatternSupport = {
	namedCapturingGroups: false,
};

export const PatternTest: {
	[k in keyof typeof PatternSupport]?: {
		0: string,
		1: string,
		2: string,
		3: boolean | any,
		4?: string | IPatternTestFn,
	}[]
} = {
	namedCapturingGroups: [
		['U\\+(?<naïve嬢の日常>[0-9A-F]{4})', '', 'U+2620', {
			groups: { 'naïve嬢の日常': '2620' },
		}, function (r, value, input)
		{
			let ret = r.exec(input) as RegExpExecArray & {
				groups: {
					[key: string]: string,
				}
			};

			return ret.groups && Object
				.entries(ret.groups)
				.every(function (v)
				{
					let [key, v1] = v;
					let v2 = value.groups[key];

					//console.log(key, v1, v2, v1 === v2);

					return v1 === v2;
				})
			;
		}],
	],
};

export interface IPatternTestFn
{
	(r: RegExp, value: any, input: string, pattern: string, RegExpClass: typeof RegExp, flag: string): boolean,
}

export function testPattern(name: string, RegExpClass: typeof RegExp = RegExp, testPattern = PatternTest)
{
	if (testPattern[name] && testPattern[name].length)
	{
		let bool: boolean = false;

		try
		{
			bool = testPattern[name].every(function (v)
			{
				let [pattern, flag, input, value, fn] = v;
				let bool: boolean;

				let r = new RegExpClass(pattern, flag);

				if (fn)
				{
					if (typeof fn == 'function')
					{
						bool = (fn as IPatternTestFn)(r, value, input, pattern, RegExpClass, flag);
					}
					else
					{
						bool = r[fn](input) === value;
					}
				}
				else
				{
					bool = r.exec(input) === value;
				}

				//console.log(bool);

				return bool;
			}) === true;

			//console.log(bool);
		}
		catch (e)
		{
			bool = false;
		}

		return bool;
	}

	return null;
}

export default PatternSupport;
