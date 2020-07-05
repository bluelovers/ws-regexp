import { Options } from 'clone-regexp';
import { IOptionsRewriteFlags } from '@regexp-cjk/rewrite-flags';
export interface ICloneRegexp<T extends RegExp = RegExp> {
    (inputRegExp: T | RegExp, options?: ICloneRegexpOptionsCore, ...argv: any[]): T;
}
export interface ICloneRegexpOptionsCore extends Options, IOptionsRewriteFlags {
}
export interface ICloneRegexpOptionsCustom<T extends RegExp = RegExp> {
    /**
     * allow change cloneRegexp function
     */
    cloneRegexp?: ICloneRegexp<T>;
    disableDetectRegexpClone?: boolean;
    resetLastIndex?: boolean;
    lastIndex?: number;
}
export interface ICloneRegexpOptions<T extends RegExp = RegExp> extends ICloneRegexpOptionsCore, ICloneRegexpOptionsCustom<T> {
}
export declare type IRegExpWithClone<T extends RegExp = RegExp> = T extends {
    clone?(...argv: any[]): any;
} ? T : T & {
    clone?(options?: ICloneRegexpOptionsCore, ...argv: any[]): T;
};
