/**
 * Created by user on 2018/4/28/028.
 */
import { FlagsName } from 'regexp-support';
export declare const RE_NATIVE_FLAGS: RegExp;
export declare const RE_NON_NATIVE_FLAGS: RegExp;
export declare const hasFlagsProp: boolean;
export declare function getNativeFlags<T extends RegExp>(target: T): string;
export declare function getNativeFlags(target: string): string;
export declare function stripNonNativeFlags(flags: string): string;
export declare function isNativeFlags(flags: string): boolean;
/**
 * Returns native `RegExp` flags used by a regex object.
 *
 * @private
 * @param {RegExp} regex Regex to check.
 * @returns {String} Native flags in use.
 */
export declare function _getNativeFlags<T extends RegExp>(regex: T): string;
export declare type valueof<T> = T[keyof T];
export declare function prototypeToFlagsArray<T extends Partial<{
    [k in keyof typeof FlagsName]?: any;
} & {
    [k: string]: any;
}>, R = Partial<typeof FlagsName> & {
    [k: string]: string;
}>(inputObject: T, flagMap?: R): valueof<R>[];
export declare function prototypeToFlags<T extends Partial<{
    [k in keyof typeof FlagsName]?: any;
} & {
    [k: string]: any;
}>, R = Partial<typeof FlagsName> & {
    [k: string]: string;
}>(inputObject: T, flagMap?: R): string;
declare const _default: typeof import(".");
export default _default;
