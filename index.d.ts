export interface IApi {
    (str: string, flags?: string, skip?: string): zhRegExp;
    (str: RegExp, flags?: string, skip?: string): zhRegExp;
}
export declare class zhRegExp extends RegExp {
    constructor(str: string, flags?: string, skip?: string);
    constructor(str: RegExp, flags?: string, skip?: string);
    static create(str: any, flags?: string, skip?: string, ...argv: any[]): zhRegExp;
}
export declare function isRegExp(r: RegExp): RegExp;
export declare function isRegExp(r: any): RegExp | null;
export declare const create: IApi;
export default zhRegExp;
