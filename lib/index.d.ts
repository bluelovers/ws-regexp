/**
 * Created by user on 2018/4/26/026.
 */
import FlagsName, { IFlagsPatternTestFn } from './flags';
export { FlagsName };
/**
 * Check whether a RegExp flag is supported
 */
export declare function hasSupportFlag(flag: string, RegExpClass?: typeof RegExp, skipPatternCheck?: boolean): boolean;
export declare function testFlag(flag: string, RegExpClass?: typeof RegExp, flagsPattern?: {
    readonly dotAll?: {
        0: string;
        1: string;
        2: any;
        3?: string | IFlagsPatternTestFn;
    }[];
    readonly s?: {
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
    readonly y?: {
        0: string;
        1: string;
        2: any;
        3?: string | IFlagsPatternTestFn;
    }[];
    readonly unicode?: {
        0: string;
        1: string;
        2: any;
        3?: string | IFlagsPatternTestFn;
    }[];
    readonly u?: {
        0: string;
        1: string;
        2: any;
        3?: string | IFlagsPatternTestFn;
    }[];
    readonly freeSpacing?: {
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
    readonly multiline?: {
        0: string;
        1: string;
        2: any;
        3?: string | IFlagsPatternTestFn;
    }[];
    readonly m?: {
        0: string;
        1: string;
        2: any;
        3?: string | IFlagsPatternTestFn;
    }[];
    readonly global?: {
        0: string;
        1: string;
        2: any;
        3?: string | IFlagsPatternTestFn;
    }[];
    readonly g?: {
        0: string;
        1: string;
        2: any;
        3?: string | IFlagsPatternTestFn;
    }[];
    readonly ignoreCase?: {
        0: string;
        1: string;
        2: any;
        3?: string | IFlagsPatternTestFn;
    }[];
    readonly i?: {
        0: string;
        1: string;
        2: any;
        3?: string | IFlagsPatternTestFn;
    }[];
}): boolean;
import * as self from './index';
export default self;
