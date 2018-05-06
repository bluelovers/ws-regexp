/**
 * Created by user on 2018/5/6/006.
 */

import { ICreateRegExp, ITypeCreateRegExp } from '../../index';
import { IPatternTestFn, IPatternTestRow, testPattern } from '../../pattern';

/**
 * @link https://www.regular-expressions.info/posixbrackets.html
 */
export enum JAVA
{
	alnum = 'Alnum',
	alpha = 'Alpha',
	ascii = 'ASCII',
	blank = 'Blank',
	cntrl = 'Cntrl',
	digit = 'Digit',
	graph = 'Graph',
	lower = 'Lower',
	print = 'Print',
	punct = 'Punct',
	space = 'Space',
	upper = 'Upper',
	//word = 'word',
	xdigit = 'XDigit',
}

import * as self from './';
export default self;

