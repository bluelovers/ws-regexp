import { Options } from 'clone-regexp';
import { IOptionsRewriteFlags } from '@regexp-cjk/rewrite-flags';
export interface ICloneRegexp<T extends RegExp = RegExp> {
    (inputRegExp: T | RegExp, options?: ICloneRegexpOptionsCore, ...argv: any[]): T;
}
export interface ICloneRegexpOptionsCore extends Options, IOptionsRewriteFlags {
}
export interface ICloneRegexpOptions<T extends RegExp = RegExp> extends ICloneRegexpOptionsCore {
    /**
     * allow change cloneRegexp function
     */
    cloneRegexp?: ICloneRegexp<T>;
    disableDetectRegexpClone?: boolean;
}
export declare type IRegExpWithClone<T extends RegExp = RegExp> = T extends {
    clone?(...argv: any[]): any;
} ? T : T & {
    clone?(options?: ICloneRegexpOptionsCore, ...argv: any[]): T;
};
