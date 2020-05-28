import { ITSArrayListMaybeReadonly } from 'ts-type';
import { IRecordMap } from '../types';
import { lazyAll as _jpListLazyAll } from '@lazy-cjk/jp-table-alias';

export function jpListLazyAllMap<T extends string>(arr: ITSArrayListMaybeReadonly<T>)
{
	return (arr as T[]).reduce((a, b) => {
		a[b] = jpListLazyAll(b);
		return a;
	}, {} as IRecordMap<T>)
}

export function jpListLazyAll<T extends string>(char: T): (T & string)[]
{
	return _jpListLazyAll(char, {
		safe: false,
		includeSelf: true,
	}) as any
}
