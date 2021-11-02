/**
 * Created by user on 2018/4/28/028.
 */
/// <reference lib="es2015.core" />
/// <reference lib="es2015.symbol.wellknown" />
/// <reference lib="es2018.regexp" />
import { ITypeCreateRegExp } from '../index';
interface IRegExpStaticPlus {
    /**
     * RegExp.input ($_)
     *
     * The non-standard input property is a static property of regular expressions that contains the string against which a regular expression is matched.
     * RegExp.$_ is an alias for this property.
     *
     * @code var re = /hi/g;
     re.test('hi there!');
     RegExp.input;         // "hi there!"
     re.test('foo');       // new test, non-matching
     RegExp.$_;            // "hi there!"
     re.test('hi world!'); // new test, matching
     RegExp.$_;            // "hi world!"
     */
    input: string;
    $_: string;
    /**
     * RegExp.lastMatch ($&)
     *
     * The non-standard lastMatch property is a static and read-only property of regular expressions that contains the last matched characters.
     * RegExp.$& is an alias for this property.
     *
     * @code var re = /hi/g;
     re.test('hi there!');
     RegExp.lastMatch; // "hi"
     RegExp['$&'];     // "hi"
     */
    lastMatch: string;
    '$&': string;
    /**
     * RegExp.lastParen ($+)
     *
     * The non-standard lastParen property is a static and read-only property of regular expressions that contains the last parenthesized substring match, if any.
     * RegExp.$+ is an alias for this property.
     *
     * @code var re = /(hi)/g;
     re.test('hi there!');
     RegExp.lastParen; // "hi"
     RegExp['$+'];     // "hi"
     */
    lastParen: string;
    '$+': string;
    /**
     * RegExp.leftContext ($`)
     *
     * The non-standard leftContext property is a static and read-only property of regular expressions that contains the substring preceding the most recent match.
     * RegExp.$` is an alias for this property.
     *
     * @code var re = /world/g;
     re.test('hello world!');
     RegExp.leftContext; // "hello "
     RegExp['$`'];       // "hello "
     */
    leftContext: string;
    '$`': string;
    /**
     * RegExp.rightContext ($')
     *
     * The non-standard rightContext property is a static and read-only property of regular expressions that contains the substring following the most recent match.
     * RegExp.$' is an alias for this property.
     *
     * @code var re = /hello/g;
     re.test('hello world!');
     RegExp.rightContext; // " world!"
     RegExp["$'"];       // " world!"
     */
    rightContext: string;
    '$\'': string;
}
declare global {
    interface RegExpConstructor extends IRegExpStaticPlus {
    }
}
export interface IRegExpStatic extends RegExpConstructor, IRegExpStaticPlus {
}
export interface IRegExpStatic2 extends IRegExpStatic {
    $10?: string;
    $100?: string;
}
export declare const REGEXP_STATIC: {
    $10?: boolean;
    $100?: boolean;
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
    input?: boolean;
    $_?: boolean;
    lastMatch?: boolean;
    "$&"?: boolean;
    lastParen?: boolean;
    "$+"?: boolean;
    leftContext?: boolean;
    "$`"?: boolean;
    rightContext?: boolean;
    "$'"?: boolean;
    readonly [Symbol.species]?: boolean;
};
export declare function testStatic<T>(RegExpClass?: ITypeCreateRegExp<T>): {
    $10?: boolean;
    $100?: boolean;
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
    input?: boolean;
    $_?: boolean;
    lastMatch?: boolean;
    "$&"?: boolean;
    lastParen?: boolean;
    "$+"?: boolean;
    leftContext?: boolean;
    "$`"?: boolean;
    rightContext?: boolean;
    "$'"?: boolean;
    readonly [Symbol.species]?: boolean;
};
export {};
