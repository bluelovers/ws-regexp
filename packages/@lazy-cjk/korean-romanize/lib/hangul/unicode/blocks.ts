export const HANGUL_SYLLABLES = [0xac00, 0xd7af]
export const HANGUL_JAMO = [0x1100, 0x11ff]
export const _HANGUL_JAMO = {
	CHOSEONG: [0x1100, 0x1112],
	RIEUL_JONGSEONG: [0x11af, 0x11b6],
	JUNGSEONG: [0x1161, 0x1175],
	JONGSEONG: [0x11a8, 0x11c2],
}
export const HANGUL_COMPATIBILITY_JAMO = [0x3130, 0x318f]
export const _HANGUL_COMPATIBILITY_JAMO = {
	RIEUL: [0x313a, 0x3140],
	JAEUM: [0x3131, 0x314e],
	MOEUM: [0x314f, 0x3163],
}
export const HANGUL_JAMO_EXTENDED_A = [0xa960, 0xa97f]
export const HANGUL_JAMO_EXTENDED_B = [0xd7b0, 0xd7ff]
export const BASIC_LATIN = [0x0000, 0x007f]
export const CJK_UNIFIED_IDEOGRAPHS = [0x4e00, 0x9fff]
export const CJK_SYMBOLS_AND_PUNCTUATION = [0x3000, 0x303f]

// _HALFWIDTH_UNICODE_CHOSEONG: [0xffa1, 0xffbe],
// _HALFWIDTH_UNICODE_JUNGSEONG: [0xffc2, 0xffdc],
// _HALFWIDTH_UNICODE_JONGSEONG: [0xffa1, 0xffbe],

export default exports as typeof import('./blocks')
