# xregexp-plugin-hanzi-cjk

    add regexp-cjk plugin for xregexp, make xregexp auto match chinese/japanese hanzi.


see [regexp-cjk](https://www.npmjs.com/package/regexp-cjk)

## demo

```ts
import addSupportToXRegExp, { IOptions, createXRegExp } from 'xregexp-plugin-hanzi-cjk';
import * as XRegExp from 'xregexp';
```

```ts
let options: IOptions = {
	// set a flag if u only wanna trigger for this plugin, default is auto enable
	flags: '',
};

console.log(XRegExp.version);

// if didn't set xr, it is XRegExp
const xr1 = addSupportToXRegExp(null, options);
//const xr2 = addSupportToXRegExp(XRegExp, options);
//console.log('xr1 = xr2 = XRegExp', xr1 === xr2);

// XRegExp only work when input pattern is string
let r1 = '(の|像)';
let r2 = /(の|像)/;

let x1 = xr1(r1);

console.log(x1);
console.log(x1.test('象'));
console.log(x1.test('的'));

// this allow u input a RegExp
let x3 = createXRegExp(r2);

console.log(x3);
console.log(x3.test('象'));
console.log(x3.test('的'));

// @BUG current XRegExp not support input pattern ia a RegExp object
let x2 = xr1(r2);

console.error(x2);
console.error(x2.test('象'));
console.error(x2.test('的'));
```

### output

```ts
4.1.1
{ /([の之的]|[像象])/ xregexp: { captureNames: null, source: '(の|像)', flags: '' } }
true
true
{ /([の之的]|[像象])/ xregexp: { captureNames: null, source: '(の|像)', flags: '' } }
true
true
{ /(の|像)/ xregexp: { captureNames: null, source: null, flags: null } }
false
false
```
