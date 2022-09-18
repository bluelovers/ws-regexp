declare const X_REGEX_DATA = "xregexp";
export { X_REGEX_DATA };
export type IXRegExpLike<R extends RegExp = RegExp> = R & {
    [X_REGEX_DATA]: IXRegExpData;
};
export interface IXRegExpData extends Record<any, any> {
    captureNames?: any;
    source: string;
    flags: string;
}
export declare function internalXRegExpData<T = IXRegExpLike>(xr: T): any;
export declare function isXRegExp<T = IXRegExpLike>(xr: any): xr is T;
export default isXRegExp;
