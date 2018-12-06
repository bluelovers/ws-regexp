import { array_unique } from 'array-hyper-unique';
import { arrCjk } from 'cjk-conv/lib/zh/table/list';
import zhRegExp from 'regexp-cjk';
export { array_unique, arrCjk };
export declare function splitZh(s: string): string[];
/**
 * @example console.log(arraySep(star));
 */
export declare function arraySep(arr: string[]): any[];
/**
 * @example arrayToRegExp(arraySep(star).map(v => v.join('')))
 */
export declare function arrayToRegExp<T extends string | RegExp | zhRegExp>(arr: T[], unique?: boolean): zhRegExp[];
