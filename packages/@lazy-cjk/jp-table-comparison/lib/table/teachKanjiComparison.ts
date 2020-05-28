import json from './teachKanjiComparison.json';
import { ITeachKanjiComparison } from '../types';

/**
 * 資料來源 https://www.jpmarumaru.com/tw/teachKanjiComparison.asp
 * @see https://www.jpmarumaru.com/tw/teachKanjiComparison.asp
 */
const teachKanjiComparison: ITeachKanjiComparison = json as any;

export = teachKanjiComparison;
