declare const S: unique symbol;
export interface IExecAllOptions<T extends RegExp = RegExp> {
    resetLastIndex?: boolean;
    /**
     * allow change cloneRegexp function
     */
    cloneRegexp?: ICloneRegexp<T>;
    /**
     * only use this when u know what u doing
     */
    leftContext?: boolean;
    rightContext?: boolean;
}
export interface ICloneRegexp<T extends RegExp = RegExp> {
    (inputRegExp: T | RegExp, ...argv: any[]): T;
}
export declare type IExecAllRegExpExecArray<T extends RegExp = RegExp> = RegExpExecArray & string[] & {
    /**
     * The 0-based index of the match in the string.
     */
    index: number;
    /**
     * es2018
     */
    groups?: {
        [k: string]: string;
    };
};
export declare type IMatches<T extends RegExp = RegExp> = (IExecAllRegExpExecArray<T> & {
    match: string;
    sub: string[];
    leftContext?: string;
    rightContext?: string;
})[] & {
    /**
     * regular expressions
     *
     * @readonly
     */
    readonly re: T;
    /**
     * regular expressions that contains the string against which a regular expression is matched.
     *
     * @readonly
     */
    readonly input: string;
    /**
     * last matched index
     *
     * @readonly
     */
    readonly lastIndex: number;
};
declare function execAll<T extends RegExp = RegExp>(inputRegExp: T | RegExp, input: string, options?: IExecAllOptions<T>): IMatches<T>;
declare let _execAll: typeof execAll & {
    execall<T extends RegExp = RegExp>(inputRegExp: RegExp | T, input: string, options?: IExecAllOptions<RegExp>): IMatches<T>;
    default<T extends RegExp = RegExp>(inputRegExp: RegExp | T, input: string, options?: IExecAllOptions<RegExp>): IMatches<T>;
    SYMBOL: typeof S;
};
export { S as SYMBOL };
export { _execAll as execall };
export default _execAll;
export = _execAll;
