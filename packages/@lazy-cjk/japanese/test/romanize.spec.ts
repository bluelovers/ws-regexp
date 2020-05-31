import japanese from '../'

describe('japanese.romanize()', () =>
{
	test('should throw error when suspicious config was delivered', () =>
	{
		// @ts-ignore
		expect(japanese.romanize.bind(japanese, 'えらー', 'undefined config')).toThrowError(ReferenceError);
		// @ts-ignore
		expect(japanese.romanize.bind(japanese, 'えらー', false)).toThrowError(Error);
		// @ts-ignore
		expect(japanese.romanize.bind(japanese, 'えらー', 114514)).toThrowError(Error);
		// @ts-ignore
		expect(japanese.romanize.bind(japanese, 'えらー', () => {})).toThrowError(Error);
	});

	describe('Wikipedia-style mode', () =>
	{
		test('must perfectly convert existing Wikipedia articles', () =>
		{
			expect(japanese.romanize('れんあい')).toStrictEqual('ren\'ai');

			expect(japanese.romanize('ほっかいどう')).toStrictEqual('hokkaidō');
			expect(japanese.romanize('あおもり')).toStrictEqual('aomori');
			expect(japanese.romanize('いわて')).toStrictEqual('iwate');
			expect(japanese.romanize('あきた')).toStrictEqual('akita');
			expect(japanese.romanize('やまがた')).toStrictEqual('yamagata');
			expect(japanese.romanize('ふくしま')).toStrictEqual('fukushima');
			expect(japanese.romanize('いばらき')).toStrictEqual('ibaraki');
			expect(japanese.romanize('とちぎ')).toStrictEqual('tochigi');
			expect(japanese.romanize('ぐんま')).toStrictEqual('gunma');
			expect(japanese.romanize('さいたま')).toStrictEqual('saitama');
			expect(japanese.romanize('ちば')).toStrictEqual('chiba');
			expect(japanese.romanize('とうきょう')).toStrictEqual('tōkyō');
			expect(japanese.romanize('かながわ')).toStrictEqual('kanagawa');
			expect(japanese.romanize('にいがた')).toStrictEqual('niigata');
			expect(japanese.romanize('とやま')).toStrictEqual('toyama');
			expect(japanese.romanize('いしかわ')).toStrictEqual('ishikawa');
			expect(japanese.romanize('ふくい')).toStrictEqual('fukui');
			expect(japanese.romanize('やまなし')).toStrictEqual('yamanashi');
			expect(japanese.romanize('ながの')).toStrictEqual('nagano');
			expect(japanese.romanize('ぎふ')).toStrictEqual('gifu');
			expect(japanese.romanize('しずおか')).toStrictEqual('shizuoka');
			expect(japanese.romanize('あいち')).toStrictEqual('aichi');
			expect(japanese.romanize('みえ')).toStrictEqual('mie');
			expect(japanese.romanize('しが')).toStrictEqual('shiga');
			expect(japanese.romanize('きょうと')).toStrictEqual('kyōto');
			expect(japanese.romanize('おおさか')).toStrictEqual('ōsaka');
			expect(japanese.romanize('ひょうご')).toStrictEqual('hyōgo');
			expect(japanese.romanize('なら')).toStrictEqual('nara');
			expect(japanese.romanize('わかやま')).toStrictEqual('wakayama');
			expect(japanese.romanize('とっとり')).toStrictEqual('tottori');
			expect(japanese.romanize('しまね')).toStrictEqual('shimane');
			expect(japanese.romanize('おかやま')).toStrictEqual('okayama');
			expect(japanese.romanize('ひろしま')).toStrictEqual('hiroshima');
			expect(japanese.romanize('やまぐち')).toStrictEqual('yamaguchi');
			expect(japanese.romanize('とくしま')).toStrictEqual('tokushima');
			expect(japanese.romanize('かがわ')).toStrictEqual('kagawa');
			expect(japanese.romanize('えひめ')).toStrictEqual('ehime');
			expect(japanese.romanize('こうち')).toStrictEqual('kōchi');
			expect(japanese.romanize('ふくおか')).toStrictEqual('fukuoka');
			expect(japanese.romanize('さが')).toStrictEqual('saga');
			expect(japanese.romanize('ながさき')).toStrictEqual('nagasaki');
			expect(japanese.romanize('くまもと')).toStrictEqual('kumamoto');
			expect(japanese.romanize('おおいた')).toStrictEqual('ōita');
			expect(japanese.romanize('みやざき')).toStrictEqual('miyazaki');
			expect(japanese.romanize('かごしま')).toStrictEqual('kagoshima');
			expect(japanese.romanize('おきなわ')).toStrictEqual('okinawa');
		});

		// http://en.wikipedia.org/wiki/List_of_Strawberry_Panic!_characters
		test('must kind-hearted for fans of Strawberry Panic!', () =>
		{
			expect(japanese.romanize('あおい なぎさ')).toStrictEqual('aoi nagisa');
			expect(japanese.romanize('はなぞの しずま')).toStrictEqual('hanazono shizuma');
			expect(japanese.romanize('すずみ たまお')).toStrictEqual('suzumi tamao');
			expect(japanese.romanize('ろくじょう みゆき')).toStrictEqual('rokujō miyuki');
			expect(japanese.romanize('つきだて ちよ')).toStrictEqual('tsukidate chiyo');
			expect(japanese.romanize('さくらぎ かおり')).toStrictEqual('sakuragi kaori');
			// Original: Sisutā Hamasaka Mizue ...which maybe typo
			expect(japanese.romanize('しすたー はまさか みずえ')).toStrictEqual('shisutā hamasaka mizue');
			expect(japanese.romanize('このはな ひかり')).toStrictEqual('konohana hikari');
			expect(japanese.romanize('なんと やや')).toStrictEqual('nanto yaya');
			expect(japanese.romanize('おおとり あまね')).toStrictEqual('ōtori amane');
			expect(japanese.romanize('おくわか つぼみ')).toStrictEqual('okuwaka tsubomi');
			expect(japanese.romanize('とうもり しおん')).toStrictEqual('tōmori shion');
			expect(japanese.romanize('けんじょう かなめ')).toStrictEqual('kenjō kaname');
			expect(japanese.romanize('きやしき ももみ')).toStrictEqual('kiyashiki momomi');
			expect(japanese.romanize('みなもと ちかる')).toStrictEqual('minamoto chikaru');
			expect(japanese.romanize('ひゅうが きずな')).toStrictEqual('hyūga kizuna');
			expect(japanese.romanize('なつめ れもん')).toStrictEqual('natsume remon');
			expect(japanese.romanize('びゃくだん かごめ')).toStrictEqual('byakudan kagome');
		});

		test('should be able to convert some strange japanese strings neatly', () =>
		{
			expect(japanese.romanize('アッーウッウッイネイネ')).toStrictEqual('a\'-u\'u\'ineine');
			expect(japanese.romanize('ウッウッーウマウマ')).toStrictEqual('u\'u\'-umauma');
			expect(japanese.romanize('ムッムッホァイ')).toStrictEqual('mummuhhoai');
			expect(japanese.romanize('うっうー')).toStrictEqual('u\'ū');
			expect(japanese.romanize('ッエーイ☆')).toStrictEqual('\'ēi');
			expect(japanese.romanize('おっおっおっ')).toStrictEqual('o\'o\'o\'');
			expect(japanese.romanize('はっやーい')).toStrictEqual('hayyāi');
			expect(japanese.romanize('おっそーい')).toStrictEqual('ossōi');
			expect(japanese.romanize('ンアッー!')).toStrictEqual('n\'a\'-');
			expect(japanese.romanize('ダァシエリイェス')).toStrictEqual('daashieriyesu');
			expect(japanese.romanize('ガールズパンツァー')).toStrictEqual('gāruzupantsā');
			expect(japanese.romanize('キェェェェェェアァァァァァァシャァベッタァァァァァァァ')).toStrictEqual('kyeeeeeeaaaaaaashaabettaaaaaaaa');
			expect(japanese.romanize('ぶっぽるぎゃるぴるぎゃっぽっぱぁーっ！')).toStrictEqual('bupporugyarupirugyappoppaā\'');
		});
	});

	describe('Traditional Hepburn mode', () =>
	{
		// http://en.wikipedia.org/wiki/Hepburn_romanization
		test('must perfectly convert Wikipedia\'s conversion examples', () =>
		{
			expect(japanese.romanize('おばあさん', 'traditional hepburn')).toStrictEqual('obaasan');
			expect(japanese.romanize('おにいさん', 'traditional hepburn')).toStrictEqual('oniisan');
			expect(japanese.romanize('おじいさん', 'traditional hepburn')).toStrictEqual('ojiisan');
			expect(japanese.romanize('おいしい', 'traditional hepburn')).toStrictEqual('oishii');
			expect(japanese.romanize('にいがた', 'traditional hepburn')).toStrictEqual('niigata');
			expect(japanese.romanize('はいいろ', 'traditional hepburn')).toStrictEqual('haiiro');
			expect(japanese.romanize('すうがく', 'traditional hepburn')).toStrictEqual('sūgaku');
			expect(japanese.romanize('ちゅうい', 'traditional hepburn')).toStrictEqual('chūi');
			expect(japanese.romanize('ぐうたら', 'traditional hepburn')).toStrictEqual('gūtara');
			expect(japanese.romanize('おねえさん', 'traditional hepburn')).toStrictEqual('oneesan');
			expect(japanese.romanize('こおり', 'traditional hepburn')).toStrictEqual('kōri');
			expect(japanese.romanize('とおまわり', 'traditional hepburn')).toStrictEqual('tōmawari');
			expect(japanese.romanize('おおさか', 'traditional hepburn')).toStrictEqual('ōsaka');
			expect(japanese.romanize('がっこう', 'traditional hepburn')).toStrictEqual('gakkō');
			expect(japanese.romanize('とうきょう', 'traditional hepburn')).toStrictEqual('tōkyō');
			expect(japanese.romanize('べんきょう', 'traditional hepburn')).toStrictEqual('benkyō');
			expect(japanese.romanize('でんぽう', 'traditional hepburn')).toStrictEqual('dempō');
			expect(japanese.romanize('きんようび', 'traditional hepburn')).toStrictEqual('kin-yōbi');
			expect(japanese.romanize('こうし', 'traditional hepburn')).toStrictEqual('kōshi');
			expect(japanese.romanize('がくせい', 'traditional hepburn')).toStrictEqual('gakusei');
			expect(japanese.romanize('けいけん', 'traditional hepburn')).toStrictEqual('keiken');
			expect(japanese.romanize('せいふく', 'traditional hepburn')).toStrictEqual('seifuku');
			expect(japanese.romanize('めい', 'traditional hepburn')).toStrictEqual('mei');
			expect(japanese.romanize('まねいて', 'traditional hepburn')).toStrictEqual('maneite');
			expect(japanese.romanize('かるい', 'traditional hepburn')).toStrictEqual('karui');
			expect(japanese.romanize('うぐいす', 'traditional hepburn')).toStrictEqual('uguisu');
			expect(japanese.romanize('おい', 'traditional hepburn')).toStrictEqual('oi');
			expect(japanese.romanize('セーラー', 'traditional hepburn')).toStrictEqual('sērā');
			expect(japanese.romanize('パーティー', 'traditional hepburn')).toStrictEqual('pātī');
			expect(japanese.romanize('レーナ', 'traditional hepburn')).toStrictEqual('rēna');
			expect(japanese.romanize('ヒーター', 'traditional hepburn')).toStrictEqual('hītā');
			expect(japanese.romanize('タクシー', 'traditional hepburn')).toStrictEqual('takushī');
			expect(japanese.romanize('スーパーマン', 'traditional hepburn')).toStrictEqual('sūpāman');
			expect(japanese.romanize('を', 'traditional hepburn')).toStrictEqual('wo');
			expect(japanese.romanize('あんない', 'traditional hepburn')).toStrictEqual('annai');
			expect(japanese.romanize('ぐんま', 'traditional hepburn')).toStrictEqual('gumma');
			expect(japanese.romanize('かんい', 'traditional hepburn')).toStrictEqual('kan-i');
			expect(japanese.romanize('しんよう', 'traditional hepburn')).toStrictEqual('shin-yō');
			expect(japanese.romanize('けっか', 'traditional hepburn')).toStrictEqual('kekka');
			expect(japanese.romanize('さっさと', 'traditional hepburn')).toStrictEqual('sassato');
			expect(japanese.romanize('ずっと', 'traditional hepburn')).toStrictEqual('zutto');
			expect(japanese.romanize('きっぷ', 'traditional hepburn')).toStrictEqual('kippu');
			expect(japanese.romanize('ざっし', 'traditional hepburn')).toStrictEqual('zasshi');
			expect(japanese.romanize('いっしょ', 'traditional hepburn')).toStrictEqual('issho');
			expect(japanese.romanize('こっち', 'traditional hepburn')).toStrictEqual('kotchi');
			expect(japanese.romanize('まっちゃ', 'traditional hepburn')).toStrictEqual('matcha');
			expect(japanese.romanize('みっつ', 'traditional hepburn')).toStrictEqual('mittsu');
		});
	});

	describe('Modified Hepburn mode', () =>
	{
		// http://en.wikipedia.org/wiki/Hepburn_romanization
		test('must perfectly convert Wikipedia\'s conversion examples', () =>
		{
			expect(japanese.romanize('おばあさん', 'modified hepburn')).toStrictEqual('obāsan');
			expect(japanese.romanize('おにいさん', 'modified hepburn')).toStrictEqual('oniisan');
			expect(japanese.romanize('おじいさん', 'modified hepburn')).toStrictEqual('ojiisan');
			expect(japanese.romanize('おいしい', 'modified hepburn')).toStrictEqual('oishii');
			expect(japanese.romanize('にいがた', 'modified hepburn')).toStrictEqual('niigata');
			expect(japanese.romanize('はいいろ', 'modified hepburn')).toStrictEqual('haiiro');
			expect(japanese.romanize('すうがく', 'modified hepburn')).toStrictEqual('sūgaku');
			expect(japanese.romanize('ちゅうい', 'modified hepburn')).toStrictEqual('chūi');
			expect(japanese.romanize('ぐうたら', 'modified hepburn')).toStrictEqual('gūtara');
			expect(japanese.romanize('おねえさん', 'modified hepburn')).toStrictEqual('onēsan');
			expect(japanese.romanize('こおり', 'modified hepburn')).toStrictEqual('kōri');
			expect(japanese.romanize('とおまわり', 'modified hepburn')).toStrictEqual('tōmawari');
			expect(japanese.romanize('おおさか', 'modified hepburn')).toStrictEqual('ōsaka');
			expect(japanese.romanize('がっこう', 'modified hepburn')).toStrictEqual('gakkō');
			expect(japanese.romanize('とうきょう', 'modified hepburn')).toStrictEqual('tōkyō');
			expect(japanese.romanize('べんきょう', 'modified hepburn')).toStrictEqual('benkyō');
			expect(japanese.romanize('でんぽう', 'modified hepburn')).toStrictEqual('denpō');
			expect(japanese.romanize('きんようび', 'modified hepburn')).toStrictEqual('kin\'yōbi');
			expect(japanese.romanize('こうし', 'modified hepburn')).toStrictEqual('kōshi');
			expect(japanese.romanize('がくせい', 'modified hepburn')).toStrictEqual('gakusei');
			expect(japanese.romanize('けいけん', 'modified hepburn')).toStrictEqual('keiken');
			expect(japanese.romanize('せいふく', 'modified hepburn')).toStrictEqual('seifuku');
			expect(japanese.romanize('めい', 'modified hepburn')).toStrictEqual('mei');
			expect(japanese.romanize('まねいて', 'modified hepburn')).toStrictEqual('maneite');
			expect(japanese.romanize('かるい', 'modified hepburn')).toStrictEqual('karui');
			expect(japanese.romanize('うぐいす', 'modified hepburn')).toStrictEqual('uguisu');
			expect(japanese.romanize('おい', 'modified hepburn')).toStrictEqual('oi');
			expect(japanese.romanize('セーラー', 'modified hepburn')).toStrictEqual('sērā');
			expect(japanese.romanize('パーティー', 'modified hepburn')).toStrictEqual('pātī');
			expect(japanese.romanize('レーナ', 'modified hepburn')).toStrictEqual('rēna');
			expect(japanese.romanize('ヒーター', 'modified hepburn')).toStrictEqual('hītā');
			expect(japanese.romanize('タクシー', 'modified hepburn')).toStrictEqual('takushī');
			expect(japanese.romanize('スーパーマン', 'modified hepburn')).toStrictEqual('sūpāman');
			expect(japanese.romanize('を', 'modified hepburn')).toStrictEqual('o');
			expect(japanese.romanize('あんない', 'modified hepburn')).toStrictEqual('annai');
			expect(japanese.romanize('ぐんま', 'modified hepburn')).toStrictEqual('gunma');
			expect(japanese.romanize('かんい', 'modified hepburn')).toStrictEqual('kan\'i');
			expect(japanese.romanize('しんよう', 'modified hepburn')).toStrictEqual('shin\'yō');
			expect(japanese.romanize('けっか', 'modified hepburn')).toStrictEqual('kekka');
			expect(japanese.romanize('さっさと', 'modified hepburn')).toStrictEqual('sassato');
			expect(japanese.romanize('ずっと', 'modified hepburn')).toStrictEqual('zutto');
			expect(japanese.romanize('きっぷ', 'modified hepburn')).toStrictEqual('kippu');
			expect(japanese.romanize('ざっし', 'modified hepburn')).toStrictEqual('zasshi');
			expect(japanese.romanize('いっしょ', 'modified hepburn')).toStrictEqual('issho');
			expect(japanese.romanize('こっち', 'modified hepburn')).toStrictEqual('kotchi');
			expect(japanese.romanize('まっちゃ', 'modified hepburn')).toStrictEqual('matcha');
			expect(japanese.romanize('みっつ', 'modified hepburn')).toStrictEqual('mittsu');
		});
	});

	describe('Kunrei-shiki mode', () =>
	{
		test('must perfectly convert ISO 3602 provided examples', () =>
		{
			expect(japanese.romanize('かのう', 'kunrei')).toStrictEqual('kanô');
			expect(japanese.romanize('かんおう', 'kunrei')).toStrictEqual('kan\'ô');
			expect(japanese.romanize('きにゅう', 'kunrei')).toStrictEqual('kinyû');
			expect(japanese.romanize('きんゆう', 'kunrei')).toStrictEqual('kin\'yû');

			expect(japanese.romanize('がっこう', 'kunrei')).toStrictEqual('gakkô');

			expect(japanese.romanize('カー', 'kunrei')).toStrictEqual('kâ');
			expect(japanese.romanize('ビール', 'kunrei')).toStrictEqual('bîru');
			expect(japanese.romanize('ソース', 'kunrei')).toStrictEqual('sôsu');

			expect(japanese.romanize('おかあさん', 'kunrei')).toStrictEqual('okâsan');
			expect(japanese.romanize('くうき', 'kunrei')).toStrictEqual('kûki');
			expect(japanese.romanize('おとうさん', 'kunrei')).toStrictEqual('otôsan');
			expect(japanese.romanize('ねえさん', 'kunrei')).toStrictEqual('nêsan');

			expect(japanese.romanize('こうぎょう', 'kunrei')).toStrictEqual('kôgyô');
			expect(japanese.romanize('みょうじ', 'kunrei')).toStrictEqual('myôzi');
			expect(japanese.romanize('しょうひょう', 'kunrei')).toStrictEqual('syôhyô');
			expect(japanese.romanize('りゅうこう', 'kunrei')).toStrictEqual('ryûkô');
			expect(japanese.romanize('ちゅうい', 'kunrei')).toStrictEqual('tyûi');
			expect(japanese.romanize('ひょうじょう', 'kunrei')).toStrictEqual('hyôzyô');
			expect(japanese.romanize('ぎゅうにゅう', 'kunrei')).toStrictEqual('gyûnyû');
			expect(japanese.romanize('はっぴょう', 'kunrei')).toStrictEqual('happyô');
		});

		test(
			'must convert sensitive... ISO 3602 Strict related strings correctly',
			() =>
			{
				expect(japanese.romanize('はなぢ', 'kunrei')).toStrictEqual('hanazi');
				expect(japanese.romanize('ちぢみ', 'kunrei')).toStrictEqual('tizimi');
				expect(japanese.romanize('あいづ', 'kunrei')).toStrictEqual('aizu');
				expect(japanese.romanize('つづきもの', 'kunrei')).toStrictEqual('tuzukimono');

				expect(japanese.romanize('でんぢゃらす', 'kunrei')).toStrictEqual('denzyarasu');
				expect(japanese.romanize('まんぢゅう', 'kunrei')).toStrictEqual('manzyû');
				expect(japanese.romanize('はなぢょうちん', 'kunrei')).toStrictEqual('hanazyôtin');

				expect(japanese.romanize('くうぼをきゅう', 'kunrei')).toStrictEqual('kûbookyû');
			},
		);
	});

	describe('Nihon-shiki mode', () =>
	{
		test('must perfectly convert ISO 3602 provided examples', () =>
		{
			expect(japanese.romanize('かのう', 'nihon')).toStrictEqual('kanō');
			expect(japanese.romanize('かんおう', 'nihon')).toStrictEqual('kan\'ō');
			expect(japanese.romanize('きにゅう', 'nihon')).toStrictEqual('kinyū');
			expect(japanese.romanize('きんゆう', 'nihon')).toStrictEqual('kin\'yū');

			expect(japanese.romanize('がっこう', 'nihon')).toStrictEqual('gakkō');

			expect(japanese.romanize('カー', 'nihon')).toStrictEqual('kā');
			expect(japanese.romanize('ビール', 'nihon')).toStrictEqual('bīru');
			expect(japanese.romanize('ソース', 'nihon')).toStrictEqual('sōsu');

			expect(japanese.romanize('おかあさん', 'nihon')).toStrictEqual('okāsan');
			expect(japanese.romanize('くうき', 'nihon')).toStrictEqual('kūki');
			expect(japanese.romanize('おとうさん', 'nihon')).toStrictEqual('otōsan');
			expect(japanese.romanize('ねえさん', 'nihon')).toStrictEqual('nēsan');

			expect(japanese.romanize('こうぎょう', 'nihon')).toStrictEqual('kōgyō');
			expect(japanese.romanize('みょうじ', 'nihon')).toStrictEqual('myōzi');
			expect(japanese.romanize('しょうひょう', 'nihon')).toStrictEqual('syōhyō');
			expect(japanese.romanize('りゅうこう', 'nihon')).toStrictEqual('ryūkō');
			expect(japanese.romanize('ちゅうい', 'nihon')).toStrictEqual('tyūi');
			expect(japanese.romanize('ひょうじょう', 'nihon')).toStrictEqual('hyōzyō');
			expect(japanese.romanize('ぎゅうにゅう', 'nihon')).toStrictEqual('gyūnyū');
			expect(japanese.romanize('はっぴょう', 'nihon')).toStrictEqual('happyō');
		});

		test(
			'must convert sensitive... ISO 3602 Strict related strings correctly',
			() =>
			{
				expect(japanese.romanize('はなぢ', 'nihon')).toStrictEqual('hanadi');
				expect(japanese.romanize('ちぢみ', 'nihon')).toStrictEqual('tidimi');
				expect(japanese.romanize('あいづ', 'nihon')).toStrictEqual('aidu');
				expect(japanese.romanize('つづきもの', 'nihon')).toStrictEqual('tudukimono');

				expect(japanese.romanize('でんぢゃらす', 'nihon')).toStrictEqual('dendyarasu');
				expect(japanese.romanize('まんぢゅう', 'nihon')).toStrictEqual('mandyū');
				expect(japanese.romanize('はなぢょうちん', 'nihon')).toStrictEqual('hanadyōtin');

				expect(japanese.romanize('くうぼをきゅう', 'nihon')).toStrictEqual('kūbowokyū');
			},
		);
	});

	describe('Custom mode', () =>
	{
		test('must perfectly convert with some strange configs', () =>
		{
			var config = {
				'ああ': 'ah',
				'いい': 'ii',
				'うう': 'u',
				'ええ': 'eh',
				'おお': 'oh',
				'あー': 'ah',
				'えい': 'ei',
				'おう': 'ou',
				'んあ': 'na',
				'んば': 'mba',
			};

			expect(japanese.romanize('ああむじょう', config)).toStrictEqual('ahmujou');
			expect(japanese.romanize('ボードレール', config)).toStrictEqual('bohdorehru');
			expect(japanese.romanize('なかはらちゅうや', config)).toStrictEqual('nakaharachuya');
			expect(japanese.romanize('きちがいピエロ', config)).toStrictEqual('kichigaipiero');
			expect(japanese.romanize('たにざきじゅんいちろう', config)).toStrictEqual('tanizakijunichirou');
			expect(japanese.romanize('ヴィクトル ユーゴー', config)).toStrictEqual('vikutoru yuhgoh');
			expect(japanese.romanize('うえだびん', config)).toStrictEqual('uedabin');
			expect(japanese.romanize('たんびしゅぎ', config)).toStrictEqual('tambishugi');
			expect(japanese.romanize('ゆめのきゅうさく', config)).toStrictEqual('yumenokyusaku');
			expect(japanese.romanize('いしいはくてい', config)).toStrictEqual('ishiihakutei');
			expect(japanese.romanize('モンテクリストはく', config)).toStrictEqual('montekurisutohaku');
			expect(japanese.romanize('べにすにしす', config)).toStrictEqual('benisunishisu');
		});

		test('must perfectly convert with some altered configs', () =>
		{
			var config = {
				'ああ': 'aa',
				'いい': 'ii',
				'うう': 'uu',
				'ええ': 'ee',
				'おお': 'oo',
				'あー': 'aa',
				'えい': 'ee',
				'おう': 'oo',
				'んあ': 'na',
				'んば': 'mba',
			};

			expect(japanese.romanize('ああむじょう', config)).toStrictEqual('aamujoo');
			expect(japanese.romanize('ボードレール', config)).toStrictEqual('boodoreeru');
			expect(japanese.romanize('なかはらちゅうや', config)).toStrictEqual('nakaharachuuya');
			expect(japanese.romanize('きちがいピエロ', config)).toStrictEqual('kichigaipiero');
			expect(japanese.romanize('たにざきじゅんいちろう', config)).toStrictEqual('tanizakijunichiroo');
			expect(japanese.romanize('ヴィクトル ユーゴー', config)).toStrictEqual('vikutoru yuugoo');
			expect(japanese.romanize('うえだびん', config)).toStrictEqual('uedabin');
			expect(japanese.romanize('たんびしゅぎ', config)).toStrictEqual('tambishugi');
			expect(japanese.romanize('ゆめのきゅうさく', config)).toStrictEqual('yumenokyuusaku');
			expect(japanese.romanize('いしいはくてい', config)).toStrictEqual('ishiihakutee');
			expect(japanese.romanize('モンテクリストはく', config)).toStrictEqual('montekurisutohaku');
			expect(japanese.romanize('べにすにしす', config)).toStrictEqual('benisunishisu');
		});

		test('must be properly customizable with し parameter', () =>
		{
			expect(japanese.romanize('しゅうごうしゃしん', { 'し': 'si' })).toStrictEqual('syūgōsyasin');
			expect(japanese.romanize('シェークスピアのしょうせつ', { 'し': 'si' })).toStrictEqual('syēkusupianosyōsetsu');

			expect(japanese.romanize('しゅうごうしゃしん', { 'し': 'shi' })).toStrictEqual('shūgōshashin');
			expect(japanese.romanize('シェークスピアのしょうせつ', { 'し': 'shi' })).toStrictEqual('shēkusupianoshōsetsu');
		});

		test('must be properly customizable with ち parameter', () =>
		{
			expect(japanese.romanize('ちっちゃいそんちょう', { 'ち': 'ti' })).toStrictEqual('titchaisontyō');
			expect(japanese.romanize('ちゃいろいチェーン', { 'ち': 'ti' })).toStrictEqual('tyairoityēn');
			expect(japanese.romanize('テュールのティータイム', { 'ち': 'ti' })).toStrictEqual('teūrunoteītaimu');

			expect(japanese.romanize('ちっちゃいそんちょう', { 'ち': 'chi' })).toStrictEqual('chitchaisonchō');
			expect(japanese.romanize('ちゃいろいチェーン', { 'ち': 'chi' })).toStrictEqual('chairoichēn');
			expect(japanese.romanize('テュールのティータイム', { 'ち': 'chi' })).toStrictEqual('tyūrunotītaimu');
		});

		test('must be properly customizable with つ parameter', () =>
		{
			expect(japanese.romanize('バイツァダスト', { 'つ': 'tu' })).toStrictEqual('baituadasuto');
			expect(japanese.romanize('カンツォーネ', { 'つ': 'tu' })).toStrictEqual('kantuōne');
			expect(japanese.romanize('トゥーツ・シールマンス', { 'つ': 'tu' })).toStrictEqual('toūtu-shīrumansu');
			expect(japanese.romanize('ツィゴイネルワイゼン', { 'つ': 'tu' })).toStrictEqual('tuigoineruwaizen');
			expect(japanese.romanize('ツェッペリン', { 'つ': 'tu' })).toStrictEqual('tuepperin');
			expect(japanese.romanize('ツュループィンシク', { 'つ': 'tu' })).toStrictEqual('tuyurūpuinshiku');

			expect(japanese.romanize('バイツァダスト', { 'つ': 'tsu' })).toStrictEqual('baitsadasuto');
			expect(japanese.romanize('カンツォーネ', { 'つ': 'tsu' })).toStrictEqual('kantsōne');
			expect(japanese.romanize('トゥーツ・シールマンス', { 'つ': 'tsu' })).toStrictEqual('tūtsu-shīrumansu');
			expect(japanese.romanize('ツィゴイネルワイゼン', { 'つ': 'tsu' })).toStrictEqual('tsigoineruwaizen');
			expect(japanese.romanize('ツェッペリン', { 'つ': 'tsu' })).toStrictEqual('tsepperin');
			expect(japanese.romanize('ツュループィンシク', { 'つ': 'tsu' })).toStrictEqual('tsyurūpuinshiku');
		});

		test('must be properly customizable with ふ parameter', () =>
		{
			expect(japanese.romanize('フィファ（フェデレーション・インターナショナル・ド・フットボール・アソシエーション）のフォーメーション', {
				'ふ': 'hu',
			})).toStrictEqual('huihua(huederēshon-intānashonaru-do-huttobōru-asoshiēshon)nohuōmēshon');

			expect(japanese.romanize('フィファ（フェデレーション・インターナショナル・ド・フットボール・アソシエーション）のフォーメーション', {
				'ふ': 'fu',
			})).toStrictEqual('fifa(federēshon-intānashonaru-do-futtobōru-asoshiēshon)nofōmēshon');
		});

		test('must be properly customizable with じ parameter', () =>
		{
			expect(japanese.romanize('アルジャジーラのひじょうようジェットのそうじゅう', {
				'じ': 'zi',
			})).toStrictEqual('aruzyazīranohizyōyōzyettonosōzyū');

			expect(japanese.romanize('アルジャジーラのひじょうようジェットのそうじゅう', {
				'じ': 'ji',
			})).toStrictEqual('arujajīranohijōyōjettonosōjū');
		});

		test('must be properly customizable with ぢ parameter', () =>
		{
			expect(japanese.romanize('アルヂャヂーラのひぢょうようヂェットのそうぢゅう', {
				'ぢ': 'di',
			})).toStrictEqual('arudyadīranohidyōyōdyettonosōdyū');
			expect(japanese.romanize('デュラララのエンディング', { 'ぢ': 'di' })).toStrictEqual('deurararanoendeingu');

			expect(japanese.romanize('アルヂャヂーラのひぢょうようヂェットのそうぢゅう', {
				'ぢ': 'zi',
			})).toStrictEqual('aruzyazīranohizyōyōzyettonosōzyū');
			expect(japanese.romanize('デュラララのエンディング', { 'ぢ': 'zi' })).toStrictEqual('dyurararanoendingu');

			expect(japanese.romanize('アルヂャヂーラのひぢょうようヂェットのそうぢゅう', {
				'ぢ': 'ji',
			})).toStrictEqual('arujajīranohijōyōjettonosōjū');
			expect(japanese.romanize('デュラララのエンディング', { 'ぢ': 'ji' })).toStrictEqual('dyurararanoendingu');

			expect(japanese.romanize('アルヂャヂーラのひぢょうようヂェットのそうぢゅう', {
				'ぢ': 'dji',
			})).toStrictEqual('arudjadjīranohidjōyōdjettonosōdjū');
			expect(japanese.romanize('デュラララのエンディング', { 'ぢ': 'dji' })).toStrictEqual('dyurararanoendingu');

			expect(japanese.romanize('アルヂャヂーラのひぢょうようヂェットのそうぢゅう', {
				'ぢ': 'dzi',
			})).toStrictEqual('arudzyadzīranohidzyōyōdzyettonosōdzyū');
			expect(japanese.romanize('デュラララのエンディング', { 'ぢ': 'dzi' })).toStrictEqual('dyurararanoendingu');
		});

		test('must be properly customizable with づ parameter', () =>
		{
			expect(japanese.romanize('いなづま', { 'づ': 'du' })).toStrictEqual('inaduma');
			expect(japanese.romanize('デラ・モチマッヅィ', { 'づ': 'du' })).toStrictEqual('dera-mochimaddui');
			expect(japanese.romanize('しきえいきヤマザナドゥ', { 'づ': 'du' })).toStrictEqual('shikieikiyamazanadou');

			expect(japanese.romanize('いなづま', { 'づ': 'zu' })).toStrictEqual('inazuma');
			expect(japanese.romanize('デラ・モチマッヅィ', { 'づ': 'zu' })).toStrictEqual('dera-mochimazzui');
			expect(japanese.romanize('しきえいきヤマザナドゥ', { 'づ': 'zu' })).toStrictEqual('shikieikiyamazanadu');

			expect(japanese.romanize('いなづま', { 'づ': 'dsu' })).toStrictEqual('inadsuma');
			expect(japanese.romanize('デラ・モチマッヅィ', { 'づ': 'dsu' })).toStrictEqual('dera-mochimaddsui');
			expect(japanese.romanize('しきえいきヤマザナドゥ', { 'づ': 'dsu' })).toStrictEqual('shikieikiyamazanadu');

			expect(japanese.romanize('いなづま', { 'づ': 'dzu' })).toStrictEqual('inadzuma');
			expect(japanese.romanize('デラ・モチマッヅィ', { 'づ': 'dzu' })).toStrictEqual('dera-mochimaddzui');
			expect(japanese.romanize('しきえいきヤマザナドゥ', { 'づ': 'dzu' })).toStrictEqual('shikieikiyamazanadu');
		});

		test('must be properly customizable with ああ parameter', () =>
		{
			expect(japanese.romanize('まあ、そうなるな', { 'ああ': 'aa' })).toStrictEqual('maa,sōnaruna');
			expect(japanese.romanize('おかあさんといっしょ', { 'ああ': 'aa' })).toStrictEqual('okaasantoissho');

			expect(japanese.romanize('まあ、そうなるな', { 'ああ': 'ah' })).toStrictEqual('mah,sōnaruna');
			expect(japanese.romanize('おかあさんといっしょ', { 'ああ': 'ah' })).toStrictEqual('okahsantoissho');

			expect(japanese.romanize('まあ、そうなるな', { 'ああ': 'â' })).toStrictEqual('mâ,sōnaruna');
			expect(japanese.romanize('おかあさんといっしょ', { 'ああ': 'â' })).toStrictEqual('okâsantoissho');

			expect(japanese.romanize('まあ、そうなるな', { 'ああ': 'ā' })).toStrictEqual('mā,sōnaruna');
			expect(japanese.romanize('おかあさんといっしょ', { 'ああ': 'ā' })).toStrictEqual('okāsantoissho');

			expect(japanese.romanize('まあ、そうなるな', { 'ああ': 'a' })).toStrictEqual('ma,sōnaruna');
			expect(japanese.romanize('おかあさんといっしょ', { 'ああ': 'a' })).toStrictEqual('okasantoissho');
		});

		test('must be properly customizable with いい parameter', () =>
		{
			expect(japanese.romanize('くもいいちりん', { 'いい': 'ii' })).toStrictEqual('kumoiichirin');
			expect(japanese.romanize('ほしいみき', { 'いい': 'ii' })).toStrictEqual('hoshiimiki');

			expect(japanese.romanize('くもいいちりん', { 'いい': 'ih' })).toStrictEqual('kumoihchirin');
			expect(japanese.romanize('ほしいみき', { 'いい': 'ih' })).toStrictEqual('hoshihmiki');

			expect(japanese.romanize('くもいいちりん', { 'いい': 'î' })).toStrictEqual('kumoîchirin');
			expect(japanese.romanize('ほしいみき', { 'いい': 'î' })).toStrictEqual('hoshîmiki');

			expect(japanese.romanize('くもいいちりん', { 'いい': 'ī' })).toStrictEqual('kumoīchirin');
			expect(japanese.romanize('ほしいみき', { 'いい': 'ī' })).toStrictEqual('hoshīmiki');

			expect(japanese.romanize('くもいいちりん', { 'いい': 'i' })).toStrictEqual('kumoichirin');
			expect(japanese.romanize('ほしいみき', { 'いい': 'i' })).toStrictEqual('hoshimiki');
		});

		test('must be properly customizable with うう parameter', () =>
		{
			expect(japanese.romanize('すずみやハルヒのゆううつ', { 'うう': 'uu' })).toStrictEqual('suzumiyaharuhinoyuuutsu');
			expect(japanese.romanize('やじゅうせんぱい', { 'うう': 'uu' })).toStrictEqual('yajuusenpai');

			expect(japanese.romanize('すずみやハルヒのゆううつ', { 'うう': 'uh' })).toStrictEqual('suzumiyaharuhinoyuhutsu');
			expect(japanese.romanize('やじゅうせんぱい', { 'うう': 'uh' })).toStrictEqual('yajuhsenpai');

			expect(japanese.romanize('すずみやハルヒのゆううつ', { 'うう': 'û' })).toStrictEqual('suzumiyaharuhinoyûutsu');
			expect(japanese.romanize('やじゅうせんぱい', { 'うう': 'û' })).toStrictEqual('yajûsenpai');

			expect(japanese.romanize('すずみやハルヒのゆううつ', { 'うう': 'ū' })).toStrictEqual('suzumiyaharuhinoyūutsu');
			expect(japanese.romanize('やじゅうせんぱい', { 'うう': 'ū' })).toStrictEqual('yajūsenpai');

			// TODO: should be 'suzumiyaharuhinoyuutsu'
			expect(japanese.romanize('すずみやハルヒのゆううつ', { 'うう': 'u' })).toStrictEqual('suzumiyaharuhinoyutsu');
			expect(japanese.romanize('やじゅうせんぱい', { 'うう': 'u' })).toStrictEqual('yajusenpai');
		});

		test('must be properly customizable with ええ parameter', () =>
		{
			expect(japanese.romanize('はるうええりい', { 'ええ': 'ee' })).toStrictEqual('harūeerii');
			expect(japanese.romanize('ナナシノゲエム', { 'ええ': 'ee' })).toStrictEqual('nanashinogeemu');

			expect(japanese.romanize('はるうええりい', { 'ええ': 'eh' })).toStrictEqual('harūehrii');
			expect(japanese.romanize('ナナシノゲエム', { 'ええ': 'eh' })).toStrictEqual('nanashinogehmu');

			expect(japanese.romanize('はるうええりい', { 'ええ': 'ê' })).toStrictEqual('harūêrii');
			expect(japanese.romanize('ナナシノゲエム', { 'ええ': 'ê' })).toStrictEqual('nanashinogêmu');

			expect(japanese.romanize('はるうええりい', { 'ええ': 'ē' })).toStrictEqual('harūērii');
			expect(japanese.romanize('ナナシノゲエム', { 'ええ': 'ē' })).toStrictEqual('nanashinogēmu');

			expect(japanese.romanize('はるうええりい', { 'ええ': 'e' })).toStrictEqual('harūerii');
			expect(japanese.romanize('ナナシノゲエム', { 'ええ': 'e' })).toStrictEqual('nanashinogemu');
		});

		test('must be properly customizable with おお parameter', () =>
		{
			expect(japanese.romanize('おおつぼゆか', { 'おお': 'oo' })).toStrictEqual('ootsuboyuka');
			expect(japanese.romanize('ソードアートオンライン', { 'おお': 'oo' })).toStrictEqual('sōdoātoonrain');

			expect(japanese.romanize('おおつぼゆか', { 'おお': 'oh' })).toStrictEqual('ohtsuboyuka');
			expect(japanese.romanize('ソードアートオンライン', { 'おお': 'oh' })).toStrictEqual('sōdoātohnrain');

			expect(japanese.romanize('おおつぼゆか', { 'おお': 'ô' })).toStrictEqual('ôtsuboyuka');
			expect(japanese.romanize('ソードアートオンライン', { 'おお': 'ô' })).toStrictEqual('sōdoātônrain');

			expect(japanese.romanize('おおつぼゆか', { 'おお': 'ō' })).toStrictEqual('ōtsuboyuka');
			expect(japanese.romanize('ソードアートオンライン', { 'おお': 'ō' })).toStrictEqual('sōdoātōnrain');

			expect(japanese.romanize('おおつぼゆか', { 'おお': 'o' })).toStrictEqual('otsuboyuka');
			expect(japanese.romanize('ソードアートオンライン', { 'おお': 'o' })).toStrictEqual('sōdoātonrain');
		});

		test('must be properly customizable with あー parameter', () =>
		{
			expect(japanese.romanize('トレーディングカードゲーム', { 'あー': 'a-' })).toStrictEqual('tore-dinguka-doge-mu');
			expect(japanese.romanize('トレーディングカードゲーム', { 'あー': 'aa' })).toStrictEqual('toreedingukaadogeemu');
			expect(japanese.romanize('トレーディングカードゲーム', { 'あー': 'ah' })).toStrictEqual('torehdingukahdogehmu');
			expect(japanese.romanize('トレーディングカードゲーム', { 'あー': 'â' })).toStrictEqual('torêdingukâdogêmu');
			expect(japanese.romanize('トレーディングカードゲーム', { 'あー': 'ā' })).toStrictEqual('torēdingukādogēmu');
			expect(japanese.romanize('トレーディングカードゲーム', { 'あー': 'a' })).toStrictEqual('toredingukadogemu');
		});

		test('must be properly customizable with あー parameter', () =>
		{
			expect(japanese.romanize('えいせいへい', { 'えい': 'ei' })).toStrictEqual('eiseihei');
			expect(japanese.romanize('えいせいへい', { 'えい': 'ee' })).toStrictEqual('eeseehee');
			expect(japanese.romanize('えいせいへい', { 'えい': 'eh' })).toStrictEqual('ehsehheh');
			expect(japanese.romanize('えいせいへい', { 'えい': 'ê' })).toStrictEqual('êsêhê');
			expect(japanese.romanize('えいせいへい', { 'えい': 'ē' })).toStrictEqual('ēsēhē');
			expect(japanese.romanize('えいせいへい', { 'えい': 'e' })).toStrictEqual('esehe');
		});

		test('must be properly customizable with おう parameter', () =>
		{
			expect(japanese.romanize('とうほうえいやしょう', { 'おう': 'ou' })).toStrictEqual('touhoueiyashou');
			expect(japanese.romanize('とうほうえいやしょう', { 'おう': 'oo' })).toStrictEqual('toohooeiyashoo');
			expect(japanese.romanize('とうほうえいやしょう', { 'おう': 'oh' })).toStrictEqual('tohhoheiyashoh');
			expect(japanese.romanize('とうほうえいやしょう', { 'おう': 'ô' })).toStrictEqual('tôhôeiyashô');
			expect(japanese.romanize('とうほうえいやしょう', { 'おう': 'ō' })).toStrictEqual('tōhōeiyashō');
			expect(japanese.romanize('とうほうえいやしょう', { 'おう': 'o' })).toStrictEqual('tohoeiyasho');
		});

		test('must be properly customizable with んあ parameter', () =>
		{
			expect(japanese.romanize('きんいろモザイク', { 'んあ': 'na' })).toStrictEqual('kiniromozaiku');
			expect(japanese.romanize('うちゅうせんかんヤマト', { 'んあ': 'na' })).toStrictEqual('uchūsenkanyamato');
			expect(japanese.romanize('きんいろモザイク', { 'んあ': 'n\'a' })).toStrictEqual('kin\'iromozaiku');
			expect(japanese.romanize('うちゅうせんかんヤマト', { 'んあ': 'n\'a' })).toStrictEqual('uchūsenkan\'yamato');
			expect(japanese.romanize('きんいろモザイク', { 'んあ': 'n-a' })).toStrictEqual('kin-iromozaiku');
			expect(japanese.romanize('うちゅうせんかんヤマト', { 'んあ': 'n-a' })).toStrictEqual('uchūsenkan-yamato');
		});

		test('must be properly customizable with んば parameter', () =>
		{
			expect(japanese.romanize('のんのんびよりなんみん', { 'んば': 'nba' })).toStrictEqual('nonnonbiyorinanmin');
			expect(japanese.romanize('こころぴょんぴょん', { 'んば': 'nba' })).toStrictEqual('kokoropyonpyon');

			expect(japanese.romanize('のんのんびよりなんみん', { 'んば': 'mba' })).toStrictEqual('nonnombiyorinammin');
			expect(japanese.romanize('こころぴょんぴょん', { 'んば': 'mba' })).toStrictEqual('kokoropyompyon');
		});

		test('must be properly customizable with っち parameter', () =>
		{
			expect(japanese.romanize('ひだまりスケッチ', { 'っち': 'tti' })).toStrictEqual('hidamarisuketti');
			expect(japanese.romanize('まっちょしぃ', { 'っち': 'tti' })).toStrictEqual('mattyoshii');

			expect(japanese.romanize('ひだまりスケッチ', { 'っち': 'tchi' })).toStrictEqual('hidamarisuketchi');
			expect(japanese.romanize('まっちょしぃ', { 'っち': 'tchi' })).toStrictEqual('matchoshii');

			expect(japanese.romanize('ひだまりスケッチ', { 'っち': 'cchi' })).toStrictEqual('hidamarisukecchi');
			expect(japanese.romanize('まっちょしぃ', { 'っち': 'cchi' })).toStrictEqual('macchoshii');
		});

		test('must be properly customizable with ゐ parameter', () =>
		{
			expect(japanese.romanize('いなばてゐ', { 'ゐ': 'i' })).toStrictEqual('inabatei');
			expect(japanese.romanize('ヱヴァンゲリヲン', { 'ゐ': 'i' })).toStrictEqual('evangerion');

			expect(japanese.romanize('いなばてゐ', { 'ゐ': 'wi' })).toStrictEqual('inabatewi');
			expect(japanese.romanize('ヱヴァンゲリヲン', { 'ゐ': 'wi' })).toStrictEqual('wevangerion');
		});

		test('must be properly customizable with を parameter', () =>
		{
			expect(japanese.romanize('パパのいうことをききなさい!', { 'を': 'o' })).toStrictEqual('papanoiukotookikinasai');
			expect(japanese.romanize('をきゅうくうぼ', { 'を': 'o' })).toStrictEqual('okyūkūbo');

			expect(japanese.romanize('パパのいうことをききなさい!', { 'を': 'wo' })).toStrictEqual('papanoiukotowokikinasai');
			expect(japanese.romanize('をきゅうくうぼ', { 'を': 'wo' })).toStrictEqual('wokyūkūbo');
		});
	});
});
