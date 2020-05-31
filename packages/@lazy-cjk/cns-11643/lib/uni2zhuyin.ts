import { char2uni } from './char2uni';

export function uni2zhuyin_table(): Record<string, string>
{
	return require('./cns/zhuyin/uni2zhuyin.json')
}

export function uni2zhuyin(uni: string | number): string
{
	return uni2zhuyin_table()[uni]
}

export function char2zhuyin(char: string): string
{
	return uni2zhuyin(char2uni(char))
}

export default uni2zhuyin
