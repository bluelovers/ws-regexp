import { ParserEventEmitterEvent, IParserEventEmitterListener } from 'regexp-parser-event';
import { IAstToStringOptions } from 'regexp-parser-literal';
import _support from 'regexp-support';
import RegexpHelper from 'regexp-helper';
export declare type IOptions = {
    skip?: string;
    disableZh?: boolean;
    disableLocalRange?: boolean;
    allowLocalRangeAutoZh?: boolean;
    flags?: string;
    parseRegularExpressionString?: boolean;
    on?: {
        [k in keyof typeof ParserEventEmitterEvent]?: IParserEventEmitterListener<any>;
    };
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
    static readonly leftContext: string;
    static readonly rightContext: string;
    static readonly lastParen: string;
    static readonly lastMatch: string;
    static readonly input: string;
    constructor(str: string | RegExp, flags?: string, options?: IOptions | string, ...argv: any[]);
    constructor(str: string | RegExp, options?: IOptions, ...argv: any[]);
    static create<T = zhRegExp>(str: string | RegExp, flags?: string, options?: IOptions | string): T;
    static create<T = zhRegExp>(str: string | RegExp, options?: IOptions): T;
    getStatic<T = typeof zhRegExp>(): T;
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
export declare const parseRegularExpressionString: typeof zhRegExp.parseRegularExpressionString;
export declare const isRegExp: typeof RegexpHelper.isRegExp;
export declare const create: typeof zhRegExp.create;
export interface IApi<T = zhRegExp> {
    (str: string | RegExp, flags?: string, options?: IOptions | string): T;
    (str: string | RegExp, options?: IOptions): T;
}
export declare const version: string;
export default zhRegExp;
