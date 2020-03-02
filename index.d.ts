/**
 * Created by user on 2018/5/7/007.
 */
import { IOptions } from './src/core';
declare function matchRange(from: any, to: any, options: IOptions & {
    createRegExpString: true;
}): string;
declare namespace matchRange {
    var matchRange: typeof import(".");
    var getOptions: typeof import("./src/core").getOptions;
    var toRegExpString: typeof import("./src/core").toRegExpString;
    var TABLE_RANGE: {
        chinese: string[][];
        chinese2: string[][];
        circle: string[][];
    };
    var fillRange: typeof import("./src/core").fillRange;
    var default: typeof import(".");
}
declare function matchRange(from: any, to: any, options?: IOptions): string[];
declare namespace matchRange {
    var matchRange: typeof import(".");
    var getOptions: typeof import("./src/core").getOptions;
    var toRegExpString: typeof import("./src/core").toRegExpString;
    var TABLE_RANGE: {
        chinese: string[][];
        chinese2: string[][];
        circle: string[][];
    };
    var fillRange: typeof import("./src/core").fillRange;
    var default: typeof import(".");
}
export = matchRange;
