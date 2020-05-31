import { char2uni } from './char2uni';
import { IKeyToZhuyinTable } from './types';

export function uni2zhuyin_table(): IKeyToZhuyinTable
{
	return require('./cns/zhuyin/uni2zhuyin.json')
}

export function uni2zhuyin(uni: string | number): string
{
	return uni2zhuyin_all(uni)[0]
}

export function uni2zhuyin_all(uni: string | number)
{
	return uni2zhuyin_table()[uni]
}

export function char2zhuyin(char: string): string
{
	return uni2zhuyin(char2uni(char))
}

export function char2zhuyin_all(char: string)
{
	return uni2zhuyin_all(char2uni(char))
}

export default uni2zhuyin
