import { IAstToStringOptions } from 'regexp-parser-literal';
import { INodeInput, IParserEventEmitterListener, IParserEventEmitterListenerMap, ParserEventEmitter, ParserEventEmitterEvent } from 'regexp-parser-event';
import { IOptions as IOptionsZhTable } from '@lazy-cjk/zh-table-list';
import { IGetSettingOptions } from './mergeOptions';
export { ParserEventEmitterEvent, ParserEventEmitter, INodeInput, IParserEventEmitterListener, IAstToStringOptions };
export { IOptionsZhTable };
export declare const SymDefaults: unique symbol;
export type IOptionsCore = {
    skip?: string;
    disableZh?: boolean;
    /**
     * disableLocalRange only work when disableZh is true
     */
    disableLocalRange?: boolean;
    allowLocalRangeAutoZh?: boolean;
    /**
     * 強制複寫 flags 設定
     * 但當使用於 zhRegExp.use 內時 則會自動被轉換為 defaultFlags
     */
    flags?: string;
    /**
     * 當沒有設定 flags 時的預設值
     */
    defaultFlags?: string;
    /**
     * allow str is /a/g
     * @deprecated
     */
    parseRegularExpressionString?: boolean;
    /**
     * 讓 文字比對 更加寬鬆
     */
    greedyTable?: boolean | number;
    unsafe?: boolean;
    /**
     * allow set `CjkConv.zhTable.auto`
     */
    zhTable?(char: string, options?: IOptionsZhTable): string[];
    /**
     * 用來解決插件需求
     */
    onCore?: IOptionsOnCore[];
} & IAstToStringOptions;
export interface IOptionsOnCore {
    /**
     * 執行於分析參數後 執行 核心處理前
     * 回傳的物件會取代參數
     */
    beforeStart?(opts: IGetSettingOptions<string> & {
        hasFlags: boolean;
    }): IGetSettingOptions & {
        hasFlags: boolean;
    };
    afterStart?(opts: IGetSettingOptions<string> & {
        hasFlags: boolean;
    }): IGetSettingOptions & {
        hasFlags: boolean;
    };
}
export type IOptions<T extends INodeInput = INodeInput> = IOptionsCore & {
    on?: IOptionsOn<T> | IOptionsOn<T>[];
};
export type IOptionsRuntime<T extends INodeInput = INodeInput> = IOptionsCore & {
    on?: IOptionsOn<T>[];
};
export type IOptionsInput<T extends INodeInput = INodeInput> = IOptions<T> | IOptionsRuntime<T>;
export interface ICoreHandlerReturn<T extends INodeInput = INodeInput> {
    source: string;
    flags: string;
    options: IOptionsRuntime<T>;
}
export interface IOptionsOn<T extends INodeInput = INodeInput> extends IParserEventEmitterListenerMap<T> {
}
export type IRegExpUserInput = string | RegExp;
export declare function coreHandler(str: IRegExpUserInput, flags?: string, options?: IOptionsInput | string, ...argv: any[]): ICoreHandlerReturn;
export declare function coreHandler(str: IRegExpUserInput, options?: IOptionsInput, ...argv: any[]): ICoreHandlerReturn;
export declare function setupParserEventEmitter(ev: ParserEventEmitter, options: IOptionsInput): ParserEventEmitter;
export default coreHandler;
