/**
 * Created by user on 2020/5/31.
 */
export declare function newCharMatchRegExp(flags?: string, fn?: (uniCharMatchSource: string) => string): RegExp;
export declare function isExistsChar(char: string): boolean;
export declare function replaceChar(input: string, fn: (...args: string[]) => string): string;
