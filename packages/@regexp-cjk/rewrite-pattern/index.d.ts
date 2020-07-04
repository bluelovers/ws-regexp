/**
 * Created by user on 2020/6/8.
 */
import { IOptionsRewriteFlags } from '@regexp-cjk/rewrite-flags';
/**
 * The optional options argument recognizes the following properties:
 */
export interface IOptionsRewritePatternCore {
    /**
     * Setting this option to true enables support for the s (dotAll) flag.
     */
    dotAllFlag?: boolean;
    /**
     * Setting this option to true enables support for Unicode property escapes:
     */
    unicodePropertyEscape?: boolean;
    /**
     * Setting this option to true enables support for lookbehind assertions.
     */
    lookbehind?: boolean;
    /**
     * Setting this option to true enables support for named capture groups.
     */
    namedGroup?: boolean;
    /**
     * This option is a function that gets called when a named capture group is found.
     * It receives two parameters:
     * the name of the group, and its index.
     */
    onNamedGroup?(name: string, index: number): void;
    /**
     * Setting this option to true enables the use of Unicode code point escapes of the form \u{…}.
     * Note that in regular expressions,
     * such escape sequences only work correctly when the ES2015 u flag is set.
     * Enabling this setting often results in more compact output,
     * although there are cases (such as \p{Lu}) where it actually increases the output size.
     */
    useUnicodeFlag?: boolean;
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
