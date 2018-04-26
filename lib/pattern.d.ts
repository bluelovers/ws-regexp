/**
 * Created by user on 2018/4/26/026.
 */
export declare const PatternSupport: {
    namedCapturingGroups: boolean;
};
export declare const PatternTest: {
    [k in keyof typeof PatternSupport]?: {
        0: string;
        1: string;
        2: string;
        3: boolean | any;
        4?: string | IPatternTestFn;
    }[];
};
export interface IPatternTestFn {
    (r: RegExp, value: any, input: string, pattern: string, RegExpClass: typeof RegExp, flag: string): boolean;
}
export declare function testPattern(name: string, RegExpClass?: typeof RegExp, testPattern?: {
    namedCapturingGroups?: {
        0: string;
        1: string;
        2: string;
        3: any;
        4?: string | IPatternTestFn;
    }[];
}): boolean;
export default PatternSupport;
