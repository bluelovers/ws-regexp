/**
 * Created by user on 2020/5/30.
 */

export function char2uni(char: string)
{
	return char.codePointAt(0)
}

export function uni2char(uni: string | number)
{
	return String.fromCodePoint(uni as number)
}

export function char2hex(char: string)
{
	return char2uni(char).toString(16)
}

export function hex2char(hex: string)
{
	return uni2char(parseInt(hex, 16))
}

export function uni2hex(uni: string | number)
{
	uni = parseInt(uni.toString())
	return uni.toString(16)
}

