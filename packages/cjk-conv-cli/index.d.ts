/**
 * Created by user on 2019/3/2.
 */
import { cn2tw_min, tw2cn_min } from 'cjk-conv/lib/zh/convert/min';
import { cn2tw, tw2cn } from 'cjk-conv/lib/zh/convert';
import FastGlob = require('fast-glob');
import Bluebird = require('bluebird');
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
export declare type IOptions = FastGlob.Options<string> & IOptionsConv & {
    deep?: boolean | number;
};
export declare function handldTarget(search: string | string[], options?: IOptions): Bluebird<string[]>;
export declare function handleOptions(options: IOptions): IOptions;
export declare function handleContext(text: string, options: IOptionsConv): any;
declare const _default: typeof import(".");
export default _default;
