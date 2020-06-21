export declare const SYMBOL: unique symbol;
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
    removeHiddenData?: boolean;
}
export interface ICloneRegexp<T extends RegExp = RegExp> {
    (inputRegExp: T | RegExp, ...argv: any[]): T;
}
export interface IExecAllRegExpExecArray<T extends RegExp = RegExp> extends RegExpExecArray {
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
    [SYMBOL]: IMatches<T>;
}
export interface IMatchesRow<T extends RegExp = RegExp> extends IExecAllRegExpExecArray<T> {
    match: string;
    sub: string[];
    leftContext?: string;
    rightContext?: string;
}
export declare type IMatches<T extends RegExp = RegExp> = IMatchesRow<T>[] & {
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
