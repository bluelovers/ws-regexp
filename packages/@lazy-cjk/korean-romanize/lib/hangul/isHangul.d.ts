/**
 * Check whether a provided character belongs to a Hangul Unicode block
 *
 * Returns null if input is not a string.
 *
 * @param {*} char
 * @param {blocks}
 */
export declare function isHangul(char?: any, blocks?: [string, number[] | {
    CHOSEONG: number[];
    RIEUL_JONGSEONG: number[];
    JUNGSEONG: number[];
    JONGSEONG: number[];
} | {
    RIEUL: number[];
    JAEUM: number[];
    MOEUM: number[];
} | typeof import("./unicode/blocks")][]): string | false;
export default isHangul;
