/**
 * Created by user on 2018/4/26/026.
 */
import FlagsName, { FlagsPattern } from './flags';
export { FlagsName };
/**
 * Check whether a RegExp flag is supported
 */
export declare function hasSupportFlag(flag: string, RegExpClass?: typeof RegExp, skipPatternCheck?: boolean): boolean;
export declare function testFlag(flag: string, RegExpClass?: typeof RegExp, testPattern?: typeof FlagsPattern): boolean;
export declare function testFlag(flag: string, RegExpClass?: ICreateRegExp, testPattern?: typeof FlagsPattern): boolean;
export declare function testFlagsAll(RegExpClass?: typeof RegExp, skipPatternCheck?: boolean): {
    g: boolean;
    i: boolean;
    m: boolean;
    s: boolean;
    u: boolean;
    y: boolean;
    [key: string]: boolean;
};
export interface IFlagsAll {
    g: boolean;
    i: boolean;
    m: boolean;
    s: boolean;
    u: boolean;
    y: boolean;
    [key: string]: boolean;
}
export interface ICreateRegExp {
    create?(pattern: any, flag: any): any;
    create?(pattern: any, flag?: any): any;
    create?(pattern: any, flag?: any, ...argv: any[]): any;
}
export type ITypeCreateRegExp<T> = T extends typeof RegExp ? typeof RegExp : T extends ICreateRegExp ? ICreateRegExp : any;
export declare function createRegExp<T>(pattern: string, flag?: string, RegExpClass?: ITypeCreateRegExp<T>): RegExp;
