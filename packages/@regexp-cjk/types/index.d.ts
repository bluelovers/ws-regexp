declare global {
    interface RegExp {
        readonly dotAll: boolean;
        readonly hasIndices: boolean;
    }
    interface RegExpConstructor {
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
    interface RegExpMatchArray<K extends string = string> {
        groups?: Record<K, string>;
        indices?: IRegExpIndices<K>;
    }
    interface RegExpExecArray<K extends string = string> {
        groups?: Record<K, string>;
        indices?: IRegExpIndices<K>;
    }
}
export type IRegExpIndicesGroups<K extends string = string> = Record<K, [number, number]>;
export interface IRegExpIndices<K extends string = string> extends Array<[number, number]> {
    groups?: IRegExpIndicesGroups<K>;
}
export {};
