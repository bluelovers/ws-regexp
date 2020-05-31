/**
 * Created by user on 2020/5/31.
 */
import { IOptionsSlugify } from './types';
export declare const listSupportedEmoji: [RegExp, string][];
export declare const reSupportedEmoji: RegExp;
export declare function _replaceEmoji(word: string, options?: IOptionsSlugify): string;
export declare function slugifyEmoji(word: string, options?: IOptionsSlugify): string;
