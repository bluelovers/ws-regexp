/**
 * Created by user on 2018/4/26/026.
 */
import FlagsName, { IFlagsPatternTestFn } from './flags';
export { FlagsName };
/**
 * Check whether a RegExp flag is supported
 *
 * @param {string} flag
 * @param {typeof RegExp} RegExpClass
 * @returns {boolean}
 */
export declare function hasSupportFlag(flag: string, RegExpClass?: typeof RegExp): boolean;
export declare function testFlag(flag: string, RegExpClass?: typeof RegExp, flagsPattern?: {
    readonly s?: {
        0: string;
        1: string;
        2: any;
        3?: string | IFlagsPatternTestFn;
    }[];
    readonly y?: {
        0: string;
        1: string;
        2: any;
        3?: string | IFlagsPatternTestFn;
    }[];
    readonly x?: {
        0: string;
        1: string;
        2: any;
        3?: string | IFlagsPatternTestFn;
    }[];
    readonly n?: {
        0: string;
        1: string;
        2: any;
        3?: string | IFlagsPatternTestFn;
    }[];
    readonly dotAll?: {
        0: string;
        1: string;
        2: any;
        3?: string | IFlagsPatternTestFn;
    }[];
    readonly sticky?: {
        0: string;
        1: string;
        2: any;
        3?: string | IFlagsPatternTestFn;
    }[];
}): boolean;
import * as self from './index';
export default self;
