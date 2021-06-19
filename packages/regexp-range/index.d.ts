/**
 * Created by user on 2018/5/7/007.
 */
import { IOptions } from './src/core';
declare function matchRange(from: any, to: any, options: IOptions & {
    createRegExpString: true;
}): string;
declare function matchRange(from: any, to: any, options?: IOptions): string[];
declare namespace matchRange {
    export var matchRange: typeof import(".");
    export var getOptions: typeof import("./src/core").getOptions;
    export var toRegExpString: typeof import("./src/core").toRegExpString;
    export var TABLE_RANGE: {
        chinese: string[][];
        chinese2: string[][];
        circle: string[][];
    };
    export var fillRange: typeof import("./src/core").fillRange;
    var _a: typeof import(".");
    export { _a as default };
}
export = matchRange;
