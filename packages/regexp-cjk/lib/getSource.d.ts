import { IGetSettingOptions } from './mergeOptions';
export declare function parseRegularExpressionString(str: string): {
    source: string;
    flags: string;
    slash: string;
    input: string;
};
export declare function getRegExpSourcePattern(opts: IGetSettingOptions): {
    source: string;
    flags: string;
    hasFlags: boolean;
};
export default getRegExpSourcePattern;
