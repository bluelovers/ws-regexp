/**
 * Created by user on 2020/6/8.
 */
import { IOptionsRewriteFlags } from '@regexp-cjk/rewrite-flags';
import { IOptionsRegExpUCoreV4 } from '@regexp-cjk/regexpu-core-v4';
export interface IOptionsRewritePatternCore extends IOptionsRegExpUCoreV4 {
}
export interface IOptionsRewritePattern extends IOptionsRewritePatternCore {
    flags?: string;
    rewriteFlags?: IOptionsRewriteFlags;
}
export declare function rewritePatternCore(source: string, flags?: string, options?: IOptionsRewritePatternCore): string;
export declare function rewritePattern(source: string, flags?: string, options?: IOptionsRewritePattern): string;
export declare function rewritePatternByRegExpCore(re: RegExp, options?: IOptionsRewritePattern): string;
export declare function rewritePatternByRegExp(re: RegExp, options?: IOptionsRewritePattern): string;
export declare function rewriteRegExpCore(re: RegExp, options?: IOptionsRewritePattern): RegExp;
export declare function rewriteRegExp(re: RegExp, options?: IOptionsRewritePattern): RegExp;
export default rewritePattern;
