/**
 * Created by user on 2018/5/5/005.
 */

import * as _array_uniq from 'array-uniq';

export function array_unique<T>(arr: T[]): Partial<T>[]
{
	return _array_uniq(arr);
}

import * as self from './util';

export default self;
