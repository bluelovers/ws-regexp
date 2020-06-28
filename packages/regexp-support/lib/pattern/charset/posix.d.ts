/**
 * Created by user on 2018/4/27/027.
 */
import { ICreateRegExp } from '../../index';
import { IPatternTestRow } from '../../pattern';
/**
 * @link https://www.regular-expressions.info/posixbrackets.html
 */
export declare enum POXIX {
    alnum = "alnum",
    alpha = "alpha",
    ascii = "ascii",
    blank = "blank",
    cntrl = "cntrl",
    digit = "digit",
    graph = "graph",
    lower = "lower",
    print = "print",
    punct = "punct",
    space = "space",
    upper = "upper",
    word = "word",
    xdigit = "xdigit"
}
export declare const PatternTest: {
    [k in keyof typeof POXIX]?: IPatternTestRow[];
};
export declare function testPOXIX(name: string, RegExpClass?: typeof RegExp, testPattern?: typeof PatternTest): boolean;
export declare function testPOXIX(name: string, RegExpClass?: ICreateRegExp, testPattern?: typeof PatternTest): boolean;
export default POXIX;
