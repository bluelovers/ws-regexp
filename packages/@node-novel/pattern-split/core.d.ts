/**
 * Created by user on 2020/6/5.
 */
import { INovelPatternSplitOptions } from './lib/types';
export * from './lib/util';
export * from './lib/types';
export declare function novelPatternSplit(input: string | RegExp, options?: INovelPatternSplitOptions): string[];
export declare namespace novelPatternSplit {
    export var novelPatternSplit: typeof import("./core").novelPatternSplit;
    export var getRawString: typeof import("./lib/util").getRawString;
    var _a: typeof import("./core").novelPatternSplit;
    export { _a as default };
}
export default novelPatternSplit;
