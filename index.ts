/**
 * Created by user on 2018/1/31/031.
 */

import * as lib from './lib';

export class zhRegExp extends RegExp
{
	constructor(str, flags = '', skip = '')
	{
		let [rs, f] = lib._word_zh(str, null, flags);
		let bool = (rs instanceof RegExp);

		f = f || flags || '';

		if (!bool)
		{
			super(rs, f);
		}
		else
		{
			super(rs.source, f);
		}
	}

	static create(str, flags = '', skip = '', ...argv)
	{
		return new this(str, flags, skip, ...argv);
	}
}

export const create = zhRegExp.create.bind(zhRegExp);

export default zhRegExp;
