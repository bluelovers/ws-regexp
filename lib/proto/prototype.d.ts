/**
 * Created by user on 2018/4/28/028.
 */
import { ITypeCreateRegExp } from '../index';
export declare type IRegExpPrototype = RegExp & {
    dotAll?: boolean;
};
export declare const PROTOTYPE: {
    exec?: boolean;
    test?: boolean;
    readonly source?: boolean;
    readonly global?: boolean;
    readonly ignoreCase?: boolean;
    readonly multiline?: boolean;
    lastIndex?: boolean;
    compile?: boolean;
    readonly flags?: boolean;
    readonly sticky?: boolean;
    readonly unicode?: boolean;
    readonly dotAll?: boolean;
};
export declare function testPrototype<T>(RegExpClass?: ITypeCreateRegExp<T>): {
    exec?: boolean;
    test?: boolean;
    readonly source?: boolean;
    readonly global?: boolean;
    readonly ignoreCase?: boolean;
    readonly multiline?: boolean;
    lastIndex?: boolean;
    compile?: boolean;
    readonly flags?: boolean;
    readonly sticky?: boolean;
    readonly unicode?: boolean;
    readonly dotAll?: boolean;
};
