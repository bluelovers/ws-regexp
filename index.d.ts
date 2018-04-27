/**
 * Created by user on 2018/4/26/026.
 */
import lib from './lib';
import libPattern from './lib/pattern';
export declare const support: Readonly<{
    flags: {
        readonly multiline: boolean;
        readonly m: boolean;
        readonly global: boolean;
        readonly g: boolean;
        readonly ignoreCase: boolean;
        readonly i: boolean;
        readonly sticky: boolean;
        readonly y: boolean;
        readonly unicode: boolean;
        readonly u: boolean;
        readonly dotAll: boolean;
        readonly s: boolean;
        readonly freeSpacing: boolean;
        readonly x: boolean;
        readonly n: boolean;
    };
    flagsAll: {
        [key: string]: boolean;
        g: boolean;
        i: boolean;
        m: boolean;
        s: boolean;
        u: boolean;
        y: boolean;
    };
    pattern: {
        namedCapturingGroups: boolean;
        namedCapturingGroupsUnicode: boolean;
        namedCapturingGroupsEmoji: boolean;
        lookAheadPositive: boolean;
        lookAheadNegative: boolean;
        lookBehindPositive: boolean;
        lookBehindNegative: boolean;
    };
}>;
export import hasSupportFlag = lib.hasSupportFlag;
export import testFlag = lib.testFlag;
export import testPattern = libPattern.testPattern;
export default support;
