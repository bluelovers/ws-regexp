export interface IApi {
    (str: string | RegExp, flags?: string, options?: IOptions | string): zhRegExp;
    (str: string | RegExp, options?: IOptions): zhRegExp;
}
export interface IOptions {
    skip?: string;
    disableZh?: boolean;
    disableLocalRange?: boolean;
    flags?: string;
}
export declare const defaultOptions: IOptions;
export declare class zhRegExp extends RegExp {
    constructor(str: string | RegExp, flags?: string, options?: IOptions | string);
    constructor(str: string | RegExp, options?: IOptions);
    static create(str: string | RegExp, flags?: string, options?: IOptions | string): any;
    static create(str: string | RegExp, options?: IOptions): any;
}
export declare function isRegExp(r: RegExp): RegExp;
export declare function isRegExp(r: any): RegExp | null;
export declare const create: IApi;
export default zhRegExp;
