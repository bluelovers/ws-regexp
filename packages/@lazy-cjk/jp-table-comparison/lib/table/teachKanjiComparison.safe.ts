import json from './teachKanjiComparison.safe.json';
import { ITeachKanjiComparison } from '../types';

/**
 * 資料來源 https://www.jpmarumaru.com/tw/teachKanjiComparison.asp
 * @see https://www.jpmarumaru.com/tw/teachKanjiComparison.asp
 */
const teachKanjiComparisonSafe: ITeachKanjiComparison = json as any;

export = teachKanjiComparisonSafe;
