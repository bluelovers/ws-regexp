/**
 * Created by user on 2018/4/28/028.
 */
import { FlagsName } from 'regexp-support';
import { ITSPickByType, ITSKeyofByExtractType } from 'ts-type/lib/helper/record/pick-type';
import { ITSValueOf } from 'ts-type/lib/helper/key-value';
import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';
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
export type IFlag = ITSTypeAndStringLiteral<FlagsName>;
export type IFlagPrototype = {
    [P in ITSKeyofByExtractType<typeof FlagsName, IFlag>]?: boolean;
};
export type IFlagMap = Partial<ITSPickByType<typeof FlagsName, IFlag>>;
export type IFlagPrototypeInput = IFlagPrototype | Record<string, boolean>;
export type IFlagMapInput = IFlagMap | Record<string, string>;
export type IFlagsValue<R extends IFlagMapInput> = ITSValueOf<ITSPickByType<R, string | IFlag>>;
export type IFlagsArray<R extends IFlagMapInput> = IFlagsValue<R>[];
export declare function prototypeToFlagsArray<T extends IFlagPrototypeInput, R extends IFlagMapInput = IFlagMap>(inputObject: T, flagMap?: R): IFlagsArray<R>;
export declare function prototypeToFlags<T extends IFlagPrototypeInput, R extends IFlagMapInput = IFlagMap>(inputObject: T, flagMap?: R): string | IFlagsValue<R>;
declare const _default: typeof import("./index");
export default _default;
