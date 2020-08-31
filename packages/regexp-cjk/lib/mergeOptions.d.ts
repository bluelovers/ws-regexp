/**
 * Created by user on 2019/6/15.
 */
import { IOptionsInput, IOptionsRuntime, IRegExpUserInput } from './core';
import { INodeInput } from 'regexp-parser-event';
export declare function customizer<T extends any[], U extends any[]>(objValue: T, srcValue: U): [...T, ...U];
export interface IGetSettingOptions<S extends IRegExpUserInput = IRegExpUserInput> {
    str: S;
    flags: string;
    options: IOptionsInput;
    argv: any[];
}
export declare function getSettingOptions<S extends IRegExpUserInput = IRegExpUserInput>(str: S, flags?: IOptionsInput | string, options?: IOptionsInput | string, ...argv: any[]): IGetSettingOptions<S>;
/**
 * for `zhRegExp.use` only
 */
export declare function mergeOptions2<T extends INodeInput = INodeInput>(base?: IOptionsInput<T>, ...opts: IOptionsInput<T>[]): IOptionsRuntime<T>;
export declare function mergeOptions<T extends INodeInput = INodeInput>(base?: IOptionsInput<T>, ...opts: IOptionsInput<T>[]): IOptionsRuntime<T>;
export declare function fixOptions<T extends INodeInput = INodeInput>(options?: IOptionsInput<T>, removeEmptyOn?: boolean): IOptionsRuntime<T>;
export default mergeOptions;
