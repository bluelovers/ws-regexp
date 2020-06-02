import { IOptionsRomanize, IRomanizationConfigsKeys } from './types';
export * from './data/romanize';
/**
 * Convert input text into romaji.
 *
 * important: Most definitions of Japanese text romanizations require total recognition of Japanese text, but robots cannot actually think or understand! Some conversions are hopelessly poor. For example, ISO 3602 defines that "こうし" which means "講師" must be romanized as "kôsi", while "こうし" which means "子牛" must be romanized as "kousi" (because 子牛 is mixed word of 子 and 牛), though these are apparently the same in Kana-form. While japanese.js is very... very very thoroughly tested, this module (and any other romanization machines) cannot distinguish between these semantics. So unfortunately, you cannot use this function for official writing or something. Ugh.
 */
export declare function romanize(string: string, config?: IRomanizationConfigsKeys | IOptionsRomanize): string;
export default romanize;
