/**
 * Created by user on 2018/4/26/026.
 */
import lib from './lib';
export declare const support: Readonly<{
    flags: {
        readonly s: boolean;
        readonly y: boolean;
        readonly x: boolean;
        readonly n: boolean;
        readonly dotAll: boolean;
        readonly sticky: boolean;
    };
}>;
export import hasSupportFlag = lib.hasSupportFlag;
export import testFlag = lib.testFlag;
export default support;
