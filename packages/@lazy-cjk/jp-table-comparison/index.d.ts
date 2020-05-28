/**
 * Created by user on 2017/12/24/024.
 *
 * @see https://www.jcinfo.net/tw/tools/kanji
 * @see http://dict.variants.moe.edu.tw/variants/rbt/japan_chinese_character_tiles.rbt?pageId=2981908
 * @see https://en.wikipedia.org/wiki/List_of_j%C5%8Dy%C5%8D_kanji
 * @see https://hanzi.unihan.com.cn/CJKCompare
 * @see http://www5b.biglobe.ne.jp/%7Eharigaya/variants.html
 */
import { TABLE, TABLE_SAFE } from './lib/table';
import { TABLE as ZHJP_TABLE, TABLE_SAFE as ZHJP_TABLE_SAFE } from './lib/table';
export * from './lib/table';
export { TABLE, TABLE_SAFE };
export { ZHJP_TABLE, ZHJP_TABLE_SAFE };
export default TABLE;
