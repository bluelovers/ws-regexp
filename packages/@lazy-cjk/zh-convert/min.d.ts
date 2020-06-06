/**
 * Created by user on 2020/5/29.
 */
import { IOptions } from './lib/types';
export * from './lib/types';
/**
 * 以不造成歧異的字典表來取代
 */
export declare function tw2cn_min(text: string, options?: IOptions, ...argv: any[]): string;
/**
 * 以不造成歧異的字典表來取代
 */
export declare function cn2tw_min(text: string, options?: IOptions, ...argv: any[]): string;
declare const _default: {
    tw2cn_min: typeof tw2cn_min;
    cn2tw_min: typeof cn2tw_min;
};
export default _default;
