/**
 * Created by user on 2018/9/1/001.
 */
export interface INovelPatternSplitOptions {
    useRawString?: boolean;
    breakingMode?: boolean;
}
export declare function novelPatternSplit(input: string | RegExp, options?: INovelPatternSplitOptions): string[];
export declare function getRawString(raw: string | TemplateStringsArray | any): string;
export default novelPatternSplit;
export = novelPatternSplit;
