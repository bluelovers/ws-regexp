import { ITableVoiceValues } from './types';
/**
 * 所有清濁音 字元列表
 */
export type ITableVoiceKeys = "か" | "き" | "く" | "け" | "こ" | "さ" | "し" | "す" | "せ" | "そ" | "た" | "ち" | "つ" | "て" | "と" | "は" | "ひ" | "ふ" | "へ" | "ほ" | "カ" | "キ" | "ク" | "ケ" | "コ" | "サ" | "シ" | "ス" | "セ" | "ソ" | "タ" | "チ" | "ツ" | "テ" | "ト" | "ハ" | "ヒ" | "フ" | "ヘ" | "ホ" | "が" | "ぎ" | "ぐ" | "げ" | "ご" | "ざ" | "じ" | "ず" | "ぜ" | "ぞ" | "だ" | "ぢ" | "づ" | "で" | "ど" | "ば" | "ぱ" | "び" | "ぴ" | "ぶ" | "ぷ" | "べ" | "ぺ" | "ぼ" | "ぽ" | "ガ" | "ギ" | "グ" | "ゲ" | "ゴ" | "ザ" | "ジ" | "ズ" | "ゼ" | "ゾ" | "ダ" | "ヂ" | "ヅ" | "デ" | "ド" | "バ" | "パ" | "ビ" | "ピ" | "ブ" | "プ" | "ベ" | "ペ" | "ボ" | "ポ";
/**
 * 清濁音
 * 'string' => [清音, 濁音, 半濁音]
 */
export declare const table_voice: Readonly<Record<ITableVoiceKeys, ITableVoiceValues>>;
