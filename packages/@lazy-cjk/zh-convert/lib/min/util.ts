import { IOptions, ITable } from '../types';
import { getOptions } from '../util';
import { defaultOptions } from '../const';
import { SAFE_MODE_CHAR_MIN } from './const';

export function fixOptions(options: IOptions = {}, table: ITable)
{
	options = Object.assign({}, options);
	options.table = options.table || Object.create(table);
	options.tableOnly = options.tableOnly !== false;

	options = getOptions(options, defaultOptions, SAFE_MODE_CHAR_MIN);

	return options;
}
