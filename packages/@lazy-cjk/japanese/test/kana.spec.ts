import japanese from '../'

describe('japanese.hiraganize()', () =>
{
	test('must perfectly convert given katakana into hiragana', () =>
	{
		expect(japanese.hiraganize('モンブラン')).toStrictEqual('もんぶらん');
		expect(japanese.hiraganize('ティラミス')).toStrictEqual('てぃらみす');
		expect(japanese.hiraganize('ジェラート')).toStrictEqual('じぇらーと');
		expect(japanese.hiraganize('セミフレッド')).toStrictEqual('せみふれっど');
		expect(japanese.hiraganize('パンナコッタ')).toStrictEqual('ぱんなこった');
	});

	test('must perfectly convert katakana-mixed string into hiragana', () =>
	{
		expect(japanese.hiraganize('フェレロ・ロシェ')).toStrictEqual('ふぇれろ・ろしぇ');
		expect(japanese.hiraganize('あんドーナツ')).toStrictEqual('あんどーなつ');
		expect(japanese.hiraganize('抹茶アイス')).toStrictEqual('抹茶あいす');
		expect(japanese.hiraganize('牛乳プリン')).toStrictEqual('牛乳ぷりん');
		expect(japanese.hiraganize('リコリス菓子')).toStrictEqual('りこりす菓子');
	});

	test('must perfectly convert strange katakana string into hiragana', () =>
	{
		expect(japanese.hiraganize('バクラヴァ')).toStrictEqual('ばくらゔぁ');
		expect(japanese.hiraganize('ヴァレニエ')).toStrictEqual('ゔぁれにえ');
		expect(japanese.hiraganize('ヱヴァンゲリヲン')).toStrictEqual('ゑゔぁんげりをん');
		expect(japanese.hiraganize('チヨコバナヽ')).toStrictEqual('ちよこばなゝ');
		expect(japanese.hiraganize('バヾヘラアイス')).toStrictEqual('ばゞへらあいす');
	});

	test(
		'must convert unconvertable voiced katakanaes using combining characters',
		() =>
		{
			expect(japanese.hiraganize('ヸヨロン')).toStrictEqual('ゐ゙よろん');
			expect(japanese.hiraganize('ヹルタースオリジナル')).toStrictEqual('ゑ゙るたーすおりじなる');
			expect(japanese.hiraganize('シユヷルツヹルダーキルシユトルテ')).toStrictEqual('しゆわ゙るつゑ゙るだーきるしゆとるて');
			expect(japanese.hiraganize('ビスコツテイサヺイアルデイ')).toStrictEqual('びすこつていさを゙いあるでい');
			expect(japanese.hiraganize('ルートヸヒシユトルヹルク')).toStrictEqual('るーとゐ゙ひしゆとるゑ゙るく');
		},
	);

	test('must convert katakana digraphs into separated hiraganaes', () =>
	{
		expect(japanese.hiraganize('オ菓子ヲ食スヿコレ快ナリ')).toStrictEqual('お菓子を食すことこれ快なり');
		expect(japanese.hiraganize('板垣死ス𪜈オ菓子ハ死セズ')).toStrictEqual('板垣死すともお菓子は死せず');
		expect(japanese.hiraganize('食エ𪜈゙食エ𪜈゙オ菓子ノ山')).toStrictEqual('食えども食えどもお菓子の山');
	});

	test('must convert Unicoode Kana Supplement characters', () =>
	{
		expect(japanese.hiraganize('𛀀クレア')).toStrictEqual('えくれあ');
	});

	test('must transfer unconvertable small katakanaes into big hiragana', () =>
	{
		expect(japanese.hiraganize('ァィㇲㇰㇼィㇺ')).toStrictEqual('ぁぃすくりぃむ');
	});

	test('must keep small-ka and small-ke untouched', () =>
	{
		expect(japanese.hiraganize('どら焼 3ヶ入')).toStrictEqual('どら焼 3ヶ入');
		expect(japanese.hiraganize('一ヵ月のダイエット')).toStrictEqual('一ヵ月のだいえっと');
	});

	test('must keep non-japanese strings untouched', () =>
	{
		expect(japanese.hiraganize('Chocolate')).toStrictEqual('Chocolate');
		expect(japanese.hiraganize('Tiramisù')).toStrictEqual('Tiramisù');
		expect(japanese.hiraganize('пряник')).toStrictEqual('пряник');
		expect(japanese.hiraganize('ฝอยทอง')).toStrictEqual('ฝอยทอง');
		expect(japanese.hiraganize('龜苓膏')).toStrictEqual('龜苓膏');
	});
});

describe('japanese.katakanize()', () =>
{
	test('must perfectly convert given hiragana into katakana', () =>
	{
		expect(japanese.katakanize('もんぶらん')).toStrictEqual('モンブラン');
		expect(japanese.katakanize('てぃらみす')).toStrictEqual('ティラミス');
		expect(japanese.katakanize('じぇらーと')).toStrictEqual('ジェラート');
		expect(japanese.katakanize('せみふれっど')).toStrictEqual('セミフレッド');
		expect(japanese.katakanize('ぱんなこった')).toStrictEqual('パンナコッタ');
	});

	test('must perfectly convert hiragana-mixed string into katakana', () =>
	{
		expect(japanese.katakanize('ふぇれろ・ろしぇ')).toStrictEqual('フェレロ・ロシェ');
		expect(japanese.katakanize('あんドーナツ')).toStrictEqual('アンドーナツ');
		expect(japanese.katakanize('抹茶あいす')).toStrictEqual('抹茶アイス');
		expect(japanese.katakanize('牛乳ぷりん')).toStrictEqual('牛乳プリン');
		expect(japanese.katakanize('りこりす菓子')).toStrictEqual('リコリス菓子');
	});

	test('must perfectly convert strange hiragana string into katakana', () =>
	{
		expect(japanese.katakanize('ばくらゔぁ')).toStrictEqual('バクラヴァ');
		expect(japanese.katakanize('ゔぁれにえ')).toStrictEqual('ヴァレニエ');
		expect(japanese.katakanize('ゑゔぁんげりをん')).toStrictEqual('ヱヴァンゲリヲン');
		expect(japanese.katakanize('ちよこばなゝ')).toStrictEqual('チヨコバナヽ');
		expect(japanese.katakanize('ばゞへらあいす')).toStrictEqual('バヾヘラアイス');
	});

	test(
		'must convert hiragana with combining characters just like normal characters',
		() =>
		{
			expect(japanese.katakanize('ゐ゙よろん')).toStrictEqual('ヸヨロン');
			expect(japanese.katakanize('ゑ゙るたーすおりじなる')).toStrictEqual('ヹルタースオリジナル');
			expect(japanese.katakanize('しゆわ゙るつゑ゙るだーきるしゆとるて')).toStrictEqual('シユヷルツヹルダーキルシユトルテ');
			expect(japanese.katakanize('びすこつていさを゙いあるでい')).toStrictEqual('ビスコツテイサヺイアルデイ');
			expect(japanese.katakanize('るーとゐ゙ひしゆとるゑ゙るく')).toStrictEqual('ルートヸヒシユトルヹルク');
		},
	);

	test('must convert katakana digraphs into separated hiraganaes', () =>
	{
		expect(japanese.katakanize('本日ゟかき氷解禁')).toStrictEqual('本日ヨリカキ氷解禁');
	});

	test('must convert Unicoode Kana Supplement characters', () =>
	{
		expect(japanese.katakanize('𛀁くれあ')).toStrictEqual('エクレア');
	});

	test('must keep non-japanese strings untouched', () =>
	{
		expect(japanese.katakanize('Chocolate')).toStrictEqual('Chocolate');
		expect(japanese.katakanize('Tiramisù')).toStrictEqual('Tiramisù');
		expect(japanese.katakanize('пряник')).toStrictEqual('пряник');
		expect(japanese.katakanize('ฝอยทอง')).toStrictEqual('ฝอยทอง');
		expect(japanese.katakanize('龜苓膏')).toStrictEqual('龜苓膏');
	});
});
