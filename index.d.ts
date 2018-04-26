/**
 * Created by user on 2018/4/26/026.
 */
import lib from './lib';
export declare const support: Readonly<{
    flags: {
        readonly dotAll: boolean;
        readonly s: boolean;
        readonly sticky: boolean;
        readonly y: boolean;
        readonly unicode: boolean;
        readonly u: boolean;
        readonly freeSpacing: boolean;
        readonly x: boolean;
        readonly n: boolean;
        readonly multiline: boolean;
        readonly m: boolean;
        readonly global: boolean;
        readonly g: boolean;
        readonly ignoreCase: boolean;
        readonly i: boolean;
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
}>;
export import hasSupportFlag = lib.hasSupportFlag;
export import testFlag = lib.testFlag;
export default support;
