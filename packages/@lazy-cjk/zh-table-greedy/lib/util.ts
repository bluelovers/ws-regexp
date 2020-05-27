import UString from 'uni-string';
import { array_unique_overwrite } from 'array-hyper-unique';

export function reToStringList(re: RegExp, char: string)
{
	const s = re.source
		.replace(/^.*\[|\].*$/ug, '')
	;

	const a = UString.split(s, '').concat(char).sort();

	return array_unique_overwrite(a);
}
