/**
 * Created by user on 2020/5/31.
 */

import { IOptionsRomanize, IRomanizationConfigsKeys } from '../types';

export const romanizationTable = {
	'あ': 'a',
	'い': 'i',
	'う': 'u',
	'え': 'e',
	'お': 'o',
	'か': 'ka',
	'き': 'ki',
	'く': 'ku',
	'け': 'ke',
	'こ': 'ko',
	'さ': 'sa',
	'し': 'si',
	'す': 'su',
	'せ': 'se',
	'そ': 'so',
	'た': 'ta',
	'ち': 'ti',
	'つ': 'tu',
	'て': 'te',
	'と': 'to',
	'な': 'na',
	'に': 'ni',
	'ぬ': 'nu',
	'ね': 'ne',
	'の': 'no',
	'は': 'ha',
	'ひ': 'hi',
	'ふ': 'hu',
	'へ': 'he',
	'ほ': 'ho',
	'ま': 'ma',
	'み': 'mi',
	'む': 'mu',
	'め': 'me',
	'も': 'mo',
	'や': 'ya',
	'ゆ': 'yu',
	'よ': 'yo',
	'ら': 'ra',
	'り': 'ri',
	'る': 'ru',
	'れ': 're',
	'ろ': 'ro',
	'わ': 'wa',
	'ゐ': 'wi',
	'ゑ': 'we',
	'を': 'wo',
	'ん': 'n',
	'が': 'ga',
	'ぎ': 'gi',
	'ぐ': 'gu',
	'げ': 'ge',
	'ご': 'go',
	'ざ': 'za',
	'じ': 'zi',
	'ず': 'zu',
	'ぜ': 'ze',
	'ぞ': 'zo',
	'だ': 'da',
	'ぢ': 'di',
	'づ': 'du',
	'で': 'de',
	'ど': 'do',
	'ば': 'ba',
	'び': 'bi',
	'ぶ': 'bu',
	'べ': 'be',
	'ぼ': 'bo',
	'ゔ': 'vu',
	'ぱ': 'pa',
	'ぴ': 'pi',
	'ぷ': 'pu',
	'ぺ': 'pe',
	'ぽ': 'po',
	'きゃ': 'kya',
	'きゅ': 'kyu',
	'きぇ': 'kye',
	'きょ': 'kyo',
	'しゃ': 'sya',
	'しゅ': 'syu',
	'しぇ': 'sye',
	'しょ': 'syo',
	'ちゃ': 'tya',
	'ちゅ': 'tyu',
	'ちぇ': 'tye',
	'ちょ': 'tyo',
	'にゃ': 'nya',
	'にゅ': 'nyu',
	'にぇ': 'nye',
	'にょ': 'nyo',
	'ひゃ': 'hya',
	'ひゅ': 'hyu',
	'ひぇ': 'hye',
	'ひょ': 'hyo',
	'みゃ': 'mya',
	'みゅ': 'my',
	'みぇ': 'mye',
	'みょ': 'myo',
	'りゃ': 'rya',
	'りゅ': 'ryu',
	'りぇ': 'rye',
	'りょ': 'ryo',
	'ぎゃ': 'gya',
	'ぎゅ': 'gyu',
	'ぎぇ': 'gye',
	'ぎょ': 'gyo',
	'じゃ': 'zya',
	'じゅ': 'zyu',
	'じぇ': 'zye',
	'じょ': 'zyo',
	'ぢゃ': 'dya',
	'ぢゅ': 'dyu',
	'ぢぇ': 'dye',
	'ぢょ': 'dyo',
	'びゃ': 'bya',
	'びゅ': 'byu',
	'びぇ': 'bye',
	'びょ': 'byo',
	'ゔぁ': 'va',
	'ゔぃ': 'vi',
	'ゔぇ': 've',
	'ゔぉ': 'vo',
	'ぴゃ': 'pya',
	'ぴゅ': 'pyu',
	'ぴぇ': 'pye',
	'ぴょ': 'pyo',
	/*
	 * Rarely used character combinations
	 *
	 * These romanizations are normally not defined in most specifications and
	 * very hard to verify therefore.
	 * In this library, most of the codes are derived from following Wikipedia article.
	 * http://en.wikipedia.org/wiki/Hepburn_romanization#For_extended_katakana
	 */
	'いぃ': 'yi',
	'いぇ': 'ye',
	'うぁ': 'wa',
	'うぃ': 'wi',
	'うぅ': 'wu',
	'うぇ': 'we',
	'うぉ': 'wo',
	'うゅ': 'wyu',
	'ゔゃ': 'vya',
	'ゔゅ': 'vyu',
	'ゔょ': 'vyo',
	'くぁ': 'kwa',
	'くぃ': 'kwi',
	'くぅ': 'kwu',
	'くぇ': 'kwe',
	'くぉ': 'kwo',
	'くゎ': 'kwa',
	'ぐぁ': 'gwa',
	'ぐぃ': 'gwi',
	'ぐぅ': 'gwu',
	'ぐぇ': 'gwe',
	'ぐぉ': 'gwo',
	'ぐゎ': 'gwa',
	'すぃ': 'si',
	'ずぃ': 'zi',
	'つぁ': 'tua',
	'つぃ': 'tui',
	'つぇ': 'tue',
	'つぉ': 'tuo',
	'つゅ': 'tuyu',
	'づぁ': 'dua',
	'づぃ': 'dui',
	'づぇ': 'due',
	'づぉ': 'duo',
	'てゃ': 'tea',
	'てぃ': 'tei',
	'てゅ': 'teu',
	'てぇ': 'tee',
	'てょ': 'teo',
	'とぅ': 'tou',
	'でゃ': 'dea',
	'でぃ': 'dei',
	'でゅ': 'deu',
	'でぇ': 'dee',
	'でょ': 'deo',
	'どぅ': 'dou',
	'ふぁ': 'hua',
	'ふぃ': 'hui',
	'ふぇ': 'hue',
	'ふぉ': 'huo',
	'ふゃ': 'huya',
	'ふゅ': 'huyu',
	'ふょ': 'huyo',
	'ほぅ': 'hu',
	'ら゚': 'la',
	'り゚': 'li',
	'る゚': 'lu',
	'れ゚': 'le',
	'ろ゚': 'lo',
	'わ゙': 'va',
	'ゐ゙': 'vi',
	'ゑ゙': 've',
	'を゙': 'vo',
	'ぁ': 'a',
	'ぃ': 'i',
	'ぅ': 'u',
	'ぇ': 'e',
	'ぉ': 'o',
	'ゃ': 'ya',
	'ゅ': 'yu',
	'ょ': 'yo',
	'っ': 'tu',
	'ゎ': 'wa',
	'ヵ': 'ka',
	'ヶ': 'ke',
};

export const romanizePuncutuationTable = {
	'。': '.',
	'、': ',',
	'・': '-',
	'－': '-',
	'「': '“',
	'」': '”',
	'（': '(',
	'）': ')',
	'　': ' ',
	' ': ' ',
};

export const defaultRomanizationConfig: IOptionsRomanize = {
	'し': 'shi',
	'ち': 'chi',
	'つ': 'tsu',
	'ふ': 'fu',
	'じ': 'ji',
	'ぢ': 'ji',
	'づ': 'zu',
	'ああ': 'aa',
	'いい': 'ii',
	'うう': 'ū',
	'ええ': 'ee',
	'おお': 'ō',
	'あー': 'ā',
	'えい': 'ei',
	'おう': 'ō',
	'んあ': 'n\'a',
	'んば': 'nba',
	'っち': 'tchi',
	'ゐ': 'i',
	'を': 'o',
	punctuation: true,
};

export const romanizationConfigs: Record<IRomanizationConfigsKeys, IOptionsRomanize> = {
	wikipedia: {},
	'traditional hepburn': {
		'を': 'wo',
		'んあ': 'n-a',
		'んば': 'mba',
	},
	'modified hepburn': {
		'ああ': 'ā',
		'いい': 'ii',
		'うう': 'ū',
		'ええ': 'ē',
		'おお': 'ō',
	},
	kunrei: {
		'し': 'si',
		'ち': 'ti',
		'つ': 'tu',
		'ふ': 'hu',
		'じ': 'zi',
		'ぢ': 'zi',
		'づ': 'zu',
		'ああ': 'â',
		'いい': 'î',
		'うう': 'û',
		'ええ': 'ê',
		'おお': 'ô',
		'あー': 'â',
		'おう': 'ô',
		'っち': 'tti',
	},
	nihon: {
		'し': 'si',
		'ち': 'ti',
		'つ': 'tu',
		'ふ': 'hu',
		'じ': 'zi',
		'ぢ': 'di',
		'づ': 'du',
		'ああ': 'ā',
		'いい': 'ī',
		'うう': 'ū',
		'ええ': 'ē',
		'おお': 'ō',
		'あー': 'ā',
		'おう': 'ō',
		'っち': 'tti',
		'ゐ': 'wi',
		'を': 'wo',
	},
};
