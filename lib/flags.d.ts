/**
 * Created by user on 2018/4/26/026.
 */
export declare enum FlagsName {
    s = "s",
    y = "y",
    x = "x",
    n = "n",
    /**
     *
     * @link http://2ality.com/2017/07/regexp-dotall-flag.html
     * @code
     * /^.$/.test('\n') // => false
     * /^.$/s.test('\n') // => true
     * /^[^]$/.test('\n') // => true
     *
     * @type {string}
     */
    dotAll = "s",
    sticky = "y",
}
export declare const FlagsPattern: {
    [k in keyof typeof FlagsName]?: {
        0: string;
        1: string;
        2: boolean | any;
        3?: string | IFlagsPatternTestFn;
    }[];
};
export interface IFlagsPatternTestFn {
    (r: RegExp, value: any, input: string, pattern: string, RegExpClass: typeof RegExp, flag: string): boolean;
}
export default FlagsName;
