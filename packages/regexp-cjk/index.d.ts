/**
 * Created by user on 2018/1/31/031.
 */
import { IAstToStringOptions } from 'regexp-parser-literal';
import { INodeInput, IParserEventEmitterListener, ParserEventEmitter, ParserEventEmitterEvent } from 'regexp-parser-event';
import { ICoreHandlerReturn, IOptions, IOptionsCore, IOptionsInput, IOptionsOn, IOptionsRuntime, IRegExpUserInput, SymDefaults } from './lib/core';
import { IOptions as IOptionsZhTable } from '@lazy-cjk/zh-table-list';
import { parseRegularExpressionString } from './lib/getSource';
export * from './version';
export { ParserEventEmitterEvent, ParserEventEmitter, INodeInput, IParserEventEmitterListener, IAstToStringOptions };
export { IOptions, IOptionsRuntime, IOptionsInput, ICoreHandlerReturn, IOptionsOn, IOptionsCore };
export { IOptionsZhTable };
/**
 * @deprecated
 */
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
    /**
     * default value only exists and work when use `zhRegExp.use(defaultOptions)`
     */
    static readonly [SymDefaults]: IOptionsInput;
    /**
     * create a new zhRegExp class with default value
     * @example `zhRegExp.use(defaultOptions)`
     */
    static use(defaultOptions: IOptionsInput): typeof zhRegExp;
    constructor(str: IRegExpUserInput, options?: IOptionsInput, ...argv: any[]);
    constructor(str: IRegExpUserInput, flags?: string, options?: IOptionsInput, ...argv: any[]);
    constructor(str: IRegExpUserInput, flags: string, skip: string, ...argv: any[]);
    constructor(str: IRegExpUserInput, flags: string, options?: IOptionsInput | string, ...argv: any[]);
    static create<T = zhRegExp>(str: IRegExpUserInput, flags?: string, options?: IOptionsInput | string): T;
    static create<T = zhRegExp>(str: IRegExpUserInput, options?: IOptionsInput): T;
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
    static get version(): string;
}
export declare const create: typeof zhRegExp.create;
export { parseRegularExpressionString };
export interface IApi<T = zhRegExp> {
    (str: string | RegExp, flags?: string, options?: IOptions | string): T;
    (str: string | RegExp, options?: IOptions): T;
}
export default zhRegExp;
