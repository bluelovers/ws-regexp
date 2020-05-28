/**
 * Created by user on 2020/5/29.
 */

import tableTw2CnDebug from '@lazy-cjk/static-build-zh-convert/data/table_tw2cn.debug';
import tableCn2TwDebug from '@lazy-cjk/static-build-zh-convert/data/table_cn2tw.debug';
import { array_unique } from 'array-hyper-unique';
import { SAFE_MODE_CHAR as _SAFE_MODE_CHAR, defaultOptions } from '../const';
import { IOptions, ITable } from '../types';
import { tw2cn, cn2tw } from '../../index';
import { getOptions } from '../util';
import { fixOptions } from './util';

export { tableTw2CnDebug, tableCn2TwDebug }
