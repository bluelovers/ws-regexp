import { table_cn2tw, table_tw2cn } from './table';
import { textMap } from './core/map';

export function _cn2tw(text: string): string
{
	return textMap(text, table_cn2tw);
}

export function _tw2cn(text: string): string
{
	return textMap(text, table_tw2cn);
}
