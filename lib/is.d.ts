export declare function isRegExp<T extends RegExp>(r: T): T & RegExp;
export declare function isRegExp(r: RegExp): r is RegExp;
export declare function isRegExp(r: any): RegExp | null;
export default isRegExp;
