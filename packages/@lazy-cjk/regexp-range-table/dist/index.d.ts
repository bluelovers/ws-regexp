export declare const TABLE_RANGE: {
	readonly chinese: string[][];
	readonly chinese2: string[][];
	readonly circle: string[][];
};
export declare const TABLE_RANGE_ALL: {
	readonly chinese: string[][];
	readonly chinese2: string[][];
	readonly circle: string[][];
	readonly roman: string[][];
};
export declare function listRawToRange(list_range_raw: (string | number | number[])[][]): string[][];
declare const list_range: string[][];

export {
	TABLE_RANGE as default,
	list_range as roman,
};

export {};
