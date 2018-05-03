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
import * as self from './index';
export default self;
