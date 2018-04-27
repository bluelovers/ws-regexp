/**
 * Created by user on 2018/4/27/027.
 */

import { ICreateRegExp, ITypeCreateRegExp } from './index';
import { IPatternTestFn, IPatternTestRow, testPattern } from './pattern';

export enum POXIX
{
	alnum = 'alnum',
	alpha = 'alpha',
	ascii = 'ascii',
	blank = 'blank',
	cntrl = 'cntrl',
	digit = 'digit',
	graph = 'graph',
	lower = 'lower',
	print = 'print',
	punct = 'punct',
	space = 'space',
	upper = 'upper',
	word = 'word',
	xdigit = 'xdigit',
}

export const PatternTest: {
	[k in keyof typeof POXIX]?: IPatternTestRow[]
} = {
	alnum: [
		['^[:alnum:]+$', 'g', 'azAZ09', true, 'test'],
	],
	alpha: [
		['^[:alpha:]+$', 'g', 'azAZ', true, 'test'],
		['^[:alpha:]+$', 'g', 'azAZ09', false, 'test'],
	],
};

export function testPOXIX(name: string, RegExpClass?: typeof RegExp, testPattern?: typeof PatternTest): boolean
export function testPOXIX(name: string, RegExpClass?: ICreateRegExp, testPattern?: typeof PatternTest): boolean
// @ts-ignore
export function testPOXIX<T>(name: string, RegExpClass: ITypeCreateRegExp<T> = RegExp, testPatterns = PatternTest): boolean
{
	// @ts-ignore
	return testPattern(name, RegExpClass, testPatterns);
}

import * as self from './posix';
export default self;
