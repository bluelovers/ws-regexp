/**
 * Created by user on 2020/6/8.
 */
import { IOptionsRewritePattern } from '../index';
export declare function rewritePatternOptions(options?: IOptionsRewritePattern, flags?: string): IOptionsRewritePattern;
export declare function handleOptions(options: IOptionsRewritePattern, flags?: string): {
    options: IOptionsRewritePattern;
    flags: string;
};
