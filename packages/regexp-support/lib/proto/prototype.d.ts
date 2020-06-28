/**
 * Created by user on 2018/4/28/028.
 */
import { ITypeCreateRegExp } from '../index';
export interface IRegExpPrototype extends RegExp {
    dotAll: boolean;
}
export declare const PROTOTYPE: {
    dotAll?: boolean;
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
};
export declare function testPrototype<T>(RegExpClass?: ITypeCreateRegExp<T>): {
    dotAll?: boolean;
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
};
