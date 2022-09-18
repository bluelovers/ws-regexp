export type IRecordMap<K extends string> = {
    [P in K]: (P & string)[];
};
export interface ISimpleTable {
    [key: string]: string;
}
