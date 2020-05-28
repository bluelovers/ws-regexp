export interface ITable extends Record<string, string> {
}
export interface IStaticDebugJSON {
    safe: ITable;
    unsafe: ITable;
}
