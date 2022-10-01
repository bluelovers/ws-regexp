export declare const TABLE_RANGE: {
	readonly chinese: string[][];
	readonly chinese2: string[][];
	readonly circle: string[][];
};
export type IOptions = {
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
export declare function matchRange(from: string | number, to: string | number, options: IOptions & {
	createRegExpString: true;
}): string;
export declare function matchRange(from: string | number, to: string | number, options?: IOptions): string[];
export declare function toRegExpString(arr: string[], warpClass?: boolean): string;
export declare function fillRange(from: string | number, to: string | number, options?: IOptions): string[];
export declare function getOptions(options: IOptions): IOptions;

export {
	matchRange as default,
};

export {};
