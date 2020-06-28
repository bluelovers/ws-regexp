/**
 * Created by user on 2018/4/28/028.
 */
import { ITypeCreateRegExp } from './index';
export declare const REGEXP_SYMBOL: {
    species: boolean;
    match: boolean;
    replace: boolean;
    search: boolean;
    split: boolean;
};
export declare function testSymbol<T>(RegExpClass?: ITypeCreateRegExp<T>): {
    species: boolean;
    match: boolean;
    replace: boolean;
    search: boolean;
    split: boolean;
};
