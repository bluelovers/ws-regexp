/**
 * Created by user on 2019/6/15.
 */
import { IOptionsInput, IOptionsRuntime } from './core';
import { INodeInput } from 'regexp-parser-event';
export declare function customizer(objValue: any, srcValue: any): any[];
export declare function getSettingOptions(str: any, flags?: any, options?: IOptionsInput | string, ...argv: any[]): {
    str: any;
    flags: any;
    options: IOptionsInput<INodeInput>;
    argv: any[];
};
export declare function mergeOptions<T extends INodeInput = INodeInput>(base?: IOptionsInput<T>, ...opts: IOptionsInput<T>[]): IOptionsRuntime<T>;
export declare function fixOptions<T extends INodeInput = INodeInput>(options?: IOptionsInput<T>): IOptionsRuntime<T>;
export default mergeOptions;
