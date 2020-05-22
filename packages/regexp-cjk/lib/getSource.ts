import { IGetSettingOptions } from './mergeOptions';

export function parseRegularExpressionString(str: string)
{
	let m = /^([\/#$%])(.+?)\1([a-z]*)$/.exec(str);
	if (m)
	{
		let [s, d, r, f] = m;

		return {
			source: typeof r !== 'undefined' ? r : '',
			flags: typeof f !== 'undefined' ? f : '',
			slash: s,
			input: str,
		};
	}

	return null;
}

export function getRegExpSourcePattern(opts: IGetSettingOptions)
{
	const { str, options } = opts;
	const { defaultFlags } = options;

	const hasFlags = typeof opts.flags == 'string';

	let source: string;
	let flags: string;

	if (str instanceof RegExp)
	{
		({ source, flags } = str);
	}
	else if (typeof str === 'string')
	{
		let _do = true;

		if (options.parseRegularExpressionString)
		{
			let m = parseRegularExpressionString(str);

			if (m)
			{
				source = m.source;
				flags = m.flags;

				_do = false;
			}
		}

		if (_do)
		{
			source = str;
		}
	}
	else
	{
		throw new TypeError(`expected source is string or RegExp, but got '${str}', type: ${typeof str}`)
	}

	if (typeof source !== 'string')
	{
		throw new TypeError(`expected source is string, but got '${source}', type: ${typeof source}`)
	}

	flags = hasFlags ? opts.flags : flags;

	if (defaultFlags && (flags == null || flags === ''))
	{
		flags = defaultFlags;
	}

	return {
		source,
		flags,
		hasFlags,
	}
}

export default getRegExpSourcePattern
