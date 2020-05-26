import { _greedyTableBuild } from '../../lib/core';
import { _greedyTableCacheRegexp } from '../../lib/table/re';

export { _greedyTableCacheRegexp }

export const { _greedyTableCacheMap, _greedyTableCacheTest } = _greedyTableBuild(_greedyTableCacheRegexp);
