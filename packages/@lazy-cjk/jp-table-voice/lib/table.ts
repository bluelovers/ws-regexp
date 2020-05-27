import { ITableVoiceValues } from './types';

/**
 * 所有清濁音 字元列表
 */
export type ITableVoiceKeys = "か" | "き" | "く" | "け" | "こ" | "さ" | "し" | "す" | "せ" | "そ" | "た" | "ち" | "つ" | "て" | "と" | "は" | "ひ" | "ふ" | "へ" | "ほ" | "カ" | "キ" | "ク" | "ケ" | "コ" | "サ" | "シ" | "ス" | "セ" | "ソ" | "タ" | "チ" | "ツ" | "テ" | "ト" | "ハ" | "ヒ" | "フ" | "ヘ" | "ホ" | "が" | "ぎ" | "ぐ" | "げ" | "ご" | "ざ" | "じ" | "ず" | "ぜ" | "ぞ" | "だ" | "ぢ" | "づ" | "で" | "ど" | "ば" | "ぱ" | "び" | "ぴ" | "ぶ" | "ぷ" | "べ" | "ぺ" | "ぼ" | "ぽ" | "ガ" | "ギ" | "グ" | "ゲ" | "ゴ" | "ザ" | "ジ" | "ズ" | "ゼ" | "ゾ" | "ダ" | "ヂ" | "ヅ" | "デ" | "ド" | "バ" | "パ" | "ビ" | "ピ" | "ブ" | "プ" | "ベ" | "ペ" | "ボ" | "ポ";

/**
 * 清濁音
 * 'string' => [清音, 濁音, 半濁音]
 */
export const table_voice: Readonly<Record<ITableVoiceKeys, ITableVoiceValues>> = {
	"か": ["か","が"],
	"き": ["き","ぎ"],
	"く": ["く","ぐ"],
	"け": ["け","げ"],
	"こ": ["こ","ご"],
	"さ": ["さ","ざ"],
	"し": ["し","じ"],
	"す": ["す","ず"],
	"せ": ["せ","ぜ"],
	"そ": ["そ","ぞ"],
	"た": ["た","だ"],
	"ち": ["ち","ぢ"],
	"つ": ["つ","づ"],
	"て": ["て","で"],
	"と": ["と","ど"],
	"は": ["は","ば","ぱ"],
	"ひ": ["ひ","び","ぴ"],
	"ふ": ["ふ","ぶ","ぷ"],
	"へ": ["へ","べ","ぺ"],
	"ほ": ["ほ","ぼ","ぽ"],
	"カ": ["カ","ガ"],
	"キ": ["キ","ギ"],
	"ク": ["ク","グ"],
	"ケ": ["ケ","ゲ"],
	"コ": ["コ","ゴ"],
	"サ": ["サ","ザ"],
	"シ": ["シ","ジ"],
	"ス": ["ス","ズ"],
	"セ": ["セ","ゼ"],
	"ソ": ["ソ","ゾ"],
	"タ": ["タ","ダ"],
	"チ": ["チ","ヂ"],
	"ツ": ["ツ","ヅ"],
	"テ": ["テ","デ"],
	"ト": ["ト","ド"],
	"ハ": ["ハ","バ","パ"],
	"ヒ": ["ヒ","ビ","ピ"],
	"フ": ["フ","ブ","プ"],
	"ヘ": ["ヘ","ベ","ペ"],
	"ホ": ["ホ","ボ","ポ"],
	"が": ["か","が"],
	"ぎ": ["き","ぎ"],
	"ぐ": ["く","ぐ"],
	"げ": ["け","げ"],
	"ご": ["こ","ご"],
	"ざ": ["さ","ざ"],
	"じ": ["し","じ"],
	"ず": ["す","ず"],
	"ぜ": ["せ","ぜ"],
	"ぞ": ["そ","ぞ"],
	"だ": ["た","だ"],
	"ぢ": ["ち","ぢ"],
	"づ": ["つ","づ"],
	"で": ["て","で"],
	"ど": ["と","ど"],
	"ば": ["は","ば","ぱ"],
	"ぱ": ["は","ば","ぱ"],
	"び": ["ひ","び","ぴ"],
	"ぴ": ["ひ","び","ぴ"],
	"ぶ": ["ふ","ぶ","ぷ"],
	"ぷ": ["ふ","ぶ","ぷ"],
	"べ": ["へ","べ","ぺ"],
	"ぺ": ["へ","べ","ぺ"],
	"ぼ": ["ほ","ぼ","ぽ"],
	"ぽ": ["ほ","ぼ","ぽ"],
	"ガ": ["カ","ガ"],
	"ギ": ["キ","ギ"],
	"グ": ["ク","グ"],
	"ゲ": ["ケ","ゲ"],
	"ゴ": ["コ","ゴ"],
	"ザ": ["サ","ザ"],
	"ジ": ["シ","ジ"],
	"ズ": ["ス","ズ"],
	"ゼ": ["セ","ゼ"],
	"ゾ": ["ソ","ゾ"],
	"ダ": ["タ","ダ"],
	"ヂ": ["チ","ヂ"],
	"ヅ": ["ツ","ヅ"],
	"デ": ["テ","デ"],
	"ド": ["ト","ド"],
	"バ": ["ハ","バ","パ"],
	"パ": ["ハ","バ","パ"],
	"ビ": ["ヒ","ビ","ピ"],
	"ピ": ["ヒ","ビ","ピ"],
	"ブ": ["フ","ブ","プ"],
	"プ": ["フ","ブ","プ"],
	"ベ": ["ヘ","ベ","ペ"],
	"ペ": ["ヘ","ベ","ペ"],
	"ボ": ["ホ","ボ","ポ"],
	"ポ": ["ホ","ボ","ポ"],
};
