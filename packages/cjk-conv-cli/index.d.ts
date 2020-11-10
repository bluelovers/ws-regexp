/**
 * Created by user on 2019/3/2.
 */
import { tw2cn, cn2tw } from '@lazy-cjk/zh-convert';
import { Options as IFastGlobOptions } from '@bluelovers/fast-glob';
import Bluebird from 'bluebird';
import { tw2cn_min, cn2tw_min } from '@lazy-cjk/zh-convert/min';
export declare const FnList: {
    cn2tw_min: typeof cn2tw_min;
    tw2cn_min: typeof tw2cn_min;
    cn2tw: typeof cn2tw;
    tw2cn: typeof tw2cn;
};
export declare type IOptionsConv = {
    cwd?: string;
    tw2cn?: boolean;
    notMin?: boolean;
    unSafe?: boolean;
    createBackup?: boolean;
    createPatch?: boolean;
};
export declare type IOptions = IFastGlobOptions & IOptionsConv & {
    deep?: boolean | number;
};
export declare function handldTarget(search: string | string[], options?: IOptions): Bluebird<string[]>;
export declare function handleOptions(options: IOptions): IOptions;
export declare function handleContext(text: string, options: IOptionsConv): any;
declare const _default: typeof import(".");
export default _default;
