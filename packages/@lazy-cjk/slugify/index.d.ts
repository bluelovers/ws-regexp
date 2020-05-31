/**
 * Created by user on 2020/5/30.
 */
import { IOptionsSlugify } from './lib/types';
export declare function transliterate(word: string, options?: IOptionsSlugify): string;
export declare function slugify(word: string, options?: IOptionsSlugify): string;
export default slugify;
