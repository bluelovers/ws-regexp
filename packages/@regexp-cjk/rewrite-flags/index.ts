
export interface IOptionsRewriteFlags
{
	/**
		Modifies the [`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global) property of the cloned `RegExp` instance.
	 */
	global?: boolean;

	/**
		Modifies the [`ignoreCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/ignoreCase) property of the cloned `RegExp` instance.
	 */
	ignoreCase?: boolean;

	/**
		Modifies the [`multiline`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline) property of the cloned `RegExp` instance.
	 */
	multiline?: boolean;

	/**
		Modifies the [`dotAll`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll) property of the cloned `RegExp` instance.
	 */
	dotAll?: boolean;

	/**
		Modifies the [`sticky`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky) property of the cloned `RegExp` instance.
	 */
	sticky?: boolean;

	/**
		Modifies the [`unicode`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode) property of the cloned `RegExp` instance.
	 */
	unicode?: boolean;
}

export enum EnumFlagMap
{
	global = 'g',
	ignoreCase = 'i',
	multiline = 'm',
	dotAll = 's',
	sticky = 'y',
	unicode = 'u',
}

export const flagsOrderReverse = [
	'sticky',
	'unicode',
	'dotAll',
	'multiline',
	'ignoreCase',
	'global',
] as (keyof typeof EnumFlagMap)[]

export function rewriteFlags(flags: string | IOptionsRewriteFlags, options?: IOptionsRewriteFlags)
{
	if (typeof flags === 'object')
	{
		([flags, options] = ['', flags]);
	}

	flags = (flags ?? '') as string;

	Object.entries(options ?? {})
		.forEach(([key, bool]) =>
		{
			const _flag = key.length === 1 ? key : EnumFlagMap[key];

			if (typeof _flag === 'string')
			{
				if (bool === false && flags !== '')
				{
					flags = (flags as string).replace(_flag, '');
				}
				else if (bool === true && !(flags as string).includes(_flag))
				{
					flags = _flag + flags;
				}
			}
		})
	;

	return flags
}

export default rewriteFlags
