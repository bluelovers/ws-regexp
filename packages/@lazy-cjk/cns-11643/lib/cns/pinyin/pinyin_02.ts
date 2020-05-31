/**
 * Created by user on 2020/5/30.
 */

import json from './pinyin_02.json';
import { IZhuyin2PinyinTable } from '../../types';

/**
 * 全字庫的拼音資料表格
 * 「CNS_pinyin_2」以聲調符號呈現
 */
const CNSPinyin_02 = json as any as IZhuyin2PinyinTable

export = CNSPinyin_02
