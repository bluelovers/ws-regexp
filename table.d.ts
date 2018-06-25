export declare const table: Partial<{
    toString: () => string;
    charAt: (pos: number) => string;
    charCodeAt: (index: number) => number;
    concat: (...strings: string[]) => string;
    indexOf: (searchString: string, position?: number) => number;
    lastIndexOf: (searchString: string, position?: number) => number;
    localeCompare: {
        (that: string): number;
        (that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
    };
    match: {
        (regexp: string | RegExp): RegExpMatchArray;
        (matcher: {
            [Symbol.match](string: string): RegExpMatchArray;
        }): RegExpMatchArray;
    };
    replace: {
        (searchValue: string | RegExp, replaceValue: string): string;
        (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
        (searchValue: {
            [Symbol.replace](string: string, replaceValue: string): string;
        }, replaceValue: string): string;
        (searchValue: {
            [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
        }, replacer: (substring: string, ...args: any[]) => string): string;
    };
    search: {
        (regexp: string | RegExp): number;
        (searcher: {
            [Symbol.search](string: string): number;
        }): number;
    };
    slice: (start?: number, end?: number) => string;
    split: {
        (separator: string | RegExp, limit?: number): string[];
        (splitter: {
            [Symbol.split](string: string, limit?: number): string[];
        }, limit?: number): string[];
    };
    substring: (start: number, end?: number) => string;
    toLowerCase: () => string;
    toLocaleLowerCase: () => string;
    toUpperCase: () => string;
    toLocaleUpperCase: () => string;
    trim: () => string;
    readonly length: number;
    substr: (from: number, length?: number) => string;
    valueOf: () => string;
    codePointAt: (pos: number) => number;
    includes: (searchString: string, position?: number) => boolean;
    endsWith: (searchString: string, endPosition?: number) => boolean;
    normalize: {
        (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;
        (form?: string): string;
    };
    repeat: (count: number) => string;
    startsWith: (searchString: string, position?: number) => boolean;
    anchor: (name: string) => string;
    big: () => string;
    blink: () => string;
    bold: () => string;
    fixed: () => string;
    fontcolor: (color: string) => string;
    fontsize: {
        (size: number): string;
        (size: string): string;
    };
    italics: () => string;
    link: (url: string) => string;
    small: () => string;
    strike: () => string;
    sub: () => string;
    sup: () => string;
    [Symbol.iterator]: () => IterableIterator<string>;
    padStart: (maxLength: number, fillString?: string) => string;
    padEnd: (maxLength: number, fillString?: string) => string;
}>[];
export declare const table2: Partial<{
    length: number;
    toString: () => string;
    toLocaleString: () => string;
    push: (...items: String[]) => number;
    pop: () => String;
    concat: {
        (...items: ConcatArray<String>[]): String[];
        (...items: (String | ConcatArray<String>)[]): String[];
    };
    join: (separator?: string) => string;
    reverse: () => String[];
    shift: () => String;
    slice: (start?: number, end?: number) => String[];
    sort: (compareFn?: (a: String, b: String) => number) => String[];
    splice: {
        (start: number, deleteCount?: number): String[];
        (start: number, deleteCount: number, ...items: String[]): String[];
    };
    unshift: (...items: String[]) => number;
    indexOf: (searchElement: String, fromIndex?: number) => number;
    lastIndexOf: (searchElement: String, fromIndex?: number) => number;
    every: (callbackfn: (value: String, index: number, array: String[]) => boolean, thisArg?: any) => boolean;
    some: (callbackfn: (value: String, index: number, array: String[]) => boolean, thisArg?: any) => boolean;
    forEach: (callbackfn: (value: String, index: number, array: String[]) => void, thisArg?: any) => void;
    map: <U>(callbackfn: (value: String, index: number, array: String[]) => U, thisArg?: any) => U[];
    filter: {
        <S extends String>(callbackfn: (value: String, index: number, array: String[]) => value is S, thisArg?: any): S[];
        (callbackfn: (value: String, index: number, array: String[]) => any, thisArg?: any): String[];
    };
    reduce: {
        (callbackfn: (previousValue: String, currentValue: String, currentIndex: number, array: String[]) => String): String;
        (callbackfn: (previousValue: String, currentValue: String, currentIndex: number, array: String[]) => String, initialValue: String): String;
        <U>(callbackfn: (previousValue: U, currentValue: String, currentIndex: number, array: String[]) => U, initialValue: U): U;
    };
    reduceRight: {
        (callbackfn: (previousValue: String, currentValue: String, currentIndex: number, array: String[]) => String): String;
        (callbackfn: (previousValue: String, currentValue: String, currentIndex: number, array: String[]) => String, initialValue: String): String;
        <U>(callbackfn: (previousValue: U, currentValue: String, currentIndex: number, array: String[]) => U, initialValue: U): U;
    };
    find: {
        <S extends String>(predicate: (this: void, value: String, index: number, obj: String[]) => value is S, thisArg?: any): S;
        (predicate: (value: String, index: number, obj: String[]) => boolean, thisArg?: any): String;
    };
    findIndex: (predicate: (value: String, index: number, obj: String[]) => boolean, thisArg?: any) => number;
    fill: (value: String, start?: number, end?: number) => String[];
    copyWithin: (target: number, start: number, end?: number) => String[];
    [Symbol.iterator]: () => IterableIterator<String>;
    entries: () => IterableIterator<[number, String]>;
    keys: () => IterableIterator<number>;
    values: () => IterableIterator<String>;
    [Symbol.unscopables]: () => {
        copyWithin: boolean;
        entries: boolean;
        fill: boolean;
        find: boolean;
        findIndex: boolean;
        keys: boolean;
        values: boolean;
    };
    includes: (searchElement: String, fromIndex?: number) => boolean;
}>[];
export declare const table3: Partial<{
    length: number;
    toString: () => string;
    toLocaleString: () => string;
    push: (...items: string[]) => number;
    pop: () => string;
    concat: {
        (...items: ConcatArray<string>[]): string[];
        (...items: (string | ConcatArray<string>)[]): string[];
    };
    join: (separator?: string) => string;
    reverse: () => string[];
    shift: () => string;
    slice: (start?: number, end?: number) => string[];
    sort: (compareFn?: (a: string, b: string) => number) => string[];
    splice: {
        (start: number, deleteCount?: number): string[];
        (start: number, deleteCount: number, ...items: string[]): string[];
    };
    unshift: (...items: string[]) => number;
    indexOf: (searchElement: string, fromIndex?: number) => number;
    lastIndexOf: (searchElement: string, fromIndex?: number) => number;
    every: (callbackfn: (value: string, index: number, array: string[]) => boolean, thisArg?: any) => boolean;
    some: (callbackfn: (value: string, index: number, array: string[]) => boolean, thisArg?: any) => boolean;
    forEach: (callbackfn: (value: string, index: number, array: string[]) => void, thisArg?: any) => void;
    map: <U>(callbackfn: (value: string, index: number, array: string[]) => U, thisArg?: any) => U[];
    filter: {
        <S extends string>(callbackfn: (value: string, index: number, array: string[]) => value is S, thisArg?: any): S[];
        (callbackfn: (value: string, index: number, array: string[]) => any, thisArg?: any): string[];
    };
    reduce: {
        (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string): string;
        (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string, initialValue: string): string;
        <U>(callbackfn: (previousValue: U, currentValue: string, currentIndex: number, array: string[]) => U, initialValue: U): U;
    };
    reduceRight: {
        (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string): string;
        (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string, initialValue: string): string;
        <U>(callbackfn: (previousValue: U, currentValue: string, currentIndex: number, array: string[]) => U, initialValue: U): U;
    };
    find: {
        <S extends string>(predicate: (this: void, value: string, index: number, obj: string[]) => value is S, thisArg?: any): S;
        (predicate: (value: string, index: number, obj: string[]) => boolean, thisArg?: any): string;
    };
    findIndex: (predicate: (value: string, index: number, obj: string[]) => boolean, thisArg?: any) => number;
    fill: (value: string, start?: number, end?: number) => string[];
    copyWithin: (target: number, start: number, end?: number) => string[];
    [Symbol.iterator]: () => IterableIterator<string>;
    entries: () => IterableIterator<[number, string]>;
    keys: () => IterableIterator<number>;
    values: () => IterableIterator<string>;
    [Symbol.unscopables]: () => {
        copyWithin: boolean;
        entries: boolean;
        fill: boolean;
        find: boolean;
        findIndex: boolean;
        keys: boolean;
        values: boolean;
    };
    includes: (searchElement: string, fromIndex?: number) => boolean;
}>[];
export declare function array_unique<T>(array: Partial<T>[]): Partial<T>[];
import * as self from './table';
export default self;
