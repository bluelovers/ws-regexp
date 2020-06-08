import { IOptionsRewritePatternCore, IOptionsRewritePattern } from '@regexp-cjk/rewrite-pattern';
export declare function hasUnicodePropertyPattern(source: string): boolean;
export declare function isUnicodePropertyPattern(source: string): boolean;
export interface IUnicodePropertyRegExpExecArray extends RegExpExecArray {
    /**
     * \\p{UnicodePropertyName=UnicodePropertyValue}
     */
    0: string;
    /**
     * [pP]
     */
    1: string;
    /**
     * UnicodePropertyName
     */
    2: string;
    /**
     * UnicodePropertyValue
     */
    3?: string;
}
export declare function matchUnicodePropertyPattern(source: string): IUnicodePropertyRegExpExecArray;
export declare function replaceUnicodePropertyPattern(source: string, cb: (substring: string, p: string | 'P' | 'p', name: string, value?: string, ...any: any[]) => string): string;
export declare function escapeUnicodePropertyPatternCore(source: string, flags?: string, options?: IOptionsRewritePatternCore): string;
export declare function escapeUnicodePropertyPattern(source: string, flags?: string, options?: IOptionsRewritePattern): string;
export default escapeUnicodePropertyPattern;
