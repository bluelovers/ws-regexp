export declare function searchJamo(node: any, params: any, prevNode?: any): any;
export declare function syllableParser(method: any): (syllable: any, idx: any, word: any) => any;
export interface IOptionsRomanize {
    method?: string;
    hyphenate?: boolean;
}
export declare function romanizeWord(word: string, options?: string | IOptionsRomanize): any;
export declare function romanize(text: string, options?: any): any;
export default romanize;
