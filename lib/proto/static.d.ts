/**
 * Created by user on 2018/4/28/028.
 */
/**
 * Created by user on 2018/4/28/028.
 */
import { ITypeCreateRegExp } from '../index';
export declare type IRegExpStatic = typeof RegExp & {
    input: string;
    $_: string;
    lastMatch: string;
    '$&': string;
    lastParen: string;
    '$+': string;
    leftContext: string;
    '$`': string;
    rightContext: string;
    '$\'': string;
};
export declare type IRegExpStatic2 = IRegExpStatic & {
    $10?: string;
    $100?: string;
};
export declare const REGEXP_STATIC: {
    readonly prototype?: boolean;
    $1?: boolean;
    $2?: boolean;
    $3?: boolean;
    $4?: boolean;
    $5?: boolean;
    $6?: boolean;
    $7?: boolean;
    $8?: boolean;
    $9?: boolean;
    lastMatch?: boolean;
    input?: boolean;
    $_?: boolean;
    '$&'?: boolean;
    lastParen?: boolean;
    '$+'?: boolean;
    leftContext?: boolean;
    '$`'?: boolean;
    rightContext?: boolean;
    '$\''?: boolean;
    $10?: boolean;
    $100?: boolean;
};
export declare function testStatic<T>(RegExpClass?: ITypeCreateRegExp<T>): {
    readonly prototype?: boolean;
    $1?: boolean;
    $2?: boolean;
    $3?: boolean;
    $4?: boolean;
    $5?: boolean;
    $6?: boolean;
    $7?: boolean;
    $8?: boolean;
    $9?: boolean;
    lastMatch?: boolean;
    input?: boolean;
    $_?: boolean;
    '$&'?: boolean;
    lastParen?: boolean;
    '$+'?: boolean;
    leftContext?: boolean;
    '$`'?: boolean;
    rightContext?: boolean;
    '$\''?: boolean;
    $10?: boolean;
    $100?: boolean;
};
import * as self from './static';
export default self;
