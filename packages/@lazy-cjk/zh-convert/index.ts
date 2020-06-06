import { IOptions } from './lib/types';
import { _call } from './lib/util';
import { _cn2tw, _tw2cn } from './lib/core';

export * from './lib/types';

export function cn2tw(text: string, options: IOptions = {}, ...argv): string
{
	return _call(_cn2tw, text, options, ...argv);
}

export function tw2cn(text: string, options: IOptions = {}, ...argv): string
{
	return _call(_tw2cn, text, options, ...argv);
}

export default {
	cn2tw,
	tw2cn,
}
