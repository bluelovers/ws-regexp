"use strict";
/**
 * Created by user on 2017/12/24/024.
 *
 * @see https://www.jcinfo.net/tw/tools/kanji
 * @see http://dict.variants.moe.edu.tw/variants/rbt/japan_chinese_character_tiles.rbt?pageId=2981908
 * @see https://en.wikipedia.org/wiki/List_of_j%C5%8Dy%C5%8D_kanji
 * @see https://hanzi.unihan.com.cn/CJKCompare
 * @see http://www5b.biglobe.ne.jp/%7Eharigaya/variants.html
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 資料來源 https://www.jpmarumaru.com/tw/teachKanjiComparison.asp
 * @see https://www.jpmarumaru.com/tw/teachKanjiComparison.asp
 */
const teachKanjiComparison = require('./teachKanjiComparison.json');
exports.TABLE = [];
function addNew(table, jp, zht, zhs) {
    jp = Array.isArray(jp) ? jp : [jp];
    zht = Array.isArray(zht) ? zht : [zht];
    zhs = Array.isArray(zhs) ? zhs : [zhs];
    table.push([
        jp,
        zht,
        zhs,
    ]);
    return table;
}
exports.addNew = addNew;
[
    ['蝕', '蝕', '蚀'],
    ["絲", "絲", "丝"],
    ["異", "異", "异"],
    ["謎", "謎", "谜"],
    ["氷", "冰", "冰"],
    // http://www.kanjipedia.jp/kanji/0003297700
    ["詛", "詛", "诅"],
    //['戻', '戾', null],
    // https://kotobank.jp/word/%E8%B2%AA%E5%A9%AA-564803
    ["貪", "貪", "贪"],
    ["館", "館", "馆"],
    ["画", "劃", "划"],
    ["誰", "誰", "谁"],
    ["鶏", "雞", "鸡"],
    ["宮", "宮", "宫"],
].forEach(function ([jp, zht, zhs]) {
    addNew(exports.TABLE, jp, zht, zhs);
});
exports.TABLE = exports.TABLE.concat(teachKanjiComparison);
exports.TABLE_SAFE = [];
{
    let skip = [
        '系',
        '欠',
        '凶',
        '后',
        '只',
        '隻',
        '无',
        '叶',
    ];
    exports.TABLE = exports.TABLE.filter(function (v) {
        let [jp, zht, zhs] = v;
        if ((jp[0] == zht[0] && jp[0] == zhs[0]) || (skip.includes(jp[0]) || skip.includes(zht[0]) || skip.includes(zhs[0]))) {
            return false;
        }
        return true;
    });
    exports.TABLE_SAFE = [];
    let cache = [];
    for (let i in exports.TABLE) {
        if (cache.includes(i)) {
            continue;
        }
        let [jp, zht, zhs] = exports.TABLE[i];
        let _do = true;
        let j;
        for (j in exports.TABLE) {
            if (j == i) {
                continue;
            }
            let [jp2, zht2, zhs2] = exports.TABLE[j];
            if (zht.includes(zht2[0])) {
                _do = false;
                break;
            }
            if (zhs.includes(zhs2[0])) {
                _do = false;
                break;
            }
        }
        if (!_do) {
            cache.push(i);
            cache.push(j);
            //console.log(jp, zht, zhs);
        }
        else {
            exports.TABLE_SAFE.push(exports.TABLE[i]);
        }
    }
}
exports.default = exports.TABLE;
//export default exports;