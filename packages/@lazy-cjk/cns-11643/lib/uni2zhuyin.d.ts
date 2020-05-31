import { IKeyToZhuyinTable } from './types';
export declare function uni2zhuyin_table(): IKeyToZhuyinTable;
export declare function uni2zhuyin(uni: string | number): string;
export declare function uni2zhuyin_all(uni: string | number): string[];
export declare function char2zhuyin(char: string): string;
export declare function char2zhuyin_all(char: string): string[];
export default uni2zhuyin;
