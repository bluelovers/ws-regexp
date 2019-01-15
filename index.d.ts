/**
 * Created by user on 2018/1/31/031.
 */
import { ParserEventEmitterEvent, IParserEventEmitterListener } from 'regexp-parser-event';
import { IAstToStringOptions } from 'regexp-parser-literal';
import _support from 'regexp-support';
import RegexpHelper = require('regexp-helper');
export declare type IOptions = {
    skip?: string;
    disableZh?: boolean;
    /**
     * disableLocalRange only work when disableZh is true
     */
    disableLocalRange?: boolean;
    allowLocalRangeAutoZh?: boolean;
    flags?: string;
    /**
     * allow str is /a/g
     */
    parseRegularExpressionString?: boolean;
    on?: {
        [k in keyof typeof ParserEventEmitterEvent]?: IParserEventEmitterListener<any>;
    };
    greedyTable?: boolean;
    /**
     * allow set `CjkConv.zhTable.auto`
     */
    zhTable?: (char: string) => string[];
} & IAstToStringOptions;
export declare const defaultOptions: IOptions;
export declare class zhRegExp extends RegExp {
    source: string;
    flags: string;
    dotAll: boolean;
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
    constructor(str: string | RegExp, flags?: string, options?: IOptions | string, ...argv: any[]);
    constructor(str: string | RegExp, options?: IOptions, ...argv: any[]);
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
    static readonly version: string;
}
export declare namespace zhRegExp {
    export import isRegExp = RegexpHelper.isRegExp;
}
export import parseRegularExpressionString = zhRegExp.parseRegularExpressionString;
export import isRegExp = zhRegExp.isRegExp;
export declare const create: typeof zhRegExp.create;
export interface IApi<T = zhRegExp> {
    (str: string | RegExp, flags?: string, options?: IOptions | string): T;
    (str: string | RegExp, options?: IOptions): T;
}
export declare const version: string;
export default zhRegExp;
