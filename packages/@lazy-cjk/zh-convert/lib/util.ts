import { IOptions } from './types';
import { SAFE_MODE_CHAR, defaultOptions, REGEXP_TEST } from './const';

export function getOptionsSkip(options: IOptions, skip = SAFE_MODE_CHAR)
{
	if (!options.skip)
	{
		options.skip = skip.slice();
	}
	else if (typeof options.skip == 'string')
	{
		options.skip += skip.join('');
	}
	else if (Array.isArray(options.skip))
	{
		options.skip = options.skip.slice().concat(skip);
	}
	else
	{
		options.table = skip.reduce(function (a, b)
		{
			a[b] = b;

			return a;
		}, Object.assign({}, options.table || {}));
	}

	return options;
}

export function getOptions(options: IOptions = {}, defaultOpts = defaultOptions, skip = SAFE_MODE_CHAR)
{
	options = Object.assign({}, defaultOpts, options);

	if (options.safe)
	{
		options = getOptionsSkip(options, skip);

		//console.log(options);
	}

	return options;
}

export function _call(fn, text: string, options: IOptions = {}, ...argv)
{
	options = getOptions(options);

	if (options.skip || options.table || options.tableOnly)
	{
		let { skip, table, tableOnly } = options;
		let not_tableOnly = !tableOnly;

		if (tableOnly && !table)
		{
			throw new Error(`table is ${table}`);
		}

		return text.replace(REGEXP_TEST, function (text)
		{
			if (skip && skip.indexOf(text) !== -1)
			{
				return text;
			}
			else if (table && typeof table == 'function')
			{
				let ret = table(fn, text, options, ...argv);

				if (ret !== null && typeof ret != 'undefined')
				{
					return ret;
				}
			}
			else if (table && table[text])
			{
				return table[text];
			}
			else if (not_tableOnly)
			{
				return fn(text);
			}

			return text;
		});
	}

	return fn(text, options, ...argv);
}
