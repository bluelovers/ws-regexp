import _support from './support';
export interface IApi<T = zhRegExp> {
    (str: string | RegExp, flags?: string, options?: IOptions | string): T;
    (str: string | RegExp, options?: IOptions): T;
}
export interface IOptions {
    skip?: string;
    disableZh?: boolean;
    /**
     * disableLocalRange only work when disableZh is true
     */
    disableLocalRange?: boolean;
    flags?: string;
    /**
     * allow str is /a/g
     */
    parseRegularExpressionString?: boolean;
}
export declare const defaultOptions: IOptions;
export declare class zhRegExp extends RegExp {
    source: string;
    flags: string;
    ignoreCase: boolean;
    global: boolean;
    multiline: boolean;
    sticky: boolean;
    unicode: boolean;
    lastIndex: number;
    /**
     * The non-standard leftContext property is a static and read-only property of regular expressions that contains the substring preceding the most recent match. RegExp.$` is an alias for this property.
     *
     * @alias $`
     */
    static readonly leftContext: string;
    /**
     * The non-standard rightContext property is a static and read-only property of regular expressions that contains the substring following the most recent match. RegExp.$' is an alias for this property.
     *
     * @alias $'
     */
    static readonly rightContext: string;
    /**
     * The non-standard lastParen property is a static and read-only property of regular expressions that contains the last parenthesized substring match, if any. RegExp.$+ is an alias for this property.
     *
     * @alias $+
     */
    static readonly lastParen: string;
    /**
     * The non-standard lastMatch property is a static and read-only property of regular expressions that contains the last matched characters. RegExp.$& is an alias for this property.
     *
     * @alias $&
     */
    static readonly lastMatch: string;
    /**
     * The non-standard input property is a static property of regular expressions that contains the string against which a regular expression is matched. RegExp.$_ is an alias for this property.
     *
     * @alias $_
     */
    static readonly input: string;
    constructor(str: string | RegExp, flags?: string, options?: IOptions | string);
    constructor(str: string | RegExp, options?: IOptions);
    static create<T = zhRegExp>(str: string | RegExp, flags?: string, options?: IOptions | string): T;
    static create<T = zhRegExp>(str: string | RegExp, options?: IOptions): T;
    getStatic<T = typeof zhRegExp>(): T;
    /**
     * @todo
     */
    toRegularExpressionString(): string;
    static parseRegularExpressionString(str: string): {
        source: string;
        flags: string;
        slash: string;
        input: string;
    };
    static readonly support: typeof _support;
    static isRegExp<T>(r: T): T & RegExp | null;
    static isRegExp(r: RegExp): RegExp;
}
export declare const parseRegularExpressionString: typeof zhRegExp.parseRegularExpressionString;
export declare const isRegExp: typeof zhRegExp.isRegExp;
export declare const create: typeof zhRegExp.create;
export default zhRegExp;
