export declare type IOptions = {
    allowNonNativeSlash?: boolean;
    allowNonNativeFlags?: boolean;
    throwError?: boolean;
};
export declare function parseRegularExpressionString(str: string, options?: {
    allowNonNativeSlash?: boolean;
    allowNonNativeFlags?: boolean;
    throwError?: boolean;
}): {
    source: string;
    flags: string;
    slash: string;
    input: string;
};
export declare function rRegularExpressionString(options?: {
    allowNonNativeSlash?: boolean;
    allowNonNativeFlags?: boolean;
}): RegExp;
export default parseRegularExpressionString;
