export interface IOptionsRewriteFlags {
    /**
        Modifies the [`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global) property of the cloned `RegExp` instance.
     */
    global?: boolean;
    /**
        Modifies the [`ignoreCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/ignoreCase) property of the cloned `RegExp` instance.
     */
    ignoreCase?: boolean;
    /**
        Modifies the [`multiline`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline) property of the cloned `RegExp` instance.
     */
    multiline?: boolean;
    /**
        Modifies the [`dotAll`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll) property of the cloned `RegExp` instance.
     */
    dotAll?: boolean;
    /**
        Modifies the [`sticky`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky) property of the cloned `RegExp` instance.
     */
    sticky?: boolean;
    /**
        Modifies the [`unicode`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode) property of the cloned `RegExp` instance.
     */
    unicode?: boolean;
    hasIndices?: boolean;
    /**
     * https://github.com/tc39/proposal-regexp-set-notation
     */
    unicodeSets?: boolean;
}
export declare enum EnumFlagMap {
    global = "g",
    ignoreCase = "i",
    multiline = "m",
    dotAll = "s",
    sticky = "y",
    unicode = "u",
    hasIndices = "d",
    unicodeSets = "v"
}
export declare const flagsOrderReverse: readonly ["sticky", "unicode", "dotAll", "multiline", "ignoreCase", "global", "hasIndices", "unicodeSets"];
export declare function rewriteFlags(flags: string | IOptionsRewriteFlags, options?: IOptionsRewriteFlags): string;
export default rewriteFlags;
