/**
 * Created by user on 2018/4/28/028.
 */
import { ITypeCreateRegExp } from '../index';
export interface IRegExpPrototype extends RegExp {
    readonly dotAll: boolean;
    readonly hasIndices: boolean;
}
export declare const PROTOTYPE: { [k in keyof IRegExpPrototype]?: boolean; };
export declare function testPrototype<T>(RegExpClass?: ITypeCreateRegExp<T>): {
    readonly dotAll?: boolean;
    readonly hasIndices?: boolean;
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
    [Symbol.match]?: boolean;
    [Symbol.replace]?: boolean;
    [Symbol.search]?: boolean;
    [Symbol.split]?: boolean;
    [Symbol.matchAll]?: boolean;
};
