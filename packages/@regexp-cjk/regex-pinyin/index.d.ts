declare const rePinyinLike: RegExp;
declare const rePinyinLikeFull: RegExp;
declare const rePinyinChar: RegExp;
declare const reNotPinyinChar: RegExp;
export { rePinyinLikeFull, rePinyinLike, rePinyinChar, reNotPinyinChar, };
export declare function isPinyinLike(input: string): boolean;
export declare function matchPinyinLike(input: string): RegExpExecArray<string>;
export declare function replacePinyinChar(input: string, fn: ((...args: string[]) => string) | string): string;
export declare function replaceNotPinyinChar(input: string, fn: ((...args: string[]) => string) | string): string;
export default isPinyinLike;
