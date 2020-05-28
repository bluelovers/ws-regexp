
export const KEY_JP = 'jp' as const;
export const KEY_ZHT = 'zht' as const;
export const KEY_ZHS = 'zhs' as const;

export type IKEY_FROM_TO = typeof KEY_JP | typeof KEY_ZHT | typeof KEY_ZHS | 'jp' | 'zht' | 'zhs';

export interface ITABLE_MAIN
{
	[KEY_JP]: ITABLE,
	[KEY_ZHT]: ITABLE,
	[KEY_ZHS]: ITABLE,
}

export interface ITABLE
{
	[key: string]: ITABLESUB
}

export interface ITABLESUB
{
	[KEY_JP]: string,
	[KEY_ZHT]: string,
	[KEY_ZHS]: string,
}

export interface IOptions
{
	/**
	 * 忽略的字 or 任何支援 indexOf 的 Object
	 */
	skip?,
	/**
	 * safe mode
	 */
	safe?: boolean,
}

export interface IFrom2To extends Function
{
	(str, options?: IOptions): string;
}

