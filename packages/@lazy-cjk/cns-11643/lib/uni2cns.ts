/**
 * Created by user on 2020/5/30.
 */

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

export default uni2cns
