/// <reference lib="es2018.regexp" />
declare global {
    interface RegExpConstructor {
        leftContext: string;
        rightContext: string;
    }
}
export interface IReturnTypeEachCore<T extends RegExp = RegExp> {
    match: RegExpMatchArray;
    re: T;
    index: number;
    data: Pick<typeof RegExp, 'leftContext' | 'rightContext'>;
}
export declare type ICallback<R = void, T extends RegExp = RegExp> = (match: RegExpMatchArray, index: number, re: T, _: IReturnTypeEachCore<T>) => R;
export interface IChainInputObject {
    /**
     * The `RegExp` to use.
     */
    regexp: RegExp;
    /**
     * The specific backreference.
     */
    backref?: number | string;
    replaceValue?: string | ((substring: string, ...args: string[]) => string);
}
export declare type IChainInput = IChainInputObject | RegExp;
export declare type IChainArray = IChainInput[];
export declare type IChainInputArray = [RegExp, string | ((substring: string, ...args: string[]) => string)];
