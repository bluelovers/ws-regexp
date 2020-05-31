/**
 * Created by user on 2020/6/1.
 */
import { randIndex } from './util';
import last_name from '../table/last_name';
import { first_name_male, first_name_female } from '../table/first_name';

export function randJapaneseMale()
{
	return first_name_male[randIndex(first_name_male.length)]
}

export function randJapaneseFemale()
{
	return first_name_female[randIndex(first_name_female.length)]
}

export function randJapaneseLastName()
{
	return last_name[randIndex(last_name.length)]
}

export function randJapaneseFirstName()
{
	let first_name = [] as string[];

	first_name.push(randJapaneseMale())
	first_name.push(randJapaneseFemale())

	return first_name[randIndex(first_name.length)]
}

export function randJapaneseName(options?: {
	male?: boolean,
	female?: boolean,
})
{
	options = options || {};

	if (options.female == null && options.male == null)
	{
		options.male = options.female = true;
	}

	let first_name = [] as string[];

	options.male && first_name.push(randJapaneseMale())
	options.female && first_name.push(randJapaneseFemale())

	return [
		randJapaneseLastName(),
		first_name[randIndex(first_name.length)],
	]
}

