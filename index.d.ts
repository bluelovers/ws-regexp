/**
 * Created by user on 2018/4/26/026.
 */
import { hasSupportFlag, testFlag } from './lib';
import { FlagsName } from './lib/flags';
import { testPattern } from './lib/pattern';
import { IRegExpPrototype } from './lib/proto/prototype';
import { IRegExpStatic } from './lib/proto/static';
export declare const support: Readonly<{
    nativeFlags: string;
    flags: {
        readonly multiline: boolean;
        readonly m: boolean;
        readonly global: boolean;
        readonly g: boolean;
        readonly ignoreCase: boolean;
        readonly i: boolean;
        readonly sticky: boolean;
        readonly y: boolean;
        readonly unicode: boolean;
        readonly u: boolean;
        readonly dotAll: boolean;
        readonly s: boolean;
        readonly freeSpacing: boolean;
        readonly x: boolean;
        readonly n: boolean;
    };
    flagsAll: {
        [key: string]: boolean;
        g: boolean;
        i: boolean;
        m: boolean;
        s: boolean;
        u: boolean;
        y: boolean;
    };
    pattern: {
        namedCapturingGroups: boolean;
        namedCapturingGroupsUnicode: boolean;
        namedCapturingGroupsEmoji: boolean;
        namedCapturingGroupsBackreference: boolean;
        namedCapturingGroupsDuplicate: boolean;
        lookAheadPositive: boolean;
        lookAheadNegative: boolean;
        lookBehindPositive: boolean;
        lookBehindNegative: boolean;
    };
    prototype: {
        exec?: boolean;
        test?: boolean;
        readonly source?: boolean;
        readonly global?: boolean;
        readonly ignoreCase?: boolean;
        readonly multiline?: boolean;
        lastIndex?: boolean;
        compile?: boolean;
        readonly flags?: boolean;
        readonly sticky?: boolean;
        readonly unicode?: boolean;
        dotAll?: boolean;
    };
    static: {
        readonly prototype?: boolean;
        $1?: boolean;
        $2?: boolean;
        $3?: boolean;
        $4?: boolean;
        $5?: boolean;
        $6?: boolean;
        $7?: boolean;
        $8?: boolean;
        $9?: boolean;
        lastMatch?: boolean;
        input?: boolean;
        $_?: boolean;
        '$&'?: boolean;
        lastParen?: boolean;
        '$+'?: boolean;
        leftContext?: boolean;
        '$`'?: boolean;
        rightContext?: boolean;
        '$\''?: boolean;
        $10?: boolean;
        $100?: boolean;
    };
    symbol: {
        species: boolean;
        match: boolean;
        replace: boolean;
        search: boolean;
        split: boolean;
    };
    objectStringTag: string;
}>;
export import FlagsName = FlagsName;
export { hasSupportFlag };
export { testFlag };
export { testPattern };
export { IRegExpPrototype, IRegExpStatic };
export default support;
