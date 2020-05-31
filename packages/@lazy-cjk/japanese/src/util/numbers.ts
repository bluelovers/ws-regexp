/**
 * Created by user on 2020/5/31.
 */

// Get nth bit from buffer
import Big from 'big.js';

export function getBit(buffer: Buffer, position: number)
{
	let byteIndex = Math.floor(position / 8);
	let byte = buffer[byteIndex] || 0;

	return !!(byte & (1 << (7 - position % 8)));
}

// Get bits of buffer from a to b
export function getBits(buffer: Buffer, from: number, length: number)
{
	let ret = new Big(0);

	for (let ptr = from; ptr < from + length; ptr++)
	{
		ret = ret.times(2);
		if (getBit(buffer, ptr))
		{
			ret = ret.plus(1);
		}
	}

	return ret;
}
