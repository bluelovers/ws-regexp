/**
 * Created by user on 2018/5/7/007.
 */
import TABLE_RANGE from './table';
export { TABLE_RANGE };
export declare type IOptions = {
    dataTables?: typeof TABLE_RANGE;
    arrayMode?: boolean;
    createRegExpString?: boolean;
    createRegExpClass?: boolean;
};
export declare function matchRange(from: any, to: any, options: IOptions & {
    createRegExpString: true;
}): string;
export declare function matchRange(from: any, to: any, options?: IOptions): string[];
export declare function toRegExpString(arr: string[], warpClass?: boolean): string;
export declare function fillRange(from: any, to: any, options?: IOptions): string[];
export declare function getOptions(options: IOptions): IOptions;
import * as self from '../index';
export default self;
