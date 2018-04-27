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

### desc

#### lookAheadPositive, lookAheadNegative

* `aa(?=bb)`
* `aa(?!bb)`

#### lookBehindPositive

* `(?<=\$)foo`

```ts
const RE_DOLLAR_PREFIX = /(?<=\\$)foo/g;
'$foo %foo foo'.replace(RE_DOLLAR_PREFIX, 'bar'); // => '$bar %foo foo'
```

#### lookBehindNegative

* `(?<!\$)foo`

```ts
const RE_NO_DOLLAR_PREFIX = /(?<!\\$)foo/g;
'$foo %foo foo'.replace(RE_NO_DOLLAR_PREFIX, 'bar'); // => '$foo %bar bar'
```

### node.js 10

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
   { namedCapturingGroups: true,
     namedCapturingGroupsUnicode: true,
     namedCapturingGroupsEmoji: false,
     lookAheadPositive: true,
     lookAheadNegative: true,
     lookBehindPositive: true,
     lookBehindNegative: true } }
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

