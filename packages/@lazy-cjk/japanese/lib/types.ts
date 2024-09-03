/**
 * Created by user on 2020/5/31.
 */
import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';
import { predefineedTranscriptionConfigs } from './numbers';
import { ITSOverwrite } from 'ts-type/lib/type/record';

export const enum EnumRomanizationConfigsKeys
{
	'wikipedia' = 'wikipedia',
	'traditional_hepburn' = 'traditional hepburn',
	'modified_hepburn' = 'modified hepburn',
	'kunrei' = 'kunrei',
	'nihon' = 'nihon',
}

export type IRomanizationConfigsKeys = ITSTypeAndStringLiteral<EnumRomanizationConfigsKeys>;

/**
 * Config is represented as plain object,
 * where object keys stand for a collection of similar characters,
 * and the value determines how these characters are converted.
 * So the object is not just the same as a conversion table.
 */
export interface IOptionsRomanize
{
	し?: string;
	ち?: string;
	つ?: string;
	ふ?: string;
	じ?: string;
	ぢ?: string;
	づ?: string;
	ああ?: string;
	いい?: string;
	うう?: string;
	ええ?: string;
	おお?: string;
	あー?: string;
	えい?: string;
	おう?: string;
	んあ?: string;
	んば?: string;
	っち?: string;
	ゐ?: string;
	を?: string;
	punctuation?: boolean;
	configPreset?: IRomanizationConfigsKeys;
	ignoreUnSupported?: boolean,
}

export const enum EnumTranscribeNumberConfigsKeys
{
	'default' = 'default',
	formal = 'formal',
	traditional = 'traditional',
}

type IHelperPredefineedTranscriptionConfigsSub2<K extends keyof typeof predefineedTranscriptionConfigs> =
	typeof predefineedTranscriptionConfigs[K][keyof typeof predefineedTranscriptionConfigs[K]]

type IHelperPredefineedTranscriptionConfigsSub<K extends keyof typeof predefineedTranscriptionConfigs> =
	keyof typeof predefineedTranscriptionConfigs[K]
	| IHelperPredefineedTranscriptionConfigsSub2<K>

export interface ITranscribeNumberConfig
{
	unitNames?: IHelperPredefineedTranscriptionConfigsSub<"unitNames">,

	digits: IHelperPredefineedTranscriptionConfigsSub<"digits">,
	specialUnitNames: IHelperPredefineedTranscriptionConfigsSub<"specialUnitNames">,
	smallUnitNames: IHelperPredefineedTranscriptionConfigsSub<"smallUnitNames">,

	truncateOne?: string[],
	minusSign?: string,
	decimalPoint?: string,
}

export interface IOptionsTranscribeNumber extends ITranscribeNumberConfig
{
	configPreset?: ITSTypeAndStringLiteral<EnumTranscribeNumberConfigsKeys>;

	/**
	 * Get sanitized unit name keys
	 */
	keysOfUnitNames?: number[]
}

export interface IOptionsTranscribeNumberRuntime extends ITSOverwrite<IOptionsTranscribeNumber, {
	unitNames?: IHelperPredefineedTranscriptionConfigsSub2<"unitNames">,

	digits: IHelperPredefineedTranscriptionConfigsSub2<"digits">,
	specialUnitNames: IHelperPredefineedTranscriptionConfigsSub2<"specialUnitNames">,
	smallUnitNames: IHelperPredefineedTranscriptionConfigsSub2<"smallUnitNames">,
}>
{

}
