/**
 * Created by user on 2018/5/6/006.
 */
import { ICreateRegExp, ITypeCreateRegExp } from '../index';
export declare function log_dir(...argv: any[]): void;
export interface IFnTestPattern<R> {
    (name: string, RegExpClass?: typeof RegExp, testPatterns?: R): boolean;
    (name: string, RegExpClass?: ICreateRegExp, testPatterns?: R): boolean;
    <T>(name: string, RegExpClass?: ITypeCreateRegExp<T>, testPatterns?: R): boolean;
}
export declare function _createFnTestPattern<R>(initTestPatterns: R): {
    (name: string, RegExpClass?: typeof RegExp, testPatterns?: R): boolean;
    (name: string, RegExpClass?: ICreateRegExp, testPatterns?: R): boolean;
    <T>(name: string, RegExpClass?: ITypeCreateRegExp<T>, testPatterns?: R): boolean;
};
