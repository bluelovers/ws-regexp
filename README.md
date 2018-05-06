# regexp-support

    check RegExp ( regular expressions ) support

## install

```nodemon
npm install regexp-support
```

## Api

allow u check support on other RegExp base class

```ts
hasSupportFlag(flag: string, RegExpClass?: typeof RegExp, skipPatternCheck?: boolean): boolean
testFlag(flag: string, RegExpClass?: typeof RegExp, flagsPattern?): boolean
```

`RegExpClass` can be Object with `create`, for some class can't create by `new`

```ts
export interface ICreateRegExp
{
	create(pattern: string, flag?: string, ...argv)
}
```

## demo

```ts
import support from 'regexp-support';

console.log(support);
```

## todo

* need more test on unicode set [unicode.ts](lib/pattern/charset/unicode.ts) , [unicode-script.ts](lib/pattern/charset/unicode-script.ts)

### desc

#### lookAheadPositive, lookAheadNegative

* `aa(?=bb)`
* `aa(?!bb)`

#### lookBehindPositive

* `(?<=\$)foo`

```ts
const RE_DOLLAR_PREFIX = /(?<=\$)foo/g;
'$foo %foo foo'.replace(RE_DOLLAR_PREFIX, 'bar'); // => '$bar %foo foo'
```

#### lookBehindNegative

* `(?<!\$)foo`

```ts
const RE_NO_DOLLAR_PREFIX = /(?<!\$)foo/g;
'$foo %foo foo'.replace(RE_NO_DOLLAR_PREFIX, 'bar'); // => '$foo %bar bar'
```

### node.js 10

```ts
{ nativeFlags: 'gimsuy',
  flags: 
   { multiline: true,
     m: true,
     global: true,
     g: true,
     ignoreCase: true,
     i: true,
     sticky: true,
     y: true,
     unicode: true,
     u: true,
     dotAll: true,
     s: true,
     freeSpacing: false,
     x: false,
     n: false },
  flagsAll: { g: true, i: true, m: true, s: true, u: true, y: true },
  pattern: 
   { namedCapturingGroups: true,
     namedCapturingGroupsUnicode: true,
     namedCapturingGroupsEmoji: false,
     namedCapturingGroupsBackreference: true,
     namedCapturingGroupsDuplicate: false,
     lookAheadPositive: true,
     lookAheadNegative: true,
     lookBehindPositive: true,
     lookBehindNegative: true,
     dotUnicodeEmoji: true,
     classSub: false },
  prototype: 
   { source: true,
     flags: true,
     lastIndex: true,
     dotAll: true,
     global: true,
     ignoreCase: true,
     multiline: true,
     sticky: true,
     unicode: true },
  static: 
   { '$1': true,
     '$2': true,
     '$3': true,
     '$4': true,
     '$5': true,
     '$6': true,
     '$7': true,
     '$8': true,
     '$9': true,
     input: true,
     '$_': true,
     lastMatch: true,
     '$&': true,
     lastParen: true,
     '$+': true,
     leftContext: true,
     '$`': true,
     rightContext: true,
     '$\'': true,
     '$10': false,
     '$100': false },
  symbol: 
   { species: false,
     match: true,
     replace: true,
     search: true,
     split: true },
  objectStringTag: '[object RegExp]',
  unicodeSet: 
   { unicode: true,
     script: true,
     blocks: false,
     unicodeTest: 
      { Cc: true,
        Control: true,
        Cs: true,
        Surrogate: true,
        L: true,
        Letter: true,
        Ll: true,
        Lowercase_Letter: true,
        Lu: true,
        Uppercase_Letter: true,
        N: true,
        Number: true,
        Nd: true,
        Decimal_Number: true,
        Nl: true,
        Letter_Number: true,
        No: true,
        Other_Number: true,
        P: false,
        Punctuation: false,
        Pd: true,
        Dash_Punctuation: true,
        Z: true,
        Separator: true,
        Zl: true,
        Line_Separator: true,
        Zp: true,
        Paragraph_Separator: true,
        Zs: true,
        Space_Separator: true,
        ASCII: true,
        Any: true,
        White_Space: true,
        Lower: true,
        Upper: true,
        Alpha: true,
        Digit: false,
        Alnum: false,
        Punct: false,
        Graph: false,
        Blank: false,
        Cntrl: false,
        XDigit: false,
        Space: false,
        Decimal_Digit_Number: false },
     scriptTest: { Greek: true, Katakana: true, Latin: true },
     blocksTest: { InBasic_Latin: false } } }
```

### node.js 9

> by test on RunKit

```ts
{ flags: 
   { multiline: true,
     m: true,
     global: true,
     g: true,
     ignoreCase: true,
     i: true,
     sticky: true,
     y: true,
     unicode: true,
     u: true,
     dotAll: true,
     s: true,
     freeSpacing: false,
     x: false,
     n: false },
  flagsAll: { g: true, i: true, m: true, s: true, u: true, y: true },
  pattern: 
   { namedCapturingGroups: false,
     namedCapturingGroupsUnicode: false,
     namedCapturingGroupsEmoji: false } }
```

### node.js 8

> by test on RunKit

```ts
{ flags: 
   { multiline: true,
     m: true,
     global: true,
     g: true,
     ignoreCase: true,
     i: true,
     sticky: true,
     y: true,
     unicode: true,
     u: true,
     dotAll: true,
     s: true,
     freeSpacing: false,
     x: false,
     n: false },
  flagsAll: { g: true, i: true, m: true, s: true, u: true, y: true },
  pattern: 
   { namedCapturingGroups: false,
     namedCapturingGroupsUnicode: false,
     namedCapturingGroupsEmoji: false } }
```

## link

* http://2ality.com/archive.html?tag=regexp

