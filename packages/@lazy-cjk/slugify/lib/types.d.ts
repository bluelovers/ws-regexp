/**
 * Created by user on 2020/5/31.
 */
export interface IOptionsSlugify {
    separatorRegexp?: RegExp;
    /**
     * @default `-`
     */
    separator?: string;
    deburr?: boolean;
    upperCaseExtra?: boolean;
    lowerCaseExtra?: boolean;
    lowerCase?: boolean;
    upperFirst?: boolean;
    upperCase?: boolean;
    trimRegexp?: RegExp;
    allowEmptyResult?: boolean;
    emoji?: boolean;
    /**
     * @default true
     */
    transliterate?: boolean;
    /**
     * @default true
     */
    cjk?: boolean;
    maxLength?: number;
}
