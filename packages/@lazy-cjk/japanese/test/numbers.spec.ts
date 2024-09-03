import japanese from '../'

// Compatify Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER
const MAX_SAFE_INTEGER = 9007199254740991;
const MIN_SAFE_INTEGER = -9007199254740991;

describe('japanese.transcribeNumber()', () =>
{
	describe('default options', () =>
	{
		test(
			'must perfectly transcribe some numbers and strings into japanese',
			() =>
			{
				expect(japanese.transcribeNumber(0)).toStrictEqual('〇');
				expect(japanese.transcribeNumber(4)).toStrictEqual('四');
				expect(japanese.transcribeNumber(13)).toStrictEqual('十三');
				expect(japanese.transcribeNumber(334)).toStrictEqual('三百三十四');
				expect(japanese.transcribeNumber(2525)).toStrictEqual('二千五百二十五');
				expect(japanese.transcribeNumber(810100081)).toStrictEqual('八億千十万八十一');
				expect(japanese.transcribeNumber(3000000000000)).toStrictEqual('三兆');
				expect(japanese.transcribeNumber('8')).toStrictEqual('八');
				expect(japanese.transcribeNumber('72')).toStrictEqual('七十二');
				expect(japanese.transcribeNumber('52149')).toStrictEqual('五万二千百四十九');
				expect(japanese.transcribeNumber('114514')).toStrictEqual('十一万四千五百十四');
				expect(japanese.transcribeNumber('241543903')).toStrictEqual('二億四千百五十四万三千九百三');
			},
		);

		test(
			'must perfectly convert some huge numbers into japanese until 無量大数',
			() =>
			{
				// Number.MAX_SAFE_INTEGER
				expect(japanese.transcribeNumber(MAX_SAFE_INTEGER)).toStrictEqual([
					'九千七兆',
					'千九百九十二億',
					'五千四百七十四万',
					'九百九十一',
				].join(''));
				// https://ja.wikipedia.org/wiki/18446744073709551617
				expect(japanese.transcribeNumber('18446744073709551617')).toStrictEqual([
					'千八百四十四京',
					'六千七百四十四兆',
					'七百三十七億',
					'九百五十五万',
					'千六百十七',
				].join(''));
				// http://dic.nicovideo.jp/a/9999999999999999999999999999999999999999999999999999999999999999
				expect(
					japanese.transcribeNumber('9999999999999999999999999999999999999999999999999999999999999999'),
				).toStrictEqual([
					'九千九百九十九那由他',
					'九千九百九十九阿僧祇',
					'九千九百九十九恒河沙',
					'九千九百九十九極',
					'九千九百九十九載',
					'九千九百九十九正',
					'九千九百九十九澗',
					'九千九百九十九溝',
					'九千九百九十九穣',
					'九千九百九十九𥝱',
					'九千九百九十九垓',
					'九千九百九十九京',
					'九千九百九十九兆',
					'九千九百九十九億',
					'九千九百九十九万',
					'九千九百九十九',
				].join(''));
				// PI
				expect(
					japanese.transcribeNumber('314159265358979323846264338327950288419716939937510582097494459230781640'),
				).toStrictEqual([
					'三千百四十一無量大数',
					'五千九百二十六不可思議',
					'五千三百五十八那由他',
					'九千七百九十三阿僧祇',
					'二千三百八十四恒河沙',
					'六千二百六十四極',
					'三千三百八十三載',
					'二千七百九十五正',
					'二百八十八澗',
					'四千百九十七溝',
					'千六百九十三穣',
					'九千九百三十七𥝱',
					'五千百五垓',
					'八千二百九京',
					'七千四百九十四兆',
					'四千五百九十二億',
					'三千七十八万',
					'千六百四十',
				].join(''));
			},
		);

		test(
			'should fairly transcribe numbers over 無量大数 into serialized numbers',
			() =>
			{
				// Number.MAX_VALUE is exactly the same as 2 ** 1024 - 2 ** 971
				expect(japanese.transcribeNumber(Number.MAX_VALUE)).toStrictEqual([
					'一七九七六九三',
					'一三四八六二三一五七',
					'〇八一四五二七四二三',
					'七三一七〇四三五六七',
					'九八〇七〇五六七五二',
					'五八四四九九六五九八',
					'九一七四七六八〇三一',
					'五七二六〇七八〇〇二',
					'八五三八七六〇五八九',
					'五五八六三二七六六八',
					'七八一七一五四〇四五',
					'八九五三五一四三八二',
					'四六四二三四三二一三',
					'二六八八九四六四一八',
					'二七六八四六七五四六',
					'七〇三五三七五一六九',
					'八六〇四九九一〇五七',
					'六五五一二八二〇七六',
					'二四五四九〇〇九〇三',
					'八九三二八九四四〇七',
					'五八六八五〇八四五五',
					'一三三九四二三〇四五',
					'八三二三六九〇三二二',
					'二九四八一六五八〇八',
					'五千五百九十三無量大数',
					'三千二百十二不可思議',
					'三千三百四十八那由他',
					'二千七百四十七阿僧祇',
					'九千七百八十二恒河沙',
					'六千二百四極',
					'千四百四十七載',
					'二千三百十六正',
					'八千七百三十八澗',
					'千七百七十一溝',
					'八千九十一穣',
					'九千二百九十九𥝱',
					'八千八百十二垓',
					'五千四十京',
					'四千二十六兆',
					'千八百四十一億',
					'二千四百八十五万',
					'八千三百六十八',
				].join(''));

				// gooprol
				expect(japanese.transcribeNumber([
					'1',
					'0000000000',
					'0000000000',
					'0000000000',
					'0000000000',
					'0000000000',
					'0000000000',
					'0000000000',
					'0000000000',
					'0000000000',
					'0000000267',
				].join(''))).toStrictEqual([
					'一〇〇〇〇〇〇〇〇〇',
					'〇〇〇〇〇〇〇〇〇〇',
					'〇〇〇〇〇〇〇〇〇〇',
					'千無量大数二百六十七',
				].join(''));
			},
		);

		test(
			'must perfectly transcribe negative numbers with facing "マイナス" string',
			() =>
			{
				expect(japanese.transcribeNumber(-0)).toStrictEqual('マイナス〇');
				expect(japanese.transcribeNumber(-1)).toStrictEqual('マイナス一');
				expect(japanese.transcribeNumber(-893)).toStrictEqual('マイナス八百九十三');
				expect(japanese.transcribeNumber('-0')).toStrictEqual('マイナス〇');
				expect(japanese.transcribeNumber('-1')).toStrictEqual('マイナス一');
				expect(japanese.transcribeNumber('-114514')).toStrictEqual('マイナス十一万四千五百十四');
			},
		);

		test.skip('must perfectly transcribe very minor numbers into string', () =>
		{
			// Number.MIN_SAFE_INTEGER
			expect(japanese.transcribeNumber(MIN_SAFE_INTEGER)).toStrictEqual([
				'マイナス',
				'九千七兆',
				'千九百九十二億',
				'五千四百七十四万',
				'九百九十一',
			]);

			// PI
			expect(
				japanese.transcribeNumber('-314159265358979323846264338327950288419716939937510582097494459230781640'),
			).toStrictEqual([
				'マイナス',
				'三千百四十一無量大数',
				'五千九百二十六不可思議',
				'五千三百五十八那由多',
				'九千七百九十三阿僧祇',
				'二千三百八十四恒河沙',
				'六千二百六十四極',
				'三千三百八十三載',
				'二千七百九十五正',
				'二百八十八澗',
				'四千百九十七溝',
				'千六百九十三穣',
				'九千九百三十七𥝱',
				'五千百五垓',
				'八千二百九京',
				'七千四百九十四兆',
				'四千五百九十二億',
				'三千七十八万',
				'千六百四十',
			].join(''));

			expect(japanese.transcribeNumber(-Number.MAX_VALUE)).toStrictEqual([
				'マイナス',
				'一七九七六九三',
				'一三四八六二三一五七',
				'〇八一四五二七四二三',
				'七三一七〇四三五六七',
				'九八〇七〇五六七五二',
				'五八四四九九六五九八',
				'九一七四七六八〇三一',
				'五七二六〇七八〇〇二',
				'八五三八七六〇五八九',
				'五五八六三二七六六八',
				'七八一七一五四〇四五',
				'八九五三五一四三八二',
				'四六四二三四三二一三',
				'二六八八九四六四一八',
				'二七六八四六七五四六',
				'七〇三五三七五一六九',
				'八六〇四九九一〇五七',
				'六五五一二八二〇七六',
				'二四五四九〇〇九〇三',
				'八九三二八九四四〇七',
				'五八六八五〇八四五五',
				'一三三九四二三〇四五',
				'八三二三六九〇三二二',
				'二九四八一六五八〇八',
				'五千五百九十三無量大数',
				'三千二百十二不可思議',
				'三千三百四十八那由多',
				'二千七百四十七阿僧祇',
				'九千七百八十二恒河沙',
				'六千二百四極',
				'千四百四十七載',
				'二千三百十六正',
				'八千七百三十八澗',
				'千七百七十一溝',
				'八千九十一穣',
				'九千二百九十九𥝱',
				'八千八百十二垓',
				'五千四十京',
				'四千二十六兆',
				'千八百四十一億',
				'二千四百八十五万',
				'八千三百六十八',
			].join(''));
		});

		test.skip(
			'must perfectly transcribe decimal fractions with fullwidth dot sign',
			() =>
			{
				expect(japanese.transcribeNumber(3.14)).toStrictEqual('三・一四');
				expect(japanese.transcribeNumber(249.51)).toStrictEqual('二百四十九・五一');
				expect(japanese.transcribeNumber(802.11)).toStrictEqual('八百二・一一');
				expect(japanese.transcribeNumber(-1995.117)).toStrictEqual('マイナス千九百九十五・一一七');
				expect(japanese.transcribeNumber('1.41421356')).toStrictEqual('一・四一四二一三五六');
				expect(japanese.transcribeNumber('.721454545454545454545454545'))
					.toStrictEqual('〇・七二一四五四五四五四五四五四五四五四五四五四五四五四五');
			},
		);

		test.skip('must have JavaScript oriented precisions for decimal fractions', () =>
		{
			expect(japanese.transcribeNumber(1 / 3)).toStrictEqual('〇・三三三三三三三三三三三三三三三三');
			expect(japanese.transcribeNumber(0.1 + 0.2)).toStrictEqual('〇・三〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇四');
			expect(japanese.transcribeNumber(1 / 5554560721)).toStrictEqual('〇・〇〇〇〇〇〇〇〇〇一八〇〇三二二三八四一二五三九六二');
			expect(japanese.transcribeNumber(1234567890.1234567890123456789)).toStrictEqual('十二億三千四百五十六万七千八百九十・一二三四五六七');
			expect(japanese.transcribeNumber(Number.MIN_VALUE)).toStrictEqual([
				'〇・',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇〇〇〇〇〇〇〇',
				'〇〇〇五',
			].join(''));
		});

		test.skip('must transcribe each occurrence of number in string', () =>
		{
			expect(japanese.transcribeNumber('2.26事件')).toStrictEqual('二・二六事件');
			expect(japanese.transcribeNumber('2-4-11')).toStrictEqual('二マイナス四マイナス十一');
			expect(japanese.transcribeNumber('50歩100歩')).toStrictEqual('五十歩百歩');
			expect(japanese.transcribeNumber('6000000000000年と1夜物語')).toStrictEqual('六兆年と一夜物語');
			expect(japanese.transcribeNumber('毎秒2億9979万2458メートル')).toStrictEqual('毎秒二億九千九百七十九万二千四百五十八メートル');
		});

		test.skip('must transcribe comma separated number strings', () =>
		{
			expect(japanese.transcribeNumber('1,234,567.89')).toStrictEqual('百二十三万四千五百六十七・八九');
			expect(japanese.transcribeNumber('1,2,34,5,6,7.89')).toStrictEqual('百二十三万四千五百六十七・八九');
		});

		test.skip('mustn\'t include comma inside of fraction part as number', () =>
		{
			expect(japanese.transcribeNumber('1,234,567.890,123,456')).toStrictEqual('百二十三万四千五百六十七・八九〇,十二万三千四百五十六');
		});

		test.skip(
			'must convert special numbers into string but not ones in the strings',
			() =>
			{
				expect(japanese.transcribeNumber(NaN)).toStrictEqual('非数');
				expect(japanese.transcribeNumber(Infinity)).toStrictEqual('無限大');
				expect(japanese.transcribeNumber(-Infinity)).toStrictEqual('マイナス無限大');
				expect(japanese.transcribeNumber('NaN')).toStrictEqual('NaN');
				expect(japanese.transcribeNumber('Infinity')).toStrictEqual('Infinity');
				expect(japanese.transcribeNumber('-Infinity')).toStrictEqual('-Infinity');
			},
		);
	});
});
