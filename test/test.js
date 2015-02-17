/*global describe, it */
'use strict';
var should = require('should');
var japanese = require('../');

describe('japanese.hiraganize()', function () {
    it('must perfectly convert given katakana into hiragana', function () {
        japanese.hiraganize('モンブラン').should.be.exactly('もんぶらん');
        japanese.hiraganize('ティラミス').should.be.exactly('てぃらみす');
        japanese.hiraganize('ジェラート').should.be.exactly('じぇらーと');
        japanese.hiraganize('セミフレッド').should.be.exactly('せみふれっど');
        japanese.hiraganize('パンナコッタ').should.be.exactly('ぱんなこった');
    });

    it('must perfectly convert katakana-mixed string into hiragana', function () {
        japanese.hiraganize('フェレロ・ロシェ').should.be.exactly('ふぃれろ・ろしぇ');
        japanese.hiraganize('あんドーナツ').should.be.exactly('あんどーなつ');
        japanese.hiraganize('抹茶アイス').should.be.exactly('抹茶あいす');
        japanese.hiraganize('牛乳プリン').should.be.exactly('牛乳ぷりん');
        japanese.hiraganize('リコリス菓子').should.be.exactly('りこりす菓子');
    });

    it('must perfectly convert strange katakana string into hiragana', function () {
        japanese.hiraganize('バクラヴァ').should.be.exactly('ばくらゔぁ');
        japanese.hiraganize('ヴァレニエ').should.be.exactly('ゔぁれにえ');
        japanese.hiraganize('ヱヴァンゲリヲン').should.be.exactly('ゑゔぁんげりをん');
        japanese.hiraganize('チヨコバナヽ').should.be.exactly('ちよこばなゝ');
        japanese.hiraganize('バヾヘラアイス').should.be.exactly('ばゞへらあいす');
    });

    it('must convert unconvertable voiced katakanaes using combining characters', function () {
        japanese.hiraganize('ヸヨロン').should.be.exactly('ゐ゙よろん');
        japanese.hiraganize('ヹルタースオリジナル').should.be.exactly('ゑ゙るたーすおりじなる');
        japanese.hiraganize('シユヷルツヹルダーキルシユトルテ').should.be.exactly('しゆわ゙るつゑ゙るだーきるしゆとるて');
        japanese.hiraganize('ビスコツテイサヺイアルデイ').should.be.exactly('びすこつていさを゙いあるでい');
        japanese.hiraganize('ルートヸヒシユトルヹルク').should.be.exactly('るーとゐ゙ひしゆとるゑ゙るく');
    });

    it('must convert katakana digraphs into separated hiraganaes', function () {
        japanese.hiraganize('オ菓子ヲ食スヿコレ快ナリ').should.be.exactly('お菓子を食すことこれ快なり');
        japanese.hiraganize('板垣死ス𪜈オ菓子ハ死セズ').should.be.exactly('板垣死すともお菓子は死せず');
        japanese.hiraganize('食エ𪜈゙食エ𪜈゙オ菓子ノ山').should.be.exactly('食えども食えどもお菓子の山');
    });

    it('must keep non-japanese strings untouched', function () {
        japanese.hiraganize('Chocolate').should.be.exactly('Chocolate');
        japanese.hiraganize('Tiramisù').should.be.exactly('Tiramisù');
        japanese.hiraganize('пряник').should.be.exactly('пряник');
        japanese.hiraganize('ฝอยทอง').should.be.exactly('ฝอยทอง');
        japanese.hiraganize('龜苓膏').should.be.exactly('龜苓膏');
    });
});
