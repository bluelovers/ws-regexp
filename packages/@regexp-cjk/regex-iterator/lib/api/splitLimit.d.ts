import { ICloneRegexpOptionsCustom } from '@regexp-cjk/clone-regexp/lib/types';
export declare function splitLimit(input: string, separator: string | RegExp, limit?: number, options?: ICloneRegexpOptionsCustom & {
    useFullMatched?: boolean;
    excludeRest?: boolean;
    allowEmpty?: boolean;
}): string[];
export default splitLimit;
