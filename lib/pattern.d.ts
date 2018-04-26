/**
 * Created by user on 2018/4/26/026.
 */
import { ICreateRegExp, ITypeCreateRegExp } from './index';
export declare const PatternSupport: {
    namedCapturingGroups: boolean;
    namedCapturingGroupsUnicode: boolean;
    namedCapturingGroupsEmoji: boolean;
};
export declare const PatternTest: {
    [k in keyof typeof PatternSupport]?: IPatternTestRow[];
};
export interface IPatternTestFn {
    <T>(r: RegExp, value: any, input: string, pattern: string, RegExpClass: ITypeCreateRegExp<T>, flag: string): boolean;
}
export declare function testPattern(name: string, RegExpClass?: typeof RegExp, testPattern?: typeof PatternTest): boolean;
export declare function testPattern(name: string, RegExpClass?: ICreateRegExp, testPattern?: typeof PatternTest): boolean;
export declare function testNamedCapturingGroups(key: string, flags?: string): IPatternTestRow;
export interface IPatternTestRow {
    0: string;
    1: string;
    2: string;
    3: boolean | any;
    4?: string | IPatternTestFn;
}
import * as self from './pattern';
export default self;
