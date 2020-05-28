export interface IOptions {
    skip?: string;
    safe?: boolean;
}
export declare function filename(name: string, options?: IOptions): string;
export declare function word(name: string, options?: IOptions): string;
export declare function jp(txt: string, options?: IOptions): string;
export declare function zh(txt: string, options?: IOptions): string;
declare const _default: typeof import(".");
export default _default;
