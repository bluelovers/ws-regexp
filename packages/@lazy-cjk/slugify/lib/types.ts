import _transliterate from '@sindresorhus/transliterate';

/**
 * Created by user on 2020/5/31.
 */

export interface IOptionsSlugify
{
	separatorRegexp?: RegExp,
	separator?: string,

	deburr?: boolean,

	lowerCase?: boolean,
	upperFirst?: boolean,

	lowerCaseExtra?: boolean,
	upperCaseExtra?: boolean,

	trimRegexp?: RegExp,

	allowEmptyResult?: boolean,

	emoji?: boolean,
	transliterate?: boolean,
}

