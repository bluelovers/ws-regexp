import { char2uni } from './char2uni';

export function uni2cns(uni: string | number): string
{
	uni = parseInt(uni.toString())

	if (uni >= 983040)
	{
		return require('./cns/unicode/uni2cns.15.json')[uni]
	}
	else if (uni >= 131072)
	{
		return require('./cns/unicode/uni2cns.2.json')[uni]
	}

	return require('./cns/unicode/uni2cns.bmp.json')[uni]
}

export function char2cns(char: string): string
{
	return uni2cns(char2uni(char))
}

export default uni2cns
