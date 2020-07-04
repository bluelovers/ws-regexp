/**
 * Created by user on 2018/4/24/024.
 */

import addSupportToXRegExp, { IOptions} from '..';
import XRegExp from 'xregexp';
import { createXRegExp } from '@regexp-cjk/create-xregexp';

let options: IOptions = {
	// set a flag if u only wanna trigger for this plugin, default is auto enable
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
