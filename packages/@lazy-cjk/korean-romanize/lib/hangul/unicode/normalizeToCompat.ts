import { isHangul } from '../isHangul';

import { _HANGUL_COMPATIBILITY_JAMO, _HANGUL_JAMO } from "./blocks";

const _HANGUL_JAMO_ENTRIES = Object.entries(_HANGUL_JAMO);

function whichJamoSet(jamo: string)
{
	return isHangul(jamo, _HANGUL_JAMO_ENTRIES);
}

const jaeum = {
	ᄀ: "ㄱ",
	ᄁ: "ㄲ",
	ᄂ: "ㄴ",
	ᄃ: "ㄷ",
	ᄄ: "ㄸ",
	ᄅ: "ㄹ",
	ᄆ: "ㅁ",
	ᄇ: "ㅂ",
	ᄈ: "ㅃ",
	ᄉ: "ㅆ",
	ᄊ: "ㅆ",
	ᄋ: "ㅇ",
	ᄌ: "ㅈ",
	ᄍ: "ㅉ",
	ᄎ: "ㅊ",
	ᄏ: "ㅋ",
	ᄐ: "ㅌ",
	ᄑ: "ㅍ",
	ᄒ: "ㅎ",
	ᆨ: "ㄱ",
	ᆩ: "ㄲ",
	ᆪ: "",
	ᆫ: "ㄴ",
	ᆬ: "",
	ᆭ: "",
	ᆮ: "ㄷ",
	ᆯ: "ㄹ",
	ᆰ: "ㄺ",
	ᆱ: "",
	ᆲ: "",
	ᆳ: "",
	ᆴ: "",
	ᆵ: "",
	ᆶ: "",
	ᆷ: "ㅁ",
	ᆸ: "ㅂ",
	ᆹ: "ㅄ",
	ᆺ: "ㅅ",
	ᆻ: "ㅆ",
	ᆼ: "ㅇ",
	ᆽ: "ㅈ",
	ᆾ: "ㅊ",
	ᆿ: "ㅋ",
	ᇀ: "ㅌ",
	ᇁ: "ㅍ",
	ᇂ: "ㅎ",
};

export function normalizeToCompat(jamo: string)
{
	const jamoSet = whichJamoSet(jamo);

	if (!jamoSet)
	{
		return jamoSet;
	}

	if (jamoSet === "RIEUL_JONGSEONG")
	{
		const jungseongOffset =
			jamo.codePointAt(0) - _HANGUL_JAMO.RIEUL_JONGSEONG[0];
		const maeumOffset = _HANGUL_COMPATIBILITY_JAMO.RIEUL[0];
		return String.fromCodePoint(maeumOffset + jungseongOffset);
	}

	if (jamoSet === "JUNGSEONG")
	{
		const jungseongOffset = jamo.codePointAt(0) - _HANGUL_JAMO.JUNGSEONG[0];
		const maeumOffset = _HANGUL_COMPATIBILITY_JAMO.MOEUM[0];
		return String.fromCodePoint(maeumOffset + jungseongOffset);
	}

	return jaeum[jamo];
}

export default normalizeToCompat;
