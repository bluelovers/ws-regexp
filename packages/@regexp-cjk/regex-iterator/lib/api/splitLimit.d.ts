import { ICloneRegexpOptionsCustom } from '@regexp-cjk/clone-regexp/lib/types';
export interface ISplitLimitOptions extends ICloneRegexpOptionsCustom {
    useFullMatched?: boolean;
    excludeRest?: boolean;
    excludeSubMatched?: boolean;
    allowEmpty?: boolean;
    limit?: number;
}
export declare function splitLimit(input: string, separator: string | RegExp, limit?: number | ISplitLimitOptions, options?: ISplitLimitOptions): string[];
export default splitLimit;
