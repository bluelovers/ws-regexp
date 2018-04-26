/**
 * Created by user on 2018/4/26/026.
 */

import lib, { hasSupportFlag, testFlag } from './lib';
import FlagsName from './lib/flags';

const _support = {
	flags: Object
		.keys(FlagsName)
		.reduce(function (a, flags)
		{
			let bool: boolean = false;

			if (flags in a)
			{
				bool = a[flags];
			}
			else if (FlagsName[flags] in a)
			{
				bool = FlagsName[flags];
			}
			else
			{
				bool = hasSupportFlag(FlagsName[flags]);
			}

			a[flags] = bool;

			return a;
		}, {} as {
			[k in keyof typeof FlagsName]: boolean
		})
};

export const support = Object.freeze(_support);

export import hasSupportFlag = lib.hasSupportFlag
export import testFlag = lib.testFlag

type valueof<T> = T[keyof T];

export default support
