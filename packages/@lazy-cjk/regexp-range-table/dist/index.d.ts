/**
 * Created by user on 2018/5/7/007.
 */
export declare const TABLE_RANGE: {
	readonly chinese: string[][];
	readonly chinese2: string[][];
	readonly circle: string[][];
};
/**
 * Created by user on 2018/5/7/007.
 */
export declare function listRawToRange(list_range_raw: (string | number | number[])[][]): string[][];
declare const list_range: string[][];

export {
	TABLE_RANGE as default,
	list_range as roman,
};

export {};
