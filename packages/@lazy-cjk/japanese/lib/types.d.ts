/**
 * Created by user on 2020/5/31.
 */
export type IRomanizationConfigsKeys = 'wikipedia' | 'traditional hepburn' | 'modified hepburn' | 'kunrei' | 'nihon';
/**
 * Config is represented as plain object,
 * where object keys stand for a collection of similar characters,
 * and the value determines how these characters are converted.
 * So the object is not just the same as a conversion table.
 */
export interface IOptionsRomanize {
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
}
