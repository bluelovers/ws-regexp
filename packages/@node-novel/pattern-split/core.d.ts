/**
 * Created by user on 2020/6/5.
 */
import { INovelPatternSplitOptions } from './lib/types';
export * from './lib/util';
export * from './lib/types';
export declare function novelPatternSplit(input: string | RegExp, options?: INovelPatternSplitOptions): string[];
export declare namespace novelPatternSplit {
    var novelPatternSplit: typeof import("./core").novelPatternSplit;
    var getRawString: typeof import("./lib/util").getRawString;
    var default: typeof import("./core").novelPatternSplit;
}
export default novelPatternSplit;
