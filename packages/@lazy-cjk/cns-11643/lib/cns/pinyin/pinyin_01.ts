/**
 * Created by user on 2020/5/30.
 */

import json from './pinyin_01.json';
import { IZhuyin2PinyinTable } from '../../types';

/**
 * 全字庫的拼音資料表格
 * 「CNS_pinyin_1」以調值(數字)呈現
 */
const CNSPinyin_01 = json as any as IZhuyin2PinyinTable

export = CNSPinyin_01
