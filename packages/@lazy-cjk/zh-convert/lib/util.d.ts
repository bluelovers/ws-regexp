import { IOptions } from './types';
export declare function getOptionsSkip(options: IOptions, skip?: string[]): IOptions;
export declare function getOptions(options?: IOptions, defaultOpts?: Readonly<{
    safe: true;
}>, skip?: string[]): IOptions;
export declare function _call(fn: any, text: string, options?: IOptions, ...argv: any[]): any;
