export declare function handleChainRowResult({ regexp, backref, match, allowFallbackToSource, }: {
    regexp: RegExp;
    backref: number | string;
    match: RegExpMatchArray;
    allowFallbackToSource: boolean;
}, str: string): string;
export default handleChainRowResult;
