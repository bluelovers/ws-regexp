import { EnumOptionsRomanizeMethod, IOptionsRomanize } from './types';
export declare function syllableParser(opts: IOptionsRomanize): (syllable: number[] | string[], idx: number, word: (number[] | string[])[]) => string[];
/**
 * only allow input korean text
 *
 * @example romanizeWord(`안녕하십니까`)
 */
export declare function romanizeWord(word: string, options?: EnumOptionsRomanizeMethod | IOptionsRomanize): string;
/**
 * only handle korean text
 *
 * @example romanize(`안녕하십니까 a b c 中文`)
 */
export declare function romanize(text: string, options?: IOptionsRomanize): string;
export default romanize;
