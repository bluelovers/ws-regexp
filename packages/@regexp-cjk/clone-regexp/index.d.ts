/// <reference lib="es2018.regexp" />
import { IRegExpWithClone, ICloneRegexpOptions, ICloneRegexp } from './lib/types';
export type { IRegExpWithClone, ICloneRegexpOptions, ICloneRegexp };
export declare function cloneRegexp<T extends RegExp>(inputRegExp: IRegExpWithClone<T>, options?: ICloneRegexpOptions<T>): T;
export default cloneRegexp;
