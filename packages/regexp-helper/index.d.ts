/**
 * Created by user on 2018/4/28/028.
 */
export * from 'regexp-helper-core';
import { getNativeFlags, stripNonNativeFlags, isNativeFlags, prototypeToFlags, prototypeToFlagsArray } from './lib';
import { parseRegularExpressionString } from './lib/parse';
export declare const nativeFlags: string;
export { getNativeFlags, stripNonNativeFlags, isNativeFlags };
export { prototypeToFlags, prototypeToFlagsArray };
export { parseRegularExpressionString };
declare const _default: typeof import("./index");
export default _default;
