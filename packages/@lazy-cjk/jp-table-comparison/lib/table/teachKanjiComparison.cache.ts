import json from './teachKanjiComparison.cache.json';
import { ITeachKanjiComparisonCache } from '../types';

/**
 * 資料來源 https://www.jpmarumaru.com/tw/teachKanjiComparison.asp
 * @see https://www.jpmarumaru.com/tw/teachKanjiComparison.asp
 */
const teachKanjiComparisonCache: ITeachKanjiComparisonCache = json;

export = teachKanjiComparisonCache

