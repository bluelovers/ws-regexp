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

## demo

```ts
import support from 'regexp-support';

console.log(support);
```

```ts
{ flags: 
   { dotAll: true,
     s: true,
     sticky: true,
     y: true,
     unicode: true,
     u: true,
     freeSpacing: false,
     x: false,
     n: false,
     multiline: true,
     m: true,
     global: true,
     g: true,
     ignoreCase: true,
     i: true },
  flagsAll: { g: true, i: true, m: true, s: true, u: true, y: true } }
```

## link

* http://2ality.com/archive.html?tag=regexp

