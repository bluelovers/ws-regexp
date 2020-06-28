# regexp-support

    check RegExp ( regular expressions ) support

## install

```nodemon
npm install regexp-support
```

[version test log](test/log)

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
      { C: true,
        Other: true,
        Cc: true,
        Control: true,
        Cs: true,
        Surrogate: true,
        L: true,
        Letter: true,
        LC: true,
        Cased_Letter: true,
        Ll: true,
        Lowercase_Letter: true,
        Lo: true,
        Other_Letter: true,
        Lu: true,
        Uppercase_Letter: true,
        M: true,
        Mark: true,
        Me: true,
        Enclosing_Mark: true,
        Mn: true,
        Nonspacing_Mark: true,
        N: true,
        Number: true,
        Nd: true,
        Decimal_Number: true,
        Nl: true,
        Letter_Number: true,
        No: true,
        Other_Number: true,
        P: true,
        Punctuation: true,
        Pc: true,
        Connector_Punctuation: true,
        Pd: true,
        Dash_Punctuation: true,
        Pe: true,
        Close_Punctuation: true,
        Pf: true,
        Final_Punctuation: true,
        Pi: true,
        Initial_Punctuation: true,
        Po: true,
        Other_Punctuation: true,
        Ps: true,
        Open_Punctuation: true,
        S: true,
        Symbol: true,
        Sc: true,
        Currency_Symbol: true,
        Sk: true,
        Modifier_Symbol: true,
        Sm: true,
        Math_Symbol: true,
        So: true,
        Other_Symbol: true,
        Z: true,
        Separator: true,
        Zl: true,
        Line_Separator: true,
        Zp: true,
        Paragraph_Separator: true,
        Zs: true,
        Space_Separator: true,
        ASCII: true,
        Alphabetic: true,
        Any: true,
        White_Space: true,
        Alpha: true,
        Emoji: true,
        Emoji_Component: true,
        Emoji_Modifier: true,
        Emoji_Presentation: true,
        Ideographic: true,
        Ideo: true,
        Lower: true,
        Quotation_Mark: true,
        QMark: true,
        Unified_Ideograph: true,
        Upper: true,
        Combining_Mark: true,
        punct: true,
        Digit: false,
        Alnum: false,
        Punct: false,
        Graph: false,
        Blank: false,
        Cntrl: false,
        XDigit: false,
        Space: false,
        Decimal_Digit_Number: false },
     scriptTest: 
      { Arabic: true,
        Bengali: true,
        Common: true,
        Coptic: true,
        Cyrillic: true,
        Ethiopic: true,
        Georgian: true,
        Greek: true,
        Han: true,
        Hangul: true,
        Hiragana: true,
        Katakana: true,
        Latin: true,
        Tamil: true,
        Tibetan: true,
        Arab: true,
        Beng: true,
        Copt: true,
        Cyrl: true,
        Ethi: true,
        Geor: true,
        Grek: true,
        Hani: true,
        Hira: true,
        Kana: true,
        Latn: true,
        Taml: true,
        Tibt: true },
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
* http://2ality.com/2017/07/regexp-unicode-property-escapes.html
* https://en.wikipedia.org/wiki/Unicode_character_property
* http://www.wellho.net/regex/javare.html
* https://zhuanlan.zhihu.com/p/33335629
* https://github.com/Icemic/huozi.js/blob/master/lib/isCJK.js
* https://github.com/ethantw/Han/blob/master/src/js/regex/unicode.js
* https://github.com/tc39/proposal-regexp-unicode-property-escapes#why-not-support-the-name-property-pname
* https://stackoverflow.com/questions/6493954/how-to-properly-write-regex-for-unicode-first-name-in-java

