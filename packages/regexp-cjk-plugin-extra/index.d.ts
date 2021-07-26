/**
 * Created by user on 2019/5/27.
 */
import { IOptionsOn } from 'regexp-cjk/lib/core';
import { INodeInput } from 'regexp-parser-event';
export declare type ICacheMap = Map<string, string[]>;
export interface IZhRegExpPluginOptionsCore {
    /**
     * 平假名片假名的 清濁音
     */
    autoVoice?: boolean;
    /**
     * 自動配對 半形 全形
     */
    autoFullHalf?: boolean;
    /**
     * 配對本地化字元
     */
    autoLocale?: boolean;
    /**
     * deburr('déjà vu') // => 'deja vu'
     *
     * Deburrs string by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and removing combining diacritical marks.
     */
    autoDeburr?: boolean;
    /**
     * if return null | undefined then will skip current node
     */
    callback?(raw: string): string | string[];
    on?: IOptionsOn<INodeInput>;
}
export declare type IZhRegExpPluginOptions = IZhRegExpPluginOptionsCore & {
    /**
     * 緩存
     */
    cacheMap?: boolean | ICacheMap;
};
export declare type IZhRegExpPluginOptionsRuntime = IZhRegExpPluginOptionsCore & {
    /**
     * 緩存
     */
    cacheMap?: ICacheMap;
};
/**
 * 建立 擴充事件函數物件
 */
export declare function createZhRegExpPlugin(options?: IZhRegExpPluginOptions): IOptionsOn;
/**
 * 分享內部處理函數 方便拿去使用或者擴充
 *
 * @private
 */
export declare function _coreFn(raw: string, { autoDeburr, autoFullHalf, autoLocale, autoVoice, cacheMap, callback, }: IZhRegExpPluginOptionsRuntime): string[];
export default createZhRegExpPlugin;
