/**
 * Created by user on 2018/5/7/007.
 */
import TABLE_RANGE from './table';
export { TABLE_RANGE };
export declare type IOptions = {
    /**
     * 字元範圍表
     */
    dataTables?: typeof TABLE_RANGE;
    /**
     * 回傳 陣列
     */
    arrayMode?: boolean;
    /**
     * 回傳 字串
     */
    createRegExpString?: boolean;
    /**
     * 回傳由 [] 包覆的字串
     */
    createRegExpClass?: boolean;
    /**
     * 找到第一個就停止
     */
    findFirstOne?: boolean;
};
export declare function matchRange(from: any, to: any, options: IOptions & {
    createRegExpString: true;
}): string;
export declare function matchRange(from: any, to: any, options?: IOptions): string[];
export declare function toRegExpString(arr: string[], warpClass?: boolean): string;
export declare function fillRange(from: any, to: any, options?: IOptions): string[];
export declare function getOptions(options: IOptions): IOptions;
export default matchRange;
