/**
 * Check whether a provided character belongs to a Hangul Unicode block
 *
 * Returns null if input is not a string.
 *
 * @param {*} char
 * @param {blocks}
 */
export declare function isHangul(char?: string, blocks?: [string, [number, number] | {
    CHOSEONG: [number, number];
    RIEUL_JONGSEONG: [number, number];
    JUNGSEONG: [number, number];
    JONGSEONG: [number, number];
} | {
    RIEUL: [number, number];
    JAEUM: [number, number];
    MOEUM: [number, number];
}][]): string | false;
export default isHangul;
