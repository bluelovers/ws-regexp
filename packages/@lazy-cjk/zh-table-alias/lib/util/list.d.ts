import { ITSArrayListMaybeReadonly } from 'ts-type';
import { IRecordMap } from '../types';
export declare function jpListLazyAllMap<T extends string>(arr: ITSArrayListMaybeReadonly<T>): IRecordMap<T>;
export declare function jpListLazyAll<T extends string>(char: T): (T & string)[];
