/**
 * Created by user on 2019/6/15.
 */

import mergeWith = require('lodash/mergeWith');
import isArray = require('lodash/isArray');
import { IOptions, IOptionsInput, IOptionsRuntime, SymDefaults } from './core';
import { array_unique_overwrite } from 'array-hyper-unique';
import { INodeInput } from 'regexp-parser-event';
import zhRegExp from '../index';

export function customizer(objValue, srcValue)
{
	if (isArray(objValue))
	{
		return objValue.concat(srcValue);
	}
}

export function getSettingOptions(str, flags = null, options: IOptionsInput | string = {}, ...argv)
{
	if (flags !== null && typeof flags == 'object')
	{
		options = Object.assign({}, flags) as IOptions;
		flags = options.flags || null;
	}

	if (typeof options == 'string')
	{
		options = {
			skip: options,
		} as IOptions;
	}

	if (typeof options.flags == 'string')
	{
		flags = options.flags;
	}

	return {
		str,
		flags,
		options,
		argv,
	}
}

export function mergeOptions<T extends INodeInput = INodeInput>(base: IOptionsInput<T> = {} as IOptionsInput<T>,
	...opts: IOptionsInput<T>[]
): IOptionsRuntime<T>
{
	let arr = [base || {}]
		.concat(opts)
		.filter(o => o)
	;

	if (arr.length > 1)
	{
		base = (mergeWith as Function)(...arr.map(o =>
		{
			return fixOptions(o);
		}) as [T, T], customizer);
	}

	return fixOptions(base);
}

/*
export function MergeDefaultOptions(target: typeof zhRegExp): typeof zhRegExp
{
	const zhRegExpNew = class zhRegExp extends target
	{
		constructor(...args: [any, ...any[]])
		{
			let { str, flags, options, argv } = getSettingOptions(...args);

			options = mergeOptions({}, zhRegExpNew[SymDefaults], options);

			super(str, flags, options, ...argv)
		}
	};

	return zhRegExpNew
}
 */

export function fixOptions<T extends INodeInput = INodeInput>(options?: IOptionsInput<T>): IOptionsRuntime<T>
{
	if (options.on)
	{
		if (Array.isArray(options.on))
		{
			array_unique_overwrite(options.on);
		}
		else
		{
			options.on = [options.on];
		}

		options.on = options.on.filter(v => v);
	}

	// @ts-ignore
	return options
}

export default mergeOptions
