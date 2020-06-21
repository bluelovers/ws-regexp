/// <reference lib="es2018.regexp" />
export * from './lib/types';
import { IExecAllOptions, IMatches } from './lib/types';
export declare function execall<T extends RegExp = RegExp>(inputRegExp: T | RegExp, input: string, options?: IExecAllOptions<T>): IMatches<T>;
export { execall as execAll };
export default execall;
